let days:number = 0;
let hours:number = 0;
let minutes:number = 0;

const timer = document.getElementById("time")!;

setInterval(() => {
    minutes++;
    if (minutes === 60) {
        hours++;
        minutes = 0;
        if (hours === 24) {
            days++;
            hours = 0;
        }
    }
    timer.textContent = `Day ${String(days)}, Hour ${String(hours)}, Minute ${String(
      minutes,
    )}`;
    }
, 1000);

