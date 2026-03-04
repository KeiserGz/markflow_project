import {
  Box,
  VStack,
  Button,
  Text,
  useColorModeValue,
  HStack,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  Tooltip,
  List,
  ListItem,
} from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { FiSearch, FiFileText, FiEdit3, FiClock } from 'react-icons/fi'
import { useState } from 'react'
import { formatDistanceToNow } from 'date-fns'

const MotionBox = motion(Box)
const MotionButton = motion(Button)

// Helper function to convert Firestore timestamp to Date
const convertTimestamp = (timestamp) => {
  if (!timestamp) return new Date()
  // If it's a Firestore Timestamp, use toDate()
  if (timestamp.toDate && typeof timestamp.toDate === 'function') {
    return timestamp.toDate()
  }
  // Otherwise, treat it as a Date or convert string to Date
  return new Date(timestamp)
}

export default function Sidebar({
  notes,
  currentNoteId,
  onSelectNote,
  onNewNote,
}) {
  const bgColor = useColorModeValue('white', 'gray.800')
  const hoverBg = useColorModeValue('gray.100', 'gray.700')
  const activeBg = useColorModeValue('blue.100', 'blue.900')
  const activeBorder = useColorModeValue('blue.500', 'blue.400')
  const [searchQuery, setSearchQuery] = useState('')

  const filteredNotes = notes.filter(
    (note) =>
      note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.content
        .substring(0, 100)
        .toLowerCase()
        .includes(searchQuery.toLowerCase())
  )

  const truncateTitle = (title, maxLength = 30) => {
    return title.length > maxLength
      ? title.substring(0, maxLength) + '...'
      : title
  }

  const truncateContent = (content, maxLength = 50) => {
    return content.length > maxLength
      ? content.substring(0, maxLength) + '...'
      : content
  }

  return (
    <MotionBox
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      h="100%"
      display="flex"
      flexDirection="column"
      bg={bgColor}
    >
      {/* Header */}
      <Box
        p={4}
        borderBottom="1px"
        borderColor={useColorModeValue('gray.200', 'gray.700')}
      >
        <HStack mb={4}>
          <Icon as={FiEdit3} color="brand.500" boxSize={6} />
          <Text fontSize="lg" fontWeight="bold">
            MarkFlow
          </Text>
        </HStack>

        <MotionButton
          w="100%"
          colorScheme="brand"
          leftIcon={<Icon as={FiFileText} />}
          onClick={onNewNote}
          initial={{ scale: 0.9 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          New Note
        </MotionButton>
      </Box>

      {/* Search */}
      <Box
        p={4}
        borderBottom="1px"
        borderColor={useColorModeValue('gray.200', 'gray.700')}
      >
        <InputGroup size="sm">
          <InputLeftElement pointerEvents="none">
            <Icon as={FiSearch} color="gray.400" />
          </InputLeftElement>
          <Input
            type="text"
            placeholder="Search notes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            borderRadius="md"
          />
        </InputGroup>
      </Box>

      {/* Notes List */}
      <Box p={3} overflowY="auto" flex={1}>
        {filteredNotes.length === 0 ? (
          <Box textAlign="center" py={8} color="gray.500">
            <Icon as={FiFileText} boxSize={8} mb={2} opacity={0.5} />
            <Text fontSize="sm">No notes found</Text>
          </Box>
        ) : (
          <List spacing={1}>
            {filteredNotes.map((note, index) => (
              <ListItem key={note.id}>
                <MotionButton
                  h="auto"
                  p={3}
                  justifyContent="flex-start"
                  textAlign="left"
                  bg={currentNoteId === note.id ? activeBg : 'transparent'}
                  borderLeft="4px"
                  borderColor={
                    currentNoteId === note.id ? activeBorder : 'transparent'
                  }
                  _hover={{ bg: hoverBg }}
                  onClick={() => onSelectNote(note.id)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  w="100%"
                >
                  <VStack align="start" spacing={1} w="100%">
                    <Text fontWeight="600" fontSize="sm" noOfLines={1}>
                      {truncateTitle(note.title || 'Untitled')}
                    </Text>
                    <Text fontSize="xs" color="gray.500" noOfLines={2}>
                      {truncateContent(note.content) || 'No content'}
                    </Text>
                    <HStack fontSize="xs" color="gray.400" spacing={2}>
                      <Icon as={FiClock} boxSize={3} />
                      <Text>
                        {formatDistanceToNow(
                          convertTimestamp(note.lastModified || note.createdAt),
                          {
                            addSuffix: true,
                          }
                        )}
                      </Text>
                    </HStack>
                  </VStack>
                </MotionButton>
              </ListItem>
            ))}
          </List>
        )}
      </Box>
    </MotionBox>
  )
}
