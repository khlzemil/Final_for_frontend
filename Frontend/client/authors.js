const authorWrapper = document.querySelector(".author-wrapper")
const infoMail=localStorage.getItem("email")
const infoPass=localStorage.getItem("password")
const navLisst = document.querySelector(".infodiv");
const siggnUp = document.querySelector(".Sign-Up")
const loginBotnnn = document.querySelector(".login")

if(localStorage.length>0){
    axios.post("http://localhost:3000/api/books/login", {


        mail: localStorage.getItem("email"),
        password: localStorage.getItem("password")

    }).then(() => {

        document.querySelector(".suc").style.display = "block";
        document.querySelector(".loginmodal").style.display = "none"
        siggnUp.style.display = "none"
        loginBotnnn.style.display = "none"
        const newNav = `
        <p class="loginmaill">${localStorage.getItem("email")}</p>
        <div class="dasssh"><a class="dash" href="./dashboard.html">DashBoard</a></div>
        <div class="logout"><a class="dash" href="./index.html">Log out</a></div>`;

        navLisst.insertAdjacentHTML("beforeend", newNav);
        document.querySelector(".logout").addEventListener("click", () => {
        
            localStorage.clear()
 
          })
    })
}

 function getAuthors(){
    document.querySelector(".spinner").style.display="block"
   axios.get("http://localhost:3000/api/authors").then(
    
   authors=>{

    document.querySelector(".spinner").style.display="none"
    renderAuthorCard(authors.data)
   }
   
   )
}

 function renderAuthorCard(authorList){

    authorList.map(author=>{
        const authorHTML=`
        <div class="authornum">
            <div ><img class="authleft" src="${author.imgUrl}" alt=""></div>

            <div class="authright">
                <h3 class="rightname">${author.name}</h3>
                <p class="rightinfo">${author.biography}</p>
            </div>
        </div>

        `
        

        authorWrapper.insertAdjacentHTML('beforeend',authorHTML)
    })
    
}

getAuthors();