export default class Food {
  constructor(canvasHeight, canvasWidth) {
    this.fieldHeight = canvasHeight;
    this.fieldWidth = canvasWidth;
  }

  spawn(snake) {
    // snake

    let x = null;
    let y = null;
    do {
      x = this.randomPoint();
      y = this.randomPoint();
    } while (snake.includes({ x, y }));

    this.x = x;
    this.y = y;
  }

  get posX() {
    return this.x;
  }

  get posY() {
    return this.y;
  }

  randomPoint() {
    return Math.round((Math.random() * this.fieldHeight) / 20) * 20;
  }
}
