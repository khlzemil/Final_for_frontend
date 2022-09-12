const bookWrapper = document.querySelector(".book-wrapper")
const infoMail=localStorage.getItem("email")
const infoPass=localStorage.getItem("password")
const navListt = document.querySelector(".infodiv");
const signUpp = document.querySelector(".signup")
const loginBotnn = document.querySelector(".login")

if(localStorage.length>0){
        axios.post("http://localhost:3000/api/books/login", {
        mail: localStorage.getItem("email"),
        password: localStorage.getItem("password")

    }).then(() => {

        document.querySelector(".suc").style.display = "block";
        document.querySelector(".loginmodal").style.display = "none"
        signUpp.style.display = "none"
        loginBotnn.style.display = "none"
        const newNav = `
        <p class="loginmaill">${localStorage.getItem("email")}</p>
        <div class="dasssh"><a class="dash" href="./dashboard.html">DashBoard</a></div>
        <div class="logout"><a class="dash" href="./index.html">Log out</a></div>`;

        navListt.insertAdjacentHTML("beforeend", newNav);
        document.querySelector(".logout").addEventListener("click", () => {
        
            localStorage.clear()
 
          })
    })
}

 function getBooks(){
    // SHOW LOADING 
    document.querySelector(".spinner").style.display="block"
   axios.get("http://localhost:3000/api/books").then(books=>{
    // HIDE LOADING
    document.querySelector(".spinner").style.display="none"
    renderBookCard(books.data)
   })
}

 function renderBookCard(bookList){

    bookList.map(book=>{
        const bookHTML=`
        <div class="book-second">
        <div class="bookinfo">
            <div >
                <img class="left2" src="${book.imageUrl}" alt="">
            </div>
            <div class="right2">
                <div class="divname" >${book.title}</div>
                <div class="divauthor"><span class="by">By</span>${book.author}</div>
                <div class="spoiler">${book.synopsis}</div>
            </div>
        </div>
    </div>
        `
        bookWrapper.insertAdjacentHTML('beforeend',bookHTML)
    })
    
}

getBooks();