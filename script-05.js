const file = require("fs");
const pagesData = file.readFileSync("./data-05-pages.txt", "utf-8");
const rulesData = file.readFileSync("./data-05-rules.txt", "utf-8");

const pagesRows = pagesData.split("\n");
const pages = pagesRows.map((e) => e.split(",").map(Number));

const rulesRows = rulesData.split("\n");
const rules = rulesRows.map((e) => e.split("|").map(Number));

function checkPagesArray(array) {
  let check = true;

  for (let i = 0; i < array.length - 1; i++) {
    if (!checkTwoPages(array[i], array[i + 1])) check = false;
  }

  return check;
}

function checkTwoPages(p1, p2) {
  let check = true;

  for (let i = 0; i < rules.length; i++) {
    if (p2 === rules[i][0] && p1 === rules[i][1]) {
      // console.log("false for", p1, p2, "at rule", rules[i]);
      check = false;
    }
  }

  return check;
}

function sumMiddles(matrix) {
  return matrix.reduce((acc, curr) => {
    const indexMiddle = Math.floor(curr.length / 2);
    return (acc += curr[indexMiddle]);
  }, 0);
}

// function fixOrderPagesArray(array) {
//   // Sort the array using the rules to determine ordering
//   return array.slice().sort((l, r) => {
//     if (rules.some(([from, to]) => from === l && to === r)) {
//       return 1; // r cannot follow l
//     }
//     return -1;
//   });
// }
//

// function fixOrderPagesArray(array) {
//   for (let i = 0; i < array.length - 1; i++) {
//     for (let j = i; j < array.length; j++) {
//       if (!checkTwoPages(array[i], array[j])) {
//         [array[i], array[j]] = [array[j], array[i]];
//       }
//     }
//   }
//   return array;
// }
//

function fixOrderPagesArray(array) {
  let swapped;
  do {
    swapped = false;
    for (let i = 0; i < array.length - 1; i++) {
      if (!checkTwoPages(array[i], array[i + 1])) {
        // Swap array[i] and array[i + 1]
        [array[i], array[i + 1]] = [array[i + 1], array[i]];
        swapped = true;
      }
    }
  } while (swapped);
  return array;
}

const correctPageArrays = pages.filter((e) => checkPagesArray(e));
const sumCorrectMiddles = sumMiddles(correctPageArrays);

const incorrectPageArrays = pages.filter((e) => !checkPagesArray(e));
const fixedPagesArrays = incorrectPageArrays.map((e) => fixOrderPagesArray(e));
const sumFixedMiddles = sumMiddles(fixedPagesArrays);
// console.log(fixedPagesArrays);

console.log(sumFixedMiddles);
