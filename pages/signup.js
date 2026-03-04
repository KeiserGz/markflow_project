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

export default function Signup() {
  const router = useRouter()
  const { signup, loading, error } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [signupError, setSignupError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const bgColor = useColorModeValue('white', 'gray.800')
  const borderColor = useColorModeValue('gray.200', 'gray.700')

  const handleSignup = async (e) => {
    e.preventDefault()
    setSignupError('')

    // Validate passwords match
    if (password !== confirmPassword) {
      setSignupError('Passwords do not match')
      return
    }

    // Validate password length
    if (password.length < 6) {
      setSignupError('Password must be at least 6 characters')
      return
    }

    setIsSubmitting(true)

    try {
      await signup(email, password)
      router.push('/')
    } catch (err) {
      setSignupError(err.message)
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

      {/* Signup Container */}
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
                Create your account
              </Text>
            </VStack>

            {/* Error Alert */}
            {(signupError || error) && (
              <Alert status="error" borderRadius="md">
                <AlertIcon />
                {signupError || error}
              </Alert>
            )}

            {/* Signup Form */}
            <form onSubmit={handleSignup} style={{ width: '100%' }}>
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
                  <Text fontSize="xs" color="gray.500" mt={2}>
                    Minimum 6 characters
                  </Text>
                </FormControl>

                {/* Confirm Password Input */}
                <FormControl isRequired>
                  <FormLabel>Confirm Password</FormLabel>
                  <Input
                    type="password"
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
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
                  {isSubmitting ? <Spinner size="sm" /> : 'Create Account'}
                </Button>
              </VStack>
            </form>

            {/* Divider */}
            <Box width="100%" height="1px" bg={borderColor} />

            {/* Footer */}
            <VStack spacing={2} align="center" w="100%">
              <HStack spacing={1}>
                <Text fontSize="sm" color="gray.600">
                  Already have an account?
                </Text>
                <Link href="/login">
                  <ChakraLink color="brand.500" fontWeight="bold">
                    Sign in
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
