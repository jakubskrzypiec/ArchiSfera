import { mkdir, cp, writeFile, readFile, rm } from "node:fs/promises";
import path from "node:path";
const root = process.cwd();
const dist = path.join(root, "dist");
if (path.dirname(dist) !== root) throw new Error("Invalid build directory");
await rm(dist, { recursive: true, force: true });
await mkdir(dist, { recursive: true });
for (const name of [
  "index.html",
  "projekty",
  "oferta",
  "kontakt",
  "podglad-projektow",
  "styles.css",
  "subpages.css",
  "app.js",
  "motion.css",
  "motion.js",
  "theme.js",
  "portfolio.js",
  "assets",
])
  await cp(name, path.join(dist, name), { recursive: true });
console.log("Built static website in dist/");
