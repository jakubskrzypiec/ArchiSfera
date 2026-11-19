"use strict";

const requestedPalette = new URLSearchParams(window.location.search).get("paleta");
document.documentElement.dataset.palette = requestedPalette === "cegla" ? "cegla" : "atrament";
