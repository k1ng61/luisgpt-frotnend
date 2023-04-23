
import firebase from 'firebase/compat/app'

import { getStorage } from 'firebase/storage';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';



const firebaseConfig = {
  apiKey: "AIzaSyD5GVzcthHAUWBa7Fr0cRrSPb3b26tisME",
  authDomain: "hackla.firebaseapp.com",
  projectId: "hackla",
  storageBucket: "hackla.appspot.com",
  messagingSenderId: "810563009692",
  appId: "1:810563009692:web:2114b4a75526f46022c159",
  measurementId: "G-ZZY7JYGLMP"
};

const app = firebase.initializeApp(firebaseConfig);



export const storage = getStorage(app);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const databse = getDatabase(app);