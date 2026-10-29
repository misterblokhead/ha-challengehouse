from pathlib import Path

import voluptuous as vol
from homeassistant import config_entries
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
from homeassistant.util import dt as dt_util

from . import gym, people, steps, webhooks
from .const import (
    DOMAIN,
    OPENGYM_TOKEN,
    OPT_FOLDERS,
    OPT_GROUP,
    OPT_INVITES,
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

NEW_URLS = "new_urls"
ADD = "+"  # the People step's pick for a new person; not an id (ids are ^[a-z0-9_]+$)
KEEP = "keep"  # a plan or an open invite left as it is
INVITE = "invite"
PHONE_LABELS = {"iphone": "iPhone", "android": "Android"}


def _labels(names: dict[str, str], tag=lambda k: k) -> dict[str, str]:
    """A field's label is its key: the name, made unique by tag(key) when two share one."""
    return {k: n if list(names.values()).count(n) == 1 else f"{n} ({tag(k)})" for k, n in names.items()}


def _choice(options: dict[str, str]) -> SelectSelector:
    return SelectSelector(SelectSelectorConfig(
        mode=SelectSelectorMode.DROPDOWN, options=[{"value": v, "label": n} for v, n in options.items()]))


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


def _pair_schema() -> vol.Schema:
    return vol.Schema({vol.Required(OPT_OPENGYM_URL): TextSelector(TextSelectorConfig(type=TextSelectorType.URL)),
                       vol.Required("code"): TextSelector()})


async def _pair(hass: HomeAssistant, user_input: dict) -> tuple[str, str | None, dict]:
    """(address, token, errors) of a pairing form; the token is None when openGym did not give one."""
    url, code = gym.normalize_url(user_input[OPT_OPENGYM_URL]), user_input["code"].strip()
    if not gym.CODE.fullmatch(code):
        return url, None, {"code": "invalid_code"}
    try:
        return url, await gym.async_redeem(hass, url, code), {}
    except gym.GymError as err:
        return url, None, {"base": err.reason}


class FitbridgeConfigFlow(config_entries.ConfigFlow, domain=DOMAIN):
    """Who takes part (HA users), each one's plan, phone and step sensor, a group for two, optionally openGym."""
    VERSION = 1
    MINOR_VERSION = 4  # 3: options without shadow and shoes; 4: people, group and start in the options (async_migrate_entry)

    def __init__(self) -> None:
        self._who: list[dict] = []  # per chosen user, in the order ticked: id, uid (HA user), name, then plan, phone, steps
        self._group = False
        self._url = self._token = None

    async def async_step_user(self, user_input=None):
        if self._async_current_entries():
            return self.async_abort(reason="single_instance_allowed")
        users = {u.id: u.name or u.id[:6] for u in await self.hass.auth.async_get_users() if u.is_active and not u.system_generated}
        errors = {}
        if user_input is not None:
            if user_input["users"]:
                names = [users[uid] for uid in user_input["users"]]
                self._who = [{"id": pid, "uid": uid, "name": name}
                             for pid, uid, name in zip(people.make_ids(names), user_input["users"], names)]
                return await self.async_step_person()
            errors["users"] = "no_people"
        options = [{"value": uid, "label": label} for uid, label in _labels(users, lambda uid: uid[:6]).items()]
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
        return self.async_show_form(step_id="person", description_placeholders={"name": who["name"]}, data_schema=vol.Schema({
            vol.Required("plan", default="c25k"): _choice({"c25k": "Couch to 5K, starting today", "none": "No plan"}),
            vol.Required("phone", default=PHONES[0]): _choice(PHONE_LABELS),
            vol.Optional("steps", description={"suggested_value": found[0] if len(found) == 1 else None}): sensor}))

    async def async_step_group(self, user_input=None):
        if user_input is not None:
            self._group = user_input["group"]
            return await self.async_step_opengym()
        return self.async_show_form(step_id="group", data_schema=vol.Schema({vol.Optional("group", default=True): bool}))

    async def async_step_opengym(self, user_input=None):
        return self.async_show_menu(step_id="opengym", menu_options=["skip", "pair"])

    async def async_step_skip(self, user_input=None):
        return await self._create({}, {})

    async def async_step_pair(self, user_input=None):
        errors = {}
        if user_input is not None:
            self._url, self._token, errors = await _pair(self.hass, user_input)
            if self._token:
                return await self.async_step_gym_people()
        return self.async_show_form(step_id="pair", errors=errors, data_schema=self.add_suggested_values_to_schema(
            _pair_schema(), {OPT_OPENGYM_URL: (user_input or {}).get(OPT_OPENGYM_URL)}))

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
        today = dt_util.now().date()
        options = {
            OPT_PEOPLE: {w["id"]: people.person(w["name"], None if w["plan"] == "none" else w["plan"], today) for w in self._who},
            OPT_START: today.isoformat(),
            OPT_PHONES: {w["id"]: w["phone"] for w in self._who},
            OPT_VIEWERS: {w["uid"]: w["id"] for w in self._who},
            OPT_STEPS: {w["id"]: w["steps"] for w in self._who if w.get("steps")},
        }
        if self._group:
            options[OPT_GROUP] = {"name": "couple", "members": [w["id"] for w in self._who]}
        if self._url:
            options[OPT_OPENGYM_URL] = self._url
        if uids:
            options[OPT_OPENGYM_UIDS] = uids
        if invites:
            options[OPT_INVITES] = invites
        await self.async_set_unique_id(DOMAIN)
        return self.async_create_entry(title="ChallengeHouse", data={OPENGYM_TOKEN: self._token} if self._token else {}, options=options)

    @staticmethod
    @callback
    def async_get_options_flow(config_entry):
        return FitbridgeOptionsFlow()


class FitbridgeOptionsFlow(config_entries.OptionsFlowWithReload):
    """A menu: people (add one from an HA user, edit name, plan and phone), viewers (which fitbridge person each HA user is,
    nobody, "", meaning the read-only household view; then each person's phone step sensor), each person's webhook URL and
    watch folder, the openGym pairing, and each person's openGym user or invite."""

    async def async_step_init(self, user_input=None):
        data = self.hass.data.get(DOMAIN)
        if data is None or data.scores is None:
            return self.async_abort(reason="waiting_for_fitbridge")
        return self.async_show_menu(step_id="init", menu_options=["people", "viewers", "inputs", "opengym", "gym_people"])

    async def async_step_viewers(self, user_input=None):
        data = self.hass.data[DOMAIN]
        users = [u for u in await self.hass.auth.async_get_users() if u.is_active and not u.system_generated]
        labels = _labels({u.id: u.name or u.id[:6] for u in users}, lambda uid: uid[:6])  # a user may have no name
        if user_input is not None:
            self._viewers = {uid: user_input[label] for uid, label in labels.items() if user_input.get(label)}
            return await self.async_step_steps()
        people = data.scores["people"]
        viewers = self.config_entry.options.get(OPT_VIEWERS, {})
        select = SelectSelector(SelectSelectorConfig(mode=SelectSelectorMode.DROPDOWN, options=[
            {"value": "", "label": "Nobody"}, *({"value": p, "label": str(r.get("name") or p)} for p, r in people.items())]))
        return self.async_show_form(step_id="viewers", data_schema=vol.Schema({
            vol.Optional(label, default=viewers.get(uid) if viewers.get(uid) in people else ""): select
            for uid, label in labels.items()}))

    async def async_step_steps(self, user_input=None):
        people = self.hass.data[DOMAIN].scores["people"]
        labels = _labels({p: str(r.get("name") or p) for p, r in people.items()})
        if user_input is not None:
            steps = {p: user_input[label] for p, label in labels.items() if user_input.get(label)}
            return self.async_create_entry(data={**self.config_entry.options, OPT_VIEWERS: self._viewers, OPT_STEPS: steps})
        old = self.config_entry.options.get(OPT_STEPS, {})
        select = EntitySelector(EntitySelectorConfig(domain="sensor"))
        return self.async_show_form(step_id="steps", data_schema=vol.Schema({  # a suggestion, not a default: the field can be cleared
            vol.Optional(label, description={"suggested_value": old.get(p)}): select for p, label in labels.items()}))

    async def _names(self) -> dict[str, str]:
        """The people (webhooks, folders and openGym users go by them) as person -> name."""
        people = await self.hass.data[DOMAIN].runner.async_people()
        return {p: str(r.get("name") or p) for p, r in people.items()}

    async def _people(self) -> dict[str, str]:
        """The people as person -> field label."""
        return _labels(await self._names())

    async def async_step_people(self, user_input=None):
        """Pick a person to edit, or add one."""
        if OPT_PEOPLE not in self.config_entry.options:  # the migration could not read scoring.toml: its people are not ours to rewrite
            return self.async_abort(reason="people_not_migrated")
        if user_input is not None:
            if user_input["person"] == ADD:
                return await self.async_step_person_add()
            self._person = user_input["person"]
            return await self.async_step_person_edit()
        return self.async_show_form(step_id="people", data_schema=vol.Schema({
            vol.Required("person"): _choice({**await self._people(), ADD: "Add a person"})}))

    async def async_step_person_edit(self, user_input=None):
        """Name, plan and phone. A plan change is a new plan_history entry from today: the old ones stay."""
        options, pid = self.config_entry.options, self._person
        record, errors = options[OPT_PEOPLE][pid], {}
        if user_input is not None:
            name = user_input["name"].strip()
            if name:
                history = record.get("plan_history", [])
                if user_input["plan"] != KEEP:
                    history = [*history, {"plan": None if user_input["plan"] == "none" else user_input["plan"],
                                          "from": dt_util.now().date().isoformat()}]
                return self.async_create_entry(data={
                    **options, OPT_PEOPLE: {**options[OPT_PEOPLE], pid: {**record, "name": name, "plan_history": history}},
                    OPT_PHONES: {**options.get(OPT_PHONES, {}), pid: user_input["phone"]}})
            errors["name"] = "name_required"
        phone = options.get(OPT_PHONES, {}).get(pid)
        schema = vol.Schema({
            vol.Required("name"): TextSelector(),
            vol.Required("plan", default=KEEP): _choice({KEEP: "Keep the current plan", "c25k": "Couch to 5K, starting today", "none": "No plan from today"}),
            vol.Required("phone", default=phone if phone in PHONES else PHONES[0]): _choice(PHONE_LABELS)})
        return self.async_show_form(step_id="person_edit", errors=errors, data_schema=self.add_suggested_values_to_schema(
            schema, user_input or {"name": record["name"]}))

    async def async_step_person_add(self, user_input=None):
        """A new person from an HA user who is nobody's viewer yet; the user becomes their viewer."""
        options = self.config_entry.options
        viewers, known = options.get(OPT_VIEWERS, {}), options.get(OPT_PEOPLE, {})
        free = {u.id: u.name or u.id[:6] for u in await self.hass.auth.async_get_users()
                if u.is_active and not u.system_generated and not viewers.get(u.id)}
        if not free:
            return self.async_abort(reason="no_free_users")
        if user_input is not None:
            uid, today = user_input["user"], dt_util.now().date()
            (pid,) = people.make_ids([free[uid]], taken=known)
            plan = None if user_input["plan"] == "none" else user_input["plan"]
            return self.async_create_entry(data={
                **options, OPT_PEOPLE: {**known, pid: people.person(free[uid], plan, today)}, OPT_START: options.get(OPT_START, today.isoformat()),
                OPT_PHONES: {**options.get(OPT_PHONES, {}), pid: user_input["phone"]}, OPT_VIEWERS: {**viewers, uid: pid}})
        return self.async_show_form(step_id="person_add", data_schema=vol.Schema({
            vol.Required("user"): _choice(_labels(free, lambda uid: uid[:6])),
            vol.Required("plan", default="c25k"): _choice({"c25k": "Couch to 5K, starting today", "none": "No plan"}),
            vol.Required("phone", default=PHONES[0]): _choice(PHONE_LABELS)}))

    async def async_step_opengym(self, user_input=None):
        """openGym's address and a pairing code from it, exchanged for the token (never logged)."""
        errors = {}
        if user_input is not None:
            url, token, errors = await _pair(self.hass, user_input)
            if token:
                await self.hass.data[DOMAIN].runner.async_pair(token)
                return self.async_create_entry(data={**self.config_entry.options, OPT_OPENGYM_URL: url})
        return self.async_show_form(step_id="opengym", errors=errors, data_schema=self.add_suggested_values_to_schema(
            _pair_schema(), {OPT_OPENGYM_URL: (user_input or {}).get(OPT_OPENGYM_URL) or self.config_entry.options.get(OPT_OPENGYM_URL)}))

    async def async_step_gym_people(self, user_input=None):
        """Each person's openGym user, from the paired openGym's user list, or an invite for one without an account."""
        options = self.config_entry.options
        url, token = options.get(OPT_OPENGYM_URL), self.config_entry.data.get(OPENGYM_TOKEN)
        if not url or not token:
            return self.async_abort(reason="not_paired")
        names = await self._names()
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
        labels = await self._people()
        errors = {}
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

