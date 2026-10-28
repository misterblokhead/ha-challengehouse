# ha-fitbridge

Self-hosted fitness tracking and a training game for a household, wired into Home Assistant.

fitbridge is a Home Assistant integration that:

- **collects workouts** through per-person HA webhooks: GPX files (e.g. OpenTracks, posted by an Automate/Tasker flow) and Health Exporter & Shortcuts exports (iPhone/Apple Watch), or from a watched folder;
- **reads gym sessions** from a self-hosted openGym instance (optional, any address HA can reach);
- **scores everything** from a TOML rule file: weekly goal, XP and levels, week streaks, a Couch to 5K plan, joint workouts, badges, records, and which workout types count;
- **shows it** on a Fitness page in the sidebar (activity list, workout details with map and graphs, goals, shoes) and as sensors and events for automations.

People, the optional two-person group, plans, XP values and badges all live in `scoring.toml`; nothing about a household is hard-coded. One person on their own works too.

## Layout

| Path | What |
|---|---|
| `custom_components/fitbridge/engine/{store,ingest,manual,cycle}.py` | SQLite store; GPX and Health Exporter ingestion; manual remove/restore/log; the scoring cycle (sources, caches, what to announce) |
| `custom_components/fitbridge/engine/scoring.py` | Pure scoring rules (no I/O) |
| `custom_components/fitbridge/engine/scoring_config.py`, `scoring.toml` | Rule file loader/validator and the default rules |
| `custom_components/fitbridge/engine/{entities,opengym,records}.py` | Sensor and event data for HA, openGym client, record maths (best sets, fastest 1 km) |
| `lxc-final` (git tag) | The last commit with the standalone LXC service and its `deploy.sh`, `fitbridge.service`, `env.example`, `opengym-pair.sh` |
| `custom_components/fitbridge/` | Home Assistant integration: the Fitness page in the sidebar, its per-user API and Remove/Restore; `frontend/` is the built page (committed) |
| `web/` | Source of the Fitness page (Svelte + Vite); builds into `custom_components/fitbridge/frontend/` |
| `tests/` | Integration tests (pytest-homeassistant-custom-component) |
| `specs/` | Scoring design and implementation plan |
| `mockups/` | Dashboard mockup |

## Setup (outline)

1. Copy `custom_components/fitbridge` into HA's `custom_components/` (or add this repository to HACS as a custom repository, type Integration), restart HA and add the "Fitness" integration.
2. Edit `/config/fitbridge/scoring.toml` (people, group, plans; written from the default on first start and never overwritten).
3. In the integration's options: each HA user's person, each person's webhook URL (post GPX or Health Exporter exports to it) or watch folder, step sensors, and optionally openGym (address + pairing code).

A broken `scoring.toml` keeps the last good one; the error is logged and shown on the Fitness page. The older standalone LXC service is kept at the `lxc-final` git tag.

## Changing the page

Edit `web/`, then `cd web && npm run build` and commit the rebuilt `custom_components/fitbridge/frontend/` with it (HA serves the built files; there is no build step on install).

## Tests

```bash
python -m pytest tests/engine -q            # the engine (plain Python, no HA fixtures; run it in the HA test venv below)
cd web && npm test                          # the page's pure logic (node:test)
python -m pytest tests -q                   # the integration: Linux or WSL, with tests/requirements.txt installed
```

Synthetic data only. Python 3.13+.
