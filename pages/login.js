import { useState } from 'react'
import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Text,
  Heading,
  useColorModeValue,
  Link as ChakraLink,
  Alert,
  AlertIcon,
  Spinner,
  HStack,
} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { useAuth } from '../hooks/useAuth'
import { motion } from 'framer-motion'
import Canvas3D from '../components/Canvas3D'

const MotionBox = motion(Box)

export default function Login() {
  const router = useRouter()
  const { login, loading, error } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loginError, setLoginError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const bgColor = useColorModeValue('white', 'gray.800')
  const borderColor = useColorModeValue('gray.200', 'gray.700')

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoginError('')
    setIsSubmitting(true)

    try {
      await login(email, password)
      router.push('/')
    } catch (err) {
      setLoginError(err.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Box minH="100vh" bg={useColorModeValue('gray.50', 'gray.900')} position="relative">
      {/* 3D Background */}
      <Box position="fixed" top={0} left={0} right={0} bottom={0} zIndex={0}>
        <Canvas3D />
      </Box>

      {/* Login Container */}
      <Container
        maxW="md"
        centerContent
        display="flex"
        alignItems="center"
        justifyContent="center"
        minH="100vh"
        position="relative"
        zIndex={10}
      >
        <MotionBox
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          w="100%"
          bg={bgColor}
          p={8}
          borderRadius="md"
          boxShadow="lg"
        >
          <VStack spacing={6} align="stretch">
            {/* Header */}
            <VStack spacing={2} align="center">
              <Heading as="h1" size="xl" color="brand.500">
                📝 MarkFlow
              </Heading>
              <Text color="gray.500" fontSize="sm">
                Sign in to your account
              </Text>
            </VStack>

            {/* Error Alert */}
            {(loginError || error) && (
              <Alert status="error" borderRadius="md">
                <AlertIcon />
                {loginError || error}
              </Alert>
            )}

            {/* Login Form */}
            <form onSubmit={handleLogin} style={{ width: '100%' }}>
              <VStack spacing={4}>
                {/* Email Input */}
                <FormControl isRequired>
                  <FormLabel>Email Address</FormLabel>
                  <Input
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={isSubmitting || loading}
                  />
                </FormControl>

                {/* Password Input */}
                <FormControl isRequired>
                  <FormLabel>Password</FormLabel>
                  <Input
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={isSubmitting || loading}
                  />
                </FormControl>

                {/* Submit Button */}
                <Button
                  colorScheme="brand"
                  w="100%"
                  isLoading={isSubmitting || loading}
                  type="submit"
                >
                  {isSubmitting ? <Spinner size="sm" /> : 'Sign In'}
                </Button>
              </VStack>
            </form>

            {/* Divider */}
            <Box width="100%" height="1px" bg={borderColor} />

            {/* Footer */}
            <VStack spacing={2} align="center" w="100%">
              <HStack spacing={1}>
                <Text fontSize="sm" color="gray.600">
                  Don't have an account?
                </Text>
                <Link href="/signup">
                  <ChakraLink color="brand.500" fontWeight="bold">
                    Sign up
                  </ChakraLink>
                </Link>
              </HStack>
            </VStack>
          </VStack>
        </MotionBox>
      </Container>
    </Box>
  )
}
