let hour: number = 0;
let money: number = 0;

setInterval(() => {
  hour++;
  console.log(`It is hour: ${hour}`);
  if (hour === 24) {
    hour = 0;
  }
}, 60000);

function updateMoney() {
  document.getElementById('money')!.textContent = `${money}`;
}

let redLine = {
  yardStay: true,
  redTrainSpeed: 5000,
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

  redTrainCostDisplay: document.getElementById('redCost')!,
  redTrainProfitDisplay: document.getElementById('redRevenue')!,

  redTrainSpeedDisplay: document.getElementById('redTrainCount')!,
  redTrainLocationDisplay: document.getElementById('redTrainStatus')!,
  redTrainStopsDisplay: document.getElementById('redStops')!,
};

function updateRedLine() {
  redLine.redTrainCostDisplay.textContent = `$${redLine.redTrainCost}`;
  redLine.redTrainProfitDisplay.textContent = `$${redLine.redTrainProfitPerStop}`;
  redLine.redTrainSpeedDisplay.textContent = `${
    redLine.redTrainSpeed / 1000
  } minutes`;
}

function driveRedLine() {
  if (hour >= 3 && hour <= 23) {
    redLine.redTrainLocationDisplay.textContent =
      redLine.redTrainStations[redLine.redTrainLocation];
    redLine.redTrainLocation++;
    if (redLine.redTrainStations[redLine.redTrainLocation] != 'In transit...') {
      money += redLine.redTrainProfitPerStop;
      money -= redLine.redTrainCost;
      redLine.redTrainStopsDisplay.textContent = `${
        redLine.redTrainLocation / 2 + 0.5
      }`;
      updateMoney();
    }
    if (
      redLine.redTrainLocation === redLine.redTrainStations.length
    ) {
      redLine.redTrainLocation = 0;
  }
  setTimeout(driveRedLine2, redLine.redTrainSpeed / 2);
}
}

function driveRedLine2() {
  setTimeout(driveRedLine, redLine.redTrainSpeed / 2);
}
let dispatcher = setInterval(() => {
  if (hour === 3) {
    redLine.yardStay = false;
    driveRedLine();
    clearInterval(dispatcher);
  }
}, 1000);
