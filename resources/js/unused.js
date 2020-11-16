function indexesOf(array) {
  let indexes = new Array();
  for (let i = 0; i <= array.length; i++) {
    if (array.indexOf(i, 0) === value) {
      indexes.push(i);
    }
  }
  return indexes;
}


// switch function isn't working
// switch (lmilliseconds) {
//   case lmilliseconds < 10:
//     lapmilliseconds = `0${lmilliseconds.toString()}`;
//     console.log(lapmilliseconds);
//     break;
//   default:
//     lapmilliseconds = `${lmilliseconds.toString()}`;
//     break;
// }
// switch (lseconds) {
//   case lseconds < 10:
//     lapseconds = `0${lseconds.toString()}`;
//     break;
//   default:
//     lapseconds = `${lseconds.toString()}`;
//     break;
// }
// switch (lminutes) {
//   case lminutes < 10:
//     lapminutes = `0${lminutes.toString()}`;
//     break;
//   default:
//     lapminutes = `${lminutes.toString()}`;
//     break;
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
//testing
// const currentTheme = localStorage.getItem('theme') ? localStorage.getItem('theme') : null;

// if (currentTheme) {
//   document.body.classList.toggle(currentTheme);

//   if (currentTheme === 'dark-mode') {
//      btn.click = true;
//   }
// }
