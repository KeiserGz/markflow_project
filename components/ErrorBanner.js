import { Alert, AlertIcon, Box, CloseButton } from '@chakra-ui/react'
import { useState } from 'react'

export default function ErrorBanner({ error, onClose }) {
  if (!error) return null

  return (
    <Alert status="error" variant="solid">
      <AlertIcon />
      <Box flex="1">{error}</Box>
      {onClose && <CloseButton onClick={onClose} />}
    </Alert>
  )
}
