import {
  Box,
  useColorModeValue,
  Heading,
  Text,
  Code,
  Button,
  Divider,
  Link as ChakraLink,
} from '@chakra-ui/react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { motion } from 'framer-motion'

const MotionBox = motion(Box)

const components = {
  h1: ({ children }) => (
    <Heading as="h1" size="2xl" mt={6} mb={4} color="brand.500">
      {children}
    </Heading>
  ),
  h2: ({ children }) => (
    <Heading as="h2" size="xl" mt={5} mb={3} color="brand.600">
      {children}
    </Heading>
  ),
  h3: ({ children }) => (
    <Heading as="h3" size="lg" mt={4} mb={2} color="brand.700">
      {children}
    </Heading>
  ),
  p: ({ children }) => (
    <Text
      mb={4}
      lineHeight="1.8"
      color={useColorModeValue('gray.900', 'gray.100')}
    >
      {children}
    </Text>
  ),
  code: ({ inline, children }) =>
    inline ? (
      <Code
        px={2}
        py={1}
        borderRadius="md"
        bg={useColorModeValue('gray.100', 'gray.700')}
        color={useColorModeValue('gray.900', 'gray.100')}
        fontSize="0.9em"
      >
        {children}
      </Code>
    ) : (
      <Box
        as="pre"
        p={4}
        bg={useColorModeValue('gray.100', 'gray.900')}
        borderRadius="md"
        overflow="auto"
        mb={4}
      >
        <Code
          fontSize="sm"
          fontFamily="'Fira Code', monospace"
          color={useColorModeValue('gray.900', 'gray.100')}
        >
          {children}
        </Code>
      </Box>
    ),
  ul: ({ children }) => (
    <Box
      as="ul"
      mb={4}
      pl={6}
      style={{ marginLeft: '1.5rem' }}
      color={useColorModeValue('gray.900', 'gray.100')}
    >
      {children}
    </Box>
  ),
  li: ({ children }) => (
    <Box
      as="li"
      mb={2}
      style={{ marginBottom: '0.5rem' }}
      color={useColorModeValue('gray.900', 'gray.100')}
    >
      {children}
    </Box>
  ),
  blockquote: ({ children }) => (
    <Box
      borderLeft="4px"
      borderColor="brand.500"
      pl={4}
      py={2}
      my={4}
      bg={useColorModeValue('blue.50', 'blue.900')}
      borderRadius="md"
      opacity={0.8}
    >
      <Text
        fontStyle="italic"
        color={useColorModeValue('gray.900', 'gray.100')}
      >
        {children}
      </Text>
    </Box>
  ),
  hr: () => <Divider my={6} />,
  strong: ({ children }) => (
    <Text
      as="strong"
      fontWeight="bold"
      color={useColorModeValue('gray.900', 'gray.100')}
    >
      {children}
    </Text>
  ),
  em: ({ children }) => (
    <Text
      as="em"
      fontStyle="italic"
      color={useColorModeValue('gray.900', 'gray.100')}
    >
      {children}
    </Text>
  ),
  a: ({ href, children }) => (
    <ChakraLink
      href={href}
      color="brand.500"
      _hover={{ textDecoration: 'underline' }}
      isExternal
    >
      {children}
    </ChakraLink>
  ),
}

export default function Preview({ markdown }) {
  const bgColor = useColorModeValue('white', 'gray.800')
  const textColor = useColorModeValue('gray.900', 'gray.100')

  return (
    <MotionBox
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      p={6}
      h="100%"
      overflowY="auto"
      bg={bgColor}
      color={textColor}
    >
      <Box className="markdown-preview" maxW="2xl" mx="auto" color={textColor}>
        <ReactMarkdown components={components} remarkPlugins={[remarkGfm]}>
          {markdown || '# Start typing to see the preview'}
        </ReactMarkdown>
      </Box>
    </MotionBox>
  )
}
