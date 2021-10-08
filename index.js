const searchField = document.getElementById("search-field");
const searchBtn = document.getElementById("search-btn");
const outputFiled = document.getElementById("output-field");
const dataCountField = document.getElementById("data-count");
let foundResult = 0;

searchBtn.addEventListener("click", function () {
  const searchText = searchField.value;
  if (searchText === "") {
    dataCountField.innerHTML = "";
    const h4 = document.createElement("h4");
    h4.innerText = `Please Enter Book Name`;
    dataCountField.appendChild(h4);
    return;
  }
  searchField.value = "";
  outputFiled.innerHTML = "";
  dataCountField.innerHTML = "";
  const url = `https://openlibrary.org/search.json?q=${searchText}}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      // console.log(data);
      const totalFound = data.numFound;
      if (totalFound === 0 || totalFound == null) {
        const h4 = document.createElement("h4");
        h4.innerText = `No book found`;
        dataCountField.appendChild(h4);
        return;
      }
      loadData(data.docs);
      const h4 = document.createElement("h4");
      h4.innerText = `Found Data: ${totalFound} Showing Data: ${foundResult}`;
      dataCountField.appendChild(h4);
    });
});

const loadData = (books) => {
  console.log(books);
  books.forEach((book) => {
    foundResult++;
    // console.log(book)
    const div = document.createElement("div");
    const bookName = book.title;
    let authorName = book.author_name;
    let publisherName = book.publisher[0];
    let publishedDate = book.first_publish_year;
    if (!authorName) {
      authorName = "Unkown";
    }
    if (!publisherName) {
      authorName = "Unkown";
    }
    if (!publishedDate) {
      publishedDate = "Unkown";
    }
    div.innerHTML = `
        <div class="card h-100 rounded-2"  style="width: 18rem;">
            <img class="p-2" src="https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg" class="card-img-top" alt="Book-Image">
            <div class="card-body">
            <h4>${bookName}</h4>
            <h6>Authors: ${authorName}</h6>
            <h6>Publisher: ${publisherName}</h6>
            </p>First Publish: ${publishedDate}</p>
            </div>
          </div>
        `;
    outputFiled.appendChild(div);
    outputFiled.style.backgroundColor = "beige";
  });
};
