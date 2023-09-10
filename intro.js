function on() {
    document.getElementById("intro").style.display = "block";
}
function off() {
    document.getElementById("intro").style.display = "none";
}
on();
document.addEventListener("mousedown", off);
