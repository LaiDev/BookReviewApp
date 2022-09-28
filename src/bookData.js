
//Uses a book title to return an object containing information about the book.

//To Do : Add a more specific way to search for books

export async function getBookData(bookTitle) {
  const bookData = await fetch(
    `https://www.googleapis.com/books/v1/volumes?q=search+
    ${bookTitle}`,
    { mode: "cors" }
  );

  const data = await bookData.json();

  return data;
}
