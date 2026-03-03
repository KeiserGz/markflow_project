import { HStack, Button, Text, Spinner, useToast, Icon } from '@chakra-ui/react'
import { useState } from 'react'
import { FiCloud, FiCheck, FiAlertCircle } from 'react-icons/fi'
import { useNoteStore } from '../store/noteStore'

export default function CloudSync() {
  const { syncStatus, cloudEnabled, setCloudEnabled } = useNoteStore()
  const [isLoading, setIsLoading] = useState(false)
  const toast = useToast()

  const handleCloudToggle = () => {
    if (!cloudEnabled) {
      // Cloud is now enabled!
      setCloudEnabled(true)
      toast({
        title: 'Cloud Sync Enabled! ☁️',
        description: 'Your notes are now syncing to the cloud',
        status: 'success',
        duration: 3000,
        isClosable: true,
      })
    } else {
      setCloudEnabled(false)
      toast({
        title: 'Cloud Sync Disabled',
        description: 'Notes will only sync locally',
        status: 'info',
        duration: 3000,
      })
    }
  }

  return (
    <HStack spacing={2} fontSize="sm">
      <Button
        size="sm"
        variant={cloudEnabled ? 'solid' : 'ghost'}
        colorScheme={cloudEnabled ? 'blue' : 'gray'}
        onClick={handleCloudToggle}
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
