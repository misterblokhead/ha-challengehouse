# Changelog

All notable changes to ChallengeHouse. Sections follow
[Conventional Commits](https://www.conventionalcommits.org/) types and versions
follow [Semantic Versioning](https://semver.org/). Versions before 0.9.0 were
tagged after the fact, on the commit that set each version.

## [0.9.0](https://github.com/misterblokhead/ha-challengehouse/releases/tag/v0.9.0)

### ⚠ Behaviour changes

* **goals:** once goals exist and the challenge has started, a goal change
  applies from next Monday instead of the current week, so a week's goals can
  no longer be lowered mid-week ([c05a2ef](https://github.com/misterblokhead/ha-challengehouse/commit/c05a2ef))

### Features

* **goals:** a change waits for next Monday, and a waiting change can be cancelled ([c05a2ef](https://github.com/misterblokhead/ha-challengehouse/commit/c05a2ef))
* **goals:** the Goals sheet shows the change waiting for Monday and can cancel it ([48c5f05](https://github.com/misterblokhead/ha-challengehouse/commit/48c5f05))
* **settings:** a save records the Monday it applies from, keeps the waiting entry, and can cancel it ([7ecd36a](https://github.com/misterblokhead/ha-challengehouse/commit/7ecd36a))
* **plans:** ship two more plans: Novice 10K (Hal Higdon) and Keep running (NHS C25K+) ([2eb7ac3](https://github.com/misterblokhead/ha-challengehouse/commit/2eb7ac3))
* **plans:** custom plans with validation, ids and a stored copy ([819fda9](https://github.com/misterblokhead/ha-challengehouse/commit/819fda9))
* **plans:** plan format gains note, loop, source, start_week and per-plan badges; shipped plans win over same-named user plans ([45af99e](https://github.com/misterblokhead/ha-challengehouse/commit/45af99e))
* **plans:** choose a start week, loop plans, per-plan week badges, distance check ([adad69c](https://github.com/misterblokhead/ha-challengehouse/commit/adad69c))
* **plans:** store, view, start and stop plans from the page ([ec14c6b](https://github.com/misterblokhead/ha-challengehouse/commit/ec14c6b))
* **page:** change plan, plan builder and distance sessions ([df0bae7](https://github.com/misterblokhead/ha-challengehouse/commit/df0bae7))
* **page:** copy a plan from the page, distance check line ([301ee2a](https://github.com/misterblokhead/ha-challengehouse/commit/301ee2a))
* **page:** "starts tomorrow" toast, any-run sessions, current week when restarting a plan ([8bb1945](https://github.com/misterblokhead/ha-challengehouse/commit/8bb1945))
* **configure:** Configure lists every plan ([6b4bf87](https://github.com/misterblokhead/ha-challengehouse/commit/6b4bf87))

### Bug Fixes

* **goals:** a save without a goal change applies now, an earlier save drops the waiting change, and cancel says whether it cancelled anything ([48787cd](https://github.com/misterblokhead/ha-challengehouse/commit/48787cd))
* **plans:** a switch after today's plan session starts tomorrow; skipped stored plans are kept; Configure refuses a deleted plan ([332572b](https://github.com/misterblokhead/ha-challengehouse/commit/332572b))
* **plans:** one plan operation at a time; a person removed meanwhile is a 404 ([a5caf7c](https://github.com/misterblokhead/ha-challengehouse/commit/a5caf7c))
* **plans:** refuse a huge integer km without overflowing ([41e5190](https://github.com/misterblokhead/ha-challengehouse/commit/41e5190))
* **plans:** a badge may name a plan only on the plan_weeks counter ([0deb3ce](https://github.com/misterblokhead/ha-challengehouse/commit/0deb3ce))
* **config:** wrong-shaped plans or badges in the user's file stay a ConfigError ([ab7db58](https://github.com/misterblokhead/ha-challengehouse/commit/ab7db58))
* **api:** a request body nested deeper than the JSON parser allows is a 400 ([41df269](https://github.com/misterblokhead/ha-challengehouse/commit/41df269))
* **page:** focus returns to the opener when a plan sheet closes ([301ee2a](https://github.com/misterblokhead/ha-challengehouse/commit/301ee2a))

### Code Refactoring

* **engine:** name the loop arithmetic, one plan_weeks counter key, a user plan without a name, `ConfigHolder.set_overlay` ([38aeaa1](https://github.com/misterblokhead/ha-challengehouse/commit/38aeaa1))
* **plans:** one owner of the custom plans ([332572b](https://github.com/misterblokhead/ha-challengehouse/commit/332572b))
* **page:** shared back-button and heading styles ([8bb1945](https://github.com/misterblokhead/ha-challengehouse/commit/8bb1945))

## [0.8.1](https://github.com/misterblokhead/ha-challengehouse/releases/tag/v0.8.1)

### Bug Fixes

* **opengym:** refuse an IP as the openGym address; only an https origin is accepted ([91496e5](https://github.com/misterblokhead/ha-challengehouse/commit/91496e5), [58cf98a](https://github.com/misterblokhead/ha-challengehouse/commit/58cf98a))
* **opengym:** the installer asks the store whether the app is installed, reads options from its info, keeps an installed app's options and restarts it, turns Watchdog on, and offers a way out of pairing at setup ([58cf98a](https://github.com/misterblokhead/ha-challengehouse/commit/58cf98a))
* **page:** sign-out hint on the Connect card ([91496e5](https://github.com/misterblokhead/ha-challengehouse/commit/91496e5))
* no warning when no pause calendar is set ([91496e5](https://github.com/misterblokhead/ha-challengehouse/commit/91496e5))
* no URL in the address error text, for hassfest ([30c2419](https://github.com/misterblokhead/ha-challengehouse/commit/30c2419))

### Documentation

* README: one-click Home Assistant install button ([09305f4](https://github.com/misterblokhead/ha-challengehouse/commit/09305f4))
* Tailscale reverse-proxy note ([91496e5](https://github.com/misterblokhead/ha-challengehouse/commit/91496e5))

## [0.8.0](https://github.com/misterblokhead/ha-challengehouse/releases/tag/v0.8.0)

### Features

* **opengym:** Setup and Configure can install openGym as a Home Assistant app through the Supervisor ([f26293a](https://github.com/misterblokhead/ha-challengehouse/commit/f26293a), [b88d2da](https://github.com/misterblokhead/ha-challengehouse/commit/b88d2da))
* **page:** the Connect card links to openGym in the Home Assistant sidebar ([b5fe4b7](https://github.com/misterblokhead/ha-challengehouse/commit/b5fe4b7))

### Bug Fixes

* **opengym:** create the first profile before switching invite-only on ([b464619](https://github.com/misterblokhead/ha-challengehouse/commit/b464619))
* **opengym:** name openGym's real sign-up button, "Create new profile" ([bd6f9bf](https://github.com/misterblokhead/ha-challengehouse/commit/bd6f9bf))
* **opengym:** find the repository by its source as well as its declared url ([75ec481](https://github.com/misterblokhead/ha-challengehouse/commit/75ec481))
* **opengym:** any install failure ends on the retry menu; pairing by hand drops the app link ([642fdea](https://github.com/misterblokhead/ha-challengehouse/commit/642fdea))

### Documentation

* point the docs and issue links at the renamed repo ha-challengehouse ([9ea3581](https://github.com/misterblokhead/ha-challengehouse/commit/9ea3581))

## [0.7.0](https://github.com/misterblokhead/ha-challengehouse/releases/tag/v0.7.0)

### Features

* **plan-check:** detect run blocks from a GPX track, store them, and match them against the plan day, with a cool-down in the plan ([14e5325](https://github.com/misterblokhead/ha-challengehouse/commit/14e5325), [fe6198d](https://github.com/misterblokhead/ha-challengehouse/commit/fe6198d), [6a30557](https://github.com/misterblokhead/ha-challengehouse/commit/6a30557))
* **plan-check:** review decisions and catch-up weeks; a review action and review field on `workout_scored` ([47631f7](https://github.com/misterblokhead/ha-challengehouse/commit/47631f7), [b0650ce](https://github.com/misterblokhead/ha-challengehouse/commit/b0650ce))
* **page:** programme text, block chips and review buttons on review runs ([9354616](https://github.com/misterblokhead/ha-challengehouse/commit/9354616), [bc2249b](https://github.com/misterblokhead/ha-challengehouse/commit/bc2249b))
* **phone:** the Android Automate upload flow ([8328e4f](https://github.com/misterblokhead/ha-challengehouse/commit/8328e4f))
* **setup:** a group for a second person, People without scores, skip a failed pairing, external URL warning ([4e70a2b](https://github.com/misterblokhead/ha-challengehouse/commit/4e70a2b))

### Bug Fixes

* **plan-check:** late routes, type decisions on the page, merged recordings; catch-up needs a real match ([0dd9c99](https://github.com/misterblokhead/ha-challengehouse/commit/0dd9c99))
* **plan-check:** a plan decision counts for the day shown ([6b8c771](https://github.com/misterblokhead/ha-challengehouse/commit/6b8c771))
* **opengym:** invites in one transaction for both flows; Keep keeps a link made while the form was open ([06d6e52](https://github.com/misterblokhead/ha-challengehouse/commit/06d6e52))
* **page:** the server says whom a viewer may connect; copy works on iOS and plain http; a refused card goes away ([140c675](https://github.com/misterblokhead/ha-challengehouse/commit/140c675))
* **runner:** last upload stamped on every accepted body or stored file; `scoring.toml` read once ([a75f7b9](https://github.com/misterblokhead/ha-challengehouse/commit/a75f7b9))

### Documentation

* person ids in the actions, README menu names, the Connect card's place, upgrade and openGym network notes ([82ce759](https://github.com/misterblokhead/ha-challengehouse/commit/82ce759))

## [0.6.0](https://github.com/misterblokhead/ha-challengehouse/releases/tag/v0.6.0)

### Features

* **setup:** first setup asks who takes part, their plan, phone and step sensor, and optionally pairs openGym, with one openGym account per person ([942292a](https://github.com/misterblokhead/ha-challengehouse/commit/942292a), [b67c343](https://github.com/misterblokhead/ha-challengehouse/commit/b67c343))
* **configure:** add and edit people; invite people to openGym ([32b7bea](https://github.com/misterblokhead/ha-challengehouse/commit/32b7bea))
* **options:** people, group and start date live in the integration's options, migrated from `scoring.toml` ([5f3be14](https://github.com/misterblokhead/ha-challengehouse/commit/5f3be14))
* **opengym:** link an invited openGym account to its person once the invite is used ([01be6b5](https://github.com/misterblokhead/ha-challengehouse/commit/01be6b5))
* **api:** Connect endpoint with a person's webhook URL, phone, last upload and openGym invite ([443942b](https://github.com/misterblokhead/ha-challengehouse/commit/443942b))
* **page:** a Connect card per person; admins can open everyone's ([42e2139](https://github.com/misterblokhead/ha-challengehouse/commit/42e2139), [7b40cfc](https://github.com/misterblokhead/ha-challengehouse/commit/7b40cfc))
* **engine:** a person may have no plan ([267682b](https://github.com/misterblokhead/ha-challengehouse/commit/267682b), [12a20b5](https://github.com/misterblokhead/ha-challengehouse/commit/12a20b5))

### Bug Fixes

* **opengym:** re-check links against the current settings before saving them ([ae5a5bf](https://github.com/misterblokhead/ha-challengehouse/commit/ae5a5bf))
* **setup:** say so when an unused invite cannot be withdrawn ([d690972](https://github.com/misterblokhead/ha-challengehouse/commit/d690972))
* **configure:** leave unmigrated people alone; never point at a withdrawn invite ([a8d9479](https://github.com/misterblokhead/ha-challengehouse/commit/a8d9479))

### Documentation

* README for installing and setting up ChallengeHouse, other workout sources and their limits ([0fd91e1](https://github.com/misterblokhead/ha-challengehouse/commit/0fd91e1), [bf57849](https://github.com/misterblokhead/ha-challengehouse/commit/bf57849))
* openGym compose files and the phone folder ([7c9235d](https://github.com/misterblokhead/ha-challengehouse/commit/7c9235d))

### Build System

* MIT licence, HACS and hassfest validation ([e0bd384](https://github.com/misterblokhead/ha-challengehouse/commit/e0bd384))

### Tests

* placeholder people in the default rules, tests and fixtures; neutral coordinates ([a28f611](https://github.com/misterblokhead/ha-challengehouse/commit/a28f611), [afe2441](https://github.com/misterblokhead/ha-challengehouse/commit/afe2441))

## [0.5.2](https://github.com/misterblokhead/ha-challengehouse/releases/tag/v0.5.2)

### Features

* ChallengeHouse name, brand images and header icon ([75613e0](https://github.com/misterblokhead/ha-challengehouse/commit/75613e0))

## [0.5.1](https://github.com/misterblokhead/ha-challengehouse/releases/tag/v0.5.1)

### ⚠ BREAKING CHANGES

* shadow mode and MQTT are removed; the integration always runs live, and options migrate to minor version 3 ([c9a10b0](https://github.com/misterblokhead/ha-challengehouse/commit/c9a10b0))
* the Endurain shoe carry-over service and shoe rows are removed ([20668b6](https://github.com/misterblokhead/ha-challengehouse/commit/20668b6))

### Bug Fixes

* an OpenTracks run without GPS points shows as "No GPS", not "Type not counted" ([862db0f](https://github.com/misterblokhead/ha-challengehouse/commit/862db0f))
* unknown workout types read as words, e.g. americanFootball → American football ([6df5cc3](https://github.com/misterblokhead/ha-challengehouse/commit/6df5cc3))

### Code Refactoring

* one scores source: the page reads the runner's last good scores ([b95143c](https://github.com/misterblokhead/ha-challengehouse/commit/b95143c))

## [0.5.0](https://github.com/misterblokhead/ha-challengehouse/releases/tag/v0.5.0)

### Features

* **scoring:** workout types table in `scoring.toml` with a shipped fallback ([3f4e05d](https://github.com/misterblokhead/ha-challengehouse/commit/3f4e05d), [9f8835c](https://github.com/misterblokhead/ha-challengehouse/commit/9f8835c))
* **scoring:** effort rule and max HR; birth year per person ([c796f8f](https://github.com/misterblokhead/ha-challengehouse/commit/c796f8f), [4700b55](https://github.com/misterblokhead/ha-challengehouse/commit/4700b55))
* **feed:** 90 days with "Load older" and Remove/Restore on older rows ([9b8873d](https://github.com/misterblokhead/ha-challengehouse/commit/9b8873d), [b30490f](https://github.com/misterblokhead/ha-challengehouse/commit/b30490f))
* **page:** workout details pop-up; a merged workout shows every piece ([6dd41f5](https://github.com/misterblokhead/ha-challengehouse/commit/6dd41f5), [17b8ade](https://github.com/misterblokhead/ha-challengehouse/commit/17b8ade))
* **panel:** the page URL is versioned by a hash of the build ([bd62242](https://github.com/misterblokhead/ha-challengehouse/commit/bd62242))

### Bug Fixes

* **scoring:** merge and pair only workouts with the same effort flag ([c2475a4](https://github.com/misterblokhead/ha-challengehouse/commit/c2475a4))
* **feed:** workouts from before the start show as older rows that score nothing; refuse years before 1900 ([4d1838b](https://github.com/misterblokhead/ha-challengehouse/commit/4d1838b), [6ae3615](https://github.com/misterblokhead/ha-challengehouse/commit/6ae3615))
* **details:** no heart-rate or elevation line across a pause ([6eab256](https://github.com/misterblokhead/ha-challengehouse/commit/6eab256))

### Code Refactoring

* one Modal shell for the workout, records and shoes dialogs ([c7d5c8a](https://github.com/misterblokhead/ha-challengehouse/commit/c7d5c8a))

## [0.4.2](https://github.com/misterblokhead/ha-challengehouse/releases/tag/v0.4.2)

### Features

* option to make new webhook URLs ([4dab862](https://github.com/misterblokhead/ha-challengehouse/commit/4dab862))

## [0.4.1](https://github.com/misterblokhead/ha-challengehouse/releases/tag/v0.4.1)

### Features

* fitness sensors, events and actions without MQTT ([045487d](https://github.com/misterblokhead/ha-challengehouse/commit/045487d))
* webhooks per person, watch folders and openGym pairing ([cd7c029](https://github.com/misterblokhead/ha-challengehouse/commit/cd7c029))
* manage shoes on the page and move a run to another shoe ([2e7db55](https://github.com/misterblokhead/ha-challengehouse/commit/2e7db55))
* shadow mode can be switched in the options ([341ea38](https://github.com/misterblokhead/ha-challengehouse/commit/341ea38))

### Bug Fixes

* a renewed openGym token is used for the rest of its cycle ([88a3690](https://github.com/misterblokhead/ha-challengehouse/commit/88a3690))
* webhooks use Home Assistant's own URL, never Nabu Casa cloudhooks, whose relay breaks ZIP bodies ([9934d15](https://github.com/misterblokhead/ha-challengehouse/commit/9934d15))
* a ZIP is read and decompressed only up to 32 MB; a GPX is archived once ([6acc3f3](https://github.com/misterblokhead/ha-challengehouse/commit/6acc3f3), [5bd8f99](https://github.com/misterblokhead/ha-challengehouse/commit/5bd8f99), [e92cc46](https://github.com/misterblokhead/ha-challengehouse/commit/e92cc46))
* the runner records nothing for a cycle that ends during an unload, and a burst of uploads is one cycle ([1c98d30](https://github.com/misterblokhead/ha-challengehouse/commit/1c98d30))
* Home Assistant backups wait for the running cycle ([d212248](https://github.com/misterblokhead/ha-challengehouse/commit/d212248))
* pairing accepts openGym's address without `https://` and logs why it could not be reached ([ca84ec8](https://github.com/misterblokhead/ha-challengehouse/commit/ca84ec8), [afb8e23](https://github.com/misterblokhead/ha-challengehouse/commit/afb8e23))
* wrong-typed export values never break scoring; webhooks stay up while `scoring.toml` is broken ([02364f9](https://github.com/misterblokhead/ha-challengehouse/commit/02364f9))
* the page rounds the average heart rate ([7aaf6e1](https://github.com/misterblokhead/ha-challengehouse/commit/7aaf6e1))

## [0.4.0](https://github.com/misterblokhead/ha-challengehouse/releases/tag/v0.4.0)

### Features

* the scoring engine moves into the integration and runs inside Home Assistant, with shadow mode and calendar pauses ([cd112fa](https://github.com/misterblokhead/ha-challengehouse/commit/cd112fa), [3dce328](https://github.com/misterblokhead/ha-challengehouse/commit/3dce328))
* store, ingest, cycle and manual modules; shoes counted from runs, with a current shoe per person ([4fecd51](https://github.com/misterblokhead/ha-challengehouse/commit/4fecd51), [08afdb5](https://github.com/misterblokhead/ha-challengehouse/commit/08afdb5))

### ⚠ BREAKING CHANGES

* the engine's MQTT, HTTP server and Endurain uploads are removed ([4fecd51](https://github.com/misterblokhead/ha-challengehouse/commit/4fecd51))

## [0.3.3](https://github.com/misterblokhead/ha-challengehouse/releases/tag/v0.3.3)

### Features

* record sets in the workouts show in orange ([3768792](https://github.com/misterblokhead/ha-challengehouse/commit/3768792))

### Bug Fixes

* catalog entries are bounded by JSON decoding; Esc leaves the sheet alone while a records pop-up is open ([e8bd4b4](https://github.com/misterblokhead/ha-challengehouse/commit/e8bd4b4))

## [0.3.2](https://github.com/misterblokhead/ha-challengehouse/releases/tag/v0.3.2)

### Features

* records per muscle group with an all-records pop-up; no links out of the page ([22e9007](https://github.com/misterblokhead/ha-challengehouse/commit/22e9007))

## [0.3.1](https://github.com/misterblokhead/ha-challengehouse/releases/tag/v0.3.1)

### Features

* Progress section with this week's steps, lift records and fastest 1 km, in the ring colours ([e895ad4](https://github.com/misterblokhead/ha-challengehouse/commit/e895ad4), [1f3b084](https://github.com/misterblokhead/ha-challengehouse/commit/1f3b084))

### Bug Fixes

* Progress: key lifts by exercise id, goal line outside the list, no sliver on future days ([fa1d385](https://github.com/misterblokhead/ha-challengehouse/commit/fa1d385), [ca69911](https://github.com/misterblokhead/ha-challengehouse/commit/ca69911))

## [0.3.0](https://github.com/misterblokhead/ha-challengehouse/releases/tag/v0.3.0)

### Features

* this week's steps per person for the page ([3aaae69](https://github.com/misterblokhead/ha-challengehouse/commit/3aaae69))
* best set per exercise, exercise names and fastest 1 km from a GPX ([88be043](https://github.com/misterblokhead/ha-challengehouse/commit/88be043))

### Code Refactoring

* one gym fallback helper; active days without a time; reward as typed ([c830669](https://github.com/misterblokhead/ha-challengehouse/commit/c830669))

## [0.2.0](https://github.com/misterblokhead/ha-challengehouse/releases/tag/v0.2.0)

### Features

* the Fitness page: overview tiles, rings, Together and status ([60bdec8](https://github.com/misterblokhead/ha-challengehouse/commit/60bdec8), [696573b](https://github.com/misterblokhead/ha-challengehouse/commit/696573b))
* workout details and a feed with remove and undo ([176ea12](https://github.com/misterblokhead/ha-challengehouse/commit/176ea12))
* weekly goals and couple mode set from the page through the Goals sheet, with three goal rings and a reward ([cb67576](https://github.com/misterblokhead/ha-challengehouse/commit/cb67576), [6f1b650](https://github.com/misterblokhead/ha-challengehouse/commit/6f1b650), [bca593f](https://github.com/misterblokhead/ha-challengehouse/commit/bca593f))
* daily steps per person, counted only from the phone's own reports ([9cba3be](https://github.com/misterblokhead/ha-challengehouse/commit/9cba3be), [8ed4890](https://github.com/misterblokhead/ha-challengehouse/commit/8ed4890))
* each person's Endurain shoes with a replace-at limit ([043b174](https://github.com/misterblokhead/ha-challengehouse/commit/043b174), [038c65b](https://github.com/misterblokhead/ha-challengehouse/commit/038c65b))

### Bug Fixes

* Undo waits for its Remove; sheet close and inert fixes ([fbdc894](https://github.com/misterblokhead/ha-challengehouse/commit/fbdc894))
* steps today is 0 until the phone reports today; settings change only once saved ([164fe40](https://github.com/misterblokhead/ha-challengehouse/commit/164fe40))

## [0.1.0](https://github.com/misterblokhead/ha-challengehouse/releases/tag/v0.1.0)

### Features

* first version of the integration: setup, MQTT payload, viewer API, panel, and config and options flow ([61a0255](https://github.com/misterblokhead/ha-challengehouse/commit/61a0255))
* core: payload, viewer, rights and manual messages ([556a1f3](https://github.com/misterblokhead/ha-challengehouse/commit/556a1f3))
