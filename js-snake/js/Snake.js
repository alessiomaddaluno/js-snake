const LEFT_KEY = 37;
const RIGHT_KEY = 39;
const UP_KEY = 38;
const DOWN_KEY = 40;
const RESTART_KEY = 82;

let dx = 0;
let dy = 20;

export default class Snake {
  constructor(initialLocation) {
    this.body = initialLocation;
    dx = 0;
    dy = 20;
    this.speed = 100;
    document.addEventListener("keydown", e => this.controls(e));
  }

  move(food) {
    const head = { x: this.body[0].x + dx, y: this.body[0].y + dy };
    this.body.unshift(head);
    const onFood = head.x === food.posX && head.y === food.posY;
    if (onFood) {
      this.speed -= 5;
      food.spawn(this.body);
    } else this.body.pop();
  }

  controls(event) {
    const keyPressed = event.keyCode;

    switch (keyPressed) {
      case LEFT_KEY:
        if (dx != 20) {
          dx = -20;
          dy = 0;
        }
        break;
      case UP_KEY:
        if (dy != 20) {
          dx = 0;
          dy = -20;
        }
        break;
      case RIGHT_KEY:
        if (dx != -20) {
          dx = 20;
          dy = 0;
        }
        break;
      case DOWN_KEY:
        if (dy != 20) {
          dx = 0;
          dy = 20;
        }
        break;
      case RESTART_KEY:
        location.reload();
        break;
    }
  }

  wallCollide(fieldHeight, fieldWidth) {
    const head = { x: this.body[0].x, y: this.body[0].y };
    return (
      head.x < 0 ||
      head.x + 20 > fieldWidth ||
      head.y < 0 ||
      head.y + 20 > fieldHeight
    );
  }

  bodyCollide() {
    const head = { x: this.body[0].x, y: this.body[0].y };

    for (let i = 4; i < this.body.length; i++)
      if (head.x == this.body[i].x && head.y == this.body[i].y) return true;

    return false;
  }
}
