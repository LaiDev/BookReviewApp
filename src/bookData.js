console.log("Hello Webpack!");

export async function getBookData(bookTitle) {
  const bookData = await fetch(
    `https://www.googleapis.com/books/v1/volumes?q=search+
    ${bookTitle}`,
    { mode: "cors" }
  );

  const data = await bookData.json();

  /*

  console.log(data.items[0].volumeInfo.title);
  console.log(data.items[0].volumeInfo.description);
  console.log(data.items[0].volumeInfo.averageRating);
*/
  return data;
}
