import express from 'express';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(join(__dirname, 'dist')));

// Serve index.html for any unmatched route (SPA-like fallback)
app.get('*', (req, res) => {
  res.sendFile(join(__dirname, 'dist', '404.html'), (err) => {
    if (err) res.status(404).send('Not found');
  });
});

app.listen(PORT, () => {
  console.log(`Stara Stacja running on port ${PORT}`);
});
