var hour = 0;
var money = 0;
setInterval(function () {
    hour++;
    console.log("It is hour: ".concat(hour));
    if (hour === 24) {
        hour = 0;
    }
}, 6000);
function updateMoney() {
    document.getElementById('money').textContent = "".concat(money);
}
var redLine = {
    yardStay: true,
    redTrainSpeed: 500,
    redTrainLocation: 0,
    redTrainStations: [
        'In transit...',
        'Valley Junction',
        'In transit...',
        'Harbour Landing',
        'In transit...',
        'Oakshire Dept',
        'In transit...',
        'Pine Valley',
        'In transit...',
        'Downtown Oakshire',
        'In transit...',
        'Oakshire Central Station',
        'In transit...',
        'Oakshire University',
        'In transit...',
        'Oakshire North Station',
    ],
    redTrainCost: 10,
    redTrainProfitPerStop: 20,
    redTrainCostDisplay: document.getElementById('redCost'),
    redTrainProfitDisplay: document.getElementById('redRevenue'),
    redTrainSpeedDisplay: document.getElementById('redTrainCount'),
    redTrainLocationDisplay: document.getElementById('redTrainStatus'),
    redTrainStopsDisplay: document.getElementById('redStops'),
};
function updateRedLine() {
    redLine.redTrainCostDisplay.textContent = "$".concat(redLine.redTrainCost);
    redLine.redTrainProfitDisplay.textContent = "$".concat(redLine.redTrainProfitPerStop);
    redLine.redTrainSpeedDisplay.textContent = "".concat(redLine.redTrainSpeed / 1000, " minutes");
}
function driveRedLine() {
    if (hour >= 3 && hour <= 23 && redLine.yardStay === false) {
        redLine.redTrainLocationDisplay.textContent =
            redLine.redTrainStations[redLine.redTrainLocation];
        redLine.redTrainLocation++;
        if (redLine.redTrainStations[redLine.redTrainLocation] != 'In transit...') {
            money += redLine.redTrainProfitPerStop;
            money -= redLine.redTrainCost;
            redLine.redTrainStopsDisplay.textContent = "".concat(redLine.redTrainLocation / 2 + 0.5);
            updateMoney();
        }
        if (redLine.redTrainLocation === redLine.redTrainStations.length &&
            hour >= 3 &&
            hour <= 23) {
            redLine.redTrainLocation = 0;
        }
        else if (redLine.redTrainLocation === redLine.redTrainStations.length) {
            redLine.yardStay = true;
            redLine.redTrainLocation = 0;
        }
    }
    setTimeout(driveRedLine2, redLine.redTrainSpeed / 2);
}
function driveRedLine2() {
    if (hour >= 3 && hour <= 23) {
        redLine.yardStay = false;
    }
    else if (hour < 3 && hour > 23 && redLine.yardStay == true) {
        redLine.redTrainLocationDisplay.textContent = 'In yard...';
    }
    setTimeout(driveRedLine, redLine.redTrainSpeed / 2);
}
var dispatcher = setInterval(function () {
    if (hour === 3) {
        redLine.yardStay = false;
        driveRedLine();
        clearInterval(dispatcher);
    }
}, 1000);
