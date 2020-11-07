//Normal time variables
let dmilliseconds;
let dseconds;
let dminutes;
let milliseconds = 0;
let seconds = 0;
let minutes = 0;
let hours = 0;
let start;

//Laptimer variables
let lapstart = 0;
let lapnumber = 0;
let lapmilliseconds;
let lapseconds;
let lapminutes;
let lmilliseconds = 0;
let lseconds = 0;
let lminutes = 0;

//Global time variables and selectors
const dhours = document.querySelector(".hours");
const main = document.querySelector("main");
const display = document.querySelector(".time--display");
const lapTable = document.querySelector(".laps-table");
const table_head = lapTable.querySelectorAll("th");
const lapTableBody = document.querySelector("tbody");
const lapTimerDisplay = document.querySelector(".laptimer");
const startBtn = document.querySelector(".button--start");
const resumeBtn = document.querySelector(".button--resume");
const resetBtn = document.querySelector(".button--reset");
const lapBtn = document.querySelector(".button--lap");
const stopBtn = document.querySelector(".button--stop");
const btn = document.querySelector(".btn");

//testing
// const currentTheme = localStorage.getItem('theme') ? localStorage.getItem('theme') : null;

// if (currentTheme) {
//   document.body.classList.toggle(currentTheme);

//   if (currentTheme === 'dark-mode') {
//      btn.click = true;
//   }
// }

function toggleDarkMode(e) {
  //if(e.target.click){
    halfmoon.toggleDarkMode();
    startBtn.classList.toggle("dark-mode");
    lapBtn.classList.toggle("dark-mode");
    stopBtn.classList.toggle("dark-mode");
    resumeBtn.classList.toggle("dark-mode");
    resetBtn.classList.toggle("dark-mode");
    main.classList.toggle("dark-mode");
    table_head.forEach((head)=> head.classList.toggle("dark-mode"));
    // document.body.classList.toggle("light-mode");
    // localStorage.setItem("theme", "dark-mode");
//  }
  // else {
  //   halfmoon.toggleDarkMode();
  //   startBtn.classList.toggle("dark-mode");
  //   lapBtn.classList.toggle("dark-mode");
  //   stopBtn.classList.toggle("dark-mode");
  //   resumeBtn.classList.toggle("dark-mode");
  //   resetBtn.classList.toggle("dark-mode");
  //   main.classList.toggle("dark-mode");
  //   table_head.forEach((head)=> head.classList.toggle("dark-mode"));
  //   // document.body.classList.toggle("light-mode");
  //   localStorage.setItem("theme", "light-mode");
  // }
}

//Normal time functions
function displayTimer() {
  if (milliseconds < 10) {
    dmilliseconds = `0${milliseconds.toString()}`;
  } else {
    dmilliseconds = `${milliseconds}`;
  }

  if (seconds < 10) {
    dseconds = `0${seconds.toString()}`;
  } else {
    dseconds = `${seconds}`;
  }

  if (minutes < 10) {
    dminutes = `0${minutes.toString()}`;
  } else {
    dminutes = `${minutes}`;
  }

  if (hours < 10) {
    dhours.textContent = `0${hours.toString()}`;
  } else {
    dhours.textContent = `${hours}`;
  }

  if (hours >= 1) {
    display.innerHTML =
      dhours.textContent +
      ":" +
      dminutes +
      ":" +
      dseconds +
      "." +
      dmilliseconds;
  } else {
    display.innerHTML = dminutes + ":" + dseconds + "." + dmilliseconds;
  }
}

function timeCount() {
  if (milliseconds >= 99) {
    milliseconds = 0;
    seconds++;
    if (seconds >= 59) {
      seconds = 0;
      minutes++;
      if (minutes >= 59) {
        minutes = 0;
        hours++;
      }
    }
  } else {
    milliseconds++;
  }
  displayTimer();
}

//Lap timer functions
function displayLapTimer() {
  lapmilliseconds =
    lmilliseconds < 10 ? `0${lmilliseconds.toString()}` : lmilliseconds;

  lapseconds = lseconds < 10 ? `0${lseconds.toString()}` : lseconds;

  lapminutes = lminutes < 10 ? `0${lminutes.toString()}` : lminutes;

  lapTimerDisplay.innerHTML =
    lapminutes + ":" + lapseconds + "." + lapmilliseconds;
}

function laptimeCount() {
  if (lmilliseconds >= 99) {
    lmilliseconds = 0;
    lseconds++;
    if (lseconds >= 59) {
      lseconds = 0;
      lminutes++;
      if (lminutes >= 59) {
        lminutes = 0;
      }
    }
  } else {
    lmilliseconds++;
  }
  displayLapTimer();
}

const countInArray = (array) => (value) => {
  let count = 0;
  for (let i = 0; i < array.length; i++) {
    if (array[i] === value) {
      count++;
    }
  }
  return count;
};

const GetLapComparison = {
  laps: [],
  mapped_laps: [],
  lap_times: {},
  overallLaps: [],
  mapped_overall_laps: [],
  overall_lap_times: {},
  populateLaps: () => {
    GetLapComparison.laps = [];
    let laptimes;
    laptimes = lapTableBody.querySelectorAll(".laptime");
    laptimes.forEach((laptime) => {
      GetLapComparison.laps.push(laptime.textContent);
    });
  },
  mapLaps: () => {
    GetLapComparison.mapped_laps = GetLapComparison.laps.map((lapTime) => {
      try {
        lap = Number(lapTime.replace(/:/g, ""));
      } catch (error) {}
      GetLapComparison.lap_times[lap] = lapTime;
      return lap;
    });
  },
  lap_time_values: () => Object.values(GetLapComparison.lap_times),
  getMinimumLap: function () {
    this.populateLaps();
    this.mapLaps();
    return GetLapComparison.lap_times[
      Math.min(...GetLapComparison.mapped_laps)
    ];
  },
  getMaximumLap: () => {
    return GetLapComparison.lap_times[
      Math.max(...GetLapComparison.mapped_laps)
    ];
  },
  mapOverallLaps: () => {
    GetLapComparison.mapped_overall_laps = GetLapComparison.overallLaps.map(
      (overallTime) => {
        time = Number(overallTime.replace(/:/g, ""));
        GetLapComparison.overall_lap_times[time] = overallTime;
        return time;
      }
    );
  },
  getOverallMinimumTime: function () {
    GetLapComparison.overallLaps = [];
    lapTableBody
      .querySelectorAll(".omin")
      .forEach((time) => GetLapComparison.overallLaps.push(time.textContent));
    this.mapOverallLaps();
    return GetLapComparison.overall_lap_times[
      Math.min(...GetLapComparison.mapped_overall_laps)
    ];
  },
  getOverallMaximumTime: () => {
    lapTableBody
      .querySelectorAll(".omax")
      .forEach((time) => GetLapComparison.overallLaps.push(time.textContent));
    this.mapOverallLaps();
    return GetLapComparison.overall_lap_times[
      Math.max(...GetLapComparison.mapped_overall_laps)
    ];
  },
};

function removeAttribute_Class() {
  let lapRow = lapTableBody.querySelectorAll("tr");
  minimumLap = GetLapComparison.getMinimumLap();
  lapRow.forEach((row) => {
    // if (row.children[1].textContent == minimumLap) 
    // {
  row.classList.remove("min", "max");
  row.children[2].classList.remove("omin");
  row.children[0].removeAttribute("arrow-down");
  row.children[0].removeAttribute("arrow-up");
   // }
  });
}

function arrowFly()
{
  let lapRow = lapTableBody.querySelectorAll("tr");
  lapRow.forEach((row) => {
  row.children[0].removeAttribute("arrow-down");
  row.children[0].removeAttribute("arrow-up");
  });
}

function lapComparison() {
 removeAttribute_Class();
 let lapRow = lapTableBody.querySelectorAll("tr");
  minimumLap = GetLapComparison.getMinimumLap();
  //minimum lap
  lapRow.forEach((row) => {
    if (row.children[1].textContent === minimumLap) 
    {
      row.children[2].classList.add("omin");
      countInArray(GetLapComparison.laps)(minimumLap);
      if (countInArray(GetLapComparison.laps)(minimumLap) === 1) {
        row.children[0].setAttribute("arrow-down", "\u21D3");      
        setTimeout(arrowFly, 350);
        row.classList.add("min");   
      } 
      else {
        overallMinimumTime = GetLapComparison.getOverallMinimumTime();
        //in a case where the minimum lap reduces on-the-fly
        if (row.children[1].textContent != minimumLap) {
          removeAttribute_Class();
          GetLapComparison.overallLaps = [];
        }
       if (row.children[2].textContent === overallMinimumTime) {
          removeAttribute_Class();
          row.classList.add("min");
          row.children[0].setAttribute("arrow-down", "\u21D3");
        }
      }
    }
    // Maximum Lap
    maximumLap = GetLapComparison.getMaximumLap();
    if (row.children[1].textContent == maximumLap) 
    {
      row.children[2].classList.add("omax");
      console.log(countInArray(GetLapComparison.laps)(maximumLap));
      if (countInArray(GetLapComparison.laps)(maximumLap) === 1) {
        row.classList.add("max");
        row.children[0].setAttribute("arrow-up", "\u21D1");   
      } 
      else {
        overallMaximumTime = GetLapComparison.getOverallMaximumTime();
        //in a case where the maximum lap reduces on-the-fly
        if (row.children[1].textContent != maximumLap) {
          removeAttribute_Class();
          GetLapComparison.overallLaps = [];
        }
       if (row.children[2].textContent === overallMaximumTime) {
          removeAttribute_Class();
          row.classList.add("max");
          row.children[0].setAttribute("arrow-up", "\u21D1");
        }
      }
    }
});
}

function lapPrint() {
  lapnumber++;
  let lap = document.createElement("tr");
  if (lapnumber === 1) {
    lapnumber = "0" + lapnumber.toString();
    lap.innerHTML = `<td>${lapnumber}</td>
                     <td class="laptime">${display.textContent}</td>
                     <td class="overalltime">${display.textContent}</td>`;
    lapTableBody.appendChild(lap);
  } else {
    if (lapnumber < 10) {
      lapnumber = "0" + lapnumber.toString();
    }
    lap.innerHTML = `<td>${lapnumber}</td>
                    <td class="laptime">${lapTimerDisplay.textContent}</td>
                    <td class="overalltime">${display.textContent}</td>`;
    lapTableBody.prepend(lap);
  }
  if (lapTableBody.childElementCount > 2) {
    lapComparison();
  }
}

function lapTimer() {
  lapTable.classList.remove("button--hide");
  lapTimerDisplay.classList.remove("button--hide");
  if (lapstart === 0) {
    lapstart = setInterval(laptimeCount, 10);
    displayLapTimer();
    lapPrint();
  } else {
    displayLapTimer();
    lapPrint();
    lminutes = 0;
    lseconds = 0;
    lmilliseconds = 0;
    displayLapTimer();
  }
}

function startTimer() {
  startbuttonHide();
  start = setInterval(timeCount, 10);
  displayTimer();
}

function stopTimer() {
  stopbuttonSwitch();
  clearInterval(start);
  clearInterval(lapstart);
  displayTimer();
  if (lapnumber >= 1) {
    displayLapTimer();
  }
}

function resetTimer() {
  milliseconds = 0;
  seconds = 0;
  minutes = 0;
  hours = 0;
  lapnumber = 0;
  lminutes = 0;
  lseconds = 0;
  lmilliseconds = 0;
  clearInterval(start);
  clearInterval(lapstart);
  lapstart = 0;
  lapTableBody.querySelectorAll("tr").forEach((tr) => tr.remove());
  GetLapComparison.laps = [];
  GetLapComparison.overallLaps = [];
  startBtn.classList.remove("button--hide");
  resetBtn.classList.add("button--hide");
  resumeBtn.classList.add("button--hide");
  lapTable.classList.add("button--hide");
  lapTimerDisplay.classList.add("button--hide");
  displayTimer();
  displayLapTimer();
}

function resumeTimer() {
  resumeBtn.classList.add("button--hide");
  stopBtn.classList.remove("button--hide", "moveLeft");
  resetBtn.classList.add("button--hide");
  lapBtn.classList.remove("button--hide", "moveRight");
  start = setInterval(timeCount, 10);
  if (lapnumber != 0) {
    lapstart = setInterval(laptimeCount, 10);
  }
}

function startbuttonHide() {
  startBtn.classList.add("button--hide");
  stopBtn.classList.remove("button--hide");
  stopBtn.classList.add("moveLeft");
  lapBtn.classList.remove("button--hide");
  lapBtn.classList.add("moveRight");
}

function stopbuttonSwitch() {
  stopBtn.classList.add("button--hide");
  lapBtn.classList.add("button--hide");
  resumeBtn.classList.remove("button--hide");
  resetBtn.classList.remove("button--hide");
}

btn.addEventListener("click", toggleDarkMode, false);
startBtn.addEventListener("click", startTimer);
stopBtn.addEventListener("click", stopTimer);
lapBtn.addEventListener("click", lapTimer);
resumeBtn.addEventListener("click", resumeTimer);
resetBtn.addEventListener("click", resetTimer);
