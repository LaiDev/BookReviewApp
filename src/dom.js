import { signIn } from "../firebase.config";

const titleUI = document.querySelector(".book-Title");
const descriptionUI = document.querySelector(".book-Description");
const coverUI = document.querySelector(".book-Cover");
const authorUi = document.querySelector(".author");
const ratingUI = document.querySelector(".book-Rating");

const signInButton = document.querySelector(".signInBtn");

signInButton.addEventListener("click", signIn);

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

export { updateDisplay };
