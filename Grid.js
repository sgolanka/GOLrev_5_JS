class Grid {

  constructor(c, r, w, h) {
    this.col = 2 * c;
    this.row = 2 * r;
    this.onColor = color(255);
    this.world = new Array(this.col); // current state as 2D grid of Cells
    for(var i = 0; i < this.world.length; i++) {
      this.world[i] = new Array(this.row);
    }
    var cw = float(2 * w / this.world.length);
    var ch = float(2 * h / this.world[0].length);
    for(var i = 0; i < this.world.length; i++) {
      for(var j = 0; j < this.world[i].length; j++) {
        this.world[i][j] = new Cell(float(cw), ch, (nf(i, 3) + nf(j, 3)));
        this.world[i][j].setLoc(i * cw, j * ch);
        this.world[i][j].elbow = this.onColor;
      }
    }

    this.nextWorld = new Array(this.world.length); // next generation state--just needs to keep track of value of "on"
    for(var i = 0; i < this.nextWorld.length; i++) {
      this.nextWorld[i] = new Array(this.world[i].length)
    }

    // nextworld initialized like world; fewer details necessary
    for(var i = 0; i < this.nextWorld.length; i++) {
      for(var j = 0; j < this.nextWorld[0].length; j++) {
        this.nextWorld[i][j] = new Cell(float(cw), ch, (nf(i, 3) + nf(j, 3)));
      }
    }
  }

  display() {
    for(var i = 0; i < this.world.length; i++) {
      for(var j = 0; j < this.world[i].length; j++) {
        this.world[i][j].cellColor = this.onColor;
        this.world[i][j].display();
      }
    }
  }

  selectCell(x, y) {
    for(var i = 0; i < this.world.length; i++) {
      for(var j = 0; j < this.world[i].length; j++) {
        if(this.world[i][j].inCell(x, y)) {
          if(this.world[i][j].isOn()) {
            this.world[i][j].turnOff();
          } else {
            this.world[i][j].turnOn();
          }
        }
      }
    }
  }

  /*
   The go() function runs the generations.  It runs through the world
   (2D grid of cells--their current state), getting the neigbors for each
   cell in the world, and based on the current number of neighbors and the
   rules of the Game of Life, sets the value for the current cell in the
   "next" world--literally the nextWorld array. This is done in the
   setNeighbors() method. Then the updateWorld() method is run, where,
   after all of the current world cells have been checked and all of the
   nextWorld cells have been set, the values from nextWorld are copied to world,
   now ready for the next time the cells of the world--the next generation--are
   to be shown.
   */

   go() {
     this.setNeighbors(); // aka "update nextWorld()"
     this.updateWorld();
   }

   updateWorld() {
     // copy nextWorld array to world. DO NOT USE arrayCopy!!
     for(var a = 0; a < this.world.length; a++) {
       for(var b = 0; b < this.world[a].length; b++) {
         this.world[a][b].on = this.nextWorld[a][b].on;
       }
     }
   }

   setNeighbors() {
     var neighbors = 0;

     for(var i = 0; i < this.world.length; i++) {
       for(var j = 0; j < this.world[0].length; j++) {
         neighbors = this.world[i][j].numNeighbors(this.world);
         /*
        Rules:
         --A cell dies if it has fewer than 2 or more than 3 neighbors
         --A cell stays alive if it has 2 or 3 neighbors
         --A cell is born if it has exaclty 3 neighbors (and isn't already alive)
         */
         if(neighbors < 2 || neighbors > 3) {

           this.nextWorld[i][j].turnOff();
         } else if(neighbors === 3 || this.world[i][j].isOn()) {
           this.nextWorld[i][j].turnOn();
         }
       }
     }
   }

   setRandomColor() {
     this.onColor = color(random(100, 255), random(100, 255), random(100, 255));
   }

   setColor(z) {
     this.onColor = z;
   }

   inverse() {
     for(var i = 0; i < this.world.length; i++) {
       for(var j = 0; j < this.world[0].length; j++) {
         this.world[i][j].inverse();
       }
     }
   }

   cellOn(r, c) {
     this.world[r][c].turnOn();
   }

   cellOff(r, c) {
     this.world[r][c].turnOff();
   }

   /*
   Make a table from the grid--using 1 for "on" and 0 for "off"--
   then save it.
   */
   saveWorld() {
     console.log("saveWorld");
     var worldTable = loadTable("data/tableGOL.csv");
     var colCount = worldTable.getColumnCount();
     var rowCount = worldTable.getRowCount();

     for(var a = 0; a < rowCount; a++) { // go through rows
       for(var b = 0; b < rowCount; b++) { // go through columns
         if(this.world[a][b].isOn()) {
           worldTable.setInt(b, a, 1);
         } else {
           worldTable.setInt(b, a, 0);
         }
       }
     }
     this.saveTable(worldTable ,"data/tableGOL3.csv");
   }

   /*
   Load the appropriate table, convert it to the world grid.
   Through trial and error, the way to do this turns out to
   be to update the nextWorld grid, call the two go() methods.
   */
   loadWorld(w) {
     // table assumes 140 x 140 world
     var whichWorld = w;
     var worldTable = new p5.Table();
     worldTable = worlds[whichWorld];

     var colCount = worldTable.getColumnCount();
     var rowCount = worldTable.getRowCount();

     for(var a = 0; a < rowCount; a++) { // go through rows
       for(var b = 0; b < colCount; b++) { // go through columns
         if(worldTable.getInt(a, b) == 1) {
           this.nextWorld[b][a].turnOn(); // somewhere I flipped rows and columns
         } else {
           this.nextWorld[b][a].turnOff();
         }
       }
     }
     this.updateWorld();
     this.setNeighbors();
   }
}
