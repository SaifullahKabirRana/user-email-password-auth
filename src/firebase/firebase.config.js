// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDCYNPhPZRmlPTWKut1lpajS4ashifeLhU",
  authDomain: "user-email-password-auth-5cfe1.firebaseapp.com",
  projectId: "user-email-password-auth-5cfe1",
  storageBucket: "user-email-password-auth-5cfe1.appspot.com",
  messagingSenderId: "926302091523",
  appId: "1:926302091523:web:e2b6d0093e94f456e65136"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth;