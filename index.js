const GRID_SIZE = 20;
const INITIAL_SNAKE = [{ x: 0, y: 0 }];
const INITIAL_DIRECTION = { x: 1, y: 0 };
const GAME_SPEED = 150;

let snake = INITIAL_SNAKE;
let food = { x: 15, y: 15 };
let direction = INITIAL_DIRECTION;
let isGameOver = false;
let score = 0;

const gridElement = document.getElementById("grid");
const scoreElement = document.getElementById("score");
const resetButton = document.getElementById("reset");

function createGrid() {
  gridElement.style.gridTemplateColumns = `repeat(${GRID_SIZE}, 20px)`;
  gridElement.style.gridTemplateRows = `repeat(${GRID_SIZE}, 20px)`;
  for (let i = 0; i < GRID_SIZE * GRID_SIZE; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    gridElement.appendChild(cell);
  }
}

function render() {
  const cells = gridElement.children;
  Array.from(cells).forEach((cell) => (cell.className = "cell"));

  snake.forEach((segment) => {
    const index = segment.y * GRID_SIZE + segment.x;
    cells[index].classList.add("snake");
  });

  const foodIndex = food.y * GRID_SIZE + food.x;
  cells[foodIndex].classList.add("food");

  scoreElement.textContent = `Score: ${score}`;
}

function generateFood() {
  food = {
    x: Math.floor(Math.random() * GRID_SIZE),
    y: Math.floor(Math.random() * GRID_SIZE),
  };
}

function checkCollision(head) {
  if (head.x < 0 || head.x >= GRID_SIZE || head.y < 0 || head.y >= GRID_SIZE) {
    return true;
  }
  return snake.some((segment) => segment.x === head.x && segment.y === head.y);
}

function moveSnake() {
  if (isGameOver) return;

  const newHead = {
    x: snake[0].x + direction.x,
    y: snake[0].y + direction.y,
  };

  if (checkCollision(newHead)) {
    isGameOver = true;
    alert(`Game Over! Final Score: ${score}`);
    resetButton.style.display = "block";
    return;
  }

  snake.unshift(newHead);

  if (newHead.x === food.x && newHead.y === food.y) {
    score++;
    generateFood();
  } else {
    snake.pop();
  }

  render();
}

function handleKeyPress(event) {
  switch (event.key) {
    case "ArrowUp":
      if (direction.y !== 1) direction = { x: 0, y: -1 };
      break;
    case "ArrowDown":
      if (direction.y !== -1) direction = { x: 0, y: 1 };
      break;
    case "ArrowLeft":
      if (direction.x !== 1) direction = { x: -1, y: 0 };
      break;
    case "ArrowRight":
      if (direction.x !== -1) direction = { x: 1, y: 0 };
      break;
  }
}

function resetGame() {
  snake = [{ x: 0, y: 0 }];
  direction = INITIAL_DIRECTION;
  isGameOver = false;
  score = 0;
  generateFood();
  resetButton.style.display = "none";
  render();
}

// Écouteurs d'événements pour les boutons de contrôle
document.getElementById("up").addEventListener("click", () => {
  if (direction.y !== 1) direction = { x: 0, y: -1 };
});
document.getElementById("down").addEventListener("click", () => {
  if (direction.y !== -1) direction = { x: 0, y: 1 };
});
document.getElementById("left").addEventListener("click", () => {
  if (direction.x !== 1) direction = { x: -1, y: 0 };
});
document.getElementById("right").addEventListener("click", () => {
  if (direction.x !== -1) direction = { x: 1, y: 0 };
});

createGrid();
generateFood();
render();
document.addEventListener("keydown", handleKeyPress);
const gameInterval = setInterval(moveSnake, GAME_SPEED);

resetButton.addEventListener("click", resetGame);
