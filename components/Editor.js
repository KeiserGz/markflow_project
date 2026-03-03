import {
  Box,
  Textarea,
  useColorModeValue,
  VStack,
  HStack,
  Text,
  Tooltip,
  Button,
  Icon,
} from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { FiType, FiCode, FiList } from 'react-icons/fi'

const MotionBox = motion(Box)

export default function Editor({ value, onChange }) {
  const bgColor = useColorModeValue('white', 'gray.800')
  const borderColor = useColorModeValue('gray.200', 'gray.700')
  const textColor = useColorModeValue('gray.900', 'gray.100')

  const insertMarkdown = (before, after = '') => {
    const textarea = document.querySelector('textarea')
    if (!textarea) return

    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const text = value
    const selectedText = text.substring(start, end)
    const newText =
      text.substring(0, start) +
      before +
      selectedText +
      after +
      text.substring(end)

    onChange(newText)

    setTimeout(() => {
      textarea.selectionStart = start + before.length
      textarea.selectionEnd = start + before.length + selectedText.length
      textarea.focus()
    }, 0)
  }

  const formatOptions = [
    { label: 'Bold', action: () => insertMarkdown('**', '**'), icon: FiType },
    { label: 'Code', action: () => insertMarkdown('`', '`'), icon: FiCode },
    { label: 'List', action: () => insertMarkdown('- ', ''), icon: FiList },
  ]

  return (
    <MotionBox
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      h="100%"
      display="flex"
      flexDirection="column"
    >
      {/* Toolbar */}
      <HStack
        spacing={2}
        p={4}
        borderBottom="1px"
        borderColor={borderColor}
        bg={bgColor}
        wrap="wrap"
      >
        {formatOptions.map((option) => (
          <Tooltip key={option.label} label={option.label}>
            <Button
              size="sm"
              variant="ghost"
              leftIcon={<Icon as={option.icon} />}
              onClick={option.action}
            >
              {option.label}
            </Button>
          </Tooltip>
        ))}
      </HStack>

      {/* Textarea */}
      <Box flex={1} p={4} overflowY="auto">
        <Textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="# Welcome to MarkFlow&#10;&#10;Start typing your markdown here...&#10;&#10;**Bold** • *Italic* • `Code` • [Links](url)&#10;&#10;## Headings&#10;### Subheadings&#10;&#10;- Lists&#10;- Work great too&#10;&#10;```&#10;Code blocks&#10;```"
          variant="unstyled"
          fontFamily="'Fira Code', monospace"
          fontSize="sm"
          lineHeight="1.8"
          h="100%"
          resize="none"
          p={0}
          color={textColor}
          _placeholder={{
            color: useColorModeValue('gray.400', 'gray.500'),
          }}
          spellCheck="true"
        />
      </Box>
    </MotionBox>
  )
}
