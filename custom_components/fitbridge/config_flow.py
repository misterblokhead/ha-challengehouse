import logging
from pathlib import Path

import voluptuous as vol
from homeassistant import config_entries
from homeassistant.components import persistent_notification
from homeassistant.core import HomeAssistant, callback
from homeassistant.helpers.selector import (
    EntitySelector,
    EntitySelectorConfig,
    SelectSelector,
    SelectSelectorConfig,
    SelectSelectorMode,
    TextSelector,
    TextSelectorConfig,
    TextSelectorType,
)
from homeassistant.helpers.translation import async_get_translations
from homeassistant.util import dt as dt_util

from . import gym, opengym_app, people, steps, webhooks
from .const import (
    DOMAIN,
    OPENGYM_TOKEN,
    OPT_FOLDERS,
    OPT_GROUP,
    OPT_INVITES,
    OPT_OPENGYM_LINK,
    OPT_OPENGYM_UIDS,
    OPT_OPENGYM_URL,
    OPT_PEOPLE,
    OPT_PHONES,
    OPT_START,
    OPT_STEPS,
    OPT_VIEWERS,
    PHONES,
    WEBHOOKS,
)

_LOGGER = logging.getLogger(__name__)
NEW_URLS = "new_urls"
ADD = "+"  # the People step's pick for a new person; not an id (ids are ^[a-z0-9_]+$)
KEEP = "keep"  # a plan or an open invite left as it is
INVITE = "invite"
GROUP = "couple"  # the group's name, never a person's id
PHONE_LABELS = {"iphone": "iPhone", "android": "Android"}
PLANS = {"c25k": "Couch to 5K, starting today", "none": "No plan"}
NO_EXTERNAL_URL = ("\n\nHome Assistant has no external URL, so the phone's webhook address only works at home. Set one in "
                   "Settings -> System -> Network, or use Home Assistant Cloud's remote access.")


def _labels(names: dict[str, str], tag=lambda k: k) -> dict[str, str]:
    """A field's label is its key: the name, made unique by tag(key) when two share one."""
    return {k: n if list(names.values()).count(n) == 1 else f"{n} ({tag(k)})" for k, n in names.items()}


def _names_of(records: dict) -> dict[str, str]:
    """People records as person -> name."""
    return {p: str(r.get("name") or p) for p, r in records.items()}


def _choice(options: dict[str, str]) -> SelectSelector:
    return SelectSelector(SelectSelectorConfig(
        mode=SelectSelectorMode.DROPDOWN, options=[{"value": v, "label": n} for v, n in options.items()]))


def _user_name(user) -> str:
    return user.name or user.id[:6]  # a user may have no name


async def _ha_users(hass: HomeAssistant, skip=()) -> dict[str, str]:
    """The active, non-system Home Assistant users (but those in skip) as user id -> unique label."""
    users = {u.id: _user_name(u) for u in await hass.auth.async_get_users()
             if u.is_active and not u.system_generated and u.id not in skip}
    return _labels(users, lambda uid: uid[:6])


async def _gym_users(hass: HomeAssistant, url: str, token: str) -> dict[str, str]:
    """openGym's users as id -> name; none when the list cannot be read (inviting still works, linking can wait)."""
    try:
        return {u["id"]: str(u.get("name") or u["id"]) for u in await gym.async_users(hass, url, token)}
    except gym.GymError:
        return {}


def _gym_choice(users: dict[str, str], open_invite: bool) -> SelectSelector:
    """A person's openGym pick: Nobody, Keep (only with an open invite), Invite or one of the users."""
    return _choice({"": "Nobody", **({KEEP: "Keep the open invite"} if open_invite else {}),
                    INVITE: "Invite again (the open code stops working)" if open_invite else "Invite", **users})


def _pair_schema(setup: bool = False) -> vol.Schema:
    """openGym's address and a pairing code; at first setup both may stay empty to go on without openGym ("skip")."""
    key = vol.Optional if setup else vol.Required
    return vol.Schema({key(OPT_OPENGYM_URL): TextSelector(TextSelectorConfig(type=TextSelectorType.URL)), key("code"): TextSelector(),
                       **({vol.Optional("skip", default=False): bool} if setup else {})})


async def _pair(hass: HomeAssistant, user_input: dict) -> tuple[str, str | None, dict]:
    """(address, token, errors) of a pairing form; the token is None when openGym did not give one."""
    url, code = gym.normalize_url(user_input.get(OPT_OPENGYM_URL, "")), user_input.get("code", "").strip()
    if not gym.CODE.fullmatch(code):
        return url, None, {"code": "invalid_code"}
    try:
        return url, await gym.async_redeem(hass, url, code), {}
    except gym.GymError as err:
        return url, None, {"base": err.reason}


def _group_schema() -> vol.Schema:
    return vol.Schema({vol.Optional("group", default=True): bool})


class _InstallSteps:
    """Install the openGym app next to Home Assistant and pair with it, in the setup and the Configure flow."""
    _address = _slug = _url = _link = _install_task = _reason = None
    _failed_menu: list[str]  # what install_failed offers
    _category = "config"  # en.json's section, for the reason's text

    async def _paired(self, token: str):
        """Go on once paired with openGym at self._url; self._link is the installed app's sidebar address, or None."""
        raise NotImplementedError

    async def async_step_install(self, user_input=None):
        """The address people open Home Assistant at (prefilled, editable): the app is set up for what they confirm."""
        errors = {}
        if user_input is not None:
            if address := opengym_app.origin(user_input["address"]):  # an origin: a path in ORIGIN breaks every passkey
                self._address = address
                return await self.async_step_install_progress()
            errors["address"] = "address_https"
        return self.async_show_form(step_id="install", errors=errors, data_schema=self.add_suggested_values_to_schema(
            vol.Schema({vol.Required("address"): TextSelector(TextSelectorConfig(type=TextSelectorType.URL))}),
            {"address": (user_input or {}).get("address") or self._address or opengym_app.detected_address(self.hass)}))

    async def async_step_install_progress(self, user_input=None):
        """The Supervisor builds the app on this machine: minutes, and no time limit of ours."""
        if not self._install_task:  # not eager: the progress shows before the install can be done
            self._install_task = self.hass.async_create_task(opengym_app.async_install(self.hass, self._address), eager_start=False)
        if not self._install_task.done():
            return self.async_show_progress(step_id="install_progress", progress_action="install_app", progress_task=self._install_task)
        task, self._install_task = self._install_task, None
        try:
            self._slug, self._url = task.result()
        except opengym_app.AppError as err:
            self._reason = err.reason
            return self.async_show_progress_done(next_step_id="install_failed")
        except Exception:  # anything else would leave the flow on the spinner for good
            _LOGGER.exception("Installing the openGym app failed")
            self._reason = "app_install_failed"
            return self.async_show_progress_done(next_step_id="install_failed")
        return self.async_show_progress_done(next_step_id="install_pair")

    async def async_step_install_failed(self, user_input=None):
        texts = await async_get_translations(self.hass, self.hass.config.language, self._category, {DOMAIN})
        return self.async_show_menu(step_id="install_failed", menu_options=self._failed_menu, description_placeholders={
            "reason": texts.get(f"component.{DOMAIN}.{self._category}.error.{self._reason}", self._reason)})

    async def async_step_install_pair(self, user_input=None):
        """A pairing code from the new app, redeemed at its internal address (never logged); then invite-only on. At setup
        the person may go on without gym tracking; the app stays installed and can be paired later in Configure."""
        errors, skip = {}, hasattr(self, "async_step_skip")
        if user_input is not None:
            if user_input.get("skip"):
                return await self.async_step_skip()
            _, token, errors = await _pair(self.hass, {**user_input, OPT_OPENGYM_URL: self._url})
            if token:
                try:
                    await opengym_app.async_invite_only(self.hass, self._slug)
                except opengym_app.AppError:  # paired all the same: the person switches it on by hand
                    persistent_notification.async_create(
                        self.hass, "openGym: switch on \"invite_only\" in the openGym app's settings",
                        title="ChallengeHouse", notification_id=f"{DOMAIN}_opengym_invite_only")
                self._link = f"{self._address}/{self._slug}"
                return await self._paired(token)
        return self.async_show_form(step_id="install_pair", errors=errors, data_schema=vol.Schema({
            (vol.Optional if skip else vol.Required)("code"): TextSelector(), **({vol.Optional("skip", default=False): bool} if skip else {})}))


class FitbridgeConfigFlow(_InstallSteps, config_entries.ConfigFlow, domain=DOMAIN):
    """Who takes part (HA users), each one's plan, phone and step sensor, a group for two, optionally openGym."""
    VERSION = 1
    MINOR_VERSION = 4  # 3: options without shadow and shoes; 4: people, group and start in the options (async_migrate_entry)
    _failed_menu = ["install", "pair", "skip"]

    def __init__(self) -> None:
        self._who: list[dict] = []  # per chosen user, in the order ticked: id, uid (HA user), name, then plan, phone, steps
        self._group = False
        self._url = self._token = None

    async def async_step_user(self, user_input=None):
        if self._async_current_entries():
            return self.async_abort(reason="single_instance_allowed")
        users, errors = await _ha_users(self.hass), {}
        if user_input is not None:
            if picked := user_input["users"]:
                names = [_user_name(await self.hass.auth.async_get_user(uid)) for uid in picked]
                self._who = [{"id": pid, "uid": uid, "name": name}
                             for pid, uid, name in zip(people.make_ids(names, taken=[GROUP]), picked, names)]
                return await self.async_step_person()
            errors["users"] = "no_people"
        options = [{"value": uid, "label": label} for uid, label in users.items()]
        return self.async_show_form(step_id="user", errors=errors, data_schema=vol.Schema({
            vol.Required("users", default=[]): SelectSelector(SelectSelectorConfig(multiple=True, options=options))}))

    async def async_step_person(self, user_input=None):
        """Asked once per chosen user."""
        who = next(w for w in self._who if "plan" not in w)
        if user_input is not None:
            who.update(user_input)
            if any("plan" not in w for w in self._who):
                return await self.async_step_person()
            return await (self.async_step_group() if len(self._who) == 2 else self.async_step_opengym())
        found = steps.candidates(self.hass, who["uid"])
        sensor = EntitySelector(EntitySelectorConfig(domain="sensor", **({"include_entities": found} if len(found) > 1 else {})))
        return self.async_show_form(step_id="person", description_placeholders={
            "name": who["name"], "warning": "" if webhooks.async_external(self.hass) else NO_EXTERNAL_URL}, data_schema=vol.Schema({
                vol.Required("plan", default="c25k"): _choice(PLANS),
                vol.Required("phone", default=PHONES[0]): _choice(PHONE_LABELS),
                vol.Optional("steps", description={"suggested_value": found[0] if len(found) == 1 else None}): sensor}))

    async def async_step_group(self, user_input=None):
        if user_input is not None:
            self._group = user_input["group"]
            return await self.async_step_opengym()
        return self.async_show_form(step_id="group", data_schema=_group_schema())

    async def async_step_opengym(self, user_input=None):
        return self.async_show_menu(step_id="opengym", menu_options=["skip", "pair", *(["install"] if opengym_app.available(self.hass) else [])])

    async def _paired(self, token: str):
        self._token = token
        return await self.async_step_gym_people()

    async def async_step_skip(self, user_input=None):
        self._url = self._token = self._link = None  # a failed pairing leaves no address behind
        return await self._create({}, {})

    async def async_step_pair(self, user_input=None):
        errors = {}
        if user_input is not None:
            if user_input.get("skip"):  # after a failed pairing: no gym tracking after all
                return await self.async_step_skip()
            self._url, self._token, errors = await _pair(self.hass, user_input)
            if self._token:
                return await self.async_step_gym_people()
        return self.async_show_form(step_id="pair", errors=errors, data_schema=self.add_suggested_values_to_schema(
            _pair_schema(setup=True), {OPT_OPENGYM_URL: (user_input or {}).get(OPT_OPENGYM_URL)}))

    async def async_step_gym_people(self, user_input=None):
        """Each person: no openGym, a new invite, or an account openGym already has."""
        labels = _labels({w["id"]: w["name"] for w in self._who})
        errors = {}
        if user_input is not None:
            picks = {w["id"]: user_input.get(labels[w["id"]]) for w in self._who}
            uids = {pid: pick for pid, pick in picks.items() if pick and pick != INVITE}
            if len(set(uids.values())) < len(uids):
                errors["base"] = "duplicate_gym_user"  # before any invite is made
            else:
                try:
                    invites = await gym.async_invites(self.hass, self._url, self._token,
                                                      {w["id"]: w["name"] for w in self._who if picks[w["id"]] == INVITE}, {})
                except gym.GymError:
                    errors["base"] = "invite_failed"
                else:
                    return await self._create(uids, invites)
        select = _gym_choice(await _gym_users(self.hass, self._url, self._token), False)
        return self.async_show_form(step_id="gym_people", errors=errors, data_schema=self.add_suggested_values_to_schema(
            vol.Schema({vol.Optional(label, default=""): select for label in labels.values()}), user_input or {}))

    async def _create(self, uids: dict[str, str], invites: dict[str, str]):
        await self.async_set_unique_id(DOMAIN)
        self._abort_if_unique_id_configured()  # a second setup flow that was open at the same time
        today = dt_util.now().date()
        options = {
            OPT_PEOPLE: {w["id"]: people.person(w["name"], w["plan"], today) for w in self._who},
            OPT_START: today.isoformat(),
            OPT_PHONES: {w["id"]: w["phone"] for w in self._who},
            OPT_VIEWERS: {w["uid"]: w["id"] for w in self._who},
            OPT_STEPS: {w["id"]: w["steps"] for w in self._who if w.get("steps")},
        }
        if self._group:
            options[OPT_GROUP] = {"name": GROUP, "members": [w["id"] for w in self._who]}
        if self._url:
            options[OPT_OPENGYM_URL] = self._url
        if self._link:
            options[OPT_OPENGYM_LINK] = self._link
        if uids:
            options[OPT_OPENGYM_UIDS] = uids
        if invites:
            options[OPT_INVITES] = invites
        return self.async_create_entry(title="ChallengeHouse", data={OPENGYM_TOKEN: self._token} if self._token else {}, options=options)

    @staticmethod
    @callback
    def async_get_options_flow(config_entry):
        return FitbridgeOptionsFlow()


class FitbridgeOptionsFlow(_InstallSteps, config_entries.OptionsFlowWithReload):
    """A menu: people (add one from an HA user, edit name, plan and phone), viewers (which fitbridge person each HA user is,
    nobody, "", meaning the read-only household view; then each person's phone step sensor), each person's webhook URL and
    watch folder, the openGym pairing (or installing the app), and each person's openGym user or invite."""
    _failed_menu = ["install", "opengym_pair"]
    _category = "options"

    def __init__(self) -> None:
        self._viewers: dict[str, str] = {}
        self._person: str | None = None
        self._added: dict = {}  # person_add's options, waiting for the group question

    async def async_step_init(self, user_input=None):
        if self.hass.data.get(DOMAIN) is None:
            return self.async_abort(reason="waiting_for_fitbridge")
        return self.async_show_menu(step_id="init", menu_options=["people", "viewers", "inputs", "opengym", "gym_people"])

    async def _names(self) -> dict[str, str]:
        """The people (viewers, step sensors, webhooks, folders and openGym users go by them) as person -> name: the
        options', or scoring.toml's until they are migrated. Empty while neither has any: those steps then wait."""
        known = self.config_entry.options.get(OPT_PEOPLE)
        return _names_of(known if known is not None else await self.hass.data[DOMAIN].runner.async_people())

    async def async_step_viewers(self, user_input=None):
        if not (names := await self._names()):
            return self.async_abort(reason="waiting_for_fitbridge")
        labels = await _ha_users(self.hass)
        if user_input is not None:
            self._viewers = {uid: user_input[label] for uid, label in labels.items() if user_input.get(label)}
            return await self.async_step_steps()
        viewers, select = self.config_entry.options.get(OPT_VIEWERS, {}), _choice({"": "Nobody", **names})
        return self.async_show_form(step_id="viewers", data_schema=vol.Schema({
            vol.Optional(label, default=viewers.get(uid) if viewers.get(uid) in names else ""): select
            for uid, label in labels.items()}))

    async def async_step_steps(self, user_input=None):
        labels = _labels(await self._names())
        if user_input is not None:
            sensors = {p: user_input[label] for p, label in labels.items() if user_input.get(label)}
            return self.async_create_entry(data={**self.config_entry.options, OPT_VIEWERS: self._viewers, OPT_STEPS: sensors})
        old = self.config_entry.options.get(OPT_STEPS, {})
        select = EntitySelector(EntitySelectorConfig(domain="sensor"))
        return self.async_show_form(step_id="steps", data_schema=vol.Schema({  # a suggestion, not a default: the field can be cleared
            vol.Optional(label, description={"suggested_value": old.get(p)}): select for p, label in labels.items()}))

    async def async_step_people(self, user_input=None):
        """Pick a person to edit, or add one."""
        options = self.config_entry.options
        if OPT_PEOPLE not in options and self.config_entry.minor_version < 4:  # the migration is pending: the file's people are not ours
            return self.async_abort(reason="people_not_migrated")
        if user_input is not None:
            if user_input["person"] == ADD:
                return await self.async_step_person_add()
            self._person = user_input["person"]
            return await self.async_step_person_edit()
        return self.async_show_form(step_id="people", data_schema=vol.Schema({
            vol.Required("person"): _choice({**_labels(_names_of(options.get(OPT_PEOPLE, {}))), ADD: "Add a person"})}))

    async def async_step_person_edit(self, user_input=None):
        """Name, plan and phone. A plan change is a new plan_history entry from today: the old ones stay."""
        options, pid = self.config_entry.options, self._person
        record, errors = options[OPT_PEOPLE][pid], {}
        if user_input is not None:
            name = user_input["name"].strip()
            if name:
                if user_input["plan"] != KEEP:
                    record = people.with_plan(record, user_input["plan"], dt_util.now().date())
                return self.async_create_entry(data={
                    **options, OPT_PEOPLE: {**options[OPT_PEOPLE], pid: {**record, "name": name}},
                    OPT_PHONES: {**options.get(OPT_PHONES, {}), pid: user_input["phone"]}})
            errors["name"] = "name_required"
        phone = options.get(OPT_PHONES, {}).get(pid)
        schema = vol.Schema({
            vol.Required("name"): TextSelector(),
            vol.Required("plan", default=KEEP): _choice({KEEP: "Keep the current plan", **PLANS}),
            vol.Required("phone", default=phone if phone in PHONES else PHONES[0]): _choice(PHONE_LABELS)})
        return self.async_show_form(step_id="person_edit", errors=errors, data_schema=self.add_suggested_values_to_schema(
            schema, user_input or {"name": record["name"]}))

    async def async_step_person_add(self, user_input=None):
        """A new person from an HA user who is nobody's viewer yet; the user becomes their viewer. The second person may
        make a group, as at first setup."""
        options = self.config_entry.options
        viewers, known = options.get(OPT_VIEWERS, {}), options.get(OPT_PEOPLE, {})
        free = await _ha_users(self.hass, skip={uid for uid, p in viewers.items() if p})
        if not free:
            return self.async_abort(reason="no_free_users")
        if user_input is not None:
            uid, today = user_input["user"], dt_util.now().date()
            name = _user_name(await self.hass.auth.async_get_user(uid))
            # never an id a retired person's webhook still has, nor the group's name
            (pid,) = people.make_ids([name], taken={*known, *self.config_entry.data.get(WEBHOOKS, {}), GROUP})
            known = {**known, pid: people.person(name, user_input["plan"], today)}
            self._added = {  # the start is there already, unless this is the first person (migrated without a scoring.toml)
                **options, OPT_PEOPLE: known, OPT_START: options.get(OPT_START, today.isoformat()),
                OPT_PHONES: {**options.get(OPT_PHONES, {}), pid: user_input["phone"]}, OPT_VIEWERS: {**viewers, uid: pid}}
            if len(known) == 2 and not options.get(OPT_GROUP):
                return await self.async_step_group()
            return self.async_create_entry(data=self._added)
        return self.async_show_form(step_id="person_add", data_schema=vol.Schema({
            vol.Required("user"): _choice(free),
            vol.Required("plan", default="c25k"): _choice(PLANS),
            vol.Required("phone", default=PHONES[0]): _choice(PHONE_LABELS)}))

    async def async_step_group(self, user_input=None):
        """After person_add made two people: the first setup's group question."""
        if user_input is not None:
            if user_input["group"]:
                self._added[OPT_GROUP] = {"name": GROUP, "members": list(self._added[OPT_PEOPLE])}
            return self.async_create_entry(data=self._added)
        return self.async_show_form(step_id="group", data_schema=_group_schema())

    async def async_step_opengym(self, user_input=None):
        """Pairing, or installing the app when there is a Supervisor to run it."""
        if opengym_app.available(self.hass):
            return self.async_show_menu(step_id="opengym", menu_options=["opengym_pair", "install"])
        return await self.async_step_opengym_pair()

    async def _paired(self, token: str):
        await self.hass.data[DOMAIN].runner.async_pair(token)
        options = {**self.config_entry.options, OPT_OPENGYM_URL: self._url, OPT_OPENGYM_LINK: self._link}
        if not self._link:
            options.pop(OPT_OPENGYM_LINK)  # paired by hand: an installed app's link is not this openGym's
        return self.async_create_entry(data=options)

    async def async_step_opengym_pair(self, user_input=None):
        """openGym's address and a pairing code from it, exchanged for the token (never logged)."""
        errors = {}
        if user_input is not None:
            self._url, token, errors = await _pair(self.hass, user_input)
            if token:
                self._link = None
                return await self._paired(token)
        return self.async_show_form(step_id="opengym_pair", errors=errors, data_schema=self.add_suggested_values_to_schema(
            _pair_schema(), {OPT_OPENGYM_URL: (user_input or {}).get(OPT_OPENGYM_URL) or self.config_entry.options.get(OPT_OPENGYM_URL)}))

    async def async_step_gym_people(self, user_input=None):
        """Each person's openGym user, from the paired openGym's user list, or an invite for one without an account."""
        options = self.config_entry.options
        url, token = options.get(OPT_OPENGYM_URL), self.config_entry.data.get(OPENGYM_TOKEN)
        if not url or not token:
            return self.async_abort(reason="not_paired")
        if not (names := await self._names()):
            return self.async_abort(reason="waiting_for_fitbridge")
        labels, open_invites, old, errors = _labels(names), options.get(OPT_INVITES, {}), options.get(OPT_OPENGYM_UIDS, {}), {}
        if user_input is not None:
            picks = {p: user_input.get(label) for p, label in labels.items()}
            uids = {p: pick for p, pick in picks.items() if pick and pick not in (INVITE, KEEP)}
            kept = {p for p in open_invites.keys() | old.keys() if picks.get(p, KEEP) == KEEP}  # what they have now stays
            if len(set(uids.values())) < len(uids):
                errors["base"] = "duplicate_gym_user"  # before any invite is made or withdrawn
            else:
                try:
                    made = await gym.async_invites(self.hass, url, token, {p: names[p] for p, pick in picks.items() if pick == INVITE},
                                                   {p: c for p, c in open_invites.items() if p not in kept})  # renewed or dropped
                except gym.GymError:
                    errors["base"] = "invite_failed"  # the options stay as they were
                else:
                    options = self.config_entry.options  # as they are now: a cycle may have linked a kept invite meanwhile
                    uids |= {p: u for p, u in options.get(OPT_OPENGYM_UIDS, {}).items() if p in kept and u not in uids.values()}
                    invites = {p: c for p, c in options.get(OPT_INVITES, {}).items() if p in kept} | made
                    data = {**options, OPT_OPENGYM_UIDS: uids}
                    data.pop(OPT_INVITES, None)
                    return self.async_create_entry(data={**data, **({OPT_INVITES: invites} if invites else {})})
        theirs, fields = await _gym_users(self.hass, url, token), {}
        for p, label in labels.items():
            users = theirs or ({old[p]: "Current openGym account"} if p in old else {})  # no list: an unchanged form changes nothing
            default = KEEP if p in open_invites else old.get(p) if old.get(p) in users else ""
            fields[vol.Optional(label, default=default)] = _gym_choice(users, p in open_invites)
        return self.async_show_form(step_id="gym_people", errors=errors, data_schema=self.add_suggested_values_to_schema(
            vol.Schema(fields), user_input or {}))

    async def async_step_inputs(self, user_input=None):
        """Each person's webhook URL (shown, can be replaced) and optional watch folder (must exist)."""
        if not (names := await self._names()):
            return self.async_abort(reason="waiting_for_fitbridge")
        labels, errors = _labels(names), {}
        if user_input is not None:
            folders = {p: f for p, label in labels.items() if (f := (user_input.get(label) or "").strip())}
            missing = await self.hass.async_add_executor_job(
                lambda: [p for p, f in folders.items() if not (Path(f).is_absolute() and Path(f).is_dir())])
            if not missing:
                if user_input.get(NEW_URLS):  # the old ids stop now; the reload below makes new ones
                    webhooks.async_unregister(self.hass, self.config_entry)
                    self.hass.config_entries.async_update_entry(self.config_entry, data={**self.config_entry.data, WEBHOOKS: {}})
                return self.async_create_entry(data={**self.config_entry.options, OPT_FOLDERS: folders})
            errors = {labels[p]: "folder_missing" for p in missing}
        hooks = self.config_entry.data.get(WEBHOOKS, {})
        urls = [f"- {label}: {webhooks.async_url(self.hass, hooks[p])}" for p, label in labels.items() if p in hooks]
        old = self.config_entry.options.get(OPT_FOLDERS, {})
        schema = vol.Schema({**{vol.Optional(label): TextSelector() for label in labels.values()},
                             vol.Optional(NEW_URLS, default=False): bool})
        return self.async_show_form(
            step_id="inputs", errors=errors, description_placeholders={"urls": "\n".join(urls)},
            data_schema=self.add_suggested_values_to_schema(schema, user_input or {labels[p]: f for p, f in old.items() if p in labels}))
