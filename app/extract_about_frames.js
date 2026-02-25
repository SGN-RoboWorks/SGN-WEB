import ffmpegPath from 'ffmpeg-static';
import { execSync } from 'child_process';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const video = path.join(__dirname, 'WhatsApp Video 2026-02-23 at 12.47.48.mp4');
const outDir = path.join(__dirname, 'frames_about');

if (!fs.existsSync(outDir)) fs.mkdirSync(outDir);

console.log('Using ffmpeg from:', ffmpegPath);
console.log('Extracting frames from:', video);

try {
    // Extract one frame per second
    execSync(`"${ffmpegPath}" -y -i "${video}" -vf "fps=1" "${path.join(outDir, 'frame_%03d.jpg')}"`, { stdio: 'pipe' });
    console.log('Done! Frames in:', outDir);
} catch (e) {
    console.error('Error extracting frames:', e.message);
}
