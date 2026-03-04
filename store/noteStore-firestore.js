import { create } from 'zustand'
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  query,
  where,
  onSnapshot,
  serverTimestamp,
} from 'firebase/firestore'
import { db } from '../lib/firebase'

export const useNoteStore = create((set, get) => ({
  notes: [],
  currentNoteId: null,
  loading: false,
  userId: null,
  error: null,

  setError: (error) => {
    set({ error })
  },

  setUserId: (userId) => {
    set({ userId, error: null })
    // Load notes when userId is set
    if (userId) {
      get().loadNotes(userId)
    } else {
      set({ notes: [], currentNoteId: null })
    }
  },

  loadNotes: (userId) => {
    if (!userId) return

    set({ loading: true, error: null })

    try {
      const q = query(collection(db, 'notes'), where('userId', '==', userId))

      const unsubscribe = onSnapshot(
        q,
        (snapshot) => {
          const notesList = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))

          set({ notes: notesList, loading: false, error: null })

          // Set current note to first note if none selected
          if (notesList.length > 0 && !get().currentNoteId) {
            set({ currentNoteId: notesList[0].id })
          }
        },
        (error) => {
          console.error('Error loading notes:', error)
          let userFriendlyError = 'Failed to load notes'

          if (error.code === 'permission-denied') {
            userFriendlyError =
              'Permission denied - Check Firestore setup in AUTH_SETUP.md'
          } else if (error.code === 'failed-precondition') {
            userFriendlyError =
              'Firestore database not created - See AUTH_SETUP.md'
          }

          set({ loading: false, error: userFriendlyError })
        }
      )

      return unsubscribe
    } catch (error) {
      console.error('Error loading notes:', error)
      set({
        loading: false,
        error: 'Failed to load notes - Check console for details',
      })
    }
  },

  addNote: async (userId) => {
    if (!userId) return null

    try {
      const newNote = {
        userId,
        title: 'Untitled',
        content: '',
        createdAt: serverTimestamp(),
        lastModified: serverTimestamp(),
      }

      const docRef = await addDoc(collection(db, 'notes'), newNote)
      set({ error: null })
      set({ currentNoteId: docRef.id })

      return { id: docRef.id, ...newNote }
    } catch (error) {
      console.error('Error adding note:', error)
      let userFriendlyError = 'Failed to create note'

      if (error.code === 'permission-denied') {
        userFriendlyError =
          'Permission denied - Check Firestore rules in AUTH_SETUP.md'
      }

      set({ error: userFriendlyError })
      return null
    }
  },

  updateNote: async (noteId, updates) => {
    if (!noteId) return

    try {
      const noteRef = doc(db, 'notes', noteId)
      await updateDoc(noteRef, {
        ...updates,
        lastModified: serverTimestamp(),
      })
      set({ error: null })
    } catch (error) {
      console.error('Error updating note:', error)
      let userFriendlyError = 'Failed to update note'

      if (error.code === 'permission-denied') {
        userFriendlyError = 'Permission denied - Check Firestore rules'
      }

      set({ error: userFriendlyError })
    }
  },

  deleteNote: async (noteId) => {
    if (!noteId) return

    try {
      await deleteDoc(doc(db, 'notes', noteId))

      const notes = get().notes
      if (notes.length > 1) {
        const nextNote = notes.find((n) => n.id !== noteId)
        set({ currentNoteId: nextNote?.id || null })
      } else {
        set({ currentNoteId: null })
      }
      set({ error: null })
    } catch (error) {
      console.error('Error deleting note:', error)
      let userFriendlyError = 'Failed to delete note'

      if (error.code === 'permission-denied') {
        userFriendlyError = 'Permission denied - Check Firestore rules'
      }

      set({ error: userFriendlyError })
    }
  },

  setCurrentNote: (noteId) => {
    set({ currentNoteId: noteId })
  },

  exportNote: (note, format) => {
    if (!note) return

    const filename = note.title || 'Untitled'
    let content = ''
    let mimeType = ''

    switch (format) {
      case 'md':
        content = note.content
        mimeType = 'text/markdown'
        break
      case 'html':
        content = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>${note.title}</title>
  <style>
    body { font-family: Arial, sans-serif; max-width: 800px; margin: 40px auto; }
    h1 { color: #333; }
    code { background: #f4f4f4; padding: 2px 6px; border-radius: 3px; }
    pre { background: #f4f4f4; padding: 10px; border-radius: 5px; overflow-x: auto; }
  </style>
</head>
<body>
  ${note.content.replace(/\n/g, '<br>')}
</body>
</html>
        `
        mimeType = 'text/html'
        break
      case 'pdf':
        // For PDF, we'll just export as text for now
        content = note.content
        mimeType = 'application/pdf'
        break
      default:
        content = note.content
        mimeType = 'text/plain'
    }

    const blob = new Blob([content], { type: mimeType })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `${filename}.${format}`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  },
}))
