"use strict";

// VARIABLES AND CONSTANTS
const tbox = document.getElementById("tbox");
const promptbox = document.getElementsByClassName("prompt-wraper")[0];
const promptmessage = document.getElementsByClassName("message")[0];
const restartButton = document.getElementsByClassName("restartButton")[0];
const cells = [...document.getElementsByClassName("cell")];
const winArrays = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

let turn = "x";

// FUNCTIONS

function checkforwin() {
  for (let j = 0; j < winArrays.length; j++) {
    const winArray = winArrays[j];
    if (
      cells[winArray[0]].classList.contains(turn) &&
      cells[winArray[1]].classList.contains(turn) &&
      cells[winArray[2]].classList.contains(turn)
    ) {
      return true;
    }
  }
  return false;
}

function isGameover() {
  let vargameover = true;
  for (let k = 0; k < cells.length; k++) {
    const cell = cells[k];
    if (cell.classList.contains("vacant")) {
      vargameover = false;
    }
  }
  return vargameover;
}

function swapTurn() {
  if (turn === "x") {
    turn = "o";
    tbox.classList.remove("box-x");
    tbox.classList.add("box-o");
  } else {
    turn = "x";
    tbox.classList.remove("box-o");
    tbox.classList.add("box-x");
  }
}

function fillOX(e) {
  if (e.target.classList.contains("vacant")) {
    e.target.classList.remove("vacant");
    e.target.classList.add(turn);
    if (checkforwin()) {
      prompt(`Game over and ${turn} Won`);
    } else if (isGameover()) {
      prompt(`Game over No one Won`);
    }
    swapTurn();
  }
}

function prompt(message) {
  promptmessage.innerHTML = message;
  promptbox.style.display = "flex";
}

// LOGIC

for (let i = 0; i < cells.length; i++) {
  const cell = cells[i];
  cell.addEventListener("click", fillOX, { once: true });
}

restartButton.addEventListener("click", () => {
  document.getElementsByClassName("prompt")[0].style.animation =
    "messageoutanime 0.3s ease-out forwards";
  setTimeout(() => {
    promptbox.style.display = "none";
    for (let i = 0; i < cells.length; i++) {
      const cell = cells[i];
      cell.removeEventListener("click", fillOX);
      cell.addEventListener("click", fillOX, { once: true });
      cell.classList.remove("x");
      cell.classList.remove("o");
      cell.classList.add("vacant");
      if (turn === "o") {
        swapTurn();
      }
    }
  }, 300);
});
