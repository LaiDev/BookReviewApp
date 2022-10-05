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
const signInMessage = document.querySelector(".signInMessage");

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
    signInMessage.style.display = "none";
    //Get previous reviews from the database
    getData(user);

    //Enable ability to add reviews
  } else {
    // User is signed out!
    showSignedOutNavBar();
    reviewContainer.replaceChildren();
    signInMessage.style.display = "block";
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

let quoteContainer = document.querySelector(".quoteContainer");
let bookSearchContainer = document.querySelector("#bookSearchContainer");
searchBtn.addEventListener("click", updateUI);

function updateUI() {
  //When you do your first search, remove the quote container and add the book container
  quoteContainer.style.display = "none";
  //Show book description
  bookSearchContainer.style.display = "grid";
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
    console.log(doc.data());
    //Creates a card to display on the UI with the data received from the database
    createReviewCard(doc.data().bookTitle, doc.data().review);
  });
}
