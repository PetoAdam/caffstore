import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import { getAuth } from "firebase/auth";

export const firebaseConfig = {
  apiKey: "AIzaSyAfdUUIzsM11swGfMVGyei-qLCs0FdV6es",
  authDomain: "caff-store.firebaseapp.com",
  projectId: "caff-store",
  storageBucket: "caff-store.appspot.com",
  messagingSenderId: "23101280010",
  appId: "1:23101280010:web:8e6227fb29a80ca984f4f3",
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
