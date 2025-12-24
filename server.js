import express from 'express';
import cors from 'cors';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

const PAGES_FILE = path.join(__dirname, 'data', 'pages.json');
const DEFAULT_HOME_FILE = path.join(__dirname, 'data', 'default-home.json');

// Ensure data directory exists
async function ensureDataDirectory() {
  const dataDir = path.join(__dirname, 'data');
  try {
    await fs.access(dataDir);
  } catch {
    await fs.mkdir(dataDir, { recursive: true });
  }
}

// Initialize files if they don't exist
async function initializeFiles() {
  await ensureDataDirectory();

  // Initialize pages.json if it doesn't exist
  try {
    await fs.access(PAGES_FILE);
  } catch {
    const defaultPages = {
      home: {
        id: 'home',
        name: 'Home',
        content: null,
      },
    };
    await fs.writeFile(PAGES_FILE, JSON.stringify(defaultPages, null, 2));
  }

  // Initialize default-home.json if it doesn't exist
  try {
    await fs.access(DEFAULT_HOME_FILE);
  } catch {
    // Default template with just an empty home page
    const defaultHome = {
      home: {
        id: 'home',
        name: 'Home',
        content: null,
      },
    };
    await fs.writeFile(DEFAULT_HOME_FILE, JSON.stringify(defaultHome, null, 2));
  }
}

// GET /api/pages - Get all pages
app.get('/api/pages', async (req, res) => {
  try {
    const data = await fs.readFile(PAGES_FILE, 'utf-8');
    res.json(JSON.parse(data));
  } catch (error) {
    console.error('Error reading pages:', error);
    res.status(500).json({ error: 'Failed to read pages' });
  }
});

// POST /api/pages - Update all pages
app.post('/api/pages', async (req, res) => {
  try {
    await fs.writeFile(PAGES_FILE, JSON.stringify(req.body, null, 2));
    res.json({ success: true, message: 'Pages saved successfully' });
  } catch (error) {
    console.error('Error saving pages:', error);
    res.status(500).json({ error: 'Failed to save pages' });
  }
});

// GET /api/default-home - Get all default pages
app.get('/api/default-home', async (req, res) => {
  try {
    const data = await fs.readFile(DEFAULT_HOME_FILE, 'utf-8');
    res.json(JSON.parse(data));
  } catch (error) {
    console.error('Error reading default pages:', error);
    res.status(500).json({ error: 'Failed to read default pages' });
  }
});

// POST /api/default-home - Save all pages as default
app.post('/api/default-home', async (req, res) => {
  try {
    await fs.writeFile(DEFAULT_HOME_FILE, JSON.stringify(req.body, null, 2));
    res.json({ success: true, message: 'All pages saved as default successfully' });
  } catch (error) {
    console.error('Error saving default pages:', error);
    res.status(500).json({ error: 'Failed to save default pages' });
  }
});

// POST /api/reset-to-default - Reset pages to default
app.post('/api/reset-to-default', async (req, res) => {
  try {
    const defaultData = await fs.readFile(DEFAULT_HOME_FILE, 'utf-8');
    await fs.writeFile(PAGES_FILE, defaultData);
    res.json({ success: true, message: 'Pages reset to default', data: JSON.parse(defaultData) });
  } catch (error) {
    console.error('Error resetting to default:', error);
    res.status(500).json({ error: 'Failed to reset to default' });
  }
});

// Initialize and start server
initializeFiles().then(() => {
  app.listen(PORT, () => {
    console.log(`\n🚀 Page Builder API Server running on http://localhost:${PORT}`);
    console.log(`📁 Current pages: ${PAGES_FILE}`);
    console.log(`📁 Default pages template: ${DEFAULT_HOME_FILE}\n`);
  });
});
