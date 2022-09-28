import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCSl1_8J03A-a594iZoWaOjYWjDeESrsAE",
  authDomain: "youreview-e6f5b.firebaseapp.com",
  projectId: "youreview-e6f5b",
  storageBucket: "youreview-e6f5b.appspot.com",
  messagingSenderId: "533512563552",
  appId: "1:533512563552:web:496a052a8c9290e0c20c05",
};

export async function signIn() {
  var provider = new GoogleAuthProvider();
  await signInWithPopup(getAuth(), provider);
}

initializeApp(firebaseConfig);
