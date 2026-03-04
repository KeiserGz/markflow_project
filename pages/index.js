import { useState, useEffect } from 'react'
import {
  Box,
  Container,
  Grid,
  Button,
  Icon,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useColorMode,
  useColorModeValue,
  Tooltip,
  HStack,
  VStack,
  Text,
  Input,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Textarea,
  Badge,
  Flex,
} from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/router'
import Editor from '../components/Editor'
import Preview from '../components/Preview'
import Canvas3D from '../components/Canvas3D'
import Sidebar from '../components/Sidebar'
import CloudSync from '../components/CloudSync'
import ErrorBanner from '../components/ErrorBanner'
import FirestoreDiagnostics from '../components/FirestoreDiagnostics'
import ProtectedRoute from '../components/ProtectedRoute'
import { useNoteStore } from '../store/noteStore-firestore'
import { useAuthContext } from '../context/AuthContext'
import {
  FiMenu,
  FiSun,
  FiMoon,
  FiPlus,
  FiDownload,
  FiUpload,
  FiTrash2,
  FiSave,
  FiLogOut,
} from 'react-icons/fi'

const MotionBox = motion(Box)

function Home() {
  const router = useRouter()
  const { colorMode, toggleColorMode } = useColorMode()
  const bgColor = useColorModeValue('white', 'gray.800')
  const borderColor = useColorModeValue('gray.200', 'gray.700')
  const { user, logout } = useAuthContext()
  const {
    notes,
    currentNoteId,
    addNote,
    updateNote,
    deleteNote,
    setCurrentNote,
    exportNote,
    error,
  } = useNoteStore()

  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [title, setTitle] = useState('')
  const [showPreview, setShowPreview] = useState(true)
  const [showError, setShowError] = useState(true)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [exportFormat, setExportFormat] = useState('md')

  useEffect(() => {
    if (notes.length === 0 && user) {
      addNote(user.uid)
    }
  }, [])

  const currentNote = notes.find((n) => n.id === currentNoteId)

  const handleMarkdownChange = (content) => {
    if (currentNote) {
      updateNote(currentNoteId, { content, lastModified: new Date() })
    }
  }

  const handleTitleChange = (e) => {
    setTitle(e.target.value)
    if (currentNote) {
      updateNote(currentNoteId, { title: e.target.value })
    }
  }

  const handleNewNote = () => {
    if (user) {
      addNote(user.uid)
    }
  }

  const handleLogout = async () => {
    try {
      await logout()
      router.push('/login')
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  const handleDeleteCurrentNote = () => {
    if (currentNote) {
      deleteNote(currentNoteId)
      if (notes.length > 0) {
        setCurrentNote(notes[0].id)
      }
    }
    onClose()
  }

  const handleExport = (format) => {
    if (currentNote) {
      exportNote(currentNote, format)
    }
    setExportFormat(format)
  }

  return (
    <Box minH="100vh" bg={useColorModeValue('gray.50', 'gray.900')}>
      {/* Error Banner */}
      {error && showError && (
        <ErrorBanner
          error={error}
          onClose={() => setShowError(false)}
        />
      )}

      {/* Diagnostics when error occurs */}
      {error && (
        <Box p={4} maxW="800px" mx="auto" zIndex={20} position="relative">
          <FirestoreDiagnostics />
        </Box>
      )}

      {/* 3D Canvas Background */}
      <Box position="fixed" top={0} left={0} right={0} bottom={0} zIndex={0}>
        <Canvas3D />
      </Box>

      {/* Main Content */}
      <Flex position="relative" zIndex={10} h="100vh">
        {/* Sidebar */}
        {sidebarOpen && (
          <MotionBox
            initial={{ x: -250, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -250, opacity: 0 }}
            transition={{ duration: 0.3 }}
            w="250px"
            bg={bgColor}
            borderRight="1px"
            borderColor={borderColor}
            boxShadow="sm"
            overflowY="auto"
            zIndex={15}
            position={{ base: 'fixed', md: 'relative' }}
            h={{ base: '100vh', md: 'auto' }}
            top={0}
            left={0}
          >
            <Sidebar
              notes={notes}
              currentNoteId={currentNoteId}
              onSelectNote={setCurrentNote}
              onNewNote={handleNewNote}
            />
          </MotionBox>
        )}

        {/* Main Editor Area */}
        <Flex flex={1} flexDirection="column" overflow="hidden">
          {/* Header */}
          <MotionBox
            initial={{ y: -80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            bg={bgColor}
            borderBottom="1px"
            borderColor={borderColor}
            px={6}
            py={4}
            boxShadow="sm"
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            gap={4}
            position="relative"
            zIndex={20}
            pointerEvents="auto"
          >
            <HStack gap={4} flex={1} pointerEvents="auto">
              <Button
                variant="ghost"
                size="lg"
                onClick={() => setSidebarOpen(!sidebarOpen)}
                onTouchStart={(e) => {
                  e.preventDefault()
                  setSidebarOpen(!sidebarOpen)
                }}
                display={{ base: 'flex', md: 'none' }}
                p={3}
                minW="auto"
                h="auto"
                zIndex={25}
                pointerEvents="auto"
                _focus={{ outline: 'none' }}
                _active={{ opacity: 0.7 }}
              >
                <Icon as={FiMenu} boxSize={6} />
              </Button>
              <VStack align="start" spacing={0}>
                <Text
                  fontSize="xs"
                  color="gray.500"
                  textTransform="uppercase"
                  fontWeight="bold"
                >
                  Note
                </Text>
                <Input
                  value={currentNote?.title || 'Untitled'}
                  onChange={handleTitleChange}
                  placeholder="Note title..."
                  variant="unstyled"
                  fontSize="xl"
                  fontWeight="bold"
                  maxW="300px"
                />
              </VStack>
            </HStack>

            <HStack gap={2}>
              {/* Export Menu */}
              <Menu>
                <Tooltip label="Export">
                  <MenuButton
                    as={Button}
                    variant="ghost"
                    size="sm"
                    leftIcon={<FiDownload />}
                  >
                    Export
                  </MenuButton>
                </Tooltip>
                <MenuList>
                  <MenuItem onClick={() => handleExport('md')}>
                    Export as Markdown
                  </MenuItem>
                  <MenuItem onClick={() => handleExport('html')}>
                    Export as HTML
                  </MenuItem>
                  <MenuItem onClick={() => handleExport('pdf')}>
                    Export as PDF
                  </MenuItem>
                </MenuList>
              </Menu>

              {/* New Note Button */}
              <Tooltip label="New Note">
                <Button
                  variant="ghost"
                  size="sm"
                  leftIcon={<FiPlus />}
                  onClick={handleNewNote}
                >
                  New
                </Button>
              </Tooltip>

              {/* Cloud Sync */}
              <CloudSync />

              {/* Delete Button */}
              <Tooltip label="Delete Note">
                <Button
                  variant="ghost"
                  size="sm"
                  colorScheme="red"
                  leftIcon={<FiTrash2 />}
                  onClick={onOpen}
                >
                  Delete
                </Button>
              </Tooltip>

              {/* Theme Toggle */}
              <Tooltip label="Toggle Theme">
                <Button variant="ghost" size="sm" onClick={toggleColorMode}>
                  <Icon as={colorMode === 'light' ? FiMoon : FiSun} />
                </Button>
              </Tooltip>

              {/* Logout Button */}
              <Tooltip label="Logout">
                <Button
                  variant="ghost"
                  size="sm"
                  colorScheme="red"
                  leftIcon={<FiLogOut />}
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              </Tooltip>
            </HStack>
          </MotionBox>

          {/* Mobile: Preview Toggle Buttons */}
          <HStack
            display={{ base: 'flex', lg: 'none' }}
            spacing={0}
            borderBottom="1px"
            borderColor={borderColor}
            bg={bgColor}
            p={2}
          >
            <Button
              flex={1}
              variant={!showPreview ? 'solid' : 'ghost'}
              size="sm"
              onClick={() => setShowPreview(false)}
              borderRadius="0"
            >
              Editor
            </Button>
            <Button
              flex={1}
              variant={showPreview ? 'solid' : 'ghost'}
              size="sm"
              onClick={() => setShowPreview(true)}
              borderRadius="0"
            >
              Preview
            </Button>
          </HStack>

          {/* Editor and Preview */}
          <Flex
            display={{ base: 'flex', lg: 'none' }}
            flex={1}
            overflow="hidden"
            flexDirection="column"
          >
            {/* Mobile: Editor or Preview (not both) */}
            {!showPreview && (
              <MotionBox
                initial={{ x: -300, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                flex={1}
                overflowY="auto"
              >
                <Editor
                  value={currentNote?.content || ''}
                  onChange={handleMarkdownChange}
                />
              </MotionBox>
            )}
            {showPreview && (
              <MotionBox
                initial={{ x: 300, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                flex={1}
                overflowY="auto"
              >
                <Preview markdown={currentNote?.content || ''} />
              </MotionBox>
            )}
          </Flex>

          {/* Desktop: Split View */}
          <Grid
            display={{ base: 'none', lg: 'grid' }}
            templateColumns="1fr 1fr"
            gap={0}
            flex={1}
            overflow="hidden"
          >
            {/* Editor */}
            <MotionBox
              initial={{ x: -300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              overflowY="auto"
              borderRight="1px solid"
              borderColor={borderColor}
              minW={0}
            >
              <Editor
                value={currentNote?.content || ''}
                onChange={handleMarkdownChange}
              />
            </MotionBox>

            {/* Preview */}
            <MotionBox
              initial={{ x: 300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              overflowY="auto"
              minW={0}
            >
              <Preview markdown={currentNote?.content || ''} />
            </MotionBox>
          </Grid>
        </Flex>
      </Flex>

      {/* Delete Confirmation Modal */}
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <MotionBox
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.2 }}
          as={ModalOverlay}
        />
        <MotionBox
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.2 }}
          as={ModalContent}
        >
          <ModalHeader>Delete Note?</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            Are you sure you want to delete this note? This action cannot be
            undone.
          </ModalBody>
          <ModalFooter gap={2}>
            <Button variant="ghost" onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="red" onClick={handleDeleteCurrentNote}>
              Delete
            </Button>
          </ModalFooter>
        </MotionBox>
      </Modal>
    </Box>
  )
}

// Wrap Home component with ProtectedRoute
const ProtectedHome = () => (
  <ProtectedRoute>
    <Home />
  </ProtectedRoute>
)

export default ProtectedHome
