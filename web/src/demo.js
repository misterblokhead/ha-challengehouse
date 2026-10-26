import { mountApp } from "./main.js";

// `npm run dev` without Home Assistant: the OS's light/dark stands in for HA's (panel.js), and api.js reads demo-scores.json
const dark = matchMedia("(prefers-color-scheme: dark)");
const theme = () => (document.documentElement.dataset.theme = dark.matches ? "dark" : "light");
theme();
dark.addEventListener("change", theme);
mountApp(document.getElementById("app"));
