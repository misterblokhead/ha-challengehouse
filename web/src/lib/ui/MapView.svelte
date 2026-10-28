<script>
  import L from "leaflet";
  import { MAX_Z, TILE_TEMPLATE } from "../tiles.js";
  import { authedUrl } from "../authed.js";

  // tiles come through Home Assistant's login, so each <img> is filled from a signed fetch
  const SignedTiles = L.TileLayer.extend({
    createTile(coords, done) {
      const img = document.createElement("img");
      img.alt = "";
      L.DomEvent.on(img, "load", L.Util.bind(this._tileOnLoad, this, done, img));
      L.DomEvent.on(img, "error", L.Util.bind(this._tileOnError, this, done, img));
      authedUrl(this.getTileUrl(coords)).then((src) => (img.src = src), (e) => done(e, img));
      return img;
    },
  });

  // route: one [[lat, lon]] list per recorded segment (a pause is a gap, not a line); kind: the token its line wears ("run", "gym")
  let { route, kind, height = 220, label = "Route map" } = $props();
  let el = $state();

  $effect(() => {
    // Leaflet needs literal colours, so the tokens are read once, here
    const colour = getComputedStyle(el).getPropertyValue(`--${kind}`).trim();
    // on touch, a map that drags would trap the pop-up's vertical scroll, so it pans only after a tap (like the wheel)
    const coarse = matchMedia("(pointer: coarse)").matches;
    const map = L.map(el, { scrollWheelZoom: false, dragging: !coarse });
    map.attributionControl.setPrefix(false);
    new SignedTiles(TILE_TEMPLATE, {
      maxZoom: 19,
      // a new tab: a tap must not navigate the panel's frame away
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener">OpenStreetMap</a> contributors',
    }).addTo(map);

    const bounds = L.latLngBounds([]);
    for (const points of route) {
      L.polyline(points, { color: colour, weight: 4 }).addTo(map);
      bounds.extend(points);
    }
    // start: a filled dot; finish: the same with a white ring
    const ends = [route[0][0], route.at(-1).at(-1)];
    ends.forEach((p, i) => L.circleMarker(p, { radius: 6, fillColor: colour, fillOpacity: 1, color: "#fff", weight: i ? 2 : 0 }).addTo(map));
    if (bounds.isValid()) map.fitBounds(bounds, { padding: [16, 16], maxZoom: MAX_Z });

    // the wheel zooms only after a click or focus, so scrolling the pop-up past the map still works
    const activate = () => (map.scrollWheelZoom.enable(), map.dragging.enable());
    const wheelOff = () => map.scrollWheelZoom.disable(); // leaving with the mouse: the map stays active for the keyboard and touch
    const deactivate = () => (wheelOff(), coarse && map.dragging.disable());
    const listeners = [["click", activate], ["focus", activate], ["blur", deactivate], ["mouseleave", wheelOff]];
    for (const [type, fn] of listeners) el.addEventListener(type, fn, { passive: true });

    return () => {
      for (const [type, fn] of listeners) el.removeEventListener(type, fn);
      map.remove();
    };
  });
</script>

<div class="map" bind:this={el} style:height="{height}px" role="region" aria-label={label}></div>

<style>
  .map { border-radius: var(--radius-card); background: var(--fill); }
</style>
