import { mkdir, cp, writeFile, readFile, rm } from "node:fs/promises";
import path from "node:path";
import { site, pages, redirects } from "./site.config.mjs";
import {
  applySeo,
  projectsFrom,
  versionsFrom,
  sitemapFor,
  robotsFor,
  apacheConfig,
  redirectPage,
  notFoundPage,
} from "./scripts/seo.mjs";
const root = process.cwd();
const production = !process.argv.includes("--preview");
const dist = path.resolve(root, production ? "dist" : "dist-preview");
if (path.dirname(dist) !== root || !["dist", "dist-preview"].includes(path.basename(dist)))
  throw new Error("Invalid build directory");
await rm(dist, { recursive: true, force: true });
await mkdir(dist, { recursive: true });
const projects = await projectsFrom(root),
  versions = await versionsFrom(root);
const files = ["styles.css", "subpages.css", "motion.css", "app.js", "motion.js", "theme.js", "portfolio.js"];
const texts = [];
for (const page of pages) {
  const html = applySeo(
    await readFile(path.join(root, page.file), "utf8"),
    page,
    projects,
    versions,
    production,
  );
  await mkdir(path.dirname(path.join(dist, page.file)), { recursive: true });
  await writeFile(path.join(dist, page.file), html);
  texts.push(html);
}
for (const file of files) {
  await cp(path.join(root, file), path.join(dist, file));
  texts.push(await readFile(path.join(root, file), "utf8"));
}
// Export referenced assets; archived concepts and review screenshots stay out of production.
const assets = new Set(
  texts.flatMap((text) =>
    [...text.matchAll(/assets\/[A-Za-z0-9_./%-]+\.(?:avif|webp|png|jpe?g|svg|ttf|woff2?)/gi)].map(
      (match) => match[0],
    ),
  ),
);
for (const asset of assets) {
  const source = path.resolve(root, asset);
  if (!source.startsWith(path.join(root, "assets") + path.sep)) throw new Error("Invalid asset path");
  await mkdir(path.dirname(path.join(dist, asset)), { recursive: true });
  await cp(source, path.join(dist, asset));
}
await cp(path.join(root, "assets/fonts/OFL.txt"), path.join(dist, "assets/fonts/OFL.txt"));
await writeFile(path.join(dist, "robots.txt"), robotsFor());
await writeFile(path.join(dist, "sitemap.xml"), sitemapFor(projects));
await writeFile(path.join(dist, "404.html"), notFoundPage());
if (production) {
  await writeFile(path.join(dist, ".htaccess"), apacheConfig());
  await writeFile(
    path.join(dist, "redirects.json"),
    JSON.stringify(
      redirects.map(({ from, to }) => ({ from, to: new URL(to, site.origin).href, status: 301 })),
      null,
      2,
    ),
  );
  for (const { from, to } of redirects) {
    const folder = path.join(dist, from.slice(1));
    await mkdir(folder, { recursive: true });
    await writeFile(path.join(folder, "index.html"), redirectPage(to));
  }
}
console.log(
  `Built ${production ? "production" : "preview"} website in ${path.basename(dist)}/ — ${pages.length} pages, ${projects.length} projects, ${assets.size} referenced assets; canonical origin ${site.origin}`,
);
