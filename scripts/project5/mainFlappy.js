// get the closes pipe on the right not index 0 on page cat.js

let canvas_width = 800;
let canvas_height = 500;
let img_cat_head;
let img_landscape;
let scrollSpeed_landscape = 2;
let x1_landscape = 0;
let x2_landscape = canvas_width;
let pipes = [];
let pipe_x_position = canvas_width;
let dom_element;
let dom_element2;
let dom_element3;
let distance_passed = 0;

const TOTAL = 100;
let cats = [];
let savedCats = [];
let cat_brain = false;
let generation_number = 1;
let cats_still_alive = 0;


function preload() {
  img_cat_head = loadImage('../images/project4and5/cat_head.png');
  img_landscape = loadImage('../images/project4and5/landscape.png');
}

function setup() {
  tf.setBackend('cpu');
  var myCanvas = createCanvas(canvas_width, canvas_height);
  myCanvas.parent("canvasContainer");
  img_cat_head.width = 50;
  img_cat_head.height = 50;

  for (let i = 0; i < TOTAL; i++) {
    cats[i] = new Cat(img_cat_head, canvas_width / 10 + i, canvas_height / 4, cat_brain);
  }

  dom_element = createElement('p', '');
  dom_element2 = createElement('p', '');
  dom_element3 = createElement('p', '');
}

function draw() {
  console.log('dd');
  dom_element.html('Distance passed: ' + distance_passed);
  dom_element2.html('Current generation: ' + generation_number);
  dom_element3.html('Cats alive in this generation: ' + cats_still_alive);

  distance_passed++;
  drawBackground();

  if (frameCount % 90 == 0) { // ADD PIPES
    let pipe_y_position = random(canvas_height / 2, canvas_height / 1.1);
    pipes.push(new Pipe(pipe_x_position, pipe_y_position, canvas_width, canvas_height));
  }

  for (let i = 0; i < pipes.length; i++) { // MOVE PIPES
    pipes[i].move();
    pipes[i].show();
    if (pipes[i].pipe_x_position + canvas_width / 10 < 0) {
      pipes.splice(i, 1);
    }
  }

  for (let i = 0; i < pipes.length; i++) { // CAT PIPES COLLISION
    for (let j = 0; j < cats.length; j++) {
      if (pipes[i].hitPipes(cats[j])) {
        cats[j].distance_passed = distance_passed; // save when the cat died -> will be used for fitness calculation later
        savedCats.push(cats.splice(j, 1)[0]);
      }
    }
  }

  for (let i = 0; i < cats.length; i++) { // CAT GROUND COLLISION
    if (cats[i].y <= 0 || cats[i].y + cats[i].height >= canvas_height) {
      cats[i].distance_passed = distance_passed; // save when the cat died -> will be used for fitness calculation later
      savedCats.push(cats.splice(i, 1)[0]);
    }
  }

  for (let cat of cats) { // CALCULATE THE CONFIDENCE WHETER TO JUMP OR NOT
    if (pipes.length > 0) {
      cat.think(pipes);
    }
    cat.update();
  }

  if (cats.length == 0) { // ALL CATS DIED
    nextGeneration();
    distance_passed = 0;
    pipes = [];

  }
  cats_still_alive = 0;
  for (let i = 0; i < cats.length; i++) { // SHOW CATS
    cats[i].show();
    cats_still_alive++;
  }
}

function drawBackground() {
  background(204, 255, 204);
  image(img_landscape, x1_landscape, 0, canvas_width, canvas_height);
  image(img_landscape, x2_landscape, 0, canvas_width, canvas_height);

  x1_landscape -= scrollSpeed_landscape;
  x2_landscape -= scrollSpeed_landscape;

  if (x1_landscape < -canvas_width) {
    x1_landscape = canvas_width - 5;
  }
  if (x2_landscape < -canvas_width) {
    x2_landscape = canvas_width - 5;
  }
}