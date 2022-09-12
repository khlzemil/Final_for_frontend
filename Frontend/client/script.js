const oneBook = document.querySelector(".main_book");
const twoBook = document.querySelector(".second_books");
const topSelling = document.querySelector(".top_selling");
const allAuthors = document.querySelector(".authors_list_api")


if(localStorage.length > 0){
    axios.post("http://localhost:3000/api/books/login", {

        mail: localStorage.getItem("email"),
        password: localStorage.getItem("password")

    }).then(() => {

        signupBtn.style.display = "none"
        loginBtn.style.display = "none"
        const newNav = `
        <p class="currentMail">${document.querySelector("#loginMail").value}</p>
        <div class="dashboard"><a class="board" href="./dashboard.html">Dashboard</a></div>
        <div class="logout"><a class="logout_a" href="./index.html">Log out</a></div>`;

        navigation.insertAdjacentHTML("beforeend", newNav);
        document.querySelector(".logout").addEventListener("click", () => {
            localStorage.clear()
          })
        })
}


function getAuthors() {
    
    axios.get("http://localhost:3000/api/authors").then(authors => {

        
        renderAuthorCard(authors.data)
        
    })
}

function renderAuthorCard(authorList) {

    authorList.map((author, index) => {
        if (index < 6) {
            const authorHTML = `
            <div class="sec3div">
                           
                 <img class="sec3img" src="${author.imgUrl}" alt="">
                 <p class="sec3p">${author.name}</p>
             </div>
    
            `
            allAuthors.insertAdjacentHTML('afterbegin', authorHTML)
        }

    })

}

getAuthors();

function getBooks() {
    axios.get("http://localhost:3000/api/books").then(books => {
        renderBookCard(books.data)
        sortListRender(books.data)
    })
}

function renderBookCard(bookList) {

    bookList.map((book, index) => {
        if (index < 1) {
            const bookHTML = `
                <div class="image_book">
                    <img src="${book.imageUrl}" alt="books">
                </div>
                <div class="about_book">
                    <h3 class="book_name"> Name: ${book.title}</h3>
                    <p class="genre">Genre: ${book.genre}</p>
                    <p class="author">Author: ${book.author}</p>
                    <p class="publish_date">Publish date: ${book.publishDay}</p>
                    <p class="price">${book.price}$</p>
                </div>
    
            `;

            oneBook.insertAdjacentHTML('afterbegin', bookHTML)
        }


    })

}

getBooks();
function sortListRender(sortbookList) {
    sortbookList.sort((book1,book2)=>{

        return book2.sold-book1.sold
    })

    sortbookList.map((bookss, index) => {
        if (index < 5) {
            const bookssHTML = `
            <div class="divbook">
                <img class="divbookimg" src="${bookss.imageUrl}" alt="">
                <h3 class="divbookh3">${bookss.title}</h3>
                <p class="divbookp"><span class="divbooksp">By</span>${bookss.author}</p>
                <p class="divbookprice">${bookss.price}$</p>
            </div>
             `;
            topSelling.insertAdjacentHTML('beforeend', bookssHTML)
        }


    })

}