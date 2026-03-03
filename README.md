# 📝 MarkFlow - Modern Markdown Note Editor

![MarkFlow](https://img.shields.io/badge/MarkFlow-1.0-blue?style=flat-square&logo=markdown)
![Next.js](https://img.shields.io/badge/Next.js-14-black?style=flat-square&logo=next.js)
![React](https://img.shields.io/badge/React-18-blue?style=flat-square&logo=react)
![Chakra UI](https://img.shields.io/badge/Chakra%20UI-2.8-green?style=flat-square)

A stunning, feature-rich markdown note editor with live preview, beautiful animations, and interactive 3D backgrounds. Built with modern web technologies for maximum performance and user experience.

## 🌟 Key Features

### 📝 Editor & Preview

- **Split-view editor** - Write markdown on the left, see formatted output on the right
- **Live preview** - Instant rendering as you type
- **Syntax toolbar** - Quick formatting buttons (Bold, Code, Lists)
- **Full markdown support** - Headers, lists, code blocks, blockquotes, links, and more

### 🎨 Beautiful Interface

- **Modern design** - Built with Chakra UI components
- **Dark/Light themes** - Toggle with one click
- **Smooth animations** - Powered by Framer Motion
- **Responsive layout** - Desktop, tablet, and mobile optimized
- **Interactive 3D background** - Rotating sphere and floating particles

### 💾 Smart Organization

- **Auto-save** - Notes saved automatically to browser storage
- **Multiple notes** - Create and manage multiple documents
- **Search function** - Instantly find notes by title or content
- **Timestamps** - Track when notes were last modified

### 📤 Export Options

- **Markdown** - Export as `.md` file
- **HTML** - Export as static `.html` file
- **PDF** - Export as `.pdf` document

### ⚡ Performance

- Next.js optimization
- Code splitting
- Efficient re-rendering
- Smooth 60fps animations

## 🚀 Quick Start

### Installation (30 seconds)

```bash
# 1. Install dependencies
npm install

# 2. Start development server
npm run dev

# 3. Open browser to http://localhost:3000
```

That's it! Start editing immediately.

### Production Build

```bash
npm run build
npm start
```

## 💻 Technology Stack

| Technology            | Purpose                        |
| --------------------- | ------------------------------ |
| **Next.js 14**        | React framework with SSR & SSG |
| **React 18**          | UI library                     |
| **Chakra UI**         | Component library              |
| **Framer Motion**     | Animation library              |
| **Three.js**          | 3D graphics                    |
| **React Three Fiber** | React wrapper for Three.js     |
| **React Markdown**    | Markdown renderer              |
| **Zustand**           | State management               |
| **date-fns**          | Date utilities                 |

## 📖 Usage

### Creating Notes

1. Click "New Note" button in sidebar
2. Enter a title
3. Start typing markdown
4. Note auto-saves

### Writing Markdown

Use standard markdown syntax:

```markdown
# Heading

**Bold** _italic_ `code`

- Lists
  [Links](url)
```

### Searching

Type in the search box to find notes by title or content in real-time.

### Exporting

Click "Export" menu to download notes in multiple formats.

### Switching Themes

Click the sun/moon icon in the header to toggle between light and dark mode.

## 🎨 Customization

### Change Brand Color

Edit `pages/_app.js`:

```javascript
colors: {
  brand: {
    500: '#your-hex-color',
  }
}
```

### Modify 3D Background

Edit `components/Canvas3D.js`:

- Adjust rotation speed
- Change particle count
- Modify colors and materials
- Enable/disable auto-rotation

### Disable 3D Entirely

Comment out `<Canvas3D />` in `pages/index.js`

## 📁 Project Structure

```
MarkFlow/
├── pages/
│   ├── _app.js           # App setup with Chakra UI
│   └── index.js          # Main editor page
├── components/
│   ├── Editor.js         # Markdown editor
│   ├── Preview.js        # Markdown preview
│   ├── Sidebar.js        # Note navigation
│   └── Canvas3D.js       # 3D background
├── store/
│   └── noteStore.js      # State management
├── public/               # Static files
├── package.json          # Dependencies
├── next.config.js        # Next.js config
└── README.md             # This file
```

## 🔧 Configuration

### Environment Variables

See `.env.example` for all available options.

### Local Storage

- **Key**: `markflow-store`
- **Stored Data**: All notes and metadata
- **Persistence**: Across browser sessions
- **Reset**: Clear browser localStorage

## 🌐 Browser Support

- ✅ Chrome/Edge 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Mobile browsers

## 📊 Performance

- **FCP**: < 1.5s (First Contentful Paint)
- **LCP**: < 2.5s (Largest Contentful Paint)
- **CLS**: < 0.1 (Cumulative Layout Shift)
- **Bundle size**: ~150KB gzipped

## 🚀 Deployment

### Deploy to Vercel (Recommended)

```bash
npm install -g vercel
vercel
```

### Deploy to Netlify

```bash
npm run build
# Deploy 'out' directory
```

### Docker

```bash
docker build -t markflow .
docker run -p 3000:3000 markflow
```

## 🛠️ Available Commands

```bash
npm run dev       # Start development server
npm run build     # Build for production
npm start         # Start production server
npm run lint      # Run ESLint
```

## 🔐 Privacy & Security

- All notes stored locally in your browser
- No data sent to external servers
- No tracking or analytics
- Fully private by default
- Export anytime you want

## 📱 Responsive Design

- **Desktop**: Full side-by-side editor and preview
- **Tablet**: Stacked layout
- **Mobile**: Full-width editor with preview toggle

## 🎯 Keyboard Shortcuts

| Shortcut           | Action        |
| ------------------ | ------------- |
| `Ctrl+S` / `Cmd+S` | Save _(auto)_ |
| `Enter`            | New line      |
| `Tab`              | Indent        |

## 🐛 Known Limitations

- Max note size: ~5MB (browser storage limit)
- Preview renders on client (no server-side rendering)
- No real-time collaboration
- Single user per browser

## 🚧 Future Roadmap

- [ ] Cloud synchronization
- [ ] Real-time collaboration
- [ ] Rich text editor mode
- [ ] LaTeX/Math support
- [ ] Custom themes
- [ ] Plugin system
- [ ] Share public links
- [ ] All-in-one markdown

## 💡 Tips & Tricks

1. **Split view** - Works best on desktop (>1400px width)
2. **Search scope** - Search looks in title and content
3. **Export regularly** - Backup important notes
4. **Browser sync** - Notes stay in browser, consider exporting
5. **Markdown mastery** - Learn [CommonMark syntax](https://commonmark.org)

## 🆘 FAQ

**Q: Will my notes sync across devices?**
A: No, notes are stored locally. Use export to sync manually.

**Q: Can I use this offline?**
A: Yes! Once loaded, works completely offline.

**Q: Is there a mobile app?**
A: Not yet, but the web app is fully responsive.

**Q: Can I self-host?**
A: Yes! Deploy to Vercel, Netlify, or your own server.

**Q: How do I back up my notes?**
A: Use the export function or check localStorage.

## 🤝 Contributing

Contributions welcome!

- Report bugs
- Suggest features
- Submit PRs
- Improve docs

## 📄 License

MIT License - Feel free to use, modify, and distribute.

## 🙏 Credits

Built with love using:

- [Next.js](https://nextjs.org)
- [React](https://react.dev)
- [Chakra UI](https://chakra-ui.com)
- [Framer Motion](https://www.framer.com/motion)
- [Three.js](https://threejs.org)

## 📧 Support

- 📖 See [SETUP.md](./SETUP.md) for detailed setup guide
- ⚡ See [QUICKSTART.md](./QUICKSTART.md) for quick reference
- 🐛 Report issues with reproduction steps
- 💬 Check FAQs above

---

**Made with ❤️ for markdown enthusiasts**

Built with Next.js • React • Chakra UI • Framer Motion • Three.js

**v1.0** | February 2026
