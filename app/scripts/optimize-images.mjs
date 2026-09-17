/**
 * ─────────────────────────────────────────────────────────────
 *  Image optimizer — run once, or again after adding new assets.
 * ─────────────────────────────────────────────────────────────
 *  The gallery and Gemini artwork were saved as PNG. PNG is lossless
 *  and built for flat graphics, so photographic content balloons: these
 *  are only 1024x1024 yet several run past 1.7 MB each.
 *
 *  This converts every raster asset in src/assets to WebP, which every
 *  browser released since 2020 supports, and caps the longest edge so a
 *  card thumbnail is not shipping a full-size image.
 *
 *  Originals are left on disk; `--replace` removes them once the
 *  imports have been repointed. Run with `npm run optimize:images`.
 * ─────────────────────────────────────────────────────────────
 */

import { readdirSync, statSync, unlinkSync } from 'node:fs';
import { join, dirname, extname, basename } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const dir = join(root, 'src', 'assets');

const QUALITY = 82;      // visually lossless for photographic content
const MAX_EDGE = 1600;   // nothing on the site is displayed larger than this

const replace = process.argv.includes('--replace');
const mb = (n) => (n / 1048576).toFixed(2);

const sources = readdirSync(dir).filter((f) => /\.(png|jpe?g)$/i.test(f));
if (!sources.length) {
    console.log('[img] no PNG/JPEG sources found — nothing to do.');
    process.exit(0);
}

let before = 0;
let after = 0;
const removed = [];

for (const file of sources) {
    const src = join(dir, file);
    const out = join(dir, basename(file, extname(file)) + '.webp');

    const originalSize = statSync(src).size;
    before += originalSize;

    const image = sharp(src);
    const meta = await image.metadata();

    // Only downscale — never upscale a small asset.
    const resize =
        Math.max(meta.width || 0, meta.height || 0) > MAX_EDGE
            ? { width: MAX_EDGE, height: MAX_EDGE, fit: 'inside', withoutEnlargement: true }
            : null;

    await (resize ? image.resize(resize) : image)
        .webp({ quality: QUALITY, effort: 6 })
        .toFile(out);

    const newSize = statSync(out).size;
    after += newSize;

    const cut = Math.round((1 - newSize / originalSize) * 100);
    console.log(
        `[img] ${basename(out).padEnd(46)} ${mb(originalSize).padStart(6)} MB -> ${mb(newSize).padStart(6)} MB  (-${cut}%)`
    );

    if (replace) {
        unlinkSync(src);
        removed.push(file);
    }
}

console.log('');
console.log(`[img] ${sources.length} images: ${mb(before)} MB -> ${mb(after)} MB`);
console.log(`[img] saved ${mb(before - after)} MB (${Math.round((1 - after / before) * 100)}% smaller)`);
if (removed.length) console.log(`[img] removed ${removed.length} originals (recoverable from git history)`);
