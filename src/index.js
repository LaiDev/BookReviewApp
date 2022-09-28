import { getBookData } from "./bookData";
import { updateDisplay } from "./dom";

let bookTitle = document.querySelector("#bookTitle");
let searchBtn = document.querySelector("#searchBtn");

searchBtn.addEventListener("click", handleThis);

function handleThis() {
  let book = getBookData(bookTitle.value);
  updateDisplay(book);
  bookTitle.value = "";
}
