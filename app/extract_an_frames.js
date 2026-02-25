import ffmpegPath from 'ffmpeg-static';
import { execSync } from 'child_process';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const video = path.join(__dirname, 'ani.mp4');
const outDir = path.join(__dirname, 'frames_an');

if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir);
}

try {
    execSync(`\"${ffmpegPath}\" -y -i \"${video}\" -vf \"fps=1\" \"${path.join(outDir, 'frame_%03d.jpg')}\"`, { stdio: 'pipe' });
    console.log('Frames extracted successfully to frames_an');
} catch (error) {
    console.error('Error extracting frames:', error.message);
}
