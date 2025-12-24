# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A comprehensive React-based multi-page website builder using Craft.js. This is a full-featured page builder application with localStorage persistence, allowing users to create and edit marketing websites through an intuitive drag-and-drop interface. The application includes a floating Edit button for toggling between view and edit modes, and features an extensive component library organized into Layout, Content, UI, and Form categories.

## Development Setup

Install dependencies:
```bash
npm install
```

Start the development server:
```bash
npm run dev
```

The application loads in **view mode** by default. Click the floating "Edit Mode" button in the top-right corner to toggle editing.

Build for production:
```bash
npm run build
```

Preview production build:
```bash
npm run preview
```

## Architecture

### Tech Stack
- **React 18.3.1**: UI library
- **Vite 6.0.5**: Build tool and dev server
- **Craft.js 0.2.9**: Page builder framework for drag-and-drop functionality
- **React Router 6.28.0**: Client-side routing for multi-page support
- **react-contenteditable 3.3.7**: Inline content editing

### Project Structure
```
src/
├── components/
│   ├── Layout Components
│   │   ├── Container.jsx      # Flexible layout container with flexbox controls
│   │   ├── Grid.jsx           # CSS Grid layout with configurable columns
│   │   ├── Columns.jsx        # Flexible columns layout system
│   │   ├── Spacer.jsx         # Vertical spacing component
│   │   └── Divider.jsx        # Horizontal divider with styles
│   ├── Content Components
│   │   ├── Text.jsx           # Editable text with typography controls
│   │   ├── Heading.jsx        # H1-H6 headings with customization
│   │   ├── RichText.jsx       # HTML-enabled rich text editor
│   │   ├── Image.jsx          # Image component with sizing/fit options
│   │   ├── Icon.jsx           # SVG icon library
│   │   └── Logo.jsx           # Logo/brand image component
│   ├── UI Components
│   │   ├── Button.jsx         # Button with page navigation support
│   │   ├── Card.jsx           # Card container with shadows/borders
│   │   ├── Hero.jsx           # Hero section with overlay options
│   │   ├── Banner.jsx         # Banner with background image support
│   │   ├── Navbar.jsx         # Navigation bar (sticky/fixed/static)
│   │   ├── Footer.jsx         # Footer section
│   │   └── Badge.jsx          # Small badge/label component
│   ├── Form Components
│   │   ├── FormWrapper.jsx    # Form container with styling
│   │   ├── FormInput.jsx      # Text/email/password input fields
│   │   ├── FormTextArea.jsx   # Multi-line text input
│   │   ├── FormCheckbox.jsx   # Checkbox input
│   │   └── FormSelect.jsx     # Dropdown select input
│   ├── Editor Components
│   │   ├── Toolbox.jsx        # Collapsible component library sidebar
│   │   ├── SettingsPanel.jsx  # Component property editor
│   │   ├── PagesPanel.jsx     # Multi-page management
│   │   ├── FloatingEditButton.jsx # Edit/View mode toggle
│   │   ├── EditorPage.jsx     # Legacy editor page (deprecated)
│   │   └── PreviewPage.jsx    # Legacy preview page (deprecated)
│   └── MainPage.jsx           # Main unified view/edit page
├── context/
│   ├── PagesContext.jsx       # Multi-page state management with localStorage
│   └── EditorContext.jsx      # Edit mode state management
├── App.jsx                    # Root component with routing
├── main.jsx                   # React entry point
└── index.css                  # Global styles with Craft.js hover effects
```

### Component Categories

**Layout Components (5)**
- Container, Grid, Columns, Spacer, Divider

**Content Components (6)**
- Text, Heading, RichText, Image, Icon, Logo

**UI Components (7)**
- Button, Card, Hero, Banner, Navbar, Footer, Badge

**Form Components (5)**
- FormWrapper, FormInput, FormTextArea, FormCheckbox, FormSelect

**Total: 23 Drag-and-Drop Components**

### Craft.js Integration

Each component follows the Craft.js pattern:
1. **Component Definition**: React component with `useNode()` hook
2. **Component.craft**: Configuration object with:
   - `displayName`: Component name in editor
   - `props`: Default props
   - `rules`: Drag/drop/nesting rules
   - `related.settings`: Settings panel component
3. **Settings Component**: Property editor using `setProp()`
4. **Registration**: Component must be in MainPage.jsx resolver

### Key Features

**Core Features:**
- ✅ localStorage Persistence - All pages auto-save
- ✅ Floating Edit Button - Fixed top-right toggle
- ✅ View Mode Default - Loads without editor UI
- ✅ Multi-Page Support - Create/manage multiple pages
- ✅ Page Navigation - Buttons link between pages
- ✅ Hover Outlines - Visual feedback in edit mode
- ✅ Collapsible Toolbox - Organized component categories
- ✅ Live Property Editing - Real-time updates
- ✅ Undo/Redo - Craft.js built-in
- ✅ Drag, Drop, Resize - Full Craft.js capabilities
- ✅ Nesting Support - Components can contain others

**Component Features:**
- Canvas components support nesting (Container, Grid, Columns, Card, Navbar, Footer, FormWrapper)
- Inline content editing where applicable (Text, Heading, RichText, Badge)
- Comprehensive property controls in Settings panel
- Visual feedback and hover states

### State Management

**PagesContext** (src/context/PagesContext.jsx)
- Manages all pages with localStorage persistence
- Auto-saves on every change
- CRUD operations for pages
- Export/import all pages as JSON
- Loads saved state on app start

**EditorContext** (src/context/EditorContext.jsx)
- Global edit mode state
- Persists editor mode to localStorage
- Controls Craft.js enabled/disabled state

**Craft.js State**
- Manages component tree for each page
- Auto-saves to PagesContext every 500ms
- Serializes/deserializes page content

### Routing Architecture

Routes:
- `/` - Main page (home)
- `/:pageId` - Specific page by ID

Single unified page with conditional rendering:
- **View Mode**: Clean page render, floating Edit button visible
- **Edit Mode**: Full editor UI (Toolbox, Settings Panel, Pages Panel)

### Edit Mode Toggle

The FloatingEditButton appears in top-right corner:
- **View Mode** (default): Blue button with "Edit Mode" text
- **Edit Mode**: Green button with "View Mode" text
- Fixed position, always visible
- Persists state to localStorage

### localStorage Keys

- `craftjs-pages`: Array of all page objects with content
- `craftjs-current-page`: Currently active page ID
- `craftjs-editor-mode`: Boolean edit mode state

### Adding New Components

1. Create component file in src/components/
2. Implement useNode() hook for Craft.js
3. Define Component.craft configuration
4. Create Settings component
5. Register in MainPage.jsx resolver
6. Add to Toolbox.jsx in appropriate section
7. Test drag, drop, edit, and save functionality

### Component Guidelines

**All components must:**
- Use `useNode()` from '@craftjs/core'
- Connect with `connectors.connect` and `connectors.drag`
- Define `Component.craft` with displayName, props, rules, settings
- Handle props reactively with `setProp()`
- Support localStorage serialization

**Canvas components must:**
- Accept `children` prop
- Mark as canvas in Toolbox: `<Element is={Component} canvas>`
- Set `canDrop: () => true` in craft.rules

### Hover Outlines (Edit Mode Only)

CSS in index.css provides visual feedback:
```css
[data-cy="craftjs-renderer"] > div:hover {
  outline: 2px dashed #3b82f6;
}
```

Outlines only appear when Craft.js is enabled (edit mode).

### Button Navigation

Buttons can navigate between pages:
1. Select button in edit mode
2. Open Settings panel
3. Set "Link Type" to "Link to Page"
4. Choose target page from dropdown
5. Button navigates on click using React Router

### Best Practices

- Always test in both view and edit modes
- Verify localStorage persistence works
- Ensure components are deletable/movable
- Test nesting for canvas components
- Check responsiveness
- Validate export/import functionality

### Common Issues

**Component not draggable:**
- Check `useNode()` hook is called
- Verify `connectors.connect(drag(ref))` on root element
- Ensure component is in MainPage.jsx resolver

**Settings not showing:**
- Verify Settings component is defined
- Check `related.settings` in Component.craft
- Ensure `setProp()` is used correctly

**Page not saving:**
- Check PagesContext auto-save logic (500ms debounce)
- Verify localStorage is available
- Check browser console for errors

**Edit button not working:**
- Verify EditorContext is wrapping App
- Check FloatingEditButton is rendered
- Ensure Craft.js `enabled` prop receives isEditMode

## Development Workflow

1. Make changes to components
2. Test in view mode (default)
3. Click "Edit Mode" to test editing
4. Verify changes persist (localStorage)
5. Test export/import functionality
6. Check all component categories in Toolbox
7. Validate Settings panel for all components
