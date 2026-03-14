/**
 * Post-build script: copies dist/ contents to Hostinger's public_html/
 *
 * On Hostinger, the repo lives at:
 *   /home/USER/domains/DOMAIN/public_html/.builds/source/repository/
 *
 * The web server serves from:
 *   /home/USER/domains/DOMAIN/public_html/
 *
 * This script copies everything from dist/ up to public_html/
 */

import { dirname, join, resolve } from 'path';
import { fileURLToPath } from 'url';
import { existsSync, cpSync, readdirSync } from 'fs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const distPath = join(__dirname, 'dist');

console.log('[postbuild] Current directory:', __dirname);
console.log('[postbuild] dist/ exists:', existsSync(distPath));

if (!existsSync(join(distPath, 'index.html'))) {
  console.error('[postbuild] ERROR: dist/index.html not found — skipping copy');
  process.exit(0);
}

// Walk up from repo dir to find public_html
// Repo is at: .../public_html/.builds/source/repository/
let searchDir = __dirname;
let publicHtml = null;

for (let i = 0; i < 6; i++) {
  searchDir = resolve(searchDir, '..');
  if (searchDir.endsWith('public_html') || existsSync(join(searchDir, '.htaccess'))) {
    publicHtml = searchDir;
    break;
  }
}

if (!publicHtml) {
  console.log('[postbuild] Not on Hostinger (no public_html found) — skipping copy');
  process.exit(0);
}

console.log(`[postbuild] Found public_html at: ${publicHtml}`);
console.log('[postbuild] Copying dist/ contents...');

const distFiles = readdirSync(distPath);
for (const file of distFiles) {
  const src = join(distPath, file);
  const dest = join(publicHtml, file);
  cpSync(src, dest, { recursive: true, force: true });
  console.log(`[postbuild]   copied: ${file}`);
}

console.log(`[postbuild] Done — ${distFiles.length} items copied to public_html/`);
