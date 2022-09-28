import { getBookData } from "./bookData";
import { createReviewCard, updateDisplay } from "./dom";

let bookTitle = document.querySelector("#bookTitle");
let searchBtn = document.querySelector("#searchBtn");
let addReviewBtn = document.querySelector(".addReviewButton");

searchBtn.addEventListener("click", updateUI);

function updateUI() {
  let book = getBookData(bookTitle.value);
  updateDisplay(book);
  bookTitle.value = "";
}

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
