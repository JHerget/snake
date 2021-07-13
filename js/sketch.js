let COL = 25;
let ROW = 25;
let TILE = 2;
let FRAMES = 30;

let generationDiv;
let slider;
let sliderDisplay;

let games = [];
let counter = 0;
let population = 100;
let generation = 1;

function setup(){
  let canvas = createCanvas(500, 500);
  canvas.parent("canvas-parent");
  frameRate(FRAMES);

  generationDiv = document.querySelector(".generation");
  slider = document.querySelector("#slider");
  sliderDisplay = document.querySelector("#slider-display");
  
  for(let i=0; i<10; i++){
    for(let j=0; j<10; j++){
      games.push(new Game(ROW*i, COL*j));
    }
  }
}

function draw(){
  let cycles = slider.value;
  sliderDisplay.innerHTML = cycles;

  for(let c=0; c<cycles; c++){
    generationDiv.innerText = "Generation Number: " + generation;

    background(50);  
  
    for(let game of games){
      if(!game.gameover){
        game.update();
      }
    }

    if(counter == population){
      counter = 0;
      generation++;
      nextGeneration();
    }
  }
  
  for(let game of games){
    if(!game.gameover){
      game.draw();
    }
  }
}
