let canvas_width = 800;
let canvas_height = 500;
let img_cat_head;
let img_landscape;
let scrollSpeed_landscape = 2;
let x1_landscape = 0;
let x2_landscape = canvas_width;
let pipes = [];
let pipe_x_position = canvas_width;
let dom_element_1;
let pipe_created = false;
let dom_element_2;
let distance_passed = 0;

function preload() {
  img_cat_head = loadImage('../images/project4and5/cat_head.png');
  img_landscape = loadImage('../images/project4and5/landscape.png');
}

function setup() {
  var myCanvas = createCanvas(canvas_width, canvas_height);
  myCanvas.parent("canvasContainer");
  img_cat_head.width = 50;
  img_cat_head.height = 50;
  cat = new Cat(img_cat_head, canvas_width / 10, canvas_height / 4);

  dom_element_1 = createSlider(1, 2, 1);
  dom_element_1.size(250);
  dom_element_2 = createElement('p', '');
}

function draw() {

  dom_element_2.html('Distance passed: ' + distance_passed);
  pipe_created = false;
  for (let n = 0; n < dom_element_1.value(); n++) {
    distance_passed++;
    drawBackground();
    if (frameCount % (100 / dom_element_1.value()) == 0) {
      if (pipe_created == false) {
        let pipe_y_position = random(canvas_height / 2, canvas_height / 1.1);
        pipes.push(new Pipe(pipe_x_position, pipe_y_position, canvas_width, canvas_height));
        pipe_created = true;
      }
    }

    for (let i = 0; i < pipes.length; i++) {
      pipes[i].move();
      pipes[i].show();
      if (pipes[i].pipe_x_position + canvas_width / 10 < 0) {
        pipes.splice(i, 1);
      }
      if (pipes[i].hit(cat) == true) {
        textSize(66);
        fill(255, 0, 0);
        textAlign(CENTER, CENTER);
        text('HIT', canvas_width / 2, canvas_height / 2);
      }
    }

    cat.update();
    cat.show();
  }
}

function keyPressed() {
  if (key == ' ') {
    cat.jump();
  }
}

function mouseClicked() {
  if (mouseX > 0 && mouseY > 0 && mouseX < canvas_width && mouseY < canvas_height) {
    cat.jump();
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