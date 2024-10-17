import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyBcuYbRFUuPe-59mQj5EaHIOqsq0frf7Ns",
  authDomain: "safehouse-6b81e.firebaseapp.com",
  projectId: "safehouse-6b81e",
  storageBucket: "safehouse-6b81e.appspot.com",
  messagingSenderId: "996097767420",
  appId: "1:996097767420:web:531d165962e08dcaab2479",
  measurementId: "G-N4LCCH1B2C"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export { app };



