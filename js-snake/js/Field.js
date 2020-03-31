export default class Field {
  constructor(domElement) {
    this.canvas = domElement;
    this.ctx = this.canvas.getContext("2d");
  }

  set setHeight(height) {
    this.canvas.height = height;
  }

  set setWidth(width) {
    this.canvas.width = width;
  }

  get height() {
    return this.canvas.height;
  }

  get width() {
    return this.canvas.width;
  }

  drawField() {
    this.ctx.fillStyle = "#747b69";
    this.ctx.fillRect(0, 0, this.canvas.height, this.canvas.width);
  }

  drawFood(x, y) {
    this.ctx.strokeStyle = "#747b69";
    this.ctx.fillStyle = "#30342a";
    this.ctx.fillRect(x, y, 20, 20);
    this.ctx.strokeRect(x, y, 20, 20);
  }

  drawSnake(snake) {
    snake.forEach(p => {
      this.ctx.strokeStyle = "#747b69";
      this.ctx.fillStyle = "#30342a";
      this.ctx.fillRect(p.x, p.y, 20, 20);
      this.ctx.strokeRect(p.x, p.y, 20, 20);
    });
  }

  displayGameOver() {
    this.ctx.font = "30px silkscreennormal";
    this.ctx.fillStyle = "#30342a";
    this.ctx.textAlign = "center";
    this.ctx.fillText("Game Over", this.width / 2, this.height / 2);
    this.ctx.font = "24px silkscreennormal";
    this.ctx.fillText(
      "Press R to restart",
      this.width / 2,
      this.height / 2 + 30
    );
  }
}
