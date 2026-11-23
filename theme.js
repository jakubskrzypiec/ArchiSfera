"use strict";

const requestedPalette =
  document.documentElement.dataset.preview === "true"
    ? new URLSearchParams(window.location.search).get("paleta")
    : "coral";
const availablePalettes = ["atrament", "cegla", "ocean", "coral"];
document.documentElement.dataset.palette = availablePalettes.includes(requestedPalette)
  ? requestedPalette
  : "coral";
