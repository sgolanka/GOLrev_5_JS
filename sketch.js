// BUG: universe.world = undefined;

/*
*************************************************************************
 *************************************************************************
 *************************************************************************
 An interactive* version of Conway's Game of Life

 The Game of Life Rules:
 1. A cell dies if it has fewer than 2 or more than 3 neighbors
 2. A cell stays alive if it has 2 or 3 neighbors
 3. A cell is born if it has exactly 3 neighbors (and isn't already alive)

 Click a cell to change its status (and pause the game).

 Menu
 S: Start/Pause                   D: Save World
 L: Load Saved World              Y: Make Color Yellow
 X: Choose Random Color           M: Show this menu
 <- (Left Arrow): Slow Down       -> (Right Arrow): Speed Up
 Number Keys (1-9): Load specific starting world

 Stan Golanka (2018) w/ Neighbor Detection by Dan Rencricca
 *Is there any other kind?
 *************************************************************************
 *************************************************************************
 *************************************************************************
 */




 var universe;
 var timer;
 var timeBetweenGenerations, numberOfGenerations;
 var start, preStart;
 var smoothener;
 var instText;

function preload() {
  instText = loadStrings("data/golInst.txt");
}

function setup() {
  preStart = true;
  start = false;
  numberOfGenerations = 0;

  smoothener = new Timer(80);
  smoothener.start(); // smoothener makes MouseDragged work a little better

  createCanvas(700, 700);

  // Grid creates the cells and runs the game
  universe = new Grid(width / 10, height / 10, width, height);

  // in milliseconds - lower number is faster:
  timeBetweenGenerations = 180;
  // set the timer to seperate the generations
  timer = new Timer(timeBetweenGenerations);
  timer.start();
}

function draw() {
  background(0);
  if(preStart) {
    displayInstructions();
  } else {
    universe.display();
    fill(255, 75);
    text("Generation " + numberOfGenerations, width * 3 / 4, height * 0.9);
  }

  if(start) {
    if(timer.isFinished()) {
      universe.go();
      timer.setTime(timeBetweenGenerations);
      timer.start();
      numberOfGenerations++;
    }
  }
}

function displayInstructions() {
  var instructions = ""
    for(var i = 0; i < instText.length; i++) {
      instructions += instText[i] + "\n"
    }
    textSize(height / 35);
    fill(255, 255, 0, 200);
    text(instructions, 50, 50, width - 50, height - 50);

}

function mousePressed() {
  // get rid of directions if they are there
  preStart = false;
  // pause the action for editing
  start = false;
  universe.selectCell(mouseX, mouseY);
}

function mouseDragged() {
  // Timer smoothener = new Timer(1);
  // smoothener.start()
  // get rid of directions if they are there
  preStart = false;
  // pause the action of editing
  start = false;
  if(smoothener.isFinished()) {
    universe.selectCell(mouseX, mouseY);
    smoothener.start();
  }
}

function keyPressed() {
  if (key == 's' || key == 'S') {
    start = !start;
  } else if (key == 'x' || key == 'X') {
    universe.setRandomColor();
  } else if (key == 'y' || key == 'Y') {
    universe.setColor(color(255, 255, 0));
  } else if (key == 'm' || key == 'M') {
    start = false;
    preStart = true;
  } else if (key == 'd' || key == 'D') {
    start = false;
    universe.saveWorld();
  } else if (key == 'l' || key == 'L') {
    start = false;
    universe.loadWorld(0);
    numberOfGenerations = 0;
  } else if (key == 'i' || key == 'I') {
    universe.inverse();
  } else if (key == '1') {
    start = false;
    universe.loadWorld(1);
    numberOfGenerations = 0;
  } else if (key == '2') {
    start = false;
    universe.loadWorld(2);
    numberOfGenerations = 0;
  } else if (key == '3') {
    start = false;
    universe.loadWorld(3);
    numberOfGenerations = 0;
  } else if (key == '4') {
    start = false;
    universe.loadWorld(4);
    numberOfGenerations = 0;
  } else if (key == '5') {
    start = false;
    universe.loadWorld(5);
    numberOfGenerations = 0;
  } else if (key == keyCode) {
    textSize(20);
    fill(255, 255, 0);
    text("TBG: " + timeBetweenGenerations, 10, 30);
    if (keyCode == RIGHT) {
      timeBetweenGenerations--;
    }
    if (keyCode == LEFT) {
      timeBetweenGenerations++;
    }
  }
}
