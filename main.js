(()=>{"use strict";console.log("Hello Webpack!");const e=document.querySelector(".book-Title"),o=document.querySelector(".book-Description"),t=document.querySelector(".book-Cover"),n=document.querySelector(".author"),c=document.querySelector(".book-Rating");let r=document.querySelector("#bookTitle");document.querySelector("#searchBtn").addEventListener("click",(function(){var l;l=async function(e){const o=await fetch(`https://www.googleapis.com/books/v1/volumes?q=search+\n    ${e}`,{mode:"cors"});return await o.json()}(r.value),l.then((function(r){e.innerText=r.items[0].volumeInfo.title,o.innerText=r.items[0].volumeInfo.description;let l=r.items[0].volumeInfo.imageLinks.thumbnail;t.style.backgroundImage=`url(${l})`,n.innerText=r.items[0].volumeInfo.authors,c.innerText=`${r.items[0].volumeInfo.averageRating}/5`,console.log(r.items[0].volumeInfo.averageRating)})).catch((e=>console.log("There is an ERROR!"))),r.value=""}))})();