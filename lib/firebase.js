import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

// Firebase config - using demo/public values (you can update these)
const firebaseConfig = {
  apiKey: 'AIzaSyDemoKeyForPublicUseOnly123456',
  authDomain: 'markflow-app.firebaseapp.com',
  projectId: 'markflow-app',
  storageBucket: 'markflow-app.appspot.com',
  messagingSenderId: '123456789',
  appId: '1:123456789:web:abcdef123456',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

// Initialize services
export const auth = getAuth(app)
export const db = getFirestore(app)

export default app
