import { signIn, signOutUser } from "../firebase.config";

const titleUI = document.querySelector(".book-Title");
const descriptionUI = document.querySelector(".book-Description");
const coverUI = document.querySelector(".book-Cover");
const authorUi = document.querySelector(".author");
const ratingUI = document.querySelector(".book-Rating");


//Gets the specific book data and displays it on the UI when the function is called

function updateDisplay(book) {
  book
    .then(function (bookData) {
      titleUI.innerText = bookData.items[0].volumeInfo.title;
      descriptionUI.innerText = bookData.items[0].volumeInfo.description;
      let bookCover = bookData.items[0].volumeInfo.imageLinks.thumbnail;
      coverUI.style.backgroundImage = `url(${bookCover})`;
      authorUi.innerText = bookData.items[0].volumeInfo.authors;
      ratingUI.innerText = `${bookData.items[0].volumeInfo.averageRating}/5`;
      console.log(bookData.items[0].volumeInfo.averageRating);
    })
    .catch((error) => console.log("There is an ERROR!"));
}

//Auth DOM events

const signInButton = document.querySelector(".signInBtn");
const signOutButton = document.querySelector(".signOutBtn");

signInButton.addEventListener("click", signIn());
signOutButton.addEventListener("click", signOutUser());

const signedInNav = document.querySelector(".signedIn");
const signedInName = document.querySelector(".userName");
const signedOutNav = document.querySelector(".signedOut");

//Handles functionality of the nav bar when a user is logged in
function showSignedInNavBar(userName) {
  signedOutNav.style.display = "none";
  signedInName.innerText = userName;

  signedInNav.style.display = "flex";
  signedInNav.style.justifyContent = "center";
  signedInNav.style.alignItems = "center";
  signedInNav.style.gap = "25px";
}

////Handles functionality of the nav bar when a user is not logged in
function showSignedOutNavBar() {
  signedInNav.style.display = "none";
  signedOutNav.style.display = "flex";
}

export { updateDisplay, showSignedInNavBar, showSignedOutNavBar };
