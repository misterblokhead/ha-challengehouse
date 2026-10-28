// The lazy part of the workout pop-up (loadViz in WorkoutDialog): Leaflet and uPlot with their CSS, fetched only when a pop-up opens,
// so the panel and the kiosk do not load them up front. The CSS comes as text and is added once, here.
import leaflet from "leaflet/dist/leaflet.css?inline";
import uplot from "uplot/dist/uPlot.min.css?inline";

document.head.append(Object.assign(document.createElement("style"), { textContent: leaflet + uplot }));

export { default as MapView } from "./ui/MapView.svelte";
export { default as Chart } from "./Chart.svelte";
