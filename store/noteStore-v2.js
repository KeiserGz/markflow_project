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
- **Firebase** for cloud sync

## Features

✨ **Live Preview** - See your markdown rendered in real-time
🎨 **Beautiful UI** - Modern design with dark mode support
🌐 **3D Background** - Interactive Three.js visualization
💾 **Cloud Sync** - Auto-save to Firebase
📱 **Responsive** - Works on all devices
🔍 **Search** - Find your notes easily

## Try it out!

1. Edit this note on the left
2. See the preview on the right
3. Create new notes using the sidebar
4. Your notes auto-save locally and sync to cloud

Happy writing! ✍️`,
  createdAt: new Date().toISOString(),
  lastModified: new Date().toISOString(),
}

export const useNoteStore = create(
  persist(
    (set, get) => ({
      notes: [defaultNote],
      currentNoteId: defaultNote.id,
      syncStatus: 'idle', // idle, syncing, synced, error
      cloudEnabled: false,

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
          syncStatus: 'idle',
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
          syncStatus: 'idle',
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
            syncStatus: 'idle',
          }
        })
      },

      setCurrentNote: (id) => {
        set((state) => ({
          currentNoteId: state.notes.find((n) => n.id === id)
            ? id
            : state.currentNoteId,
        }))
      },

      exportNote: (note, format) => {
        let content = note.content
        let filename = `${note.title || 'note'}`
        let mimeType = 'text/plain'

        if (format === 'html') {
          const htmlContent = `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>${note.title}</title>
  <style>
    body { font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px; }
    h1, h2, h3 { color: #0ea5e9; }
  </style>
</head>
<body>
  <h1>${note.title}</h1>
  <pre>${content}</pre>
</body>
</html>`
          content = htmlContent
          filename += '.html'
          mimeType = 'text/html'
        } else if (format === 'pdf') {
          filename += '.txt'
          mimeType = 'text/plain'
        } else {
          filename += '.md'
        }

        const blob = new Blob([content], { type: mimeType })
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = filename
        a.click()
        URL.revokeObjectURL(url)
      },

      setSyncStatus: (status) => {
        set({ syncStatus: status })
      },

      setCloudEnabled: (enabled) => {
        set({ cloudEnabled: enabled })
      },

      getNotes: () => get().notes,
      getCurrentNote: () => {
        const { notes, currentNoteId } = get()
        return notes.find((n) => n.id === currentNoteId)
      },
    }),
    {
      name: 'markflow-notes',
    }
  )
)
