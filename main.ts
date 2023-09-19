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
  money = Math.round(money * 100) / 100;
}

let redLine = {
  yardStay: true,
  redTrainSpeed: 5000,
  redTrainPax: 0,
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

  redTrainCostDisplay: document.getElementById('redCost')!,
  redCapacityDisplay: document.getElementById('redCapacity')!,
  redPaxDisplay: document.getElementById('redPax')!,

  redTrainSpeedDisplay: document.getElementById('redTrainCount')!,
  redTrainLocationDisplay: document.getElementById('redTrainStatus')!,
  redTrainStopsDisplay: document.getElementById('redStops')!,
};

function updateRedLine() {
  redLine.redTrainCostDisplay.textContent = `$${redLine.redTrainCost}`;
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
      if (redLine.redTrainPax > 0 && redLine.redTrainPax <= redLine.redCapacity) {
        let temp = getRandomNumber(1, redLine.redTrainPax);
        money += redLine.redTrainTicket*temp;
        redLine.redTrainPax -= temp;
      }
      if (redLine.redTrainPax > redLine.redCapacity) {
        let temp = getRandomNumber(redLine.redTrainPax/2, redLine.redCapacity);
        money += redLine.redTrainTicket * temp;
        redLine.redTrainPax -= temp;
      }
      redLine.redTrainPax += getRandomNumber(1, 10);
      money -= redLine.redTrainCost;
      redLine.redPaxDisplay.textContent = `${redLine.redTrainPax}`;
      redLine.redTrainStopsDisplay.textContent = `${
        redLine.redTrainLocation / 2 + 0.5
      }`;
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
}
let dispatcher = setInterval(() => {
  if (hour === 3) {
    redLine.yardStay = false;
    driveRedLine();
    clearInterval(dispatcher);
  }
}, 1000);
function updateValuesOfSlider() {
  let slider = document.getElementById('redTrainTicket') as HTMLInputElement;
  let output = document.getElementById('redTrainTicketDisplay')!;
  output.textContent = `${slider.value}`;
  redLine.redTrainTicket = parseInt(slider.value);
}
function getRandomNumber(min:number, max:number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
