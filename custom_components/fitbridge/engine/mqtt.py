"""Minimal MQTT 3.1.1 client (QoS 0 only): publish a batch, or read retained messages."""
import os
import socket

TIMEOUT = 10  # connect/read timeout so a dead broker can't hang the worker


class MqttError(ConnectionError):
    pass


def encode_packet(first_byte: int, body: bytes) -> bytes:
    n, rl = len(body), bytearray()
    while True:
        byte, n = n % 128, n // 128
        rl.append(byte | (0x80 if n else 0))
        if not n:
            break
    return bytes([first_byte]) + bytes(rl) + body


def _str(s: str | bytes) -> bytes:
    b = s.encode() if isinstance(s, str) else s
    return len(b).to_bytes(2, "big") + b


def _read(sock, n: int) -> bytes:
    buf = b""
    while len(buf) < n:
        chunk = sock.recv(n - len(buf))
        if not chunk:
            raise MqttError("connection closed by broker")
        buf += chunk
    return buf


def _read_packet(sock, first: int | None = None) -> tuple[int, bytes]:
    if first is None:
        first = _read(sock, 1)[0]
    n, mult = 0, 1
    while True:
        b = _read(sock, 1)[0]
        n += (b & 0x7F) * mult
        if not b & 0x80:
            break
        mult *= 128
    return first, _read(sock, n)


class Mqtt:
    def __init__(self, host, port, user, password, connect=socket.create_connection):
        self.host, self.port, self.user, self.password, self._connect = host, port, user, password, connect

    def _open(self):
        try:
            sock = self._connect((self.host, self.port), timeout=TIMEOUT)
        except OSError as e:
            raise MqttError(f"cannot connect to {self.host}:{self.port}: {e}") from e
        try:
            flags = 0x02 | (0x80 if self.user else 0) | (0x40 if self.password else 0)
            body = _str("MQTT") + bytes([4, flags]) + (30).to_bytes(2, "big")
            body += _str("fitbridge-" + os.urandom(4).hex())
            if self.user:
                body += _str(self.user)
            if self.password:
                body += _str(self.password)
            sock.sendall(encode_packet(0x10, body))
            first, rest = _read_packet(sock)
            if first != 0x20 or len(rest) != 2 or rest[1] != 0:
                raise MqttError(f"broker refused connection (CONNACK {rest[1:2].hex() or '?'})")
        except (OSError, MqttError) as e:
            sock.close()
            raise e if isinstance(e, MqttError) else MqttError(str(e)) from e
        return sock

    def publish_many(self, messages) -> None:
        sock = self._open()
        try:
            for topic, payload, retain in messages:
                data = payload.encode() if isinstance(payload, str) else payload
                sock.sendall(encode_packet(0x31 if retain else 0x30, _str(topic) + data))
            sock.sendall(b"\xe0\x00")
        except OSError as e:
            raise MqttError(str(e)) from e
        finally:
            sock.close()

    def retained(self, topic_filter: str, wait: float = 2.0) -> dict[str, bytes]:
        sock = self._open()
        out: dict[str, bytes] = {}

        def collect(first, rest):
            tlen = int.from_bytes(rest[:2], "big")
            payload = rest[2 + tlen + (2 if (first >> 1) & 3 else 0):]
            if payload:
                try:
                    out[rest[2:2 + tlen].decode()] = payload
                except UnicodeDecodeError:
                    raise MqttError("retained message with a non-UTF-8 topic") from None

        try:
            sock.sendall(encode_packet(0x82, (1).to_bytes(2, "big") + _str(topic_filter) + b"\x00"))
            while True:  # normal timeout until SUBACK; retained PUBLISHes may precede it
                first, rest = _read_packet(sock)
                if first >> 4 == 3:
                    collect(first, rest)
                elif first == 0x90:
                    if rest[-1:] == b"\x80":
                        raise MqttError(f"subscribe to {topic_filter} refused by broker")
                    break
            while True:
                sock.settimeout(wait)  # quiet period after the last packet
                try:
                    first = _read(sock, 1)[0]
                except socket.timeout:
                    sock.sendall(b"\xe0\x00")  # DISCONNECT: a clean close, no broker log noise
                    return out
                sock.settimeout(TIMEOUT)
                first, rest = _read_packet(sock, first)
                if first >> 4 == 3:
                    collect(first, rest)
        except OSError as e:
            raise MqttError(str(e)) from e
        finally:
            sock.close()
