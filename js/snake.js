class Snake {
  constructor(j, i, game){
    this.row = j;
    this.col = i;
    this.game = game;
    this.body = [];
    this.dir = [0, 1];
    this.alive = true;
    this.score = 0;
    this.fitness = 0;
    this.lastGrape = 0;
    this.brain = new NeuralNetwork(8, 12, 4);

    this.body.push(new Segment(this.row, this.col, "red"));
  }

  draw(){
    for(let segment of this.body){
      segment.draw();
    }
  }

  update(){
    this.lastGrape++;
    
    if(!this.valid(this.body[0].row, this.body[0].col)){
      this.alive = false;
    }
    
    for(let i = this.body.length - 1; i>=0; i--){
      if(i == 0){
        this.body[i].row += this.dir[0];
        this.body[i].col += this.dir[1];
        continue;
      }
      this.body[i].row = this.body[i-1].row;
      this.body[i].col = this.body[i-1].col;
    }

    if(this.body[0].row == this.game.grape.row && this.body[0].col == this.game.grape.col){
      this.body.push(new Segment());
      this.game.teleportGrape();
      this.score++;
      this.lastGrape = 0;
    }
    
    if(this.lastGrape > 150 + FRAMES*this.body.length){
      this.alive = false;
    }
    
    let prevdir = this.dir;
    this.think();
    if(this.dir[0] == -prevdir[0] &&
       this.dir[1] == -prevdir[1]){
      
      this.alive = false;
    }
  }
  
  think(){
    let distSelf = this.distToSelf();

    let inputs = [];
    // inputs[0] = map(this.body[0].col, this.game.coloffset, COL + this.game.coloffset, 0, 1);
    // inputs[1] = map(COL + this.game.coloffset - this.body[0].col, this.game.coloffset, COL + this.game.coloffset, 0, 1);
    // inputs[2] = map(this.body[0].row, this.game.rowoffset, ROW + this.game.rowoffset, 0, 1);
    // inputs[3] = map(ROW + this.game.rowoffset - this.body[0].row, this.game.rowoffset, ROW + this.game.rowoffset, 0, 1);
    // inputs[4] = map((this.body[0].row == this.game.grape.row && this.body[0].col > this.game.grape.col) ? this.body[0].col - this.game.grape.col : COL, 0, COL, 0, 1);
    // inputs[5] = map((this.body[0].row == this.game.grape.row && this.body[0].col < this.game.grape.col) ? -this.body[0].col + this.game.grape.col : COL, 0, COL, 0, 1);
    // inputs[6] = map((this.body[0].col == this.game.grape.col && this.body[0].row > this.game.grape.row) ? this.body[0].row - this.game.grape.row : ROW, 0, ROW, 0, 1);
    // inputs[7] = map((this.body[0].col == this.game.grape.col && this.body[0].row < this.game.grape.row) ? -this.body[0].row + this.game.grape.row : ROW, 0, ROW, 0, 1);
    // inputs[8] = map(distSelf[0], 0, COL, 0, 1);
    // inputs[9] = map(distSelf[1], 0, COL, 0, 1);
    // inputs[10] = map(distSelf[2], 0, ROW, 0, 1);
    // inputs[11] = map(distSelf[3], 0, ROW, 0, 1);
    
    inputs[0] = this.valid(this.body[0].row, this.body[0].col - 1) ? 1 : 0;
    inputs[1] = this.valid(this.body[0].row, this.body[0].col + 1) ? 1 : 0;
    inputs[2] = this.valid(this.body[0].row - 1, this.body[0].col) ? 1 : 0;
    inputs[3] = this.valid(this.body[0].row + 1, this.body[0].col) ? 1 : 0;
    inputs[4] = (this.body[0].row == this.game.grape.row && this.body[0].col > this.game.grape.col) ? 1 : 0;
    inputs[5] = (this.body[0].row == this.game.grape.row && this.body[0].col < this.game.grape.col) ? 1 : 0;
    inputs[6] = (this.body[0].col == this.game.grape.col && this.body[0].row > this.game.grape.row) ? 1 : 0;
    inputs[7] = (this.body[0].col == this.game.grape.col && this.body[0].row < this.game.grape.row) ? 1 : 0;

    let outputs = this.brain.predict(inputs);

    let greatest = 0;
    for(let i=1; i<outputs.length; i++){
      if(outputs[i] > outputs[greatest]){
        greatest = i;
      }
    }
    
    if(greatest == 0){this.dir = [0, -1];}
    if(greatest == 1){this.dir = [-1, 0];}
    if(greatest == 2){this.dir = [0, 1];}
    if(greatest == 3){this.dir = [1, 0];}
  }
  
  valid(row, col){
    if(row < this.game.rowoffset ||
       col < this.game.coloffset ||
       row > ROW + this.game.rowoffset - 1 ||
       col > COL + this.game.coloffset - 1){

      return false;
    }

    for(let i = 1; i<this.body.length; i++){
      if(row == this.body[i].row &&
         col == this.body[i].col){

        return false
      }
    }
    
    return true;
  }
  
  distToSelf(){
    let distances = [COL, COL, ROW, ROW];

    for(let i=1; i<this.body.length; i++){
      if(this.body[0].col == this.body[i].col){
        let dist = this.body[0].row - this.body[i].row;
        
        if(dist > 0 && dist < distances[0]){
          distances[0] = dist;
          continue;
        }
        
        if(dist < 0 && -dist < distances[1]){
          distances[1] = -dist;
          continue;
        }
      }
      
      if(this.body[0].row == this.body[i].row){
        let dist = this.body[0].col - this.body[i].col;
        
        if(dist > 0 && dist < distances[2]){
          distances[2] = dist;
          continue;
        }
        
        if(dist < 0 && -dist < distances[3]){
          distances[3] = -dist;
          continue;
        }
      }
    }
    
    return distances;
  }
}

// if(this.body[0].row >= ROW - 1 && this.dir[0] == 1){
//   this.dir = [0, -1];
// }else if(this.body[0].row <= 0 && this.dir[0] == -1){
//   this.dir = [0, 1];
// }else if(this.body[0].col >= COL - 1 && this.dir[1] == 1){
//   this.dir = [1, 0];
// }else if(this.body[0].col <= 0 && this.dir[1] == -1){
//   this.dir = [-1, 0];
// }
