/**
 * Stara Stacja — Production Server
 *
 * This file serves the static Astro build from the dist/ folder.
 * If dist/ does not exist, it runs the build automatically.
 *
 * Hostinger setup:
 *   - Entry point: server.mjs
 *   - Build command: npm install && npm run build
 *   - Start command: npm start
 *   - Node.js version: 22+
 *
 * You can also run manually:
 *   npm install
 *   npm run build
 *   npm start
 */

import express from 'express';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { existsSync } from 'fs';
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
  console.error('[Stara Stacja] Try running: npm install && npm run build');
  process.exit(1);
}

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from dist/
app.use(express.static(distPath, {
  extensions: ['html'],
  index: 'index.html',
}));

// Handle clean URLs — Astro generates /menu/index.html for /menu
app.get('*', (req, res) => {
  // Try serving the path as a directory with index.html
  const filePath = join(distPath, req.path, 'index.html');
  if (existsSync(filePath)) {
    return res.sendFile(filePath);
  }

  // 404 fallback
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
