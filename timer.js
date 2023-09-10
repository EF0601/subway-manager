var days = 0;
var hours = 0;
var minutes = 0;
var timer = document.getElementById("time");
setInterval(function () {
    minutes++;
    if (minutes === 60) {
        hours++;
        minutes = 0;
        if (hours === 24) {
            days++;
            hours = 0;
        }
    }
    timer.textContent = "Day ".concat(String(days), ", Hour ").concat(String(hours), ", Minute ").concat(String(minutes));
}, 1000);
