const file = require("fs");
const data = file.readFileSync("./data-04.txt", "utf-8");

const rows = data.split("\n");
const matrix = rows.map((e) => e.split(""));

console.log(matrix);

function checkXMAS(a, b, c, d) {
  if (a === "X" && b === "M" && c === "A" && d === "S") return true;
  return false;
}

function checkMASinXform(a, b, c, d) {
  console.log(a, b, c, d, a === "M" && b === "S" && c === "M" && d === "S");
  if (a === "M" && b === "S" && c === "M" && d === "S") return true;
  return false;
}

let count = 0;

// rows
for (let i = 0; i < matrix.length; i++) {
  //forward
  for (let j = 0; j < matrix[i].length - 3; j++) {
    if (checkXMAS(matrix[i][j], matrix[i][j + 1], matrix[i][j + 2], matrix[i][j + 3])) count++;
  }
  //backward
  for (let j = 3; j < matrix[i].length; j++) {
    if (checkXMAS(matrix[i][j], matrix[i][j - 1], matrix[i][j - 2], matrix[i][j - 3])) count++;
  }
}

// columns
//downward
for (let i = 0; i < matrix.length - 3; i++) {
  for (let j = 0; j < matrix[i].length; j++) {
    if (checkXMAS(matrix[i][j], matrix[i + 1][j], matrix[i + 2][j], matrix[i + 3][j])) count++;
  }
}
//upward
for (let i = 3; i < matrix.length; i++) {
  for (let j = 0; j < matrix[i].length; j++) {
    if (checkXMAS(matrix[i][j], matrix[i - 1][j], matrix[i - 2][j], matrix[i - 3][j])) count++;
  }
}

//diagonal
//(1)
for (let i = 0; i < matrix.length - 3; i++) {
  for (let j = 0; j < matrix[i].length - 3; j++) {
    if (checkXMAS(matrix[i][j], matrix[i + 1][j + 1], matrix[i + 2][j + 2], matrix[i + 3][j + 3]))
      count++;
  }
}
//(2)
for (let i = 3; i < matrix.length; i++) {
  for (let j = 3; j < matrix[i].length; j++) {
    if (checkXMAS(matrix[i][j], matrix[i - 1][j - 1], matrix[i - 2][j - 2], matrix[i - 3][j - 3]))
      count++;
  }
}
//(3)
for (let i = 0; i < matrix.length - 3; i++) {
  for (let j = 3; j < matrix[i].length; j++) {
    if (checkXMAS(matrix[i][j], matrix[i + 1][j - 1], matrix[i + 2][j - 2], matrix[i + 3][j - 3]))
      count++;
  }
}
//(4)
for (let i = 3; i < matrix.length; i++) {
  for (let j = 0; j < matrix[i].length - 3; j++) {
    if (checkXMAS(matrix[i][j], matrix[i - 1][j + 1], matrix[i - 2][j + 2], matrix[i - 3][j + 3]))
      count++;
  }
}

count = 0;

for (let i = 1; i < matrix.length - 1; i++) {
  for (let j = 1; j < matrix[i].length - 1; j++) {
    if (matrix[i][j] === "A") {
      console.log("A at [", i, ",", j, "]");
      if (i + 1 < matrix.length && j + 1 < matrix[i].length && i - 1 >= 0 && j - 1 >= 0) {
        if (
          checkMASinXform(
            matrix[i - 1][j - 1],
            matrix[i + 1][j + 1],
            matrix[i + 1][j - 1],
            matrix[i - 1][j + 1]
          )
        )
          count++;
        if (
          checkMASinXform(
            matrix[i + 1][j + 1],
            matrix[i - 1][j - 1],
            matrix[i - 1][j + 1],
            matrix[i + 1][j - 1]
          )
        )
          count++;
        if (
          checkMASinXform(
            matrix[i + 1][j + 1],
            matrix[i - 1][j - 1],
            matrix[i + 1][j - 1],
            matrix[i - 1][j + 1]
          )
        )
          count++;
        if (
          checkMASinXform(
            matrix[i - 1][j - 1],
            matrix[i + 1][j + 1],
            matrix[i - 1][j + 1],
            matrix[i + 1][j - 1]
          )
        )
          count++;
      }
    }
  }
}

console.log(count);
