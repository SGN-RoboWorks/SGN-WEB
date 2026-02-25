import ffmpegPath from 'ffmpeg-static';
import { execSync } from 'child_process';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const video = path.join(__dirname, 'contect page .mp4');
const outDir = path.join(__dirname, 'frames_contact');

if (!fs.existsSync(outDir)) fs.mkdirSync(outDir);

const timestamps = [0, 1, 2, 3, 4, 5, 8, 10];

timestamps.forEach(t => {
    const outFile = path.join(outDir, `frame_${String(t).padStart(3, '0')}.jpg`);
    try {
        execSync(`"${ffmpegPath}" -y -ss ${t} -i "${video}" -frames:v 1 -q:v 2 "${outFile}"`, { stdio: 'pipe' });
        console.log(`OK: frame at ${t}s`);
    } catch (e) {
        console.log(`Skip: ${t}s`);
    }
});

console.log('Done! Frames in:', outDir);
