/**
 * ─────────────────────────────────────────────────────────────
 *  Post-build SEO generator.
 * ─────────────────────────────────────────────────────────────
 *  Vite emits a single dist/index.html. A crawler hitting /service
 *  would therefore get the *homepage's* title and description, and
 *  only see the right ones if it chooses to execute our JavaScript.
 *
 *  This script fixes that: it writes one static HTML file per route
 *  with that route's title, description, canonical, Open Graph tags
 *  and JSON-LD already in the <head>. vercel.json routes each URL to
 *  its own file. The React app is untouched and still takes over on
 *  load, so nothing about the UI changes.
 *
 *  Also emits sitemap.xml with real lastmod dates.
 * ─────────────────────────────────────────────────────────────
 */

import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

import { ROUTES, SITE, metaFor } from '../src/seoConfig.js';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const dist = join(root, 'dist');

const indexPath = join(dist, 'index.html');
if (!existsSync(indexPath)) {
    console.error('[seo] dist/index.html not found — run `vite build` first.');
    process.exit(1);
}

const template = readFileSync(indexPath, 'utf8');

/** Escape a string for safe use inside an HTML attribute. */
const attr = (s) =>
    String(s)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');

/** Escape for text content — `</script>` inside JSON-LD would end the block. */
const jsonLd = (obj) => JSON.stringify(obj).replace(/</g, '\\u003c');

/**
 * Strip the placeholder SEO tags Vite copied from index.html so the
 * per-route ones below are the only copy in the document.
 */
function stripExisting(html) {
    return html
        .replace(/<title>[\s\S]*?<\/title>\s*/i, '')
        .replace(/<meta\s+name="description"[^>]*>\s*/gi, '')
        .replace(/<meta\s+name="keywords"[^>]*>\s*/gi, '')
        .replace(/<meta\s+name="robots"[^>]*>\s*/gi, '')
        .replace(/<link\s+rel="canonical"[^>]*>\s*/gi, '')
        .replace(/<meta\s+(?:name|property)="(?:og|twitter|geo)[^"]*"[^>]*>\s*/gi, '')
        .replace(/<meta\s+name="ICBM"[^>]*>\s*/gi, '')
        .replace(/<script[^>]*data-seo="sgn"[\s\S]*?<\/script>\s*/gi, '');
}

function headFor(path) {
    const { title, canonical, meta, schemas } = metaFor(path);

    const tags = [
        `<title>${attr(title)}</title>`,
        `<link rel="canonical" href="${attr(canonical)}" />`,
        ...meta.map(({ name, property, content }) =>
            property
                ? `<meta property="${attr(property)}" content="${attr(content)}" />`
                : `<meta name="${attr(name)}" content="${attr(content)}" />`
        ),
        ...schemas.map(
            (s) => `<script type="application/ld+json" data-seo="sgn">${jsonLd(s)}</script>`
        ),
    ];

    return tags.map((t) => '    ' + t).join('\n');
}

/* ── 1. One HTML file per route ─────────────────────────────── */

for (const path of ROUTES) {
    const file = path === '/' ? 'index.html' : path.replace(/^\//, '') + '.html';
    const html = stripExisting(template).replace('</head>', headFor(path) + '\n  </head>');
    writeFileSync(join(dist, file), html, 'utf8');
    console.log(`[seo] dist/${file}  ←  ${path}`);
}

/* ── 2. sitemap.xml ─────────────────────────────────────────── */

const today = new Date().toISOString().slice(0, 10);
const priority = { '/': '1.0', '/service': '0.9', '/contact': '0.8', '/about': '0.7' };

const sitemap =
    '<?xml version="1.0" encoding="UTF-8"?>\n' +
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
    ROUTES.map((path) => {
        const loc = path === '/' ? SITE.url + '/' : SITE.url + path;
        return (
            '  <url>\n' +
            `    <loc>${loc}</loc>\n` +
            `    <lastmod>${today}</lastmod>\n` +
            '    <changefreq>weekly</changefreq>\n' +
            `    <priority>${priority[path] || '0.5'}</priority>\n` +
            '  </url>'
        );
    }).join('\n') +
    '\n</urlset>\n';

writeFileSync(join(dist, 'sitemap.xml'), sitemap, 'utf8');
console.log('[seo] dist/sitemap.xml');
console.log(`[seo] done — ${ROUTES.length} routes.`);
