const booksData = document.querySelector(".books")
const authorsData = document.querySelector(".authors")
const loginBtn = document.querySelector(".login")
const signupBtn = document.querySelector(".signup")
const modalSignup = document.querySelector(".modalForSignUp")
const modalLogin = document.querySelector(".modalForLogin")
const closeSignup = document.querySelector(".closeBtn")
const closeLogin = document.querySelector(".closeBtnLogin")
const btnSignUp = document.querySelector(".btnSignUp")
const btnLogin = document.querySelector(".btnLogin")
const navigation = document.querySelector(".navigation")


signupBtn.addEventListener("click", ()=>{
    modalSignup.style.display="block"
    modalLogin.style.display="none"
})

loginBtn.addEventListener("click", ()=>{
    modalLogin.style.display="block"
    modalSignup.style.display="none"
})


closeSignup.addEventListener("click", ()=>{
    modalSignup.style.display="none"
    
})

closeLogin.addEventListener("click", ()=>{
    modalLogin.style.display="none"
})

btnSignUp.addEventListener("click", ()=>{
    axios.post("http://localhost:3000/api/books/signup", {
        name: document.querySelector("#inputName").value,

        surname: document.querySelector("#inputSurname").value,

        mail: document.querySelector("#inputMail").value,

        password: document.querySelector("#inputPassword").value

    }).then(() => {
        document.querySelector(".succesCase").style.display = "block";
        
    })
        .catch(() => {
            document.querySelector(".errorCase").style.display = "block";
            document.querySelector(".formToSignup").reset();

        })
})

btnLogin.addEventListener("click", () => {

    axios.post("http://localhost:3000/api/books/login", {

        mail: document.querySelector("#loginMail").value,
        password: document.querySelector("#loginPassword").value

    }).then(() => {

        localStorage.setItem("email", document.querySelector("#loginMail").value)
        localStorage.setItem("password", document.querySelector("#loginPassword").value)

        document.querySelector(".succesCaseForLogin").style.display = "block";
        
        document.querySelector(".modalForLogin").style.display = "none"
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
        .catch(() => {
            document.querySelector(".errorCaseForLogin").style.display = "block";
            document.querySelector(".formToLogin").reset();
        })
})
