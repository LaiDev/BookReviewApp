import { initializeApp } from "firebase/app";
import { getFirebaseConfig } from "../firebase.config";
import {
  createReviewCard,
  showSignedInNavBar,
  showSignedOutNavBar,
  updateDisplay,
} from "./dom";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { where, getDocs } from "firebase/firestore";

import {
  getFirestore,
  collection,
  addDoc,
  query,
  orderBy,
  limit,
  onSnapshot,
  setDoc,
  updateDoc,
  doc,
  serverTimestamp,
} from "firebase/firestore";
import { getBookData } from "./bookData";

const signInButton = document.querySelector(".signInBtn");
const signOutButton = document.querySelector(".signOutBtn");
const reviewContainer = document.querySelector(".review-Container");

signInButton.addEventListener("click", signIn);
signOutButton.addEventListener("click", signOutUser);

const firebaseAppConfig = getFirebaseConfig();

function initFirebaseAuth() {
  // Listen to auth state changes.
  onAuthStateChanged(getAuth(), authStateObserver);
}

// Returns true if a user is signed-in.
function isUserSignedIn() {
  return !!getAuth().currentUser;
}

//Handles what happens in different auth states
function authStateObserver(user) {
  if (user) {
    // User is signed in!
    showSignedInNavBar(user.displayName);

    //Get previous reviews from the database
    getData(user);

    //Enable ability to add reviews
  } else {
    // User is signed out!
    showSignedOutNavBar();
    reviewContainer.replaceChildren();
  }
}

function signIn() {
  const provider = new GoogleAuthProvider();
  signInWithPopup(getAuth(), provider);
}

function signOutUser() {
  signOut(getAuth());
}

let bookTitle = document.querySelector("#bookTitle");
let searchBtn = document.querySelector("#searchBtn");

searchBtn.addEventListener("click", updateUI);

function updateUI() {
  let book = getBookData(bookTitle.value);
  updateDisplay(book);
  bookTitle.value = "";
}

// Initialize  Firebase
initializeApp(firebaseAppConfig);
// Initialize firebase auth
initFirebaseAuth();
// Initialize Cloud Firestore and get a reference to the service

// Saves a new review to Cloud Firestore.
export async function addReview(bookTitle, reviewText) {
  try {
    const docRef = await addDoc(collection(getFirestore(), "reviews"), {
      bookTitle: bookTitle,
      review: reviewText,
      user: getAuth().currentUser.uid,
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (error) {
    console.error("Error writing new message to Firebase Database", error);
  }
}

//When called, this function will check to see if there is any data stored that matched the user id of the current user
async function getData(user) {
  const q = query(
    collection(getFirestore(), "reviews"),
    where("user", "==", user.uid)
  );

  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots

    console.log(doc.data());

    createReviewCard(doc.data().bookTitle, doc.data().review);
  });
}
