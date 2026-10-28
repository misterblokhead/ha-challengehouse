# ha-fitbridge

Self-hosted fitness tracking and a training game for a household, wired into Home Assistant.

fitbridge is a small stdlib-only Python service (no pip packages) that:

- **collects workouts** from phones: OpenTracks GPX files via Syncthing (Android) and Health Exporter & Shortcuts exports POSTed over Tailscale (iPhone/Apple Watch);
- **uploads runs** to a self-hosted Endurain instance;
- **reads gym sessions** from a self-hosted openGym instance (admin API);
- **scores everything** from a TOML rule file: weekly goal (runs + gym), XP and levels, week streaks, a Couch to 5K plan, joint workouts, badges and records;
- **publishes the scores to Home Assistant** as MQTT-discovery sensors, and takes manual entries, remove/restore requests and training pauses back over MQTT.

People, the optional two-person group, plans, XP values and badges all live in `scoring.toml`; nothing about a household is hard-coded. One person on their own works too.

## Layout

| Path | What |
|---|---|
| `fitbridge/fitbridge.py` | Service: ingestion, Endurain upload, store, 5-minute scoring cycle, `GET /scores` |
| `fitbridge/scoring.py` | Pure scoring rules (no I/O) |
| `fitbridge/scoring_config.py`, `scoring.toml` | Rule file loader/validator and the default rules |
| `fitbridge/mqtt.py`, `opengym.py`, `publish.py`, `records.py` | Minimal MQTT client, openGym client, HA discovery payloads, record maths (best sets, fastest 1 km) |
| `fitbridge/deploy.sh`, `fitbridge.service`, `env.example`, `opengym-pair.sh` | Install on a Debian host/LXC with systemd |
| `custom_components/fitbridge/` | Home Assistant integration: the Fitness page in the sidebar, its per-user API and Remove/Restore; `frontend/` is the built page (committed) |
| `web/` | Source of the Fitness page (Svelte + Vite); builds into `custom_components/fitbridge/frontend/` |
| `tests/` | Integration tests (pytest-homeassistant-custom-component) |
| `specs/` | Scoring design and implementation plan |
| `mockups/` | Dashboard mockup |

## Setup (outline)

1. Run Endurain and (optionally) openGym; expose fitbridge's port to the phones, e.g. with `tailscale serve`.
2. Copy `fitbridge/` to the host and run `deploy.sh` as root. It installs to `/opt/fitbridge`, creates `/opt/fitbridge/.env` from `env.example` (mode 600) and never overwrites an existing one.
3. Edit `/opt/fitbridge/scoring.toml` (people, group, plans) and `.env` (per person: `ENDURAIN_KEY_<ID>`, `SYNC_DIR_<ID>`, `TAILSCALE_LOGIN_<ID>`, `OPENGYM_UID_<ID>`; MQTT broker and user).
4. openGym: `bash /root/opengym-pair.sh` with a pairing code from openGym's settings.
5. Home Assistant: an MQTT user for fitbridge, plus the pause-feed automation and the log/remove/restore scripts described in `specs/2026-10-26-scoring-design.md` §7.
6. Fitness page (optional): needs the MQTT integration. Add this repository to HACS as a custom repository (type Integration) and install it, or copy `custom_components/fitbridge` into HA's `custom_components/`; restart HA, then add the "Fitness (fitbridge)" integration. Once fitbridge has published scores, its options map each HA user to a fitbridge person; unmapped users see the household read-only.

Check the result with `curl -s http://127.0.0.1:8091/scores`; a broken `scoring.toml` keeps the last good one and shows up as `config_error`.

## Changing the page

Edit `web/`, then `cd web && npm run build` and commit the rebuilt `custom_components/fitbridge/frontend/` with it (HA serves the built files; there is no build step on install).

## Tests

```bash
cd fitbridge && python -m unittest -v      # fitbridge, stdlib only
cd web && npm test                          # the page's pure logic (node:test)
python -m pytest tests -q                   # the integration: Linux or WSL, with tests/requirements.txt installed
```

Synthetic data only. Python 3.13+.
