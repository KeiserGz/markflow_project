// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
// import { getAnalytics } from 'firebase/analytics'

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyDo8N4HdZhq_rt8mBrY2cAgTSKP_eo_amw',
  authDomain: 'markflow-app.firebaseapp.com',
  projectId: 'markflow-app',
  storageBucket: 'markflow-app.firebasestorage.app',
  messagingSenderId: '695347383532',
  appId: '1:695347383532:web:bae9de2f1236654d97a9c9',
  measurementId: 'G-0YRVMMC6YE',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

// Initialize Firestore Database
export const db = getFirestore(app)

// Initialize Authentication
export const auth = getAuth(app)

export default app
