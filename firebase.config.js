import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
  limit,
  onSnapshot,
  setDoc,
  updateDoc,
  doc,
  serverTimestamp,
} from "firebase/firestore";
import { showSignedInNavBar, showSignedOutNavBar } from "./src/dom";

const firebaseConfig = {
  apiKey: "AIzaSyCSl1_8J03A-a594iZoWaOjYWjDeESrsAE",
  authDomain: "youreview-e6f5b.firebaseapp.com",
  projectId: "youreview-e6f5b",
  storageBucket: "youreview-e6f5b.appspot.com",
  messagingSenderId: "533512563552",
  appId: "1:533512563552:web:496a052a8c9290e0c20c05",
};

// Initialize  Firebase
initializeApp(firebaseConfig);
initFirebaseAuth();
// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore();

export async function signIn() {
  const provider = new GoogleAuthProvider();
  await signInWithPopup(getAuth(), provider);
}

export function signOutUser() {
  // Sign out of Firebase.
  signOut(getAuth());
}
// Initialize firebase auth
function initFirebaseAuth() {
  // Listens to state changes - If user is signed in or signed out.
  onAuthStateChanged(getAuth(), authStateObserver);
}

//Handles what happens in different auth states
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

function getUserName() {
  return getAuth().currentUser.displayName;
}

function getUserUID() {
  return getAuth().currentUser.uid;
}

const form = document.querySelector(".form");

// Saves a new message to Cloud Firestore.
export async function saveReview(titleText, reviewText) {
  // Add a new message entry to the Firebase database.
  try {
    await addDoc(collection(getFirestore(), "reviews"), {
      name: getUserName(),
      bookTitle: titleText,
      text: reviewText,
      timestamp: serverTimestamp(),
      uid: getUserUID(),
    });
  } catch (error) {
    console.error("Error writing new message to Firebase Database", error);
  }
}

const colRef = collection(db, "reviews");

//Gets the data from the firestore collection
async function getData() {
  await getDocs(colRef)
    .then((data) => {
      let reviews = [];
      data.docs.forEach((doc) => {
        reviews.push({ ...doc.data(), id: doc.id });
      });
      console.log(reviews);
    })
    .catch((err) => {
      console.log(err);
    });
}
