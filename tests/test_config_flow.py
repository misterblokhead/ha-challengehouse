from conftest import SCORES
from homeassistant import config_entries
from homeassistant.data_entry_flow import FlowResultType
from pytest_homeassistant_custom_component.common import MockUser

from custom_components.fitbridge.const import DOMAIN, OPT_VIEWERS


async def test_one_empty_step_creates_the_only_entry(hass, enable_custom_integrations, mqtt_mock):
    result = await hass.config_entries.flow.async_init(DOMAIN, context={"source": config_entries.SOURCE_USER})
    assert result["type"] is FlowResultType.FORM and result["step_id"] == "user"
    result = await hass.config_entries.flow.async_configure(result["flow_id"], {})
    assert result["type"] is FlowResultType.CREATE_ENTRY and result["data"] == {}
    assert result["result"].unique_id == DOMAIN
    await hass.async_block_till_done()
    again = await hass.config_entries.flow.async_init(DOMAIN, context={"source": config_entries.SOURCE_USER})
    assert again["type"] is FlowResultType.ABORT and again["reason"] == "single_instance_allowed"


async def test_options_wait_for_fitbridge(hass, entry):
    result = await hass.config_entries.options.async_init(entry.entry_id)
    assert result["type"] is FlowResultType.ABORT and result["reason"] == "waiting_for_fitbridge"


async def test_options_map_users_to_people(hass, entry, send):
    await send(SCORES)
    alex, sam = MockUser(name="Alex").add_to_hass(hass), MockUser(name="Sam").add_to_hass(hass)
    twins = MockUser(id="aaaaaa01", name="Robin").add_to_hass(hass), MockUser(id="bbbbbb02", name="Robin").add_to_hass(hass)
    MockUser(id="cccccc03", name=None).add_to_hass(hass)  # a user without a name is labelled by its id
    MockUser(name="Gone", is_active=False).add_to_hass(hass)
    MockUser(name="Bot", system_generated=True).add_to_hass(hass)
    result = await hass.config_entries.options.async_init(entry.entry_id)
    assert result["type"] is FlowResultType.FORM
    fields = [str(k) for k in result["data_schema"].schema]
    assert sorted(fields) == ["Alex", "Robin (aaaaaa)", "Robin (bbbbbb)", "Sam", "cccccc"]
    result = await hass.config_entries.options.async_configure(
        result["flow_id"], {"Alex": "p1", "Sam": "", "Robin (bbbbbb)": "p2"})
    assert result["type"] is FlowResultType.CREATE_ENTRY
    assert entry.options == {OPT_VIEWERS: {alex.id: "p1", twins[1].id: "p2"}}
    assert sam.id not in entry.options[OPT_VIEWERS]
