console
const searchField = document.getElementById('search-field');
const searchBtn = document.getElementById('search-btn');
const outputFiled = document.getElementById('output-field');
const dataCountFiled = document.getElementById('data-count');
let foundResult =0;

searchBtn.addEventListener('click', function(){
    const searchText = searchField.value;
    if(searchText === ''){
        const h4 = document.createElement('h4');
        h4.innerText = `Please Enter Book Name`
        dataCountFiled.appendChild(h4);
        return;
    }
    searchField.value = '';
    outputFiled.innerHTML = '';
    dataCountFiled.innerHTML = '';
    const url = `https://openlibrary.org/search.json?q=${searchText}}`
    fetch(url)
    .then(res => res.json())
    .then(data => {
        // console.log(data);
        const totalFound = data.numFound;
        if(totalFound ===0 || totalFound == null){
            const h4 = document.createElement('h4');
            h4.innerText = `No book found`
            dataCountFiled.appendChild(h4);
            return;
        }
        loadData(data.docs)
        const h4 = document.createElement('h4');
        h4.innerText = `Found Data: ${totalFound} Showing Data: ${foundResult}`
        dataCountFiled.appendChild(h4);
    });
});

const loadData = books =>{
    books.forEach(book => {
        foundResult++;
        // console.log(book)
        const div = document.createElement('div');
        const bookName = book.title;
        let authorName = book.author_name;
        let publishedDate = book.first_publish_year;
        if(authorName === '' || authorName == null){
            authorName = 'Unkown'
        }
        if(publishedDate === '' || publishedDate == null){
            publishedDate = 'Unkown'
        }
        div.innerHTML = `
        <div class="card" style="width: 18rem;">
            <img src="https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg" class="card-img-top" alt="Book Image">
            <div class="card-body">
            <h3>${bookName}</h3>
            <h5>Authors: ${authorName}</h5>
            </p>First Publish: ${publishedDate}</p>
            </div>
          </div>
        `
        outputFiled.appendChild(div);
    });
   
}
