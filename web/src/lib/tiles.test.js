import test from "node:test";
import assert from "node:assert/strict";
import { TILE_TEMPLATE } from "./tiles.js";

test("tiles come from Home Assistant's own proxy, so the page asks Home Assistant", () => {
  assert.equal(TILE_TEMPLATE, "/api/map_tiles/raster/{z}/{x}/{y}.png"); // the one the map layer uses
});
