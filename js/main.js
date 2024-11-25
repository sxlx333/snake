const gameDOM = document.getElementById("game");
gameDOM.classList.add("game");

const maxCellsCount = 100;
const { clientHeight, clientWidth } = document.body;
const cellSize = Math.floor(
  Math.sqrt((clientHeight * clientWidth) / maxCellsCount)
);
const width = Math.floor(clientWidth / cellSize);
const height = Math.floor(clientHeight / cellSize);

gameDOM.style.width = width * cellSize + "px";
gameDOM.style.height = height * cellSize + "px";

const cellsHTML =
  `<div class="cell" style="width: ${cellSize}px; height: ${cellSize}px";></div>`.repeat(
    width * height
  );
gameDOM.innerHTML = cellsHTML;

// const cellsDOM = gameDOM.querySelectorAll(".cell");
const cellsDOM = gameDOM.getElementsByClassName("cell");

const direction = {
  x: 0,
  y: 0,
};

function randomLocation() {
  return {
    x: Math.floor(Math.random() * width),
    y: Math.floor(Math.random() * height),
  };
}

function randomAppleLocation() {
  while (true) {
    const location = randomLocation();
    if (location.x !== snakeLocation.x || location.y !== snakeLocation.y) {
      return location;
    }
  }
}

const snakeLocation = randomLocation();
cellsDOM[snakeLocation.y * width + snakeLocation.x].classList.add("snake");

const appleLocation = randomAppleLocation();
cellsDOM[appleLocation.y * width + appleLocation.x].classList.add("apple");

addEventListener("keydown", (e) => {
  switch (e.key) {
    case "w":
    case "ArrowUp":
      direction.x = 0;
      direction.y = -1;
      break;
    case "a":
    case "ArrowLeft":
      direction.x = -1;
      direction.y = 0;
      break;
    case "s":
    case "ArrowDown":
      direction.x = 0;
      direction.y = 1;
      break;
    case "d":
    case "ArrowRight":
      direction.x = 1;
      direction.y = 0;
      break;
  }
});

setInterval(() => {
  cellsDOM[snakeLocation.y * width + snakeLocation.x].classList.remove("snake");
  snakeLocation.x += direction.x;
  snakeLocation.y += direction.y;
  cellsDOM[snakeLocation.y * width + snakeLocation.x].classList.add("snake");
}, 1000);
