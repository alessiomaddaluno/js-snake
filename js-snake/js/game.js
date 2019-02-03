let SETTINGS = {
    canvasWidth: 500,
    canvasHeight: 500,
    backgroundColor: '#747b69',
    snakeColor: '#30342a',
    snakeStroke: '#747b69',
}

const LEFT_KEY    = 37;
const RIGHT_KEY   = 39;
const UP_KEY      = 38;
const DOWN_KEY    = 40;
const RESTART_KEY = 82;

var gameStatus = false;
var dx = 0;
var dy = 20;
var speed = 100;
var score = 0;

//SNAKE
var snake = [
    {x: 200, y: 140},
    {x: 180, y: 140},
    {x: 160, y: 140},
    {x: 140, y: 140},
    {x: 120, y: 140}
];

function drawSnake() {
    snake.forEach(drawSnakePart)
}

function drawSnakePart(snakePart) {
    ctx.strokeStyle = SETTINGS['snakeStroke'];
    ctx.fillStyle = SETTINGS['snakeColor'];
    ctx.fillRect(snakePart.x, snakePart.y, 20, 20);
    ctx.strokeRect(snakePart.x, snakePart.y, 20, 20);
}

function advanceSnake() {
    const head = {x: snake[0].x + dx, y: snake[0].y + dy};
    snake.unshift(head);
    const onFood = head.x == foodX && head.y == foodY;

    (onFood) ? spawnFood() : snake.pop();
    if(onFood){
        score+=10;
        scoreBoard.innerHTML = score;
    }
    gameStatus = gameOver();
}

//FOOD
function spawnFood(){
    foodY = randomPoint(0,canvas.height - 20);
    foodX = randomPoint(0,canvas.width - 20);

    for(let i = 0; i < snake.length; i++)
        if(foodX == snake[i].x && foodY == snake[i].y)
            spawnFood();

    drawFood(foodX,foodY);
}

function drawFood(){
    ctx.strokeStyle = SETTINGS['snakeStroke'];
    ctx.fillStyle = SETTINGS['snakeColor'];
    ctx.fillRect(foodX, foodY, 20, 20);
    ctx.strokeRect(foodX,foodY,20,20);
}

//GAME-MANAGEMENT
function gameOver(){

    const head = {x: snake[0].x + dx, y: snake[0].y + dy};
    const onWall = head.x < 0 || head.x > canvas.width || head.y < 0 || head.y > canvas.width;
    
    var onSnake = false;
    for(let i = 4; i < snake.length; i++)
        if(head.x == snake[i].x && head.y == snake[i].y)
            onSnake = true;

    if(onSnake || onWall){
        ctx.font = "30px silkscreennormal";
        ctx.fillStyle = SETTINGS['snakeColor'];
        ctx.textAlign = "center";
        ctx.fillText("Game Over", canvas.width/2, canvas.height/2); 
        ctx.font = "24px silkscreennormal";
        ctx.fillText("Press R to restart", canvas.width/2, canvas.height/2 + 30); 
    }

    return onSnake || onWall;
}


function restartGame(){
    snake = newSnake;
}

function clearCanvas() {
    ctx.fillStyle = SETTINGS['backgroundColor'];
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function randomPoint(min,max){
    return Math.round((Math.random() * (max-min) + min) / 20)*20;
}

function controlManager(event) {

    const keyPressed = event.keyCode;

    switch (keyPressed){
        case LEFT_KEY:
            if(dx != 20){
                dx = -20;
                dy = 0;
            }
        break;
        case UP_KEY:
            if(dy != 20){
                dx = 0;
                dy = -20;
            }
        break;
        case RIGHT_KEY:
            if(dx != -20){
                dx = 20;
                dy = 0;
            }
        break;
        case DOWN_KEY:
            if(dy != 20){
                dx = 0;
                dy = 20;
            }
        break;
        case RESTART_KEY:
            location.reload();
        break;
    }
}


//MAIN
(function initGame(){
    document.addEventListener("keydown",controlManager);
    scoreBoard = document.getElementById('score');
    canvas     = document.getElementById('canvas');
    ctx        = canvas.getContext('2d');
    canvas.height   = SETTINGS['canvasHeight'];
    canvas.width    = SETTINGS['canvasWidth'];
    ctx.fillStyle   = SETTINGS['backgroundColor'];
    ctx.fillRect(0, 0, ctx.height, ctx.width);
    spawnFood();
})();

(function gameLoop() {
    setTimeout(() => {
        clearCanvas();
        advanceSnake();
        drawSnake();
        drawFood();
        if(!gameStatus)
            gameLoop();   
    }, speed)
})();


