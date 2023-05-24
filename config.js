var userTxt = document.getElementById("userNameTxt");
var modoGuardado = localStorage.getItem("modo");

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

function setSwitch() {
    if (modoGuardado == "oscuro") {
        modeSwitch.checked = true;
    } else {
        modeSwitch.checked = false;
    }
}

setSwitch();
setUser();