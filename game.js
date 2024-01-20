#!/usr/bin/env node

const fs = require("fs");
const readline = require("readline");
const path = require("path");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function logResult(result, logFile) {
  fs.appendFileSync(logFile, `${result}\n`, "utf8");
}

function playGame(logFile) {
  rl.question("Введите число 1 или 2: ", (number) => {
    const selectedNumber = parseInt(number);

    if (
      isNaN(selectedNumber) ||
      (selectedNumber !== 1 && selectedNumber !== 2)
    ) {
      console.log("Введите 1 или 2: ");
      playGame(logFile);
    } else {
      const randomNubmer = Math.round(Math.random());
      const resultText =
        selectedNumber === randomNubmer ? "Угадали !" : "Не угадали !";
      console.log('Результат: ', resultText);
      logResult(resultText, logFile);

      rl.question("Новая игра? (y/n): ", (playAgain) => {
        if (playAgain.toLowerCase() === "y") {
          playGame(logFile);
        } else {
          rl.close();
        }
      });
    }
  });
}

const logFileName = path.join(__dirname, "gameLog.txt");
console.log(`Результаты игры будут сохранены в файле: ${logFileName}`);

fs.writeFileSync(logFileName, "", "utf8");

playGame(logFileName);
