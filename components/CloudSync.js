import { HStack, Button, Text, Spinner, useToast, Icon } from '@chakra-ui/react'
import { useState, useEffect } from 'react'
import { FiCloud, FiCheck, FiAlertCircle } from 'react-icons/fi'
import { useNoteStore } from '../store/noteStore'
import { db } from '../lib/firebase'
import { setDoc, doc } from 'firebase/firestore'

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

        // Use browser storage key as user ID
        const userId = 'device-' + Date.now()

        // Sync each note to Firestore
        for (const note of notes) {
          try {
            const noteRef = doc(db, 'users', userId, 'notes', note.id)
            await setDoc(noteRef, {
              ...note,
              syncedAt: new Date().toISOString(),
            })
          } catch (noteError) {
            console.error('Error syncing note:', noteError)
          }
        }

        setSyncStatus('synced')

        toast({
          title: 'Synced! ✅',
          description: `${notes.length} note(s) saved to cloud`,
          status: 'success',
          duration: 2000,
        })

        // Reset status after 2 seconds
        setTimeout(() => {
          setSyncStatus('idle')
          setIsLoading(false)
        }, 2000)
      } catch (error) {
        console.error('Sync error:', error)
        setSyncStatus('error')
        setIsLoading(false)

        toast({
          title: 'Sync Error ❌',
          description: 'Make sure Firestore is enabled in Firebase Console',
          status: 'error',
          duration: 4000,
        })

        setTimeout(() => setSyncStatus('idle'), 4000)
      }
    }

    // Sync immediately
    syncToCloud()

    // Auto-sync every 15 seconds
    const interval = setInterval(syncToCloud, 15000)
    return () => clearInterval(interval)
  }, [cloudEnabled, notes, setSyncStatus, toast])

  const handleCloudToggle = () => {
    if (!cloudEnabled) {
      setCloudEnabled(true)
      setSyncStatus('syncing')
      toast({
        title: 'Cloud Sync Enabled ☁️',
        description: 'Syncing your notes now...',
        status: 'info',
        duration: 2000,
      })
    } else {
      setCloudEnabled(false)
      setSyncStatus('idle')
      toast({
        title: 'Cloud Sync Disabled',
        description: 'Notes saved locally only',
        status: 'info',
        duration: 2000,
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
        onTouchEnd={(e) => {
          e.preventDefault()
          handleCloudToggle()
        }}
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
        _active={{ opacity: 0.7 }}
      >
        {cloudEnabled ? 'Cloud: On' : 'Cloud: Off'}
      </Button>

      {(syncStatus === 'syncing' || syncStatus === 'synced') && (
        <Text fontSize="xs" color="gray.500">
          {syncStatus === 'syncing' && 'Syncing...'}
          {syncStatus === 'synced' && 'Synced!'}
        </Text>
      )}
    </HStack>
  )
}
