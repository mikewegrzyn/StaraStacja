/**
 * Stara Stacja — Production Server (Hostinger Node.js)
 *
 * Hostinger setup:
 *   - Framework: Express
 *   - Entry point: server.mjs
 *   - Branch: main
 *   - Node.js: 22.x
 *
 * How it works:
 *   1. Builds Astro site to dist/ if not already built
 *   2. Copies dist/ contents to public_html/ (where Hostinger serves from)
 *   3. Starts Express server as a fallback
 */

import express from 'express';
import { dirname, join, resolve } from 'path';
import { fileURLToPath } from 'url';
import { existsSync, cpSync, readdirSync } from 'fs';
import { execSync } from 'child_process';

const __dirname = dirname(fileURLToPath(import.meta.url));
const distPath = join(__dirname, 'dist');

// Build if dist/ doesn't exist
if (!existsSync(distPath)) {
  console.log('[Stara Stacja] dist/ not found — running build...');
  try {
    execSync('npm run build', { stdio: 'inherit', cwd: __dirname });
    console.log('[Stara Stacja] Build completed successfully.');
  } catch (err) {
    console.error('[Stara Stacja] Build failed:', err.message);
    process.exit(1);
  }
}

// Verify dist/index.html exists
if (!existsSync(join(distPath, 'index.html'))) {
  console.error('[Stara Stacja] ERROR: dist/index.html not found. Build may have failed.');
  process.exit(1);
}

// Copy dist/ contents to Hostinger's public_html/ if we detect we're on Hostinger
// Hostinger serves static files from public_html/, not from the Node.js app
const hostingerPublicHtml = resolve(__dirname, '..', '..', '..', '..');
const htaccessPath = join(hostingerPublicHtml, '.htaccess');

if (existsSync(htaccessPath) && hostingerPublicHtml.includes('public_html')) {
  console.log(`[Stara Stacja] Hostinger detected — copying dist/ to ${hostingerPublicHtml}`);
  try {
    const distFiles = readdirSync(distPath);
    for (const file of distFiles) {
      cpSync(join(distPath, file), join(hostingerPublicHtml, file), { recursive: true, force: true });
    }
    console.log(`[Stara Stacja] Copied ${distFiles.length} items to public_html/`);
  } catch (err) {
    console.error('[Stara Stacja] Failed to copy to public_html:', err.message);
  }
}

// Start Express server (used by Hostinger's Node.js proxy)
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(distPath, {
  extensions: ['html'],
  index: 'index.html',
}));

app.get('*', (req, res) => {
  const filePath = join(distPath, req.path, 'index.html');
  if (existsSync(filePath)) {
    return res.sendFile(filePath);
  }
  const notFound = join(distPath, '404.html');
  if (existsSync(notFound)) {
    return res.status(404).sendFile(notFound);
  }
  res.status(404).send('Not found');
});

app.listen(PORT, () => {
  console.log(`[Stara Stacja] Server running on port ${PORT}`);
  console.log(`[Stara Stacja] Serving files from ${distPath}`);
});
