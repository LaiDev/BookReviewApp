import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { showSignedInNavBar, showSignedOutNavBar } from "./src/dom";

const firebaseConfig = {
  apiKey: "AIzaSyCSl1_8J03A-a594iZoWaOjYWjDeESrsAE",
  authDomain: "youreview-e6f5b.firebaseapp.com",
  projectId: "youreview-e6f5b",
  storageBucket: "youreview-e6f5b.appspot.com",
  messagingSenderId: "533512563552",
  appId: "1:533512563552:web:496a052a8c9290e0c20c05",
};

export async function signIn() {
  const provider = new GoogleAuthProvider();
  await signInWithPopup(getAuth(), provider);
  /*
  var provider = new GoogleAuthProvider();
  await signInWithPopup(getAuth(), provider).then(function (result) {
    const user = result.user;
    console.log(user.displayName);
  });
  */
}

export function signOutUser() {
  console.log("sign out");
  // Sign out of Firebase.
  signOut(getAuth());
}
// Initialize firebase auth
function initFirebaseAuth() {
  // Listen to auth state changes.
  onAuthStateChanged(getAuth(), authStateObserver);
}

function authStateObserver(user) {
  if (user) {
    // User is signed in!
    console.log("You're signed In");
    showSignedInNavBar(user.displayName);
  } else {
    // User is signed out!
    console.log("You're signed out");
    showSignedOutNavBar();
  }
}

initializeApp(firebaseConfig);
initFirebaseAuth();
