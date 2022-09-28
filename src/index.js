import { getBookData } from "./bookData";
import { updateDisplay } from "./dom";

let bookTitle = document.querySelector("#bookTitle");
let searchBtn = document.querySelector("#searchBtn");

searchBtn.addEventListener("click", updateUI);

function updateUI() {
  let book = getBookData(bookTitle.value);
  updateDisplay(book);
  bookTitle.value = "";
}
