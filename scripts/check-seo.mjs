import assert from "node:assert/strict";
import { readFile, access } from "node:fs/promises";
import path from "node:path";
import { site, pages, redirects } from "../site.config.mjs";
import { projectsFrom, absolute, escape } from "./seo.mjs";

const root = process.cwd(),
  dist = path.join(root, "dist");
const projects = await projectsFrom(root);
const titles = new Set(),
  descriptions = new Set();
const builtPages = new Map();
for (const page of pages) {
  const html = await readFile(path.join(dist, page.file), "utf8");
  builtPages.set(page.path, html);
  assert(html.includes('data-preview="false"'), `${page.path}: production flag`);
  assert(html.includes('content="index,follow,max-image-preview:large"'), `${page.path}: indexable`);
  assert(!html.includes('content="noindex'), `${page.path}: unexpected noindex`);
  assert.equal((html.match(/<h1\b/g) || []).length, 1, `${page.path}: one H1`);
  assert.equal((html.match(/rel="canonical"/g) || []).length, 1, `${page.path}: one canonical`);
  assert(html.includes(`<link rel="canonical" href="${absolute(page.path)}"`));
  assert(html.includes(`<title>${escape(page.title)}</title>`));
  titles.add(page.title);
  assert(html.includes(`name="description" content="${escape(page.description)}"`));
  descriptions.add(page.description);
  assert(
    page.description.length >= 100 && page.description.length <= 190,
    `${page.path}: description length`,
  );
  assert(html.includes(`property="og:url" content="${absolute(page.path)}"`));
  const schemas = [...html.matchAll(/<script\b[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)];
  assert.equal(schemas.length, 1, `${page.path}: JSON-LD graph`);
  const schema = JSON.parse(schemas[0][1]);
  assert.equal(schema["@context"], "https://schema.org");
  assert(schema["@graph"].some((node) => node["@type"] === "LocalBusiness" && node.url === absolute("/")));
  if (page.path !== "/") assert(schema["@graph"].some((node) => node["@type"] === "BreadcrumbList"));
  if (page.path === "/projekty/")
    assert.equal(
      schema["@graph"].find((node) => node["@type"] === "ItemList").numberOfItems,
      projects.length,
    );
  assert(!/github\.io|chatgpt\.site/.test(html), `${page.path}: preview host in production`);
  assert(!/ProfessionalService|aggregateRating/.test(schemas[0][1]), `${page.path}: unsupported claims`);
  const assets = [...html.matchAll(/assets\/[A-Za-z0-9_./%-]+\.(?:avif|webp|png|jpe?g|svg|ttf|woff2?)/gi)];
  for (const [asset] of assets) await access(path.join(dist, asset));
  const preview = await readFile(path.join(root, page.file), "utf8");
  assert(preview.includes('content="noindex,follow"'), `${page.path}: preview excluded from search`);
  console.log(`PASS SEO ${page.path}`);
}
assert.equal(titles.size, pages.length);
assert.equal(descriptions.size, pages.length);
const sitemap = await readFile(path.join(dist, "sitemap.xml"), "utf8");
const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
assert.deepEqual(
  urls,
  pages.map((page) => absolute(page.path)),
);
assert(!sitemap.includes("?projekt=") && !sitemap.includes("podglad-projektow"));
const images = [...sitemap.matchAll(/<image:loc>([^<]+)<\/image:loc>/g)].map((m) => new URL(m[1]));
for (const image of images) {
  assert.equal(image.origin, site.origin);
  await access(path.join(dist, image.pathname));
}
assert.equal(new Set(images.map((url) => url.href)).size, images.length);
assert.equal(images.length, projects.reduce((sum, project) => sum + project.images.length, 0) + 2);
const robots = await readFile(path.join(dist, "robots.txt"), "utf8");
assert(robots.includes(`Sitemap: ${absolute("/sitemap.xml")}`));
assert(!/^Disallow:\s*\/$/m.test(robots));
const apache = await readFile(path.join(dist, ".htaccess"), "utf8");
for (const { from, to } of redirects) {
  const target = new URL(to, site.origin),
    html = builtPages.get(target.pathname);
  assert(html, `Redirect target missing: ${to}`);
  if (target.hash) assert(html.includes(`id="${target.hash.slice(1)}"`), `Redirect anchor missing: ${to}`);
  assert(apache.includes(absolute(to)), `Apache redirect missing: ${from}`);
  const alias = await readFile(path.join(dist, from.slice(1), "index.html"), "utf8");
  assert(alias.includes('http-equiv="refresh"'));
  assert(alias.includes('content="noindex,follow"'));
}
await assert.rejects(access(path.join(dist, "podglad-projektow")));
await assert.rejects(access(path.join(dist, "assets/previews")));
const fourOhFour = await readFile(path.join(dist, "404.html"), "utf8");
assert(fourOhFour.includes('content="noindex,follow"'));
console.log(
  `PASS sitemap (${urls.length} pages, ${images.length} images), robots, redirects and production-only assets`,
);
