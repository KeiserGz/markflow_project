# 🚀 MarkFlow Quick Start Guide

## Installation & Setup (2 minutes)

### Step 1: Install Dependencies

```bash
npm install
```

### Step 2: Start Development Server

```bash
npm run dev
```

### Step 3: Open in Browser

Visit `http://localhost:3000`

---

## Features at a Glance

| Feature         | How to Use                        |
| --------------- | --------------------------------- |
| ✍️ **Write**    | Type markdown in the left editor  |
| 👀 **Preview**  | See formatted output on the right |
| 💾 **Save**     | Automatic - no action needed!     |
| ➕ **New Note** | Click "New Note" button           |
| 🔍 **Search**   | Use sidebar search box            |
| 📤 **Export**   | Click "Export" menu               |
| 🗑️ **Delete**   | Click "Delete" button             |
| 🌙 **Theme**    | Click sun/moon icon               |

---

## Markdown Cheat Sheet

```markdown
# Heading 1

## Heading 2

### Heading 3

**Bold text**
_Italic text_
**_Bold italic_**

`Inline code`

[Link text](https://example.com)

- Bullet point
- Another point

1. Numbered item
2. Another item

> Blockquote

\`\`\`
Code block
\`\`\`
```

---

## File Organization

```
tasklistapp/
├── pages/              # Next.js pages
├── components/         # React components
├── store/              # Zustand state
├── package.json        # Dependencies
├── next.config.js      # Next.js config
├── SETUP.md            # Full setup guide
└── README.md           # Project info
```

---

## Common Commands

```bash
# Development
npm run dev          # Start dev server

# Production
npm run build        # Build for production
npm start            # Start production server

# Linting
npm run lint         # Check code quality
```

---

## Browser Storage

- 💾 Notes saved automatically to localStorage
- 🔄 Data persists after closing browser
- 📦 No backend server needed
- ⚡ Instant loading

---

## Keyboard Tips

- **Ctrl/Cmd + S** - Triggers save (already auto-save)
- **Tab** - Indent level in lists
- **Enter** - New line or new list item

---

## Customization

### Change Brand Color

Edit `pages/_app.js`:

```javascript
colors: {
  brand: {
    500: '#your-color-hex',
  }
}
```

### Disable 3D Background

In `pages/index.js`, comment out or remove:

```javascript
<Box position="fixed" top={0} left={0} right={0} bottom={0} zIndex={0}>
  <Canvas3D />
</Box>
```

---

## Troubleshooting

**Q: Notes not saving?**
A: Check browser localStorage is enabled and has space.

**Q: 3D background flickering?**
A: This is normal on first load. Wait a moment.

**Q: Page slow?**
A: Try closing other browser tabs.

---

## Useful Links

- 📚 [Next.js Docs](https://nextjs.org/docs)
- 🎨 [Chakra UI Docs](https://chakra-ui.com/docs)
- 🎬 [Framer Motion Docs](https://www.framer.com/motion)
- 🌐 [Three.js Docs](https://threejs.org/docs)
- 📝 [Markdown Guide](https://www.markdownguide.org)

---

## Next Steps

1. ✅ Install dependencies
2. ✅ Start dev server
3. ✅ Write your first note
4. ✅ Try exporting
5. ✅ Customize colors
6. 🚀 Deploy to Vercel!

---

**Enjoy MarkFlow! ✨**

For more details, see `SETUP.md`
