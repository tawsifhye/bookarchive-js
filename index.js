const searchField = document.getElementById('search-field');
const searchBtn = document.getElementById('search-btn');
const outputFiled = document.getElementById('output-field');
const dataCountFiled = document.getElementById('data-count');
let foundResult =0;

searchBtn.addEventListener('click', function(){
    const searchText = searchField.value;
    searchField.value = '';
    outputFiled.innerHTML = '';
    dataCountFiled.innerHTML = '';
    // console.log(searchText);
    const url = 'http://openlibrary.org/search.json?q=javascript'
    // console.log(url);
    fetch(url)
    .then(res => res.json())
    .then(data => {
        const totalFound = data.numFound;
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
        let authorName = book.author_alternative_name;
        let publishedDate = book.first_publish_year;
        if(authorName === '' || authorName == null){
            authorName = 'Unkown'
        }
        if(publishedDate === '' || publishedDate == null){
            publishedDate = 'Unkown'
        }
        /* div.innerHTML = `
        <h3>${bookName}</h3>
        <h4>${authorName}</h4>
        </p>${publishedDate}</p>
        ` */
        div.innerHTML = `
        <div class="card" style="width: 18rem;">
            <img src="..." class="card-img-top" alt="...">
            <div class="card-body">
            <h3>${bookName}</h3>
            <h5>Author ${authorName}</h5>
            </p>First Publish: ${publishedDate}</p>
            </div>
          </div>
        `
        outputFiled.appendChild(div);
    })
   
}
