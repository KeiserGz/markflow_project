# 🚀 MarkFlow - Modern Markdown Note Editor

A beautiful, high-performance markdown note editor built with cutting-edge web technologies. Features live preview, 3D animations, and a sleek modern interface.

![Next.js](https://img.shields.io/badge/Next.js-14-black?style=flat-square&logo=next.js)
![React](https://img.shields.io/badge/React-18-blue?style=flat-square&logo=react)
![Chakra UI](https://img.shields.io/badge/Chakra%20UI-2.8-green?style=flat-square&logo=chakra-ui)
![Three.js](https://img.shields.io/badge/Three.js-r158-orange?style=flat-square&logo=three.js)
![Framer Motion](https://img.shields.io/badge/Framer%20Motion-10-purple?style=flat-square&logo=framer)

## ✨ Features

### Core Features

- 📝 **Live Markdown Editor** - Write markdown with syntax highlighting
- 👀 **Real-time Preview** - See your formatted content instantly
- 🎨 **Beautiful UI** - Modern, clean interface built with Chakra UI
- 🌙 **Dark Mode** - Seamless dark/light theme support
- 💾 **Auto-save** - All notes automatically saved to browser storage
- 🔍 **Search** - Instantly search through all your notes
- 📱 **Fully Responsive** - Perfect on desktop, tablet, and mobile

### Advanced Features

- 🎬 **Smooth Animations** - Powered by Framer Motion
- 🌐 **3D Background** - Interactive Three.js visualizations
- 📊 **Side-by-side Editor** - Edit and preview simultaneously
- 🎯 **Markdown Toolbar** - Quick formatting buttons
- 💫 **Floating Particles** - Animated 3D particles in background
- 📤 **Export Options** - Export as Markdown, HTML, or PDF
- 🏷️ **Note Management** - Organize, search, and manage multiple notes

## 🛠️ Tech Stack

- **[Next.js 14](https://nextjs.org)** - React framework for production
- **[React 18](https://react.dev)** - UI library
- **[Chakra UI 2.8](https://chakra-ui.com)** - Component library
- **[Framer Motion 10](https://www.framer.com/motion)** - Animation library
- **[Three.js r158](https://threejs.org)** - 3D graphics library
- **[React Three Fiber 8](https://docs.pmnd.rs/react-three-fiber)** - React renderer for Three.js
- **[React Markdown 8](https://github.com/remarkjs/react-markdown)** - Markdown renderer
- **[Zustand 4](https://github.com/pmndrs/zustand)** - State management
- **[date-fns 2.30](https://date-fns.org)** - Date utility library

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Git

### Installation

1. **Clone or navigate to the project**

```bash
cd tasklistapp
```

2. **Install dependencies**

```bash
npm install
# or
yarn install
```

3. **Run the development server**

```bash
npm run dev
# or
yarn dev
```

4. **Open in browser**
   Navigate to `http://localhost:3000` in your web browser.

### Build for Production

```bash
npm run build
npm start
```

## 📖 Usage Guide

### Creating Notes

1. Click the "New Note" button in the sidebar
2. Enter a title for your note
3. Start typing markdown in the editor
4. See the live preview on the right

### Formatting

The editor includes a toolbar with quick format options:

- **Bold**: `**text**`
- **Code**: `` `code` ``
- **Lists**: `- item`

Or use keyboard shortcuts in the markdown text.

### Markdown Support

MarkFlow supports standard markdown syntax:

```markdown
# Headings

## Level 2

### Level 3

**Bold** text
_Italic_ text
`Code` text

- Unordered list
- Item 2

1. Ordered list
2. Item 2

> Blockquote

[Links](https://example.com)

![Images](image.jpg)

\`\`\`
Code blocks
\`\`\`
```

### Searching Notes

Use the search box in the sidebar to find notes by title or content. Search updates in real-time.

### Managing Notes

- **Delete**: Click the "Delete" button in the header
- **Export**: Use the "Export" menu to download as Markdown, HTML, or PDF
- **Switch Notes**: Click any note in the sidebar to switch

### Themes

Toggle between light and dark mode using the theme button in the header:

- 🌙 Dark mode for low-light environments
- ☀️ Light mode for daytime use

## 🎨 Design Highlights

### UI Components

- Responsive sidebar with note navigation
- Tabbed modal interface
- Animated transitions and interactions
- Smooth scrolling
- Touch-friendly buttons

### 3D Visualization

- Rotating animated sphere
- Floating particle system
- Auto-rotating camera
- Dynamic lighting

### Color Scheme

- **Brand Blue**: Primary actions and accents
- **Neutral Grays**: Background and text
- **Semantic Colors**: Success (green), Warning (yellow), Danger (red)

## 📁 Project Structure

```
markflow/
├── pages/
│   ├── _app.js              # App wrapper with Chakra UI
│   └── index.js             # Main editor page
├── components/
│   ├── Editor.js            # Markdown editor with toolbar
│   ├── Preview.js           # Markdown preview renderer
│   ├── Sidebar.js           # Note list and navigation
│   └── Canvas3D.js          # Three.js 3D background
├── store/
│   └── noteStore.js         # Zustand state management
├── public/                  # Static assets
├── package.json             # Dependencies and scripts
├── next.config.js           # Next.js configuration
└── README.md                # This file
```

## 🔧 Configuration

### Modifying Theme Colors

Edit `pages/_app.js` to change the color scheme:

```javascript
colors: {
  brand: {
    500: '#0ea5e9',  // Primary blue
    600: '#0284c7',
    700: '#0369a1',
    // ... more shades
  },
}
```

### Customizing 3D Background

Edit `components/Canvas3D.js`:

- Adjust `autoRotateSpeed` for rotation speed
- Modify sphere size with `scale` prop
- Change particle count in `FloatingParticles`
- Update colors and lighting

### Local Storage

Notes are automatically saved to browser's localStorage:

- Key: `markflow-store`
- Version: 1
- Persistent across browser sessions

## 🚀 Performance Optimizations

- ⚡ **Code Splitting**: Automatic with Next.js
- 🖼️ **Image Optimization**: Built-in image optimization
- 📦 **Bundle Analysis**: Use `npm run analyze` (requires setup)
- 🔄 **Caching**: Optimized with Next.js caching
- 🎯 **Dynamic Imports**: Components loaded on demand

## 🌐 Browser Support

- ✅ Chrome/Edge 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Mobile Safari (iOS 14+)
- ✅ Chrome Mobile (Android)

## 📝 Keyboard Shortcuts

| Shortcut       | Action             |
| -------------- | ------------------ |
| `Enter`        | New line in editor |
| `Ctrl/Cmd + S` | Save (automatic)   |
| `Ctrl/Cmd + B` | Bold (manually)    |

## 🔮 Future Enhancements

- [ ] Cloud sync with backend
- [ ] Collaborative editing
- [ ] Rich text editor option
- [ ] LaTeX/KaTeX support
- [ ] Syntax highlighting
- [ ] Custom CSS themes
- [ ] Note tags and categories
- [ ] Date-based organization
- [ ] Share notes via URL
- [ ] Dark mode schedule
- [ ] AI-powered suggestions
- [ ] Voice-to-text

## 🤝 Contributing

Contributions are welcome! Feel free to:

- Report bugs
- Suggest features
- Submit pull requests
- Improve documentation

## 📄 License

This project is open source and available under the MIT License.

## 💡 Tips & Tricks

1. **Split View**: Use the editor and preview side by side on desktop
2. **Search**: Use the sidebar search for quick note lookup
3. **Export**: Always export important notes as backup
4. **Organize**: Keep your notes organized with clear titles
5. **Markdown**: Learn markdown syntax for powerful formatting

## 🆘 Troubleshooting

### Notes not saving?

- Check browser storage is enabled
- Verify localStorage has space available
- Try clearing cache and reloading

### 3D background not showing?

- Ensure WebGL is enabled in your browser
- Check browser console for errors
- Try disabling browser extensions

### Performance issues?

- Reduce number of open notes
- Clear browser cache
- Close other tabs
- Update browser to latest version

## 📧 Support

For issues, questions, or suggestions, please [open an issue](https://github.com/yourusername/markflow/issues) on GitHub.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org) team for the amazing framework
- [Chakra UI](https://chakra-ui.com) for beautiful components
- [Framer](https://www.framer.com) for Framer Motion
- [Three.js](https://threejs.org) for 3D graphics
- All open-source contributors

---

**Built with ❤️ using modern web technologies**

Made with Next.js • Chakra UI • Framer Motion • Three.js

**Version 1.0** • February 2026
