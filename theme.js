"use strict";

const requestedPalette = new URLSearchParams(window.location.search).get("paleta");
const availablePalettes = ["atrament", "cegla", "ocean"];
document.documentElement.dataset.palette = availablePalettes.includes(requestedPalette)
  ? requestedPalette
  : "ocean";
