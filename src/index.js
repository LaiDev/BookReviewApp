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
import { getBookData } from "./bookData";

const signInButton = document.querySelector(".signInBtn");
const signOutButton = document.querySelector(".signOutBtn");

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
    //Example Review Cards
    createReviewCard(
      "Where the Wild things are",
      "A wonderful book with a memorab;e plot but weird characters"
    );
    createReviewCard("Renegades", "A wonderful book with a good plot");
    createReviewCard("Renegades", "A wonderful book with a good plot");
    createReviewCard("Renegades", "A wonderful book with a good plot");
    createReviewCard("Renegades", "A wonderful book with a good plot");
    createReviewCard(
      "Renegades",
      "A wonderful book with a good plot and good characters"
    );
  } else {
    // User is signed out!
    showSignedOutNavBar();
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
let addReviewBtn = document.querySelector(".addReviewButton");

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
