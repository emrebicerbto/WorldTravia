// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyAj5rheyByuynfIPUdFSOBTxZG7R58KHIM",
  authDomain: "worldtravia.firebaseapp.com",
  projectId: "worldtravia",
  storageBucket: "worldtravia.appspot.com",
  messagingSenderId: "115441557652",
  appId: "1:115441557652:web:d9ce7d0816463bb25c1481",
  measurementId: "G-RVG1N9DSP7"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const analytics = getAnalytics(app);

export { db };
