import { readFile, writeFile } from "node:fs/promises";
import { createHash } from "node:crypto";
import vm from "node:vm";
import path from "node:path";
import { site, pages, redirects } from "../site.config.mjs";

export const escape = (text) =>
  String(text)
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
export const absolute = (value) => new URL(value, site.origin + "/").href;
export async function projectsFrom(root) {
  const context = { window: {} };
  vm.runInNewContext(await readFile(path.join(root, "portfolio.js"), "utf8"), context);
  return context.window.archisferaProjects;
}
export async function versionsFrom(root) {
  const names = [
    "styles.css",
    "subpages.css",
    "app.js",
    "motion.css",
    "motion.js",
    "theme.js",
    "portfolio.js",
  ];
  return Object.fromEntries(
    await Promise.all(
      names.map(async (name) => [
        name,
        createHash("sha256")
          .update(await readFile(path.join(root, name)))
          .digest("hex")
          .slice(0, 10),
      ]),
    ),
  );
}
function graphFor(page, projects) {
  const home = absolute("/"),
    canonical = absolute(page.path),
    businessId = home + "#pracownia";
  const graph = [
    {
      "@type": "LocalBusiness",
      "@id": businessId,
      name: site.business.name,
      description:
        "Autorska pracownia architektoniczna Kamili Chęcielewskiej. Projekty koncepcyjne, budowlane wielobranżowe i technologiczne.",
      url: home,
      telephone: site.business.telephone,
      email: site.business.email,
      logo: { "@type": "ImageObject", url: absolute("assets/archisfera-logo.png"), width: 1753, height: 646 },
      image: absolute("assets/kamila-checielewska-portrait-2026.webp"),
      address: {
        "@type": "PostalAddress",
        streetAddress: site.business.streetAddress,
        addressLocality: site.business.addressLocality,
        postalCode: site.business.postalCode,
        addressRegion: site.business.addressRegion,
        addressCountry: "PL",
      },
      founder: { "@type": "Person", name: "Kamila Chęcielewska", jobTitle: "Architekt" },
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Usługi architektoniczne",
        itemListElement: [
          ["Projekty koncepcyjne", "koncepcja"],
          ["Projekty budowlane wielobranżowe", "budowlany"],
          ["Projekty technologiczne", "technologia"],
        ].map(([name, anchor]) => ({
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name,
            url: absolute("/oferta/#" + anchor),
            provider: { "@id": businessId },
          },
        })),
      },
    },
    {
      "@type": "WebSite",
      "@id": home + "#website",
      name: site.name,
      url: home,
      inLanguage: "pl-PL",
      publisher: { "@id": businessId },
    },
    {
      "@type":
        page.path === "/projekty/" ? "CollectionPage" : page.path === "/kontakt/" ? "ContactPage" : "WebPage",
      "@id": canonical + "#webpage",
      url: canonical,
      name: page.title,
      description: page.description,
      inLanguage: "pl-PL",
      isPartOf: { "@id": home + "#website" },
      about: { "@id": businessId },
      primaryImageOfPage: {
        "@type": "ImageObject",
        url: absolute(site.socialImage),
        width: 1200,
        height: 630,
      },
      ...(page.path === "/projekty/" ? { mainEntity: { "@id": canonical + "#portfolio" } } : {}),
      ...(page.path !== "/" ? { breadcrumb: { "@id": canonical + "#breadcrumbs" } } : {}),
    },
  ];
  if (page.path !== "/")
    graph.push({
      "@type": "BreadcrumbList",
      "@id": canonical + "#breadcrumbs",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Strona główna", item: home },
        { "@type": "ListItem", position: 2, name: page.name, item: canonical },
      ],
    });
  if (page.path === "/projekty/")
    graph.push({
      "@type": "ItemList",
      "@id": canonical + "#portfolio",
      name: "Projekty pracowni ArchiSfera",
      numberOfItems: projects.length,
      itemListElement: projects.map((project, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "CreativeWork",
          name: project.title,
          description: project.description,
          url: canonical + "#projekt-" + String(project.id).padStart(2, "0"),
          image: project.images.map(absolute),
          creator: { "@id": businessId },
        },
      })),
    });
  return { "@context": "https://schema.org", "@graph": graph };
}
export function applySeo(html, page, projects, versions, production) {
  const canonical = absolute(page.path);
  const tags = [
    "<!-- SEO:START -->",
    `<title>${escape(page.title)}</title>`,
    `<meta name="description" content="${escape(page.description)}" />`,
    `<meta name="theme-color" content="#ffffff" />`,
    `<meta name="robots" content="${production ? "index,follow,max-image-preview:large" : "noindex,follow"}" />`,
    `<link rel="canonical" href="${canonical}" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:locale" content="pl_PL" />`,
    `<meta property="og:site_name" content="${site.name}" />`,
    `<meta property="og:title" content="${escape(page.title)}" />`,
    `<meta property="og:description" content="${escape(page.description)}" />`,
    `<meta property="og:url" content="${canonical}" />`,
    `<meta property="og:image" content="${absolute(site.socialImage)}" />`,
    `<meta property="og:image:type" content="image/jpeg" />`,
    `<meta property="og:image:width" content="1200" />`,
    `<meta property="og:image:height" content="630" />`,
    `<meta property="og:image:alt" content="${escape(site.socialImageAlt)}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${escape(page.title)}" />`,
    `<meta name="twitter:description" content="${escape(page.description)}" />`,
    `<meta name="twitter:image" content="${absolute(site.socialImage)}" />`,
    `<meta name="twitter:image:alt" content="${escape(site.socialImageAlt)}" />`,
    `<link rel="apple-touch-icon" sizes="180x180" href="assets/apple-touch-icon.png" />`,
    `<script type="application/ld+json">${JSON.stringify(graphFor(page, projects)).replaceAll("<", "\\u003c")}</script>`,
    "<!-- SEO:END -->",
  ].join("\n    ");
  if (html.includes("<!-- SEO:START -->"))
    html = html.replace(/<!-- SEO:START -->[\s\S]*?<!-- SEO:END -->/, tags);
  else {
    html = html
      .replace(/<title>[\s\S]*?<\/title>\s*/i, "")
      .replace(/<meta\b(?=[^>]*name="(?:description|theme-color|robots)")[^>]*>\s*/gi, "");
    html = html.replace("</head>", tags + "\n  </head>");
  }
  html = html.replace(/<html\b[^>]*>/i, `<html lang="pl" data-preview="${!production}">`);
  if (production) html = html.replace(/<base\b[^>]*>/i, '<base href="/" />');
  for (const [name, version] of Object.entries(versions))
    html = html.replace(
      new RegExp('((?:src|href)=")' + name.replaceAll(".", "\\.") + '(?:\\?v=[^"]*)?(\")', "g"),
      "$1" + name + "?v=" + version + "$2",
    );
  return html;
}
export function sitemapFor(projects) {
  return (
    '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n' +
    pages
      .map((page) => {
        const images =
          page.path === "/projekty/"
            ? projects.flatMap((p) => p.images)
            : page.path === "/"
              ? [
                  "assets/kamila-checielewska-portrait-2026.webp",
                  "assets/hero/client-nov22/slide-01-w1973.webp",
                ]
              : [];
        return (
          `  <url>\n    <loc>${absolute(page.path)}</loc>\n    <lastmod>${site.lastmod}</lastmod>\n` +
          [...new Set(images)]
            .map(
              (asset) => `    <image:image><image:loc>${escape(absolute(asset))}</image:loc></image:image>\n`,
            )
            .join("") +
          "  </url>"
        );
      })
      .join("\n") +
    "\n</urlset>\n"
  );
}
export const robotsFor = () =>
  `User-agent: *\nAllow: /\nDisallow: /podglad-projektow/\nDisallow: /assets/previews/\n\nSitemap: ${absolute("/sitemap.xml")}\n`;
export function apacheConfig() {
  const host = new URL(site.origin).hostname.replaceAll(".", "\\.");
  const bare = new URL(site.origin).hostname.replace(/^www\./, "").replaceAll(".", "\\.");
  return (
    `# Prepared for ${site.origin}; activate after the hostname and TLS are configured.\nDirectoryIndex index.html\nErrorDocument 404 /404.html\n<IfModule mod_rewrite.c>\nRewriteEngine On\nRewriteCond %{HTTP_HOST} ^${bare}$ [NC]\nRewriteRule ^ ${site.origin}%{REQUEST_URI} [R=301,L,NE]\nRewriteCond %{HTTP_HOST} ^${host}$ [NC]\nRewriteCond %{HTTPS} !=on\nRewriteCond %{HTTP:X-Forwarded-Proto} !https [NC]\nRewriteRule ^ ${site.origin}%{REQUEST_URI} [R=301,L,NE]\nRewriteCond %{THE_REQUEST} \\s/+(.*/)?index\\.html[?\\s] [NC]\nRewriteRule ^(.*)index\\.html$ ${site.origin}/$1 [R=301,L,NE]\n` +
    redirects
      .map(
        ({ from, to }) =>
          `RewriteRule ^${from.slice(1).replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}/?$ ${absolute(to)} [R=301,L,NE]`,
      )
      .join("\n") +
    `\n</IfModule>\n<IfModule mod_headers.c>\nHeader set X-Content-Type-Options "nosniff"\n<FilesMatch "\\.html$">\nHeader set Cache-Control "no-cache"\n</FilesMatch>\n</IfModule>\n<IfModule mod_expires.c>\nExpiresActive On\nExpiresByType image/avif "access plus 1 month"\nExpiresByType image/webp "access plus 1 month"\nExpiresByType image/jpeg "access plus 1 month"\nExpiresByType image/png "access plus 1 month"\nExpiresByType image/svg+xml "access plus 1 month"\nExpiresByType font/ttf "access plus 1 year"\nExpiresByType text/css "access plus 1 year"\nExpiresByType application/javascript "access plus 1 year"\n</IfModule>\n`
  );
}
export function redirectPage(to) {
  const target = absolute(to);
  const canonical = new URL(target);
  canonical.hash = "";
  return `<!doctype html><html lang="pl"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex,follow"><meta http-equiv="refresh" content="0;url=${escape(target)}"><link rel="canonical" href="${escape(canonical.href)}"><title>ArchiSfera — przekierowanie</title></head><body><p>Ta strona zmieniła adres. <a href="${escape(target)}">Przejdź do aktualnej strony ArchiSfera</a>.</p></body></html>`;
}
export function notFoundPage() {
  return `<!doctype html><html lang="pl"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex,follow"><title>Nie znaleziono strony | ArchiSfera</title><style>body{margin:0;padding:10vh 7vw;font:18px/1.6 Arial,sans-serif;color:#141414;background:#fff}main{max-width:760px}h1{font-size:clamp(32px,5vw,64px);line-height:1.15}a{color:#b02b1b;margin-right:24px}p{margin:24px 0}</style></head><body><main><p>ArchiSfera / 404</p><h1>Nie znaleziono tej strony.</h1><p>Sprawdź adres lub przejdź do strony głównej i aktualnych projektów pracowni.</p><nav><a href="/">Strona główna</a><a href="/projekty/">Projekty</a><a href="/kontakt/">Kontakt</a></nav></main></body></html>`;
}
if (process.argv.includes("--write-preview")) {
  const root = process.cwd();
  const projects = await projectsFrom(root);
  const versions = await versionsFrom(root);
  for (const page of pages)
    await writeFile(
      path.join(root, page.file),
      applySeo(await readFile(path.join(root, page.file), "utf8"), page, projects, versions, false),
    );
  await writeFile(path.join(root, "sitemap.xml"), sitemapFor(projects));
  await writeFile(path.join(root, "robots.txt"), robotsFor());
  console.log("Prepared source preview SEO and the production-domain sitemap.");
}
