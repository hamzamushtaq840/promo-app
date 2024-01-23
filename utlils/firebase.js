import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from '@firebase/firestore'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyCw-iKwYOsInkx3SyuFxrr5jJWPVeC_VEA",
  authDomain: "fidelity-fed68.firebaseapp.com",
  projectId: "fidelity-fed68",
  storageBucket: "fidelity-fed68.appspot.com",
  messagingSenderId: "62999815966",
  appId: "1:62999815966:web:634d81ab2ef6d2c6644b0f",
  measurementId: "G-25497SR948"
};

const app = initializeApp(firebaseConfig)
const auth = getAuth()
const db = getFirestore(app)
const Storage = getStorage(app)
export { auth, db, Storage }