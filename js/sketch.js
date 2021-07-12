let COL = 25;
let ROW = 25;
let TILE = 2;
let FRAMES = 30;

// let snake;
// let grape;

let div;

let games = [];
let counter = 0;
let population = 100;
let generation = 1;

function setup(){
  div = document.querySelector(".generation");
  
  createCanvas(500, 500);
  frameRate(FRAMES);
  
  // snake = new Snake(5, 5);
  // grape = new Segment(Math.floor(random(0, ROW)), Math.floor(random(0, COL)), "#7947d7");
  
  for(let i=0; i<10; i++){
    for(let j=0; j<10; j++){
      games.push(new Game(ROW*i, COL*j));
    }
  }
}

function draw(){
  div.innerText = generation;
  
  background(50);
  
  // grape.draw();
  //
  // snake.draw();
  // snake.update();

  for(let game of games){
    if(!game.gameover){
      game.draw();
    }
  }
  
  if(counter == population){
    // console.log("Next Generation!");
    counter = 0;
    generation++;
    nextGeneration();
  }
}

// let teleportGrape = function(){
//   let row = null;
//   let col = null;
//   let valid = false;
//
//   while(!valid){
//     valid = true;
//
//     row = Math.floor(random(0, 25));
//     col = Math.floor(random(0, 25));
//
//     for(let i=0; i<game.snake.body.length; i++){
//       if(snake.body[i].row == row &&
//          snake.body[i].col == col){
//
//         valid = false;
//       }
//     }
//   }
//
//   grape.row = Math.floor(row);
//   grape.col = Math.floor(col);
// }

// document.addEventListener("keydown", function(e){
//   if(e.keyCode == 37){
//     if(game.snake.dir[1] != 1){
//       game.snake.dir = [0, -1];
//     }
//   }
//   if(e.keyCode == 38){
//     if(game.snake.dir[0] != 1){
//       game.snake.dir = [-1, 0];
//     }
//   }
//   if(e.keyCode == 39){
//     if(game.snake.dir[1] != -1){
//       game.snake.dir = [0, 1];
//     }
//   }
//   if(e.keyCode == 40){
//     if(game.snake.dir[0] != -1){
//       game.snake.dir = [1, 0];
//     }
//   }
// });
