class Segment {
  constructor(j = -1, i = -1, color = "#47d749"){
    this.row = j;
    this.col = i;
    this.color = color;
  }

  draw(){
    noStroke();
    fill(this.color);
    rect(TILE*this.col, TILE*this.row, TILE, TILE);
  }
}
