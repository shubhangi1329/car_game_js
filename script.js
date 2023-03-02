const startContainer = document.querySelector('.start');
const gameContainer = document.querySelector('.game');
const scoreContainer = document.querySelector('.score');
const scoreId = document.querySelector("#score-id");

let score = 0;
let carPosition = { //player
    x:0,
    y:0,
    speed : 2
};
let p2={};

let player = { //keys
    ArrowUp: false,
    ArrowDown: false,
    ArrowLeft: false,
    ArrowRight: false
};

function isCollide(a,b){
  aRect=a.getBoundingClientRect();
  bRect=b.getBoundingClientRect();
  return !((aRect.bottom<bRect.top)||(aRect.top>bRect.bottom)||(aRect.right<bRect.left)||(aRect.left>bRect.right));

}

function moveLine() {
    const lines = document.querySelectorAll('.line');
   
    lines.forEach(line => {
        var top = line.offsetTop;
         const gameContainerDetails = gameContainer.getBoundingClientRect();
        if (line.offsetTop > gameContainerDetails.bottom) {
          top = 0;
        }
        // update the top value;
        line.style.top = top + carPosition.speed + 'px';
    });
}

function endGame(){
  p2.startGame=false;
  startContainer.classList.remove('hide');
  startContainer.innerHTML="Game Over <br> Your final score is "+(score+1)+"<br>Press here to start the Game"
}

function moveEnemy(car) {
  const enemy = document.querySelectorAll('.enemy');
 
  enemy.forEach(item => {
    if(isCollide(car,item)){
      console.log("Game over !!");
      endGame();
    }

     if(item.y>=750){
      item.y=-300;
      item.style.left=Math.floor(Math.random()*350)+"px";
     }
     item.y +=carPosition.speed;
      // var top = line.offsetTop;
      //  const gameContainerDetails = gameContainer.getBoundingClientRect();
      // if (line.offsetTop > gameContainerDetails.bottom) {
      //   top = 0;
      
      // update the top value;
      item.style.top = item.y + 'px';
  });
}


function renderGame(milliseconds) { //gameplay
  
    // moveLine();
    
    const car = document.querySelector('.car');
    if(p2.startGame){
    moveLine();
    moveEnemy(car);
    const gameContainerDetails = gameContainer.getBoundingClientRect();
   // console.log("Game container", gameContainerDetails);
    // we can create a animation loop;
    if (player.ArrowDown && carPosition.y < gameContainerDetails.bottom-150) {
      carPosition.y += carPosition.speed;
    }

    if (player.ArrowUp && carPosition.y > gameContainerDetails.top +70) {
      carPosition.y -= carPosition.speed;
    }

    if (player.ArrowRight && carPosition.x < gameContainerDetails.width - 70) {
      carPosition.x += carPosition.speed;
    }

    if(player.ArrowLeft && carPosition.x > 0) {
        carPosition.x -=carPosition.speed;
    }

    score++;
    scoreId.textContent = score;
    car.style.top = carPosition.y + 'px';
    car.style.left = carPosition.x + 'px';

    window.requestAnimationFrame(renderGame);
  }
};

function startGame () {
    // Hide the start container
    startContainer.classList.add('hide');
    gameContainer.innerHTML="";
    //startContainer.setAttribute('class','hide');
    score=0;
    // create a car
    const car = document.createElement('div');
    car.setAttribute('class', 'car');
    console.log("initlizing car values",carPosition);

    // add it inside game container
    gameContainer.appendChild(car);

     const carTop = car.offsetTop;
     const carLeft = car.offsetLeft;
     carPosition.y = car.offsetTop;//carTop;
     carPosition.x = car.offsetLeft;//carLeft;
    var x = 0;
    // create lines
     for(var i =0; i<4; i++) {
        const line = document.createElement('div');
        line.classList.add('line');
        line.style.top = x + 'px';
        gameContainer.appendChild(line);
        x += 150;
     }
       
     for(x=0;x<3;x++){
     const enemyDiv = document.createElement('div');
     enemyDiv.classList.add("enemy");
     enemyDiv.y=((x+1)*350)*-1;
     enemyDiv.style.top=enemyDiv.y+"px";
     enemyDiv.style.backgroundColor=randomColor();
     //enemyDiv.style.top = Math.floor(Math.random() * 400) + "px";
     enemyDiv.style.left = Math.floor(Math.random() * 350) + "px";

     gameContainer.appendChild(enemyDiv);
     // you have to add enemy car 
     // the position of enemy car should be random 
     p2.startGame=true;
     window.requestAnimationFrame(renderGame);

      } // add them in game container

}

function randomColor(){
  function c(){
    let hex=Math.floor(Math.random()*256).toString(16);
    return ("0"+String(hex)).substr(-2);
  }
  return "#"+c()+c()+c();
}

function handleKeyUp(e) {
    e.preventDefault();
    player[e.key] = false;
}

function handleKeyDown(e) {
  e.preventDefault();
   player[e.key] = true;
}

document.addEventListener('keyup', handleKeyUp);
document.addEventListener("keydown", handleKeyDown);
startContainer.addEventListener('click', startGame);

