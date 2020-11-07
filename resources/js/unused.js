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
