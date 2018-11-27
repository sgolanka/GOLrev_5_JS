class Cell {

  constructer(w, h, s) {
    this.cellW = w;
    this.cellH = h;
    this.on = false; // this is the only thing that matters for the "nextWorld" array
    this.id = s; // assumed to be in format cccrrr (e.g. 033007 for c = 33 r = 7)
    this.r = parseInt(id.substring(0, 3));
    this.c = parseInt(id.substring(3));
    // yeah sorry
    this.elbow = color(255);
    this.cellColor = elbow;
    this.outlineColor = color(0);
  }

  display() {
    if(this.on) {
      stroke(this.outlineColor);
      fill(this.cellColor);
    } else {
      stroke(255, 50);
      fill(0);
    }
    rect(this.cellX, this.cellY, this.cellW, this.cellH);
  }

  setLoc(x, y) {
    this.cellX = x;
    this.cellY = y;
  }

  turnOn() {
    this.on = true;
  }

  turnOff() {
    this.on = false;
  }

  isOn() {
    return this.on;
  }

  inverse() {
    var temp = this.cellColor;
    this.cellColor = this.outlineColor
    this.outlineColor = temp;
  }

  inCell(x, y) {
    return x >= cellX && (x <= cellX + cellW) && y >= cellY && (y <= cellY + cellH);
  }

  name() {
    return id;
  }

  numNeighbors(g) {
    var n = 0;

    /*
    Neighbor Detection: Check the 8 cells touching this cell, in a given grid of
    cells count how many cells are "on," in a 3x3 grid, centered on this cell
    (not counting the this cell, the center).
     */

     for(var cAdj = -1; cAdj <= 1; cAdj++) {
       for(var rAdj = -1; rAdj <= 1; rAdj++) {
         // if this is not the cetner cell, but is a valid cell, and it is on, then increase n by one
         if (/*not center*/!(rAdj === 0 && cAdj === 0) && /*valid address*/this.r + rAdj >= 0 && this.c + cAdj >= 0 && this.r + rAdj < g.length && this.c + cAdj < g[0].length && /*valid cell*/ g[this.r+rAdj][this.c+cAdj] != null && /*is on*/ g[this.r+rAdj][this.c+cAdj].isOn()) {
           n++;
         }
       }
     }
     return n;
  }
}
