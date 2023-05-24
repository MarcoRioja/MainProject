var body = document.body;
var modoGuardado = localStorage.getItem("modo");

function loadConfig() {
    modoGuardado = localStorage.getItem("modo");
    body = document.body;
    if (modoGuardado === "oscuro") {
        body.classList.add("dark-mode");
        console.log("Activado Modo Oscuro");
    } else {
        body.classList.remove("dark-mode");
        console.log("Activado Modo Claro");
    }
}

loadConfig();