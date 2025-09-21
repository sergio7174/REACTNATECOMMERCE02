import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from 'firebase/auth';
import 'firebase/auth';


const firebaseConfig = {
  apiKey: 
  authDomain: 
  databaseURL: 
  projectId: 
  storageBucket: 
  messagingSenderId: 
  appId: 
  measurementId: 
}


const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
 
export { auth };

export const db = getFirestore(app);