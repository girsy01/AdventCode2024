const file = require("fs");
const data = file.readFileSync("./data-03.txt", "utf-8");

function findMuls(s) {
  const muls = [];

  let i = 0;
  while (i < s.length) {
    let index = s.indexOf("mul(", i);
    if (index === -1) break;

    let index2 = s.indexOf(")", index);
    if (index2 === -1) break;

    muls.push(s.substring(index, index2 + 1));
    i = index + 1;
  }
  return muls;
}

function evaluateMul(s) {
  const regex = /^mul\(\d{1,3},\d{1,3}\)$/;
  return regex.test(s);
}

function calculateSum(a) {
  return a.reduce((acc, curr) => {
    const string = curr.substring(4, curr.length - 1);
    const nums = string.split(",");
    const num1 = Number(nums[0]);
    const num2 = Number(nums[1]);
    return acc + num1 * num2;
  }, 0);
}

const arrayMuls = findMuls(data);
const filteredMuls = arrayMuls.filter((mul) => evaluateMul(mul));
const result = calculateSum(filteredMuls);

console.log(result);
