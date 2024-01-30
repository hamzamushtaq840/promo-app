import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from '@firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyB91muMmH__1zUumXLu2OkoiYv9lhUSkeM',
  authDomain: 'promo-be004.firebaseapp.com',
  projectId: 'promo-be004',
  storageBucket: 'promo-be004.appspot.com',
  messagingSenderId: '1081849926621',
  appId: '1:1081849926621:web:ab359579765aa030d7dc34',
  measurementId: 'G-Q8JB2TSDLC',
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore(app);
const Storage = getStorage(app);
export { auth, db, Storage };
