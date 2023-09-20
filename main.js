var hour = 0;
var money = 0;
var rushHourBonus = 1;
setInterval(function () {
    hour++;
    console.log("It is hour: ".concat(hour));
    if (hour >= 15 && hour <= 23) {
        rushHourBonus = 1.15;
    }
    else {
        rushHourBonus = 1;
    }
    if (hour === 24) {
        hour = 0;
    }
    updateBonus();
}, 60000);
function updateMoney() {
    document.getElementById('money').textContent = "".concat(money);
    money = Math.round(money * 100) / 100;
}
function updateBonus() {
    document.getElementById('rushBonus').textContent = "x".concat(rushHourBonus);
}
var redLine = {
    yardStay: true,
    redTrainSpeed: 5000,
    redTrainPax: 0,
    PaxMultiplier: 1,
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
    redTrainTicket: 5,
    redCapacity: 60,
    redTrainCostDisplay: document.getElementById('redCost'),
    redCapacityDisplay: document.getElementById('redCapacity'),
    redPaxDisplay: document.getElementById('redPax'),
    redTrainSpeedDisplay: document.getElementById('redTrainCount'),
    redTrainLocationDisplay: document.getElementById('redTrainStatus'),
    redTrainStopsDisplay: document.getElementById('redStops'),
};
function updateRedLine() {
    redLine.redTrainCostDisplay.textContent = "$".concat(redLine.redTrainCost);
    redLine.redTrainSpeedDisplay.textContent = "".concat(redLine.redTrainSpeed / 1000, " minutes");
}
function driveRedLine() {
    if (hour >= 3 && hour <= 23) {
        redLine.redTrainLocationDisplay.textContent =
            redLine.redTrainStations[redLine.redTrainLocation];
        redLine.redTrainLocation++;
        if (redLine.redTrainStations[redLine.redTrainLocation] != 'In transit...') {
            if (redLine.redTrainPax > 0 &&
                redLine.redTrainPax <= redLine.redCapacity) {
                var temp = Math.floor(getRandomNumber(1, redLine.redTrainPax));
                money += redLine.redTrainTicket * temp * rushHourBonus;
                redLine.redTrainPax -= temp;
            }
            if (redLine.redTrainPax > redLine.redCapacity) {
                money += (redLine.redTrainPax - redLine.redCapacity) * 0.01;
                var temp = Math.floor(getRandomNumber(redLine.redTrainPax / 2, redLine.redTrainPax));
                money += redLine.redTrainTicket * temp * rushHourBonus;
                redLine.redTrainPax -= temp;
            }
            redLine.redTrainPax += Math.floor(getRandomNumber(1, 20) * redLine.PaxMultiplier);
            money -= redLine.redTrainCost;
            redLine.redPaxDisplay.textContent = "".concat(redLine.redTrainPax);
            redLine.redTrainStopsDisplay.textContent = "".concat(redLine.redTrainLocation / 2 + 0.5);
            updateMoney();
        }
        if (redLine.redTrainLocation === redLine.redTrainStations.length) {
            redLine.redTrainLocation = 0;
        }
        setTimeout(driveRedLine2, redLine.redTrainSpeed / 2);
    }
}
function driveRedLine2() {
    setTimeout(driveRedLine, redLine.redTrainSpeed / 2);
    if (redLine.redTrainTicket > 7) {
        redLine.PaxMultiplier = 0.25;
    }
    else if (redLine.redTrainTicket < 2) {
        redLine.PaxMultiplier = 1.75;
    }
    else {
        redLine.PaxMultiplier = 1;
    }
}
var dispatcher = setInterval(function () {
    if (hour === 3) {
        redLine.yardStay = false;
        driveRedLine();
        clearInterval(dispatcher);
    }
}, 1000);
function updateValuesOfSlider() {
    var slider = document.getElementById('redTrainTicket');
    var output = document.getElementById('redTrainTicketDisplay');
    output.textContent = "".concat(slider.value);
    redLine.redTrainTicket = parseInt(slider.value);
}
function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
