# ChallengeHouse

A fitness game for a household, inside Home Assistant.

ChallengeHouse (integration domain `fitbridge`) collects everyone's workouts and turns them into a game: XP and levels,
weekly goals, week streaks, badges, personal records and a Couch to 5K plan. Two people can play as a couple or group,
with a shared weekly goal in one of three modes (each their own goal, workouts together, or team points). It keeps track
of running shoes and shows each workout in detail, with a map of the route, graphs, heart-rate zones and splits.

One person on their own works too. Goals, plans, XP values and badges are rules you can change; nothing about a
household is hard-coded.

## Install

[![Open your Home Assistant instance and open this repository in HACS.](https://my.home-assistant.io/badges/hacs_repository.svg)](https://my.home-assistant.io/redirect/hacs_repository/?owner=misterblokhead&repository=ha-challengehouse&category=integration)

Or by hand:

**HACS:** HACS -> the three-dot menu -> Custom repositories -> add `https://github.com/misterblokhead/ha-challengehouse`,
type **Integration**. Install ChallengeHouse, then restart Home Assistant.

**By hand:** copy `custom_components/fitbridge` into your `/config/custom_components/` folder and restart Home Assistant.

## First setup

Go to Settings -> Devices & services -> Add integration and add **ChallengeHouse**. Nothing needs editing by hand.
The setup screens ask:

1. **Who takes part?** Tick the Home Assistant users who play. Each becomes a person with their user's name.
2. **For each person:** a plan (Couch to 5K from today, or none), their phone (iPhone or Android) and their step sensor.
   When the person has the Home Assistant Companion app, its step sensor is filled in for you.
3. **A group**, when exactly two people take part: they play as a couple with a shared weekly goal. You can switch it off.
4. **openGym** (optional): either **Install openGym in Home Assistant** (when Home Assistant has the Supervisor), or the
   address of an openGym you run yourself. Then a pairing code, and per person an existing openGym user, an invite, or
   nobody. See [openGym](#opengym-gym-sessions) below; skip it if nobody trains in a gym.

Then open **ChallengeHouse** in the sidebar. Each person has a **Connect your phone** card (visible only to that person
and to admins) with their private webhook URL and the steps for their phone. Until their first workout arrives it sits
at the top of their page and reads "Waiting for the first workout"; after that it is under "Connect your phone" in the
person's details and reads "Connected, last workout received ...".

Home Assistant needs an external URL (Settings -> System -> Network) for phones to reach the webhook away from home.
Without one the address only works on your home network, and the setup and the card say so. Nabu Casa's remote UI URL
works; Nabu Casa cloudhooks are not used because their relay breaks ZIP uploads.

**Changing things later:** Settings -> Devices & services -> ChallengeHouse -> Configure:

- **People:** add a person from a Home Assistant user, or edit a name, plan (changing it starts the new plan today) or
  phone. Adding the second person asks whether the two play as a group. People are never deleted; their history stays.
- **Who is who and step sensors:** which person each Home Assistant user is ("Nobody" gives a read-only view) and each
  person's step sensor.
- **Webhooks and watch folders:** show or replace a person's webhook URL, and set a folder the integration scans for new
  files.
- **Pair with openGym** (with the Supervisor it offers to install openGym in Home Assistant, or to pair one you run
  yourself) and **openGym users and invites:** see below.

The time zone is Home Assistant's own.

### Upgrading from 0.5.x

0.6.0 copies the people, the group and the start date from your `scoring.toml` into Configure, once, on the first start.
After that, `[people]` and `[group]` in the file are ignored (the log says so once); edit people in Configure -> People.
If `scoring.toml` had no people, add them there. Rolling back to 0.5.x reads the file again, so changes made in
Configure after the upgrade would be missing there.

### The rule file (optional)

On first start the integration writes `/config/fitbridge/scoring.toml` from its default. You never have to touch it. It
holds only the advanced rules: which workout types count, goal defaults, XP values, plans and badges. People, the group,
the start date and the time zone are not in it. Your copy is never overwritten; a broken file keeps the last good one,
and the error is logged and shown on the page.

## openGym (gym sessions)

[openGym](https://github.com/duartesantos8/opengym) is a small self-hosted gym log. ChallengeHouse reads its sessions;
without it, gym tracking is simply off. Each person signs up with a passkey on their own phone. There are two ways to
run it.

### A. Inside Home Assistant (HAOS or Supervised)

If Home Assistant has the Supervisor, ChallengeHouse can install openGym for you, as an app in the sidebar. The app is
[ha-opengym](https://github.com/misterblokhead/ha-opengym).

1. In setup (or Configure -> Pair with openGym), choose **Install openGym in Home Assistant**.
2. Confirm the https address people open Home Assistant at. It is filled in for you. It must be a host name, not an IP
   address: passkeys never work on one. **It can never change once people have signed up**, because passkeys are bound to
   it.
3. ChallengeHouse adds the app source, installs and starts the app and puts it in the sidebar. Home Assistant builds it,
   which takes a minute or two.
4. Open **openGym** from the sidebar in Chrome and tap **Create new profile**. The first profile is the admin.
5. Go to Settings -> Account -> Pair the mobile app, and paste the code in ChallengeHouse. ChallengeHouse then switches
   invite-only on for you, so nobody else can sign up without an invite.

**HTTPS over Tailscale instead of Nabu Casa:** the Tailscale app can serve Home Assistant at
`https://<machine>.<tailnet>.ts.net` (its `share_homeassistant` option set to `serve`); use that address in step 2, and
every phone needs Tailscale. Home Assistant must then trust the Tailscale app as a reverse proxy: Settings -> System ->
Network -> HTTP server, turn on **Trust X-Forwarded-For** and add `127.0.0.1` to **Trusted proxies**. Since Home Assistant
2026.8 this is set there, not in `configuration.yaml`: an `http:` block there is imported once and then ignored.

People open openGym from the Home Assistant sidebar in Chrome (or another browser), not in the Home Assistant app: the
Home Assistant phone app cannot do passkeys. openGym's own phone app does not work this way either, because every
request needs a Home Assistant login.

### B. Its own address

Run openGym on its own address, away from Home Assistant. Home Assistant needs to reach it.

- **HTTPS is required.** Passkeys only work over HTTPS, so openGym needs a certificate.
- **Never change its address later.** Passkeys are bound to the hostname (`RP_ID`); changing it stops every passkey from
  working.
- **Run it** with Docker on a separate Linux machine, with the files in [`opengym/`](opengym): copy `.env.example` to
  `.env`, set `RP_ID` and `ORIGIN` to your address, then `docker compose up -d`. The images are pinned to the version
  ChallengeHouse is tested with. The web container listens on `127.0.0.1:8092`.
- **Serve it over Tailscale:** run `tailscale serve` for it as its own Tailscale service, so it gets an address like
  `https://gym.<tailnet>.ts.net`. Every phone needs Tailscale. openGym's own phone app works. A Cloudflare Tunnel with
  your own domain also works. Never publish the web port to the internet.
- **Create your account first:** open openGym and tap Create new profile (the first profile is the admin). Then set
  `INVITE_ONLY=1` in `.env` and run `docker compose up -d` again, so nobody else can sign up without an invite. Do it
  in this order: with invite-only on from the start, nobody can create the first profile.
- **Pair it:** Settings -> Account -> Pair the mobile app, and paste the code in ChallengeHouse (setup, or Configure ->
  Pair with openGym). If pairing fails during setup, you can go on without gym tracking and pair later.

### Add people (both routes)

In setup, or Configure -> openGym users and invites: link someone who already has an openGym account, or choose
**Invite** for someone who does not. Their Connect card then shows the invite code and how to open openGym (from the
Home Assistant sidebar in Chrome on route A). They tap Create new profile, type the code by hand, and add openGym to
their home screen. Once they have signed up, ChallengeHouse links them automatically.

## Inputs

The Connect card shows these steps for each person's phone; the short version:

- **iPhone / Apple Watch:** the Health Exporter & Shortcuts app posts its workout exports (ZIP or JSON) to the person's
  webhook URL, from a shortcut that two automations run (a social app is opened; an Apple Watch workout ends).
- **Android:** OpenTracks (or any app that saves GPX files) plus Automate, which posts the file to the webhook URL. The
  flow file and how to import it are in [`phone/`](phone). A watch folder works as well.
- **By hand:** the `fitbridge.log_workout` action logs a workout (run, walk, gym or home) without a file.
- **Gym sessions** come from openGym, once it is paired.
- **Pause days:** events in `calendar.training_pause` pause a person's week. The event title is the person's name, or for
  group members also "both" or the group's name.

### Other sources (not supported yet)

Researched, not built. Notes for anyone who wants to add one:

- **Galaxy Watch / Samsung Health:** Samsung Health shares workouts, distance, calories and heart rate with Android's
  Health Connect, but no other app can read a workout's GPS route in the background there, and the Health Connect
  webhook apps found so far do not send routes at all. A Health Connect input would therefore give workouts without a
  map. For routes today, record with OpenTracks (Android input above) and pair the watch as a Bluetooth heart-rate
  sensor (a watch app that broadcasts heart rate over Bluetooth), so the GPX carries both.
- **Google Health (Fitbit / Pixel Watch):** the Google Health API can export a workout's GPS route, so Fitbit and Pixel
  Watch owners could be supported by polling it. Workouts that only came in from Samsung Health through Health Connect
  arrive there without a route. Each user would need their own Google Cloud OAuth client, published, and would see
  Google's "unverified app" warning; whether the location scope is allowed that way is untested.
- **Strava:** Samsung Health can share workouts with Strava, and Strava's API returns GPS streams, so polling Strava is
  another possible route source (a Strava account and API app per user).

## What you get

- **The ChallengeHouse page** in the sidebar: each person's level, week, streak and steps, the couple's week, an activity
  list, workout details (map, graphs, heart-rate zones, splits, gym sets), plan progress, badges, records, weekly goals
  and shoes. Each user edits their own person; an admin who is mapped to a person can edit everyone.
- **Sensors** per person: `sensor.fit_<person>_xp`, `_week`, `_streak_weeks`, `_plan`, `_badges`, `_pbs` and `_recent`;
  per group: `sensor.fit_<group>_streak_weeks`, `_week` and `_month`.
- **Events** for automations: `event.fit_badge_unlocked`, `event.fit_workout_scored` and `event.fit_record_set`.
- **Actions:** `fitbridge.log_workout`, `fitbridge.remove_workout` and `fitbridge.restore_workout`.

## Privacy

Everything stays in Home Assistant: workouts are stored in `/config/fitbridge/` (part of Home Assistant's backups), and
the only outside service the integration talks to is the openGym instance you pair it with (if any). The route maps load
their tiles through Home Assistant's own map tile proxy, so the page never contacts a map server itself.

## Development

- Tests: `python -m pytest tests -q` with `tests/requirements.txt` installed (pytest-homeassistant-custom-component; Linux
  or WSL). The page's logic: `cd web && npm test`.
- The page lives in `web/` (Svelte + Vite). After a change, run `cd web && npm ci && npm run build` and commit the rebuilt
  `custom_components/fitbridge/frontend/` with it; Home Assistant serves the built files, there is no build step on
  install.

Licence: MIT, see [LICENSE](LICENSE).
