function activate() {
    document.getElementById("intro").style.display = "block";
}
function deactivate() {
    document.getElementById("intro").style.display = "none";
}
activate();
document.addEventListener('mousedown', deactivate);
