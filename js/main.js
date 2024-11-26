const contentDOM = document.getElementById("content");
const gameDOM = document.getElementById("game");

const maxCellsCount = 100;
const { clientHeight, clientWidth } = contentDOM;
const cellSize = Math.floor(
  Math.sqrt((clientHeight * clientWidth) / maxCellsCount)
);
const width = Math.floor(clientWidth / cellSize);
const height = Math.floor(clientHeight / cellSize);

gameDOM.style.width = width * cellSize + "px";
gameDOM.style.height = height * cellSize + "px";

const cellsHTML =
  `<div class="cell" style="width: ${cellSize}px; height: ${cellSize}px;"></div>`.repeat(
    width * height
  );
gameDOM.innerHTML = cellsHTML;
const cellsDOM = gameDOM.getElementsByClassName("cell");

const direction = {
  x: 0,
  y: 0,
};
let gameInProgress = true;

function randomLocation() {
  return {
    x: Math.floor(Math.random() * width),
    y: Math.floor(Math.random() * height),
  };
}

function randomAppleLocation() {
  while (true) {
    const location = randomLocation();
    let samePoint = false;

    for (const coor of snakeLocation) {
      if (location.x === coor.x && location.y === coor.y) {
        samePoint = true;
        break;
      }
    }

    if (!samePoint) {
      return location;
    }
  }
}

function drawSnake() {
  const nextPoint = {
    x: snakeLocation.at(-1).x + direction.x,
    y: snakeLocation.at(-1).y + direction.y,
  };

  if (
    nextPoint.x < 0 ||
    nextPoint.y < 0 ||
    nextPoint.x >= width ||
    nextPoint.y >= height
  ) {
    gameInProgress = false;
    console.log("GAME OVER!");
    return;
  }

  if (snakeLocation.length > 1) {
    for (const coor of snakeLocation) {
      if (coor.x === nextPoint.x && coor.y === nextPoint.y) {
        gameInProgress = false;
        console.log("GAME OVER!");
        return;
      }
    }
  }

  for (const coor of snakeLocation) {
    cellsDOM[coor.y * width + coor.x].classList.remove("snake");
  }

  snakeLocation.push(nextPoint);
  snakeLocation.shift();

  for (const coor of snakeLocation) {
    cellsDOM[coor.y * width + coor.x].classList.add("snake");
  }
}

const snakeLocation = [randomLocation()];
drawSnake();

function drawApple() {
  const newCoor = randomAppleLocation();
  cellsDOM[appleLocation.y * width + appleLocation.x].classList.remove("apple");
  appleLocation.x = newCoor.x;
  appleLocation.y = newCoor.y;
  cellsDOM[appleLocation.y * width + appleLocation.x].classList.add("apple");
}
const appleLocation = { x: 0, y: 0 };
drawApple();

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

function gameLoop() {
  if (!gameInProgress) {
    return;
  }

  if (
    snakeLocation.at(-1).x + direction.x === appleLocation.x &&
    snakeLocation.at(-1).y + direction.y === appleLocation.y
  ) {
    snakeLocation.unshift(appleLocation);
    drawApple();
  }
  drawSnake();
}

setInterval(gameLoop, 300);
