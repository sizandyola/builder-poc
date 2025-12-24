# File-Based Storage System

This application now uses **JSON files** instead of localStorage to persist page data.

## Architecture

### Backend Server (server.js)
- **Port**: 3001
- **Technology**: Express.js
- **Purpose**: Handles reading and writing JSON files

### Data Files

All page data is stored in the `data/` directory:

```
data/
├── pages.json          # Current working pages
└── default-home.json   # Default home page template
```

## How It Works

### 1. Auto-Save to File
- Every time you edit a page, changes are **automatically saved** to `data/pages.json`
- Debounced with 500ms delay to avoid excessive writes
- You'll see "Pages auto-saved to server" in the browser console

### 2. Save All as Default
- Click the **"💾 Save All as Default"** button in the page dropdown
- This saves **ALL current pages** to `data/default-home.json`
- This file becomes your template for resetting
- Available on any page, not just home

### 3. Reset to Default
- Click the **"🔄 Reset to Default"** button
- This copies `data/default-home.json` → `data/pages.json`
- **All current pages** are replaced with the saved defaults

## API Endpoints

The backend server provides these endpoints:

### GET /api/pages
Retrieve all pages from `data/pages.json`

### POST /api/pages
Save all pages to `data/pages.json`
```json
{
  "home": {
    "id": "home",
    "name": "Home",
    "content": "..."
  }
}
```

### GET /api/default-home
Retrieve all default pages from `data/default-home.json`

### POST /api/default-home
Save all pages as default to `data/default-home.json`

### POST /api/reset-to-default
Copy default-home.json → pages.json

## Running the Application

### Development Mode
```bash
npm run dev
```
This starts **both** servers concurrently:
- **Frontend** (Vite): http://localhost:5175
- **Backend** (Express): http://localhost:3001

### Individual Servers
```bash
# Frontend only
npm run client

# Backend only
npm run server
```

## Benefits of File-Based Storage

✅ **Persistent** - Data survives browser cache clearing
✅ **Portable** - Copy `data/` folder to backup or migrate
✅ **Version Control** - Commit `data/` to git for team collaboration
✅ **Inspectable** - Open JSON files directly in your editor
✅ **No Database Required** - Simple file system storage

## File Editing

You can manually edit the JSON files:

1. Stop the dev server
2. Edit `data/pages.json` or `data/default-home.json`
3. Restart the dev server
4. Changes will be loaded automatically

## Deployment

For production, ensure:
1. The `data/` directory has write permissions
2. The backend server is running on the specified port
3. Update `API_BASE_URL` in `src/context/PagesContext.jsx` to your production backend URL

## Troubleshooting

**Problem**: Changes aren't saving
- Check console for "Pages auto-saved to server" message
- Verify backend server is running on port 3001
- Check `data/pages.json` file permissions

**Problem**: Can't reset to default
- Verify `data/default-home.json` exists
- Check backend server logs for errors

**Problem**: CORS errors
- Backend must be running on port 3001
- Check CORS configuration in `server.js`
