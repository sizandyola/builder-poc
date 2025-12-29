# Marketing Website Builder

A comprehensive drag-and-drop website builder for creating multi-page marketing websites using React and Craft.js. Build professional websites with **23 ready-to-use components** organized into Layout, Content, UI, and Form categories.

## ✨ Featuress

### Core Capabilities

- **🎨 23 Drag-and-Drop Components** - Extensive component library
- **💾 Auto-Save** - Changes persist automatically to localStorage
- **📱 Multi-Page Support** - Create unlimited pages with navigation
- **🔄 View/Edit Toggle** - Floating button switches between modes
- **📦 Export/Import** - Save and load entire websites as JSON
- **↩️ Undo/Redo** - Full editing history
- **🎯 Live Editing** - See changes instantly
- **📐 Responsive** - Components adapt to screen sizes

### Component Library

#### Layout Components (5)

- **Container** - Flexible layout with flexbox controls
- **Grid** - CSS Grid with configurable columns
- **Columns** - Multi-column layouts
- **Spacer** - Vertical spacing
- **Divider** - Horizontal dividers with styles

#### Content Components (6)

- **Heading** - H1-H6 headings
- **Text** - Editable text blocks
- **RichText** - HTML-enabled rich text
- **Image** - Images with sizing options
- **Icon** - 8 built-in SVG icons
- **Logo** - Brand/logo images

#### UI Components (7)

- **Button** - Interactive buttons with page navigation
- **Card** - Content cards with shadows
- **Hero** - Full-width hero sections
- **Banner** - Banner sections
- **Navbar** - Navigation bars (sticky/fixed/static)
- **Footer** - Footer sections
- **Badge** - Small labels/badges

#### Form Components (5)

- **Form Wrapper** - Styled form container
- **Input** - Text/email/password inputs
- **TextArea** - Multi-line text input
- **Checkbox** - Checkbox inputs
- **Select** - Dropdown selects

## 🚀 Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open your browser to `http://localhost:5173`

### Production Build

```bash
npm run build
npm run preview
```

## 📖 How to Use

### View Mode (Default)

The application loads in **view mode** - your website appears without any editor interface. This is how visitors will see your site.

### Entering Edit Mode

1. Click the **"Edit Mode"** button in the top-right corner
2. The editor interface appears with:
   - **Toolbox** (left) - Drag components from here
   - **Canvas** (center) - Your page being edited
   - **Settings** (right) - Modify selected component
   - **Pages Panel** (top) - Manage multiple pages

### Building Your Website

#### 1. Adding Components

1. In edit mode, browse the **Toolbox** on the left
2. Components are organized in collapsible sections:
   - Layout
   - Content
   - UI Components
   - Form Components
3. **Drag** any component onto the canvas
4. **Drop** it where you want it

#### 2. Editing Components

1. **Click** any component on the canvas
2. The **Settings Panel** (right) shows all properties
3. Modify colors, sizes, text, spacing, etc.
4. Changes apply instantly
5. **Inline editing** available for text components - just click and type

#### 3. Nesting Components

Some components can contain others:

- **Containers** - Drop any component inside
- **Grid** - Automatically creates grid cells
- **Columns** - Add components to each column
- **Card** - Build card content
- **Form Wrapper** - Add form fields

**To nest:**

1. Drag a component
2. Hover over a container (it highlights)
3. Drop inside the container

#### 4. Moving and Deleting

- **Move**: Drag the component to a new position
- **Delete**: Select component → Click "Delete" in Settings Panel

#### 5. Managing Multiple Pages

1. Click **"+ Add Page"** in the Pages Panel
2. Enter a page name
3. Switch between pages by clicking page tabs
4. Each page has independent content
5. Delete pages with the **×** button (except Home)

#### 6. Page Navigation

Make buttons navigate between pages:

1. Add a **Button** component
2. Select the button
3. In Settings Panel, scroll to **"Navigation"**
4. Set "Link Type" to **"Link to Page"**
5. Choose the target page
6. Button now navigates when clicked

#### 7. Export/Import

**Export (Save your work):**

1. Stay in edit mode
2. Click **"Export All Pages"** in the top bar
3. A JSON file downloads with all your pages

**Import (Load saved work):**

1. Click **"Import Pages"** in the top bar
2. Select your previously exported JSON file
3. All pages load instantly

### Keyboard Shortcuts

- **Ctrl/Cmd + Z** - Undo
- **Ctrl/Cmd + Shift + Z** - Redo

## 💡 Tips & Best Practices

### Layout Strategy

1. Start with a **Container** or **Grid** for structure
2. Add **Hero** or **Banner** at the top
3. Use **Columns** for side-by-side content
4. Add **Spacer** between sections
5. End with a **Footer**

### Component Organization

- Use **Containers** to group related content
- Nest **Cards** inside **Grids** for card layouts
- Put **Logos** and **Buttons** in **Navbars**
- Wrap forms in **Form Wrapper** for styling

### Performance

- The app auto-saves every 500ms
- All data stored in browser localStorage
- No server needed - works completely offline
- Export regularly to backup your work

### Responsive Design

- Most components adapt automatically
- Test different screen sizes
- Adjust padding/spacing for mobile
- Use flexible layouts (Containers, Grid, Columns)

## 🎯 Common Use Cases

### Landing Page

1. Hero section with title/subtitle
2. Container with feature cards (Grid + Cards)
3. Call-to-action buttons
4. Form for lead capture
5. Footer with links

### Multi-Page Website

1. Create pages: Home, About, Services, Contact
2. Add Navbar to all pages
3. Configure buttons to navigate between pages
4. Export when done

### Portfolio

1. Hero with your name/title
2. Grid of project cards (Images + Text)
3. About section (Container + RichText)
4. Contact form
5. Social links in Footer

## 🔧 Technical Details

### Technologies

- **React 18.3.1** - UI framework
- **Craft.js 0.2.9** - Page builder engine
- **React Router 6.28.0** - Multi-page routing
- **Vite 6.0.5** - Build tool
- **localStorage** - Data persistence

### Browser Support

- Chrome/Edge (recommended)
- Firefox
- Safari
- Any modern browser with localStorage support

### Data Storage

All data stored locally in your browser:

- `craftjs-pages` - Your page content
- `craftjs-current-page` - Active page
- `craftjs-editor-mode` - Edit mode state

**Clearing browser data will delete your website!** Always export before clearing cache.

## 📚 Component Reference

### Container

Flexible layout container with:

- Background color
- Padding control
- Flex direction (row/column)
- Alignment options
- Gap between items

### Grid

CSS Grid layout with:

- 1-12 columns
- Gap control
- Responsive by default

### Button

Interactive button with:

- Customizable text
- Colors (background, text)
- Size and padding
- Border radius
- **Page navigation** capability

### Hero

Full-width hero section with:

- Background image/color
- Dark overlay option
- Title and subtitle (editable)
- Content alignment
- Adjustable height

### Form Components

All form components include:

- Label customization
- Required field indicator
- Full/fixed width options
- Consistent styling

## 🐛 Troubleshooting

**Components won't drag:**

- Ensure you're in edit mode
- Try refreshing the page

**Changes not saving:**

- Check browser console for errors
- Ensure localStorage is not full
- Try exporting and re-importing

**Page looks broken:**

- Click "View Mode" to see clean output
- Try undoing recent changes
- Export and start fresh if needed

**Can't see Edit button:**

- Check top-right corner of screen
- Try refreshing the browser

## 📄 License

This project uses React (MIT), Craft.js (MIT), and other open-source libraries.

## 🙏 Credits

Built with:

- [Craft.js](https://craft.js.org/) - Page builder framework
- [React](https://react.dev/) - UI library
- [Vite](https://vitejs.dev/) - Build tool
- [React Router](https://reactrouter.com/) - Routing

---

**Happy Building! 🎉**

Start by clicking the "Edit Mode" button and dragging your first component onto the canvas.
