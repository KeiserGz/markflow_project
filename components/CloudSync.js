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
        console.log('📤 Starting sync with timeout...')

        // Use browser storage key as user ID
        const userId = 'device-' + Date.now()

        // Create a timeout promise that rejects after 10 seconds
        const timeoutPromise = new Promise((_, reject) =>
          setTimeout(() => reject(new Error('Sync timeout after 10 seconds')), 10000)
        )

        // Sync each note to Firestore
        const syncPromises = notes.map(async (note) => {
          try {
            const noteRef = doc(db, 'users', userId, 'notes', note.id)
            await Promise.race([
              setDoc(noteRef, {
                ...note,
                syncedAt: new Date().toISOString(),
              }),
              timeoutPromise,
            ])
            console.log('✅ Synced note:', note.id)
          } catch (noteError) {
            console.error('❌ Error syncing note:', note.id, noteError?.message)
            throw noteError
          }
        })

        // Wait for all notes to sync, but with overall timeout
        await Promise.race([Promise.all(syncPromises), timeoutPromise])

        setSyncStatus('synced')
        console.log('🎉 All notes synced successfully!')

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
        console.error('❌ Sync error:', error?.message || error)
        setSyncStatus('error')
        setIsLoading(false)

        let description = error?.message || 'Unknown error'
        if (description.includes('timeout')) {
          description = 'Sync timeout - check if Firestore is enabled'
        } else if (description.includes('permission')) {
          description = 'Permission denied - check Firestore rules'
        }

        toast({
          title: 'Sync Error ❌',
          description,
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
    console.log('🔘 Cloud button clicked! Current enabled:', cloudEnabled)

    if (!cloudEnabled) {
      console.log('✅ Enabling cloud sync...')
      setCloudEnabled(true)
      setSyncStatus('syncing')
      toast({
        title: 'Cloud Sync Enabled ☁️',
        description: 'Syncing your notes now...',
        status: 'info',
        duration: 2000,
      })
    } else {
      console.log('❌ Disabling cloud sync...')
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
