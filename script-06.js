const { AsyncLocalStorage } = require("async_hooks");
const file = require("fs");
const data = file.readFileSync("./data-06.txt", "utf-8");

const rows = data.split("\n");
const fields = rows.map((e) => e.split(""));

// console.log(fields);

let posX, posY, dir;
let inField = true;
let visitedFields = [];

for (let i = 0; i < fields.length; i++) {
  for (let j = 0; j < fields[i].length; j++) {
    if (fields[i][j] === "^") {
      dir = "up";
      posX = i;
      posY = j;
    } else if (fields[i][j] === ">") {
      dir = "right";
      posX = i;
      posY = j;
    } else if (fields[i][j] === "<") {
      dir = "left";
      posX = i;
      posY = j;
    } else if (fields[i][j] === "v") {
      dir = "down";
      posX = i;
      posY = j;
    }
  }
}

let originalX = posX;
let originalY = posY;
let originalDir = dir;

function nextStep() {
  if (dir === "up") move(-1, 0);
  else if (dir === "right") move(0, 1);
  else if (dir === "down") move(1, 0);
  else if (dir === "left") move(0, -1);
}

function move(diffX, diffY) {
  let x = posX + diffX;
  let y = posY + diffY;

  //check if in field
  if (x < 0 || y < 0 || x >= fields.length || y >= fields[0].length) {
    inField = false;
    return false;
  }

  //check for obstacle
  // console.log("checking obstacle for", x, y);
  if (fields[x][y] === "#") {
    changeDirection();
    return false;
  }

  //move successful
  posX = x;
  posY = y;
  fields[x][y] = "X";
  visitedFields.push([x, y]);
  return true;
}

function changeDirection() {
  if (dir === "up") dir = "right";
  else if (dir === "right") dir = "down";
  else if (dir === "down") dir = "left";
  else if (dir === "left") dir = "up";
  // console.log("Changing direction to", dir);
}

while (inField) {
  nextStep();
  // console.log("current pos", posX, posY);
}

//count Xs
const numX = fields.reduce((outerAcc, row) => {
  return (
    outerAcc +
    row.reduce((innerAcc, cell) => {
      if (cell === "X") innerAcc++;
      return innerAcc;
    }, 0)
  );
}, 0);

// console.log(fields);
console.log(numX);

/*********** PART II ************/
const visitedFieldsUnique = new Set(visitedFields.map(([x, y]) => `${x},${y}`));
const uniqueFieldsArray = [...visitedFieldsUnique].map((coord) => coord.split(",").map(Number));
console.log(uniqueFieldsArray, "Length:", uniqueFieldsArray.length);

let countObstaclePositions = 0;

function setNewObstacle(position) {
  // console.log(position);
  let obsX = position[0];
  let obsY = position[1];
  fields[obsX][obsY] = "#";

  posX = originalX;
  posY = originalY;
  dir = originalDir;
  visitedFields = [];

  inField = true;
  let steps = 0;

  while (inField && steps < 10000) {
    nextStep();
    steps++;
  }

  // console.log("Steps: ", steps);
  if (steps === 10000) countObstaclePositions++;

  fields[obsX][obsY] = ".";
}

uniqueFieldsArray.forEach((e) => setNewObstacle(e));
console.log(countObstaclePositions);
