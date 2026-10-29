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


def _labels(names: dict[str, str], tag=lambda k: k) -> dict[str, str]:
    """A field's label is its key: the name, made unique by tag(key) when two share one."""
    return {k: n if list(names.values()).count(n) == 1 else f"{n} ({tag(k)})" for k, n in names.items()}


def _choice(options: dict[str, str]) -> SelectSelector:
    return SelectSelector(SelectSelectorConfig(
        mode=SelectSelectorMode.DROPDOWN, options=[{"value": v, "label": n} for v, n in options.items()]))


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
            vol.Required("phone", default=PHONES[0]): _choice({"iphone": "iPhone", "android": "Android"}),
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
            uids, invites = {}, {}
            try:
                for w in self._who:
                    pick = user_input.get(labels[w["id"]])
                    if pick == "invite":
                        invites[w["id"]] = await gym.async_invite(self.hass, self._url, self._token, w["name"])
                    elif pick:
                        uids[w["id"]] = pick
            except gym.GymError:
                errors["base"] = "invite_failed"
            else:
                return await self._create(uids, invites)
        try:
            users = await gym.async_users(self.hass, self._url, self._token)
        except gym.GymError:
            users = []  # linking to an existing account can wait for Configure
        select = _choice({"": "Nobody", "invite": "Invite", **{u["id"]: str(u.get("name") or u["id"]) for u in users}})
        return self.async_show_form(step_id="gym_people", errors=errors, data_schema=vol.Schema({
            vol.Optional(label, default=""): select for label in labels.values()}))

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
    """A menu: viewers (which fitbridge person each HA user is, nobody, "", meaning the read-only household view; then
    each person's phone step sensor),
    the openGym pairing, each person's openGym user, and each person's webhook URL and watch folder."""

    async def async_step_init(self, user_input=None):
        data = self.hass.data.get(DOMAIN)
        if data is None or data.scores is None:
            return self.async_abort(reason="waiting_for_fitbridge")
        return self.async_show_menu(step_id="init", menu_options=["viewers", "opengym", "people", "inputs"])

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

    async def _people(self) -> dict[str, str]:
        """scoring.toml's people (webhooks, folders and openGym users go by them) as person -> field label."""
        people = await self.hass.data[DOMAIN].runner.async_people()
        return _labels({p: str(r.get("name") or p) for p, r in people.items()})

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

    async def async_step_people(self, user_input=None):
        """Each person's openGym user, from the paired openGym's user list."""
        url, token = self.config_entry.options.get(OPT_OPENGYM_URL), self.config_entry.data.get(OPENGYM_TOKEN)
        if not url or not token:
            return self.async_abort(reason="not_paired")
        labels = await self._people()
        if user_input is not None:
            uids = {p: user_input[label] for p, label in labels.items() if user_input.get(label)}
            return self.async_create_entry(data={**self.config_entry.options, OPT_OPENGYM_UIDS: uids})
        try:
            users = await gym.async_users(self.hass, url, token)
        except gym.GymError:
            return self.async_abort(reason="cannot_connect")
        names = {"": "Nobody", **{u["id"]: str(u.get("name") or u["id"]) for u in users}}
        old, offered, select = self.config_entry.options.get(OPT_OPENGYM_UIDS, {}), names.keys(), _choice(names)
        return self.async_show_form(step_id="people", data_schema=vol.Schema({
            vol.Optional(label, default=old.get(p) if old.get(p) in offered else ""): select for p, label in labels.items()}))

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

