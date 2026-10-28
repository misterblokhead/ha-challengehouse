from conftest import SCORES
from homeassistant import config_entries
from homeassistant.data_entry_flow import FlowResultType
from pytest_homeassistant_custom_component.common import MockUser

from custom_components.fitbridge.const import DOMAIN, OPT_SHADOW, OPT_SHOES, OPT_STEPS, OPT_VIEWERS


async def test_one_empty_step_creates_the_only_entry(hass, enable_custom_integrations, mqtt_mock):
    result = await hass.config_entries.flow.async_init(DOMAIN, context={"source": config_entries.SOURCE_USER})
    assert result["type"] is FlowResultType.FORM and result["step_id"] == "user"
    result = await hass.config_entries.flow.async_configure(result["flow_id"], {})
    assert result["type"] is FlowResultType.CREATE_ENTRY and result["data"] == {}
    assert result["result"].unique_id == DOMAIN
    assert result["result"].options == {OPT_SHADOW: False} and result["result"].minor_version == 2  # a new install is live
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
    assert result["type"] is FlowResultType.FORM and result["step_id"] == "shoes"
    assert sorted(str(k) for k in result["data_schema"].schema) == ["Alex", "Sam"]  # the payload's people, by name
    result = await hass.config_entries.options.async_configure(result["flow_id"], {})
    assert result["type"] is FlowResultType.FORM and result["step_id"] == "steps"  # no shoes: no limits step, still steps
    result = await hass.config_entries.options.async_configure(result["flow_id"], {})
    assert result["type"] is FlowResultType.CREATE_ENTRY
    assert entry.options == {OPT_SHADOW: True,  # options the flow does not show are kept
                             OPT_VIEWERS: {alex.id: "p1", twins[1].id: "p2"}, OPT_SHOES: {}, OPT_STEPS: {}}
    assert sam.id not in entry.options[OPT_VIEWERS]


async def test_options_shoes_and_their_limits(hass, entry, send):
    await send(SCORES)
    hass.states.async_set("sensor.trail", "12.0", {"nickname": "Trail"})
    hass.states.async_set("sensor.road", "3.0", {"nickname": "Trail"})  # same nickname: labels get the entity id
    hass.states.async_set("sensor.nike", "0.0", {"friendly_name": "Nike Distance"})
    hass.config_entries.async_update_entry(entry, options={OPT_VIEWERS: {}, OPT_SHOES: {"p1": {"sensor.trail": 800}}})
    result = await hass.config_entries.options.async_init(entry.entry_id)
    result = await hass.config_entries.options.async_configure(result["flow_id"], {})
    defaults = {str(k): k.default() for k in result["data_schema"].schema}
    assert defaults == {"Alex": ["sensor.trail"], "Sam": []}  # earlier choices are kept
    result = await hass.config_entries.options.async_configure(
        result["flow_id"], {"Alex": ["sensor.trail", "sensor.road"], "Sam": ["sensor.nike"]})
    assert result["type"] is FlowResultType.FORM and result["step_id"] == "limits"
    defaults = {str(k): k.default() for k in result["data_schema"].schema}
    assert defaults == {"Trail (sensor.trail)": 800, "Trail (sensor.road)": 700, "Nike Distance": 700}
    result = await hass.config_entries.options.async_configure(
        result["flow_id"], {"Trail (sensor.trail)": 800, "Trail (sensor.road)": 650, "Nike Distance": 700})
    assert result["type"] is FlowResultType.FORM and result["step_id"] == "steps"
    result = await hass.config_entries.options.async_configure(result["flow_id"], {})
    assert result["type"] is FlowResultType.CREATE_ENTRY
    assert entry.options[OPT_SHOES] == {"p1": {"sensor.trail": 800, "sensor.road": 650}, "p2": {"sensor.nike": 700}}


async def test_options_step_sensors_after_shoes(hass, entry, send):
    await send(SCORES)
    hass.config_entries.async_update_entry(entry, options={OPT_VIEWERS: {}, OPT_STEPS: {"p2": "sensor.old_steps"}})
    result = await hass.config_entries.options.async_init(entry.entry_id)
    result = await hass.config_entries.options.async_configure(result["flow_id"], {})
    result = await hass.config_entries.options.async_configure(result["flow_id"], {})
    assert result["type"] is FlowResultType.FORM and result["step_id"] == "steps"
    assert {str(k): k.description for k in result["data_schema"].schema} == {
        "Alex": {"suggested_value": None}, "Sam": {"suggested_value": "sensor.old_steps"}}  # earlier choices are kept, and can be cleared
    result = await hass.config_entries.options.async_configure(result["flow_id"], {"Alex": "sensor.phone_steps"})
    assert result["type"] is FlowResultType.CREATE_ENTRY
    assert entry.options[OPT_STEPS] == {"p1": "sensor.phone_steps"}
