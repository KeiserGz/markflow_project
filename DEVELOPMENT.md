# 🏗️ MarkFlow Architecture & Development Guide

## Overview

MarkFlow is built on modern web technologies with a clear separation of concerns:

```
┌─────────────────────────────────────────┐
│         Next.js (Framework)             │
├─────────────────────────────────────────┤
│   Pages (pages/)     Components (components/)
│   - index.js         - Editor.js
│   - _app.js          - Preview.js
│                      - Sidebar.js
│                      - Canvas3D.js
├─────────────────────────────────────────┤
│   Zustand Store (store/)                │
│   - noteStore.js (State Management)     │
├─────────────────────────────────────────┤
│   External Libraries                    │
│   - Chakra UI (UI)    - Three.js (3D)   │
│   - Framer Motion     - React Markdown  │
│   - date-fns          - React Three     │
└─────────────────────────────────────────┘
```

## File Structure Explained

### Pages (`pages/`)

- **\_app.js** - App entry point, Chakra UI setup, global theme
- **index.js** - Main editor page, orchestrates all components

### Components (`components/`)

- **Editor.js** - Markdown textarea with formatting toolbar
- **Preview.js** - React Markdown renderer with syntax highlighting
- **Sidebar.js** - Note list, search, navigation
- **Canvas3D.js** - Three.js scene with animations

### Store (`store/`)

- **noteStore.js** - Zustand state management, localStorage persistence

### Public (`public/`)

- **manifest.json** - PWA configuration

## State Management with Zustand

### Store Structure

```javascript
{
  notes: [
    {
      id: '1234567890',
      title: 'My Note',
      content: '# Markdown content',
      createdAt: '2024-01-15T10:00:00Z',
      lastModified: '2024-01-15T10:30:00Z'
    }
  ],
  currentNoteId: '1234567890'
}
```

### Available Actions

```javascript
// Add a new note
const newNote = addNote()

// Update a note
updateNote(id, { title: 'New Title', content: '...' })

// Delete a note
deleteNote(id)

// Switch current note
setCurrentNote(id)

// Export a note
exportNote(note, 'md' | 'html' | 'pdf')
```

## Component Communication Flow

```
Main Page (index.js)
    │
    ├── Header (controls, export, theme)
    │   └── useNoteStore hook
    │
    ├── Sidebar
    │   ├── Note list
    │   └── Search
    │       └── useNoteStore hook
    │
    ├── Editor
    │   ├── Formattin toolbar
    │   └── Textarea
    │       └── onChange updates store
    │
    ├── Preview
    │   ├── Markdown renderer
    │   └── Live sync from store
    │
    └── Canvas3D
        └── Three.js scene (independent)
```

## How Data Flows

### 1. User Types

```
Textarea onChange → handleMarkdownChange() → updateNote() → Zustand Store
```

### 2. Store Updates

```
Zustand → Component re-renders with new content
```

### 3. Preview Updates

```
Preview component reads markdown prop → React Markdown renders → Display
```

### 4. Auto-save

```
updateNote() → store persists to localStorage automatically
```

## Adding New Features

### 1. Add a New Action

Edit `store/noteStore.js`:

```javascript
// Add this to the store
pinNote: (id) => {
  set((state) => ({
    notes: state.notes.map((note) =>
      note.id === id ? { ...note, pinned: true } : note
    ),
  }))
},
```

### 2. Use in Component

```javascript
import { useNoteStore } from '../store/noteStore'

export default function MyComponent() {
  const { notes, pinNote } = useNoteStore()

  const handlePin = (id) => {
    pinNote(id)
  }

  return <button onClick={() => handlePin(notes[0].id)}>Pin</button>
}
```

### 3. Update UI

Chakra UI components automatically re-render when store updates.

## Customization Guides

### Change the 3D Scene

Edit `components/Canvas3D.js`:

```javascript
// Change sphere color
<meshStandardMaterial color="#FF6B6B" />

// Change rotation speed
<OrbitControls autoRotateSpeed={2} />

// Change camera position
<PerspectiveCamera position={[0, 0, 8]} />
```

### Add More Formatting Options

Edit `components/Editor.js`, add to formatOptions array:

```javascript
{
  label: 'Heading 1',
  action: () => insertMarkdown('# ', ''),
  icon: FiHeading1
}
```

### Customize Colors

Edit `pages/_app.js`:

```javascript
colors: {
  brand: {
    50: '#f0f9ff',
    500: '#0ea5e9',  // Primary
    600: '#0284c7',  // Hover
    700: '#0369a1',  // Active
  },
}
```

### Add Dark/Light Mode Toggle

Already built-in! Use `useColorMode()` hook:

```javascript
import { useColorMode } from '@chakra-ui/react'

const { colorMode, toggleColorMode } = useColorMode()
```

## Performance Optimization Tips

### 1. Code Splitting

Already automatic with Next.js dynamic imports.

### 2. Memoization

Wrap heavy components with React.memo:

```javascript
export default React.memo(Preview)
```

### 3. Use useCallback

Optimize callback functions:

```javascript
const handleSave = useCallback(() => {
  updateNote(id, content)
}, [id, content])
```

### 4. Lazy Load Canvas3D

```javascript
const Canvas3D = dynamic(() => import('../components/Canvas3D'), {
  ssr: false,
})
```

## Testing

### Add Jest Tests

```bash
npm install --save-dev jest @testing-library/react
```

Example test:

```javascript
import { render } from '@testing-library/react'
import Editor from './Editor'

describe('Editor', () => {
  it('renders textarea', () => {
    const { getByRole } = render(<Editor value="" onChange={() => {}} />)
    expect(getByRole('textbox')).toBeInTheDocument()
  })
})
```

## Debugging

### Enable React DevTools

Install [React DevTools extension](https://chrome.google.com/webstore/detail/react-developer-tools)

### Debug Zustand Store

```javascript
import { useShallow } from 'zustand/react/shallow'

// See store changes in console
useNoteStore.subscribe((state) => console.log(state))
```

### Debug Three.js

```javascript
window.THREE = THREE // Access in console
// Use window.THREE to inspect 3D objects
```

### Next.js Debug

Run with debug flag:

```bash
NODE_OPTIONS='--inspect' npm run dev
```

## Build & Deploy

### Development

```bash
npm run dev
# Loads on http://localhost:3000
```

### Production Build

```bash
npm run build
# Generates optimized code in .next/
npm start
# Runs production server
```

### Deploy to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Deploy to Netlify

```bash
npm run build
# Deploy the entire folder to Netlify
```

## Dependencies Explained

| Package          | Purpose     | Size |
| ---------------- | ----------- | ---- |
| next             | Framework   | 35KB |
| react            | UI lib      | 42KB |
| @chakra-ui/react | Components  | 28KB |
| framer-motion    | Animations  | 21KB |
| three            | 3D graphics | 28KB |
| react-markdown   | MD render   | 12KB |
| zustand          | State       | 2KB  |

_Sizes are approximate and gzipped_

## Common Development Tasks

### Add a New Note Property

1. Add to default note in `noteStore.js`
2. Update `updateNote()` if needed
3. Display in component if needed

### Change Markdown Parser

Replace react-markdown with remark:

```bash
npm install remark remark-html
```

### Add Code Syntax Highlighting

```bash
npm install highlight.js
```

Then use in Preview component.

### Add Keyboard Shortcuts

Use `useEffect` + keyboard listeners:

```javascript
useEffect(() => {
  const handleKeyPress = (e) => {
    if (e.ctrlKey && e.key === 's') {
      e.preventDefault()
      // Save action
    }
  }
  window.addEventListener('keydown', handleKeyPress)
  return () => window.removeEventListener('keydown', handleKeyPress)
}, [])
```

## Browser APIs Used

- **localStorage** - Store notes persistence
- **Canvas API** - 3D rendering (via Three.js)
- **File API** - Export functionality
- **Date objects** - Timestamps

## Troubleshooting Development

### Hot Reload Not Working

- Check terminal hasn't crashed
- Clear `.next` folder: `rm -rf .next`
- Restart: `npm run dev`

### Module Not Found

- Check import paths are correct
- Ensure file exists
- Check TypeScript types if using TS

### WebGL Error on Canvas3D

- May be disabled in browser
- Test in incognito mode
- Try different browser

### Store State Not Updating

- Verify using useNoteStore hook
- Check localStorage in DevTools
- Ensure not spread-copying incorrectly

## Resources for Learning

- [Next.js Docs](https://nextjs.org/docs)
- [React Docs](https://react.dev)
- [Chakra UI API](https://chakra-ui.com/docs)
- [Zustand Docs](https://github.com/pmndrs/zustand)
- [Three.js Introduction](https://threejs.org/manual/#en/fundamentals)
- [Framer Motion Guide](https://www.framer.com/motion/)

## Architecture Decisions

### Why Zustand?

- Tiny (~2KB)
- No boilerplate
- Built-in devtools support
- Great for this project size

### Why Chakra UI?

- Rich component library
- Easy theming
- Dark mode built-in
- Accessibility focused

### Why Three.js?

- Industry standard 3D library
- Great documentation
- React integration (React Three Fiber)
- Beautiful 3D effects

### Why localStorage?

- No backend needed
- Works offline
- Fast performance
- User data privacy

---

**Happy coding! 🚀**

For more info, check README.md, SETUP.md, or QUICKSTART.md
