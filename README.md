# ChallengeHouse

A fitness game for a household, inside Home Assistant.

ChallengeHouse (integration domain `fitbridge`) collects everyone's workouts and turns them into a game: XP and levels,
weekly goals, week streaks, badges, personal records and a Couch to 5K plan. Two people can play as a couple or group,
with a shared weekly goal in one of three modes (each their own goal, workouts together, or team points). It keeps track
of running shoes and shows each workout in detail, with a map of the route, graphs, heart-rate zones and splits.

One person on their own works too. People, goals, plans, XP values and badges all live in one rule file; nothing about a
household is hard-coded.

## Install

**HACS:** HACS -> the three-dot menu -> Custom repositories -> add `https://github.com/misterblokhead/ha-fitbridge`,
type **Integration**. Install ChallengeHouse, then restart Home Assistant.

**By hand:** copy `custom_components/fitbridge` into your `/config/custom_components/` folder and restart Home Assistant.

Then go to Settings -> Devices & services -> Add integration and add **ChallengeHouse**.

## First setup

1. **The rule file.** On first start the integration writes `/config/fitbridge/scoring.toml` from its default. Edit it:
   - `[rules]`: your `timezone`, and the `start` date from which workouts count;
   - `[people.<id>]`: one table per person, with a display `name` (the id, e.g. `person1`, is what entity ids and
     webhooks go by);
   - `[group]` (optional): a group name and its two `members`;
   - plans, the weekly goal, XP values, which workout types count, and badges.

   Your copy is never overwritten. A broken file keeps the last good one; the error is logged and shown on the page.

2. **The integration's options** (Settings -> Devices & services -> ChallengeHouse -> Configure):
   - **Viewers:** which person each Home Assistant user is ("Nobody" gives a read-only view), then each person's step
     sensor (for example a phone's daily steps sensor);
   - **Inputs:** each person's webhook URL (shown here; you can replace it with a new one) and an optional watch folder
     the integration scans for new files;
   - **openGym** (optional): the address of an openGym instance Home Assistant can reach and a pairing code from it;
     then, under **People**, which openGym user each person is.

## Inputs

- **Apple Watch / iPhone:** the Health Exporter & Shortcuts app posts its workout exports (ZIP or JSON) to the person's
  webhook URL.
- **Android:** any app that saves GPX files (for example OpenTracks), plus an automation app (Automate, Tasker) that posts
  the file to the person's webhook URL. A watch folder works as well.
- **By hand:** the `fitbridge.log_workout` action logs a workout (run, walk, gym or home) without a file.
- **Gym sessions** come from openGym, once it is paired.
- **Pause days:** events in `calendar.training_pause` pause a person's week. The event title is the person's name, or for
  group members also "both" or the group's name.

## What you get

- **The ChallengeHouse page** in the sidebar: each person's level, week, streak and steps, the couple's week, an activity
  list, workout details (map, graphs, heart-rate zones, splits, gym sets), plan progress, badges, records, weekly goals
  and shoes. Each user edits their own person; an admin who is mapped to a person can edit everyone.
- **Sensors** per person: `sensor.fit_<person>_xp`, `_week`, `_streak_weeks`, `_plan`, `_badges`, `_pbs` and `_recent`;
  per group: `sensor.fit_<group>_streak_weeks`, `_week` and `_month`.
- **Events** for automations: `event.fit_badge_unlocked`, `event.fit_workout_scored` and `event.fit_record_set`.
- **Actions:** `fitbridge.log_workout`, `fitbridge.remove_workout` and `fitbridge.restore_workout`.

## Privacy

Everything stays in Home Assistant: workouts are stored in `/config/fitbridge/` (part of Home Assistant's backups), and the
only outside service the integration talks to is the openGym instance you pair it with. The route maps load their tiles
through Home Assistant's own map tile proxy, so the page never contacts a map server itself.

## Development

- Tests: `python -m pytest tests -q` with `tests/requirements.txt` installed (pytest-homeassistant-custom-component; Linux
  or WSL). The page's logic: `cd web && npm test`.
- The page lives in `web/` (Svelte + Vite). After a change, run `cd web && npm ci && npm run build` and commit the rebuilt
  `custom_components/fitbridge/frontend/` with it; Home Assistant serves the built files, there is no build step on
  install.

Licence: MIT, see [LICENSE](LICENSE).
