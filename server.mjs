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
 *   2. Starts Express server to serve static files from dist/
 */

import express from 'express';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { existsSync } from 'fs';
import { execSync } from 'child_process';

const __dirname = dirname(fileURLToPath(import.meta.url));
const distPath = join(__dirname, 'dist');

console.log('[Stara Stacja] Starting server...');
console.log('[Stara Stacja] __dirname:', __dirname);
console.log('[Stara Stacja] distPath:', distPath);
console.log('[Stara Stacja] dist/ exists:', existsSync(distPath));

// Build if dist/ doesn't exist
if (!existsSync(distPath)) {
  console.log('[Stara Stacja] dist/ not found — running build...');
  try {
    execSync('npm run build', { stdio: 'inherit', cwd: __dirname });
    console.log('[Stara Stacja] Build completed successfully.');
  } catch (err) {
    console.error('[Stara Stacja] Build failed:', err.message);
  }
}

// Start Express server
const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from dist/
app.use(express.static(distPath, {
  extensions: ['html'],
  index: 'index.html',
}));

// Fallback: serve index.html for clean URLs (Express 5 syntax)
app.use((req, res) => {
  // Try path/index.html for clean URLs
  const filePath = join(distPath, req.path, 'index.html');
  if (existsSync(filePath)) {
    return res.sendFile(filePath);
  }
  // 404 page
  const notFound = join(distPath, '404.html');
  if (existsSync(notFound)) {
    return res.status(404).sendFile(notFound);
  }
  res.status(404).send('Not found');
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`[Stara Stacja] Server running on 0.0.0.0:${PORT}`);
  console.log(`[Stara Stacja] Serving files from ${distPath}`);
});
