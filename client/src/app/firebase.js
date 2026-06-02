import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDOfg2JzsKjck-1DO2tWQ_d0b5kiYgOND8",
  authDomain: "codify-bd6ca.firebaseapp.com",
  projectId: "codify-bd6ca",
  storageBucket: "codify-bd6ca.firebasestorage.app",
  messagingSenderId: "496762909498",
  appId: "1:496762909498:web:516adf6140ed1845d25603",
  measurementId: "G-E3570DDYF8"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();