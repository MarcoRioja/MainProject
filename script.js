var modal = document.getElementById('modal');
var modal_data = document.getElementById('modal-data');
var modeSwitch = document.getElementById("modeSwitch");

var savedUser = localStorage.getItem("username");
var usernameInput = document.getElementById("username_in");
var userTxt = document.getElementById("userNameTxt");

document.querySelector('.data-button').addEventListener('click', function () {
    if ( savedUser == "null" || savedUser == "") {
        document.getElementById("modal-data").style.display = "block";
    } else {
        document.getElementById("modal-user-data").style.display = "block";
        document.getElementById("UserNameDt").textContent = savedUser;
    }
    
});

var closeButton = document.querySelector("#modal-data .close");
if (closeButton) {
    closeButton.addEventListener("click", function () {
        document.getElementById("modal-data").style.display = "none";
    });
}

var closeButton1 = document.querySelector("#modal-user-data .close");
if (closeButton1) {
    closeButton1.addEventListener("click", function () {
        document.getElementById("modal-user-data").style.display = "none";
    });
}

window.addEventListener("click", function (event) {
    if (event.target == document.getElementById("modal-data")) {
        document.getElementById("modal-data").style.display = "none";
    }
});

document.getElementById("loginSubmit").addEventListener("click", function (event) {
    event.preventDefault();

    console.log("Usuario iniciado: " + usernameInput.value)
    if (usernameInput.value != "") {
        localStorage.setItem("username", usernameInput.value);

        document.getElementById("modal-data").style.display = "none";
        usernameInput.value = "";

        setUser();
    }
});

document.getElementById("alertSubmit").addEventListener("click", function (event) {
    event.preventDefault();
    if (document.getElementById("alert_in").value != "") {
        alert(document.getElementById("alert_in").value)
        document.getElementById("alert_in").value = "";
    }
});

document.getElementById("closeButton").addEventListener("click", function (event) {
    event.preventDefault();
    savedUser = null;
    localStorage.setItem("username", null);

    setUser();

    document.getElementById("modal-user-data").style.display = "none";
});

var closeButton2 = document.querySelector("#modal .close");
if (closeButton2) {
    closeButton2.addEventListener("click", function () {
        modal.style.display = 'none';
    });
}

document.querySelector('.settings-button').addEventListener('click', function () {
    modal.style.display = 'block';
});

var displayed = false;
document.querySelector('#seeDataBtn').addEventListener('click', function () {
    if (displayed) {
        document.querySelector('#seeData').style.display = 'none';
        displayed = false;
    } else {
        document.querySelector('#seeData').style.display = 'block';
        displayed = true;
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