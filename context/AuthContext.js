import { createContext, useContext, useEffect } from 'react'
import { useAuth } from '../hooks/useAuth'
import { useNoteStore } from '../store/noteStore-firestore'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const auth = useAuth()
  const { setUserId } = useNoteStore()

  // Set userId in note store when user logs in/out
  useEffect(() => {
    if (auth.user) {
      setUserId(auth.user.uid)
    } else {
      setUserId(null)
    }
  }, [auth.user, setUserId])

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>
}

export function useAuthContext() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuthContext must be used within AuthProvider')
  }
  return context
}
