import { addReview } from "./index.js";

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

      if (bookData.items[0].volumeInfo.averageRating === undefined) {
        ratingUI.innerText = "0/5";
      }
      if (bookData.items[0].volumeInfo.imageLinks.thumbnail === undefined) {
        coverUI.style.backgroundImage =
          "linear-gradient(90deg, rgba(63,94,251,1) 0%, rgba(24,36,95,1) 0%, rgba(0,0,0,1) 83%)";
      }
      if (bookData.items[0].volumeInfo.description === undefined) {
        descriptionUI.innerText = "Unknown Description";
      }
      if (bookData.items[0].volumeInfo.authors === undefined) {
        authorUi.innerText = "Unknown Author";
      }
    })
    .catch((error) => {
      console.log(error);
    });
}

const signedInNav = document.querySelector(".signedIn");
const signedInName = document.querySelector(".userName");
const signedOutNav = document.querySelector(".signedOut");
const addReviewBtn = document.querySelector(".addReviewButton");

//Handles functionality of the nav bar when a user is logged in
function showSignedInNavBar(userName) {
  signedOutNav.style.display = "none";
  signedInName.innerText = userName;

  signedInNav.style.display = "flex";
  signedInNav.style.justifyContent = "center";
  signedInNav.style.alignItems = "center";
  signedInNav.style.gap = "25px";

  addReviewBtn.style.visibility = "visible";
}

////Handles functionality of the nav bar when a user is not logged in
function showSignedOutNavBar() {
  signedInNav.style.display = "none";
  signedOutNav.style.display = "flex";
  addReviewBtn.style.visibility = "hidden";
}

const reviewContainer = document.querySelector(".review-Container");

function createReviewCard(bookTitle, myReview) {
  let cardDiv = document.createElement("div");
  cardDiv.classList.add("reviewCard");
  reviewContainer.append(cardDiv);

  let title = document.createElement("p");
  title.innerHTML = bookTitle;
  title.classList.add("cardTitle");
  cardDiv.append(title);

  let description = document.createElement("p");
  description.innerHTML = myReview;
  description.classList.add("cardDescription");
  cardDiv.append(description);

  reviewContainer.append(cardDiv);
}

//Form Events
const showFormBtn = document.querySelector(".addReviewButton");
const submitButton = document.querySelector(".submitButton");
const form = document.querySelector(".form");

showFormBtn.addEventListener("click", () => {
  form.style.visibility = "visible";
});
submitButton.addEventListener("click", handleForm);

function handleForm() {
  let formBookTitle = document.querySelector("#book-Title");
  let reviewInfo = document.querySelector("#reviewField");
  createReviewCard(formBookTitle.value, reviewInfo.value);
  addReview(formBookTitle.value, reviewInfo.value);

  formBookTitle.value = "";

  form.style.visibility = "hidden";
}

const discoverBtn = document.querySelector(".discoverBtn");
const reviewBtn = document.querySelector(".myReviewBtn");
const bookSearchContainer = document.querySelector("#bookSearchContainer");
const userReviewContainer = document.querySelector("#userReviewContainer");
const discoverSection = document.querySelector(".discoverSection");
const mainContentSection = document.querySelector(".mainContent");
const quoteContainer = document.querySelector(".quoteContainer");

discoverBtn.addEventListener("click", showBookDescription);
reviewBtn.addEventListener("click", showMyReviews);

function showMyReviews() {
  //Hide book description
  discoverSection.style.display = "none";

  //Show my reviews
  userReviewContainer.style.display = "flex";
}

function showBookDescription() {
  //Hide user reviews
  userReviewContainer.style.display = "none";
  bookSearchContainer.style.display = "none";

  //Show book description
  discoverSection.style.display = "flex";

  quoteContainer.style.disply = "flex";
}
export {
  updateDisplay,
  showSignedInNavBar,
  showSignedOutNavBar,
  createReviewCard,
};
