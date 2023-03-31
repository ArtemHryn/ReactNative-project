import { initializeApp } from "firebase/app";
import { getAuth } from "@firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBsTDFbeGgkvGG4JSl4c_3OiUsdN7GVgzA",
  authDomain: "social-61b8e.firebaseapp.com",
  projectId: "social-61b8e",
  storageBucket: "social-61b8e.appspot.com",
  messagingSenderId: "776118922551",
  appId: "1:776118922551:web:03d20db9395daffc0d3eb2",
  measurementId: "G-H6W6D2GEED",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const storage = getStorage(app);
export const db = getFirestore(app);