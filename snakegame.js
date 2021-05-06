var canvas = document.getElementById('field');
canvas.height = 480;
canvas.width = 480;

var ctx = canvas.getContext('2d');
var foodx, foody;

var snakePos = [[0, 0], [0, 30], [0, 60]];
var snakeHead = 2;
var movement = 'd';
var speed = 160;

function resetSnake(){
    snakePos = [[0, 0], [0, 30], [0, 60]];
    snakeHead = 2;
    movement = 'd';
    generateFood();
    speed = 160;
}

function generateFood(){
    foodx = Math.floor(Math.random() * 16);
    foody = Math.floor(Math.random() * 16);
    foodx *= 30;
    foody *= 30;

    for(var i = 0; i < snakePos.length; ++i){
        if(foodx == snakePos[i][0] &&
           foody == snakePos[i][1]){
                generateFood();
        }
    }

    if(speed > 60) speed -= 10;
    console.log("[generateFood] food:" + foodx + ", " + foody)
}

function pushFront(v){
    var tmp = [v];
    for(var i = 0; i < snakePos.length; i++){
        tmp.push(snakePos[i]);
    }
    return tmp;
}

function sleep(milliseconds) {
    const date = Date.now();
    let currentDate = null;
    do {
        currentDate = Date.now();
    } 
    while (currentDate - date < milliseconds);
}

function printSnakeFood(){
    for(var i = 0; i < snakePos.length; i++){
        ctx.beginPath();
        ctx.rect(snakePos[i][0], snakePos[i][1], 25, 25);
        ctx.fillStyle = '#FF0000';
        ctx.fill();
    }

    ctx.beginPath();
    ctx.rect(foodx + 6.25, foody + 6.25, 12.5, 12.5);
    ctx.fillStyle = '#FFFF00';
    ctx.fill();
}

function autoMove(){
    if(snakePos[snakeHead][0] < foodx){
        snakePos[snakeHead][0] += 30;
    }
    else if(snakePos[snakeHead][0] > foodx){
        snakePos[snakeHead][0] -= 30;
    }
    else if(snakePos[snakeHead][1] < foody){
        snakePos[snakeHead][1] += 30;
    }
    else if(snakePos[snakeHead][1] > foody){
        snakePos[snakeHead][1] -= 30;
    }
}

function commandedMove(){
    if(movement == 'd'){
        snakePos[snakeHead][1] += 30;
    }
    else if(movement == 'u'){
        snakePos[snakeHead][1] -= 30;
    }
    else if(movement == 'l'){
        snakePos[snakeHead][0] -= 30;
    }
    else if(movement == 'r'){
        snakePos[snakeHead][0] += 30;
    }
}

function keepInField(){
    if(snakePos[snakeHead][0] < 0){
        snakePos[snakeHead][0] = 450;
    }
    else if(snakePos[snakeHead][0] > 450){
        snakePos[snakeHead][0] = 0;
    }
    if(snakePos[snakeHead][1] < 0){
        snakePos[snakeHead][1] = 450;
    }
    else if(snakePos[snakeHead][1] > 450){
        snakePos[snakeHead][1] = 0;
    }
}

function onSelf(){
    var n = snakePos.length - 1;
    var tmpHead = [snakePos[n][0], snakePos[n][1]];
    
    console.log("Head : " + tmpHead)

    for(var i = 0; i < snakePos.length - 1; ++i){
        if(tmpHead[0] == snakePos[i][0] &&
           tmpHead[1] == snakePos[i][1]){
            console.log("OnSelf")
            return 1;
        }
    }

    return 0;
}

function main(){
    printSnakeFood();
    // autoMove();
    commandedMove();

    var got = [-1, -1];

    if(foodx == snakePos[snakeHead][0] && foody == snakePos[snakeHead][1]){
        got = [snakePos[0][0], snakePos[0][1]];
        snakeHead = snakePos.length;
        generateFood();
    }

    if(onSelf() == 1){
        resetSnake();
    }

    if(got[0] != -1){
        snakePos = pushFront(got);
    }

    keepInField();

    for(i = 0; i < snakePos.length - 1; i++){
        snakePos[i][0] = snakePos[i + 1][0];
        snakePos[i][1] = snakePos[i + 1][1];
    }

    ctx.fillStyle = "rgb(34,45,23,0.4)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    sleep(speed);
    requestAnimationFrame(main);
}

document.addEventListener('keydown', function(event){

    // console.log("snakePos:", snakePos)

    if(event.code == "ArrowLeft" && movement != 'r'){
        movement = 'l';
    }
    else if(event.code == "ArrowDown" && movement != 'u'){
        movement = 'd';        
    }
    else if(event.code == "ArrowRight" && movement != 'l'){
        movement = 'r';
    }
    else if(event.code == "ArrowUp" && movement != 'd'){
        movement = 'u'; 
    }

    keepInField();

    // requestAnimationFrame(main);
    // main()
});

generateFood();
resetSnake();
main();