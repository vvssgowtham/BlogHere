/* eslint-disable no-undef */
import { initializeApp } from "firebase/app";
import {getStorage} from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: "bloggingwebsite-afe38.firebaseapp.com",
  projectId: "bloggingwebsite-afe38",
  storageBucket: "bloggingwebsite-afe38.appspot.com",
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: "1:241696381774:web:707d1b8521528cb59c1c1f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const imageDb = getStorage(app);