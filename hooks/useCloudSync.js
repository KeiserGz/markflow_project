import { useEffect } from 'react'
import {
  collection,
  doc,
  setDoc,
  getDocs,
  deleteDoc,
  query,
  where,
  onSnapshot,
} from 'firebase/firestore'
import { useNoteStore } from '../store/noteStore'
import { db, auth } from './firebase'

export function useCloudSync() {
  const { notes, setSyncStatus, addNote, updateNote, deleteNote } =
    useNoteStore()

  // Sync notes to Firebase
  const syncNotesToCloud = async (userId) => {
    if (!userId) return

    try {
      setSyncStatus('syncing')

      // Sync each note
      for (const note of notes) {
        const noteRef = doc(db, 'users', userId, 'notes', note.id)
        await setDoc(noteRef, note, { merge: true })
      }

      setSyncStatus('synced')
      setTimeout(() => setSyncStatus('idle'), 2000)
    } catch (error) {
      console.error('Cloud sync error:', error)
      setSyncStatus('error')
    }
  }

  // Load notes from Firebase
  const loadNotesFromCloud = async (userId) => {
    if (!userId) return

    try {
      setSyncStatus('syncing')

      const notesRef = collection(db, 'users', userId, 'notes')
      const snapshot = await getDocs(notesRef)

      if (snapshot.empty) {
        setSyncStatus('synced')
        return
      }

      snapshot.forEach((doc) => {
        const note = doc.data()
        // Notes would already be updated via real-time listener
      })

      setSyncStatus('synced')
      setTimeout(() => setSyncStatus('idle'), 2000)
    } catch (error) {
      console.error('Error loading cloud notes:', error)
      setSyncStatus('error')
    }
  }

  // Subscribe to real-time updates
  const subscribeToCloudNotes = (userId, onNotesUpdate) => {
    if (!userId) return () => {}

    try {
      const notesRef = collection(db, 'users', userId, 'notes')
      const unsubscribe = onSnapshot(notesRef, (snapshot) => {
        const cloudNotes = []
        snapshot.forEach((doc) => {
          cloudNotes.push(doc.data())
        })
        onNotesUpdate(cloudNotes)
      })

      return unsubscribe
    } catch (error) {
      console.error('Error subscribing to cloud notes:', error)
      return () => {}
    }
  }

  return {
    syncNotesToCloud,
    loadNotesFromCloud,
    subscribeToCloudNotes,
  }
}
