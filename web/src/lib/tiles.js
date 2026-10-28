// Home Assistant's own tile proxy, so the page never asks an outside host; Leaflet fills the {z}/{x}/{y} itself (see authed.js)
export const TILE_TEMPLATE = "/api/map_tiles/raster/{z}/{x}/{y}.png";
export const MAX_Z = 17;
