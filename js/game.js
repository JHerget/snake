class Game {
  constructor(rowoffset, coloffset){
    this.rowoffset = rowoffset;
    this.coloffset = coloffset;
    this.snake = new Snake(5 + this.rowoffset, 5 + this.coloffset, this);
    this.grape = new Segment(-1, -1, "#7947d7");
    this.gameover = false;
    
    this.teleportGrape();
  }

  update(){
    if(!this.snake.alive){
      this.gameover = true;
      counter++;
    }

    this.snake.update();
  }

  draw(){
    this.grape.draw();
    this.snake.draw();
  }

  teleportGrape(){
    let row = null;
    let col = null;
    let valid = false;

    while(!valid){
      valid = true;

      row = Math.floor(random(this.rowoffset, COL + this.rowoffset));
      col = Math.floor(random(this.coloffset, ROW + this.coloffset));

      for(let i=0; i<this.snake.body.length; i++){
        if(this.snake.body[i].row == row &&
           this.snake.body[i].col == col){

          valid = false;
        }
      }
    }

    this.grape.row = Math.floor(row);
    this.grape.col = Math.floor(col);
  }
}
