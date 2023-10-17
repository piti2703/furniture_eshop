import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyBcXYvGs_1Bbwt2WF6ytqaNy0Ti0cYG7ZE",
  authDomain: "furniture-eshop.firebaseapp.com",
  projectId: "furniture-eshop",
  storageBucket: "furniture-eshop.appspot.com",
  messagingSenderId: "350602796963",
  appId: "1:350602796963:web:0784f88a5a8e58ca580416"
};







// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export default app;
