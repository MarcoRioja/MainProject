var body = document.body;
var modoGuardado = localStorage.getItem("modo");
var userTxt = document.getElementById("userNameTxt");

function loadConfig() {
    modoGuardado = localStorage.getItem("modo");
    body = document.body;
    if (modoGuardado === "oscuro") {
        body.classList.add("dark-mode");
        console.log("Activado Modo Oscuro");
        modeSwitch.checked = true;
    } else {
        body.classList.remove("dark-mode");
        console.log("Activado Modo Claro");
        modeSwitch.checked = false;
    }
}

function toggleMode() {
    if (modeSwitch.checked) {
        body.classList.add("dark-mode");
        console.log("Activado Modo Oscuro");
        localStorage.setItem("modo", "oscuro");
    } else {
        body.classList.remove("dark-mode");
        console.log("Activado Modo Claro");
        localStorage.setItem("modo", "claro");
    }
}

function backIndex() {
    window.location.href = "index.html";
}

document.getElementById("loginSubmitAj").addEventListener("click", function (event) {
    event.preventDefault();
    if (document.getElementById("username_incf").value !== "") {
        localStorage.setItem("username", document.getElementById("username_incf").value);
        document.getElementById("username_incf").value = "";

        setUser();
    }
});

function setUser() {
    loadUser();
    if (savedUser != "null" || savedUser == "") {
        userTxt.innerText = savedUser;
    } else {
        userTxt.innerText = "Sin Identificar";
    }
}

function loadUser () {
    savedUser = localStorage.getItem("username");
}


setUser();
loadConfig();