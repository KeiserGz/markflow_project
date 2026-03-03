# 🎯 MarkFlow - Installation & Getting Started

## What You're Getting

MarkFlow is a modern markdown note editor built with:

- ⚛️ Next.js 14 + React 18
- 🎨 Chakra UI (beautiful components)
- 🎬 Framer Motion (smooth animations)
- 🌐 Three.js (3D background)
- 💾 Browser storage (auto-save)

---

## ⚡ Quick Setup (3 steps)

### 1️⃣ Install Dependencies

Open terminal in the project folder and run:

```bash
npm install
```

This downloads all required packages (~300MB). Grab a coffee, it takes 1-2 minutes.

### 2️⃣ Start Dev Server

```bash
npm run dev
```

You'll see:

```
> ready - started server on 0.0.0.0:3000, url: http://localhost:3000
```

### 3️⃣ Open in Browser

Visit: **http://localhost:3000**

Done! 🎉 You're ready to write.

---

## What's Inside the Box

```
MarkFlow/
├── components/
│   ├── Canvas3D.js      ← 3D background
│   ├── Editor.js        ← Markdown editor
│   ├── Preview.js       ← Live preview
│   └── Sidebar.js       ← Note list
├── pages/
│   ├── _app.js          ← App setup
│   └── index.js         ← Main page
├── store/
│   └── noteStore.js     ← Data storage
├── public/
│   └── manifest.json    ← PWA config
├── package.json         ← Dependencies
├── next.config.js       ← Next.js config
├── README.md            ← Full docs
├── SETUP.md             ← Detailed guide
└── QUICKSTART.md        ← Quick reference
```

---

## 📚 Documentation Files

| File              | Purpose                          |
| ----------------- | -------------------------------- |
| **README.md**     | Complete feature documentation   |
| **SETUP.md**      | Detailed setup and customization |
| **QUICKSTART.md** | Quick reference guide            |
| **This file**     | Installation walkthrough         |

---

## 🎯 First Time Users

### Create Your First Note

1. The app opens with a welcome note
2. Edit the title in the header
3. Type markdown in the left panel
4. See preview on the right panel
5. **Auto-saves automatically** ✅

### Try These Markdown Examples

```markdown
# Your First Heading

**Bold text** and _italic text_

Here's a list:

- Item 1
- Item 2
- Item 3

[Click me for a link](https://example.com)

\`\`\`
code block
\`\`\`
```

### Create More Notes

Click "New Note" button to create additional notes.

### Search Your Notes

Use the search box in the sidebar to find notes instantly.

### Export a Note

Click "Export" to download as:

- Markdown (.md)
- HTML (.html)
- PDF (.pdf)

---

## 🔧 Common Tasks

### Stop the Server

Press `Ctrl+C` in the terminal

### Restart the Server

```bash
npm run dev
```

### Build for Production

```bash
npm run build
npm start
```

### Clear All Data

1. Open browser DevTools (F12)
2. Go to "Application" tab
3. Click "Local Storage"
4. Find and delete "markflow-store"
5. Refresh page

---

## ⚙️ Customization Tips

### Change Brand Color

Edit `pages/_app.js`:

```javascript
colors: {
  brand: {
    500: '#FF6B6B',  // Your color
  }
}
```

### Disable 3D Background

Edit `pages/index.js`, find:

```javascript
<Box position="fixed" top={0} left={0} right={0} bottom={0} zIndex={0}>
  <Canvas3D />
</Box>
```

Delete or comment it out.

### Customize Sidebar Width

Edit `pages/index.js`, find `w="250px"` and change to desired width.

---

## 🐛 Troubleshooting

### "npm: command not found"

→ Install Node.js from https://nodejs.org/

### "Port 3000 already in use"

→ Kill the process or use different port:

```bash
npm run dev -- -p 3001
```

### Notes not saving

→ Check if localStorage is enabled:

1. Open DevTools (F12)
2. Check Storage tab
3. Try in private/incognito window

### 3D background not showing

→ Your browser might not support WebGL
→ Try a modern browser (Chrome, Firefox, Safari)

### Everything is slow

→ Close other browser tabs
→ Clear browser cache
→ Restart the dev server

---

## 🚀 Next Steps

### Beginner

- [ ] Create 5 test notes
- [ ] Try all markdown formatting
- [ ] Export a note
- [ ] Toggle dark mode

### Intermediate

- [ ] Search your notes
- [ ] Customize a color
- [ ] Read SETUP.md
- [ ] Try production build

### Advanced

- [ ] Deploy to Vercel
- [ ] Modify 3D background
- [ ] Add custom CSS
- [ ] Read source code

---

## 📖 Learning Resources

- 📖 [Markdown Guide](https://www.markdownguide.org) - Learn markdown syntax
- 🎬 [Chakra UI Docs](https://chakra-ui.com) - UI components
- ⚡ [Next.js Docs](https://nextjs.org/docs) - React framework
- 🎞️ [Framer Motion](https://www.framer.com/motion) - Animations
- 🌐 [Three.js Docs](https://threejs.org/docs) - 3D graphics

---

## 💡 Pro Tips

1. **Dark Mode** - Better for night writing, click moon icon
2. **Split View** - Best on large monitors (1400px+)
3. **Auto-save** - Never manually save, always saved
4. **Search** - Find notes faster than scrolling
5. **Export** - Backup important notes regularly

---

## 📦 What Gets Installed

When you run `npm install`, these main packages are installed:

```
next@14.0.0         - React framework
react@18.2.0        - UI library
@chakra-ui@2.8.0    - Components
framer-motion@10    - Animations
three@r158          - 3D graphics
react-markdown@8    - Markdown rendering
zustand@4.4.0       - State management
date-fns@2.30.0     - Date utilities
```

Total size: ~150KB (gzipped)

---

## 🎓 How It Works

### Editor (Left Panel)

- Pure markdown text input
- Auto-updates as you type
- Syntax toolbar for quick formatting

### Preview (Right Panel)

- Live HTML rendering
- Supports GitHub-flavored markdown
- Real-time updates

### Sidebar

- All your notes listed
- Search functionality
- Timestamps of last edit
- One-click switching

### 3D Background

- Rotating animated sphere
- Floating particles
- Auto-rotating camera
- Doesn't affect functionality

---

## 🔒 Data & Privacy

✅ **All data stored locally in your browser**
✅ **No server, no database, no tracking**
✅ **No internet required (works offline)**
✅ **Export anytime you want**
❌ **Data lost if you clear browser storage**

---

## 🎬 Demo Flow

1. Open http://localhost:3000
2. See welcome note
3. Edit title in header
4. Type markdown on left
5. See preview on right
6. Create new note
7. Search for notes
8. Export a note
9. Toggle dark mode
10. Done! 🎉

---

## 📞 Need Help?

1. Check **README.md** for features
2. Check **SETUP.md** for advanced config
3. Check **QUICKSTART.md** for quick reference
4. Check this file for troubleshooting

---

## 🎊 You're All Set!

Your MarkFlow editor is ready to use. Start creating amazing notes with:

- Beautiful markdown editor
- Live preview
- Smooth animations
- 3D effects
- Dark mode
- Auto-save
- And much more!

**Happy writing! ✍️**

---

**Questions?** Check the docs or README.md

**Ready to code?** Check SETUP.md for customization

**Want features?** See roadmap in README.md
