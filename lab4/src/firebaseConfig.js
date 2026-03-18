import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: 'AIzaSyA24toq6y0w6ZMRwbEdK5opVXGc-Egj2zo',
  authDomain: 'lab4-auth-67164.firebaseapp.com',
  projectId: 'lab4-auth-67164',
  storageBucket: 'lab4-auth-67164.firebasestorage.app',
  messagingSenderId: '844192073008',
  appId: '1:844192073008:web:fea21de20f3cb87fc674f5',
  measurementId: 'G-6J2MMRJK8J'
}

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
