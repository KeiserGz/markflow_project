import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const defaultNote = {
  id: Date.now().toString(),
  title: 'Welcome to MarkFlow',
  content: `# Welcome to MarkFlow! 🚀

A modern markdown note editor built with:
- **Next.js** for fast performance
- **Chakra UI** for beautiful components
- **Framer Motion** for smooth animations
- **Three.js** for interactive 3D backgrounds
- **React Markdown** for rendering

## Features

✨ **Live Preview** - See your markdown rendered in real-time
🎨 **Beautiful UI** - Modern design with dark mode support
🌐 **3D Background** - Interactive Three.js visualization
💾 **Auto-save** - All notes stored in your browser
🔍 **Search** - Find your notes easily
📱 **Responsive** - Works on all devices

## Try it out!

1. Edit this note on the left
2. See the preview on the right
3. Create new notes using the sidebar
4. Use **Bold**, *Italic*, \`Code\`, and more

## Markdown Support

- **Headers**: # H1, ## H2, ### H3
- **Lists**: Unordered and numbered lists
- **Code**: Inline \`code\` or code blocks
- **Quotes**: > Blockquotes
- **Links**: [Google](https://google.com)
- **Images**: ![alt](url)

Happy writing! ✍️`,
  createdAt: new Date().toISOString(),
  lastModified: new Date().toISOString(),
}

export const useNoteStore = create(
  persist(
    (set, get) => ({
      notes: [defaultNote],
      currentNoteId: defaultNote.id,
      cloudEnabled: false,
      syncStatus: 'idle',

      setCloudEnabled: (enabled) => {
        set({ cloudEnabled: enabled })
      },

      setSyncStatus: (status) => {
        set({ syncStatus: status })
      },

      addNote: () => {
        const newNote = {
          id: Date.now().toString(),
          title: 'Untitled Note',
          content: '',
          createdAt: new Date().toISOString(),
          lastModified: new Date().toISOString(),
        }

        set((state) => ({
          notes: [newNote, ...state.notes],
          currentNoteId: newNote.id,
        }))

        return newNote
      },

      updateNote: (id, updates) => {
        set((state) => ({
          notes: state.notes.map((note) =>
            note.id === id
              ? {
                  ...note,
                  ...updates,
                  lastModified: new Date().toISOString(),
                }
              : note
          ),
        }))
      },

      deleteNote: (id) => {
        set((state) => {
          const filteredNotes = state.notes.filter((note) => note.id !== id)
          const newCurrentId =
            state.currentNoteId === id
              ? filteredNotes[0]?.id || state.notes[0]?.id
              : state.currentNoteId

          return {
            notes: filteredNotes.length > 0 ? filteredNotes : [defaultNote],
            currentNoteId: newCurrentId || defaultNote.id,
          }
        })
      },

      setCurrentNote: (id) => {
        set((state) => ({
          currentNoteId: state.notes.find((n) => n.id === id)
            ? id
            : state.notes[0]?.id,
        }))
      },

      exportNote: (note, format) => {
        let content = ''
        let filename = note.title || 'note'

        if (format === 'md') {
          content = note.content
          filename += '.md'
        } else if (format === 'html') {
          content = `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>${note.title}</title>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; max-width: 800px; margin: 0 auto; padding: 20px; }
    h1, h2, h3 { color: #333; }
    code { background: #f4f4f4; padding: 2px 5px; border-radius: 3px; }
    pre { background: #f4f4f4; padding: 10px; border-radius: 5px; overflow-x: auto; }
  </style>
</head>
<body>
  <h1>${note.title}</h1>
  <div>${note.content}</div>
</body>
</html>`
          filename += '.html'
        } else if (format === 'pdf') {
          content = note.content
          filename += '.pdf'
        }

        const blob = new Blob([content], { type: 'text/plain' })
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = filename
        document.body.appendChild(a)
        a.click()
        window.URL.revokeObjectURL(url)
        document.body.removeChild(a)
      },
    }),
    {
      name: 'markflow-store',
      version: 1,
    }
  )
)
