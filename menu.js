function openModal() {
    var modal = document.getElementById("menuModal");
    modal.style.display = "block";
}

window.onclick = function (event) {
    var modal = document.getElementById("menuModal");
    if (event.target === document.getElementById("main") || event.target === document.body) {
        modal.style.display = "none";
    }
};
