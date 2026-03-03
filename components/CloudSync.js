import { HStack, Button, Text, Spinner, useToast, Icon } from '@chakra-ui/react'
import { useState, useEffect } from 'react'
import { FiCloud, FiCheck, FiAlertCircle } from 'react-icons/fi'
import { useNoteStore } from '../store/noteStore'
import { db } from '../lib/firebase'
import { collection, setDoc, doc } from 'firebase/firestore'

export default function CloudSync() {
  const { notes, syncStatus, cloudEnabled, setCloudEnabled, setSyncStatus } =
    useNoteStore()
  const [isLoading, setIsLoading] = useState(false)
  const toast = useToast()

  // Sync notes to Firebase when cloud is enabled
  useEffect(() => {
    if (!cloudEnabled || notes.length === 0) return

    const syncToCloud = async () => {
      try {
        setSyncStatus('syncing')
        setIsLoading(true)

        // Use device ID as user ID for now
        const userId = 'demo-user-' + (typeof window !== 'undefined' ? window.location.hostname : 'local')

        // Sync each note to Firestore
        for (const note of notes) {
          const noteRef = doc(db, 'users', userId, 'notes', note.id)
          await setDoc(noteRef, note, { merge: true })
        }

        setSyncStatus('synced')
        setIsLoading(false)

        toast({
          title: 'Synced! ✅',
          description: `${notes.length} note(s) saved to cloud`,
          status: 'success',
          duration: 2000,
        })

        // Reset status after 2 seconds
        setTimeout(() => setSyncStatus('idle'), 2000)
      } catch (error) {
        console.error('Sync error:', error)
        setSyncStatus('error')
        setIsLoading(false)

        toast({
          title: 'Sync Failed ❌',
          description: error.message,
          status: 'error',
          duration: 3000,
        })
      }
    }

    // Auto-sync every 10 seconds when cloud is enabled
    syncToCloud()
    const interval = setInterval(syncToCloud, 10000)

    return () => clearInterval(interval)
  }, [cloudEnabled, notes, setSyncStatus, toast])

  const handleCloudToggle = () => {
    if (!cloudEnabled) {
      setCloudEnabled(true)
      toast({
        title: 'Cloud Sync Enabled! ☁️',
        description: 'Your notes are now syncing to Firebase',
        status: 'success',
        duration: 3000,
        isClosable: true,
      })
    } else {
      setCloudEnabled(false)
      setSyncStatus('idle')
      toast({
        title: 'Cloud Sync Disabled',
        description: 'Notes will only sync locally',
        status: 'info',
        duration: 3000,
      })
    }
  }

  return (
    <HStack spacing={2} fontSize="sm" pointerEvents="auto">
      <Button
        size="sm"
        variant={cloudEnabled ? 'solid' : 'ghost'}
        colorScheme={cloudEnabled ? 'blue' : 'gray'}
        onClick={handleCloudToggle}
        isLoading={isLoading}
        leftIcon={
          syncStatus === 'syncing' ? (
            <Spinner size="xs" />
          ) : syncStatus === 'synced' ? (
            <Icon as={FiCheck} />
          ) : syncStatus === 'error' ? (
            <Icon as={FiAlertCircle} />
          ) : (
            <Icon as={FiCloud} />
          )
        }
      >
        {cloudEnabled ? 'Cloud: On' : 'Cloud: Off'}
      </Button>

      {syncStatus !== 'idle' && (
        <Text fontSize="xs" color="gray.500">
          {syncStatus === 'syncing' && 'Syncing...'}
          {syncStatus === 'synced' && 'Synced!'}
          {syncStatus === 'error' && 'Sync error'}
        </Text>
      )}
    </HStack>
  )
}
