import { useRouter } from 'next/router'
import { useAuth } from '../hooks/useAuth'
import { Box, Center, Spinner } from '@chakra-ui/react'

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth()
  const router = useRouter()

  if (loading) {
    return (
      <Center h="100vh">
        <Spinner size="lg" color="brand.500" />
      </Center>
    )
  }

  if (!user) {
    router.push('/login')
    return null
  }

  return <>{children}</>
}
