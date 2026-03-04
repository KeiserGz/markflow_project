import { useEffect, useState } from 'react'
import {
  Box,
  VStack,
  Button,
  Text,
  Alert,
  AlertIcon,
  Spinner,
  Code,
  useColorModeValue,
} from '@chakra-ui/react'
import { useAuth } from '../hooks/useAuth'
import { db } from '../lib/firebase'
import { collection, addDoc, serverTimestamp, query, where, getDocs } from 'firebase/firestore'

export default function FirestoreDiagnostics() {
  const { user } = useAuth()
  const [testing, setTesting] = useState(false)
  const [results, setResults] = useState([])
  const bgColor = useColorModeValue('gray.50', 'gray.900')
  const borderColor = useColorModeValue('gray.200', 'gray.700')

  const runTest = async () => {
    setTesting(true)
    const newResults = []

    try {
      // Test 1: Check user auth
      newResults.push({
        name: '✅ User Authentication',
        status: user ? '✅ Authenticated' : '❌ Not authenticated',
        uid: user?.uid,
      })

      if (!user) {
        setResults(newResults)
        setTesting(false)
        return
      }

      // Test 2: Try to create a test document
      try {
        const testRef = await addDoc(collection(db, 'firestore-test'), {
          userId: user.uid,
          test: true,
          timestamp: serverTimestamp(),
        })
        newResults.push({
          name: '✅ Write Permission (Test Collection)',
          status: '✅ Can write',
          docId: testRef.id,
        })
      } catch (error) {
        newResults.push({
          name: '❌ Write Permission',
          status: '❌ Cannot write',
          error: error.message,
          code: error.code,
        })
      }

      // Test 3: Try to read notes
      try {
        const q = query(collection(db, 'notes'), where('userId', '==', user.uid))
        const snapshot = await getDocs(q)
        newResults.push({
          name: '✅ Read Permission (Notes)',
          status: '✅ Can read',
          count: snapshot.size,
        })
      } catch (error) {
        newResults.push({
          name: '❌ Read Permission',
          status: '❌ Cannot read',
          error: error.message,
          code: error.code,
        })
      }

      // Test 4: Try to write to notes
      try {
        const noteRef = await addDoc(collection(db, 'notes'), {
          userId: user.uid,
          title: 'Diagnostic Test',
          content: 'This is a test note',
          createdAt: serverTimestamp(),
          lastModified: serverTimestamp(),
        })
        newResults.push({
          name: '✅ Write Permission (Notes)',
          status: '✅ Can write notes',
          docId: noteRef.id,
        })
      } catch (error) {
        newResults.push({
          name: '❌ Write Permission (Notes)',
          status: '❌ Cannot write notes',
          error: error.message,
          code: error.code,
        })
      }
    } catch (error) {
      newResults.push({
        name: 'Fatal Error',
        status: '❌ Error',
        error: error.message,
      })
    }

    setResults(newResults)
    setTesting(false)
  }

  return (
    <Box
      bg={bgColor}
      p={6}
      borderRadius="md"
      borderWidth="1px"
      borderColor={borderColor}
      mb={4}
    >
      <VStack align="start" spacing={4}>
        <Text fontWeight="bold" fontSize="lg">
          🔍 Firestore Diagnostics
        </Text>

        <Button
          colorScheme="blue"
          onClick={runTest}
          isLoading={testing}
          loadingText="Testing..."
        >
          Run Firestore Tests
        </Button>

        {results.length > 0 && (
          <VStack align="start" spacing={2} w="100%">
            {results.map((result, idx) => (
              <Box
                key={idx}
                p={3}
                bg={result.status.includes('✅') ? 'green.50' : 'red.50'}
                borderRadius="md"
                borderLeftWidth="4px"
                borderLeftColor={result.status.includes('✅') ? 'green.500' : 'red.500'}
                w="100%"
              >
                <Text fontWeight="600" mb={1}>
                  {result.name}
                </Text>
                <Text fontSize="sm">{result.status}</Text>
                {result.uid && <Code fontSize="xs">{result.uid}</Code>}
                {result.error && (
                  <Text fontSize="xs" color="red.600" mt={1}>
                    Error: {result.error}
                  </Text>
                )}
                {result.code && (
                  <Text fontSize="xs" color="red.600">
                    Code: {result.code}
                  </Text>
                )}
              </Box>
            ))}
          </VStack>
        )}

        <Alert status="info" borderRadius="md">
          <AlertIcon />
          <Box>
            <Text fontSize="sm" fontWeight="bold" mb={1}>
              Troubleshooting:
            </Text>
            <Text fontSize="xs">
              ✅ All tests passing? Rules are correct.
              <br />
              ❌ Write test failing? Check Firestore rules (see AUTH_SETUP.md)
              <br />
              ❌ Read test failing? Check userId field on documents
            </Text>
          </Box>
        </Alert>
      </VStack>
    </Box>
  )
}
