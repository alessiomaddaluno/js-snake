import Field from "./field.js";
import Food from "./food.js";
import Snake from "./Snake.js";

// Initializing
const field = new Field(document.getElementById("canvas"));
const food = new Food(500, 500);

const snake = new Snake([
  { x: 200, y: 140 },
  { x: 180, y: 140 },
  { x: 160, y: 140 },
  { x: 140, y: 140 }
]);

field.setHeight = 500;
field.setWidth = 500;

food.spawn(snake.body);

(function gameLoop() {
  setTimeout(() => {
    snake.move(food);
    if (snake.wallCollide(field.height, field.width) || snake.bodyCollide()) {
      field.displayGameOver();
      return;
    }

    console.log(snake.body);
    field.drawField();
    field.drawSnake(snake.body);
    field.drawFood(food.x, food.y);

    gameLoop();
  }, snake.speed);
})();
