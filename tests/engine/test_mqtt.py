import socket
import unittest

from custom_components.fitbridge.engine.mqtt import Mqtt, MqttError, encode_packet


class FakeSock:
    """Records sendall(); serves scripted recv() bytes, then raises socket.timeout."""

    def __init__(self, recv=b""):
        self.sent, self.buf, self.closed = [], bytearray(recv), False

    def sendall(self, data):
        self.sent.append(bytes(data))

    def recv(self, n):
        if not self.buf:
            raise socket.timeout()
        out, self.buf = bytes(self.buf[:n]), self.buf[n:]
        return out

    def settimeout(self, t):
        pass

    def close(self):
        self.closed = True


class OneByteSock(FakeSock):
    def recv(self, n):
        return super().recv(1)


def pub(t, p):
    return encode_packet(0x31, len(t).to_bytes(2, "big") + t.encode() + p)


CONNACK_OK = b"\x20\x02\x00\x00"


def client(sock, user="", password=""):
    return Mqtt("h", 1883, user, password, connect=lambda *a, **k: sock)


class MqttTests(unittest.TestCase):
    def test_remaining_length_over_127(self):
        self.assertEqual(encode_packet(0x30, b"x" * 200)[:3], bytes([0x30, 0xC8, 0x01]))

    def test_publish_sends_connect_publish_disconnect(self):
        sock = FakeSock(recv=CONNACK_OK)
        client(sock, "u", "p").publish_many([("a/b", "1", True)])
        self.assertEqual(sock.sent[0][0], 0x10)
        self.assertIn(bytes([0x31]), sock.sent[1][:1])  # retained publish
        self.assertEqual(sock.sent[-1], b"\xe0\x00")
        self.assertTrue(sock.closed)

    def test_connect_carries_credentials(self):
        sock = FakeSock(recv=CONNACK_OK)
        client(sock, "usr", "pw").publish_many([])
        self.assertIn(b"usr", sock.sent[0])
        self.assertIn(b"pw", sock.sent[0])
        self.assertEqual(sock.sent[0][9], 0xC2)  # user+password+clean session

    def test_empty_and_bytes_payloads_are_sent(self):
        sock = FakeSock(recv=CONNACK_OK)
        client(sock).publish_many([("t/e", "", True), ("t/b", b"\xff", False)])
        self.assertEqual(sock.sent[1], b"\x31\x05\x00\x03t/e")  # zero-length retained = clear
        self.assertEqual(sock.sent[2], b"\x30\x06\x00\x03t/b\xff")

    def test_refused_connack_raises(self):
        sock = FakeSock(recv=b"\x20\x02\x00\x05")
        with self.assertRaises(MqttError):
            client(sock, "u", "bad").publish_many([])
        self.assertTrue(sock.closed)

    def test_dead_broker_raises_mqtt_error(self):
        with self.assertRaises(MqttError):
            client(FakeSock()).publish_many([])

    def test_retained_collects_until_quiet(self):
        sock = FakeSock(recv=CONNACK_OK + b"\x90\x03\x00\x01\x00" +
                        pub("fitbridge/manual/a", b'{"x":1}') + pub("fitbridge/manual/b", b""))
        got = client(sock).retained("fitbridge/manual/#", wait=0.01)
        self.assertEqual(got, {"fitbridge/manual/a": b'{"x":1}'})
        self.assertEqual(sock.sent[1][0], 0x82)  # SUBSCRIBE
        self.assertEqual(sock.sent[-1], b"\xe0\x00")  # DISCONNECT
        self.assertTrue(sock.closed)

    def test_retained_handles_split_reads(self):
        sock = OneByteSock(recv=CONNACK_OK + b"\x90\x03\x00\x01\x00" + pub("t/" + "x" * 150, b"v" * 300))
        got = client(sock).retained("t/#", wait=0.01)
        self.assertEqual(got, {"t/" + "x" * 150: b"v" * 300})

    def test_retained_suback_refused_raises(self):
        sock = FakeSock(recv=CONNACK_OK + b"\x90\x03\x00\x01\x80")
        with self.assertRaises(MqttError):
            client(sock).retained("secret/#", wait=0.01)

    def test_retained_publish_before_suback_is_kept(self):
        sock = FakeSock(recv=CONNACK_OK + pub("t/a", b"1") + b"\x90\x03\x00\x01\x00" + pub("t/b", b"2"))
        self.assertEqual(client(sock).retained("t/#", wait=0.01), {"t/a": b"1", "t/b": b"2"})

    def test_retained_non_utf8_topic_raises_mqtt_error(self):
        bad = encode_packet(0x31, b"\x00\x02\xff\xfe" + b"1")
        sock = FakeSock(recv=CONNACK_OK + b"\x90\x03\x00\x01\x00" + bad)
        with self.assertRaises(MqttError):
            client(sock).retained("t/#", wait=0.01)

    def test_retained_no_suback_raises_instead_of_empty(self):
        with self.assertRaises(MqttError):  # broker went silent before SUBACK
            client(FakeSock(recv=CONNACK_OK)).retained("t/#", wait=0.01)


if __name__ == "__main__":
    unittest.main()
