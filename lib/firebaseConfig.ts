// lib/firebaseConfig.ts
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database"; // for realtime DB

const firebaseConfig = {
  apiKey: "AIzaSyA5cYFQ4UQZhxdZtBfJdXjFFL3pcu4MeDo",
  authDomain: "volleyball-app-464b2.firebaseapp.com",
  projectId: "volleyball-app-464b2",
  storageBucket: "volleyball-app-464b2.appspot.com",
  messagingSenderId: "150280080704",
  appId: "1:150280080704:web:a37fc148afde1046d57ea5",
  databaseURL: "https://volleyball-app-464b2-default-rtdb.firebaseio.com"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { app, database };