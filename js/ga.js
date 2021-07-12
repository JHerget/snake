let mutate = function(x) {
  if(random() < 0.1){
    return x + randomGaussian() * 0.5;
  }
  
  return x;
}

let nextGeneration = function(){
  calculateFitness();
  games = createPopulation();
}

let calculateFitness = function(){
  let sum = 0;
  for(let i=0; i<games.length; i++){
    sum += games[i].snake.score;
  }
  
  for(let i=0; i<games.length; i++){
    games[i].snake.fitness = games[i].snake.score / sum;
  }
}

let createPopulation = function(){
  let brains = [];
  let newGames = [];
  
  for(let i = 0; i<population; i++){
    brains.push(poolSelection());
  }
  
  for(let i=0; i<10; i++){
    for(let j=0; j<10; j++){
      let game = new Game(ROW*i, COL*j);
      game.snake.brain = brains[j + (i * 10)];
      newGames.push(game);
    }
  }
  
  return newGames;
}

let poolSelection = function(){
  let r = random();
  let index = 0;
  
  while(r > 0){
    r -= games[index].snake.fitness;
    index++;
  }
  index--;
  
  let brain = games[index].snake.brain.copy();
  brain.mutate(mutate);
  
  return brain;
}