var width = 0;
var height = 0;

//physics starting parameters
var moveX;
var moveY;
var isStandingOnSomething = false;
var isJumpingUp = false;
var isJumpingDown = false;
var initialJumpPosition = 0;
var onloadCatPositionX = 500;
var onloadCatPositionY = 500;

var spriteCat;

var coinsCount = 0;
var randomMin = 400;
var randomMax = 600;

var firstFrame1 = false;
var firstHit1 = false;
var frameCounter1 = 0;
var coinDelay1;

var firstFrame2 = false;
var firstHit2 = false;
var frameCounter2 = 0;
var coinDelay2;

var firstFrame3 = false;
var firstHit3 = false;
var frameCounter3 = 0;
var coinDelay3;

var firstFrame4 = false;
var firstHit4 = false;
var frameCounter4 = 0;
var coinDelay4;

var firstFrame5 = false;
var firstHit5 = false;
var frameCounter5 = 0;
var coinDelay5;

var firstFrame6 = false;
var firstHit6 = false;
var frameCounter6 = 0;
var coinDelay6;

var firstFrame7 = false;
var firstHit7 = false;
var frameCounter7 = 0;
var coinDelay7;

var enemyStartingX;
var enemyStartingY;
var enemyFirstHit = false;
var enemyFrameCounter1 = 0;
var enemyFrameCounter2 = 0;
var enemyFrameCounter3 = 0;
var enemyFrameCounter4 = 0;
var enemyFrameCounter5 = 0;
var enemyFrameCounter6 = 0;
var enemyFrameCounter7 = 0;
var enemyFrameCounter8 = 0;
var enemyBlinkTrigger = false;
var enemyDirection = "right";
var enemies = [];

var catLives = 7;

var bulletStartingX;
var bulletStartingY;
var bullets = [];
var bulletFirstHit = false;
var bulletFrameCounter1 = 0;
var bulletFrameCounter2 = 0;
var bulletFrameCounter3 = 0;
var bulletFrameCounter4 = 0;
var bulletFrameCounter5 = 0;
var bulletFrameCounter6 = 0;
var bulletFrameCounter7 = 0;
var bulletFrameCounter8 = 0;
var bulletBlinkTrigger = false;

var droneStartingX;
var droneStartingY;
var droneFirstHit = false;
var droneFrameCounter1 = 0;
var droneFrameCounter2 = 0;
var droneFrameCounter3 = 0;
var droneFrameCounter4 = 0;
var droneFrameCounter5 = 0;
var droneFrameCounter6 = 0;
var droneFrameCounter7 = 0;
var droneFrameCounter8 = 0;
var droneBlinkTrigger = false;

var enemyCatLives = 0;
var bulletCatLives = 0;
var droneCatLives = 0;

var paused = true;

var dateStamp;
var startingTimeStamp;
var countDownTimer = 60;

function preload() {

  imgCatStanding = loadImage("../images/project2/StandingCat.png");
  imgCatRunning1 = loadImage("../images/project2/RunningCat.png");
  imgCatRunning2 = loadImage("../images/project2/RunningCat2.png");
  imgCatRunning3 = loadImage("../images/project2/RunningCat3.png");
  imgCatJumping = loadImage("../images/project2/JumpingCat.png");
  imgTV = loadImage("../images/project2/tv.png");
  imgCouch = loadImage("../images/project2/couch.png");
  imgBookshelf = loadImage("../images/project2/bookshelf.png");
  imgPainting = loadImage("../images/project2/painting.png");
  imgLamp = loadImage("../images/project2/lamp.png");

  imgCoin1 = loadImage("../images/project2/coin1.png");
  imgCoin2 = loadImage("../images/project2/coin2.png");
  imgCoin3 = loadImage("../images/project2/coin3.png");
  imgCoin4 = loadImage("../images/project2/coin4.png");
  imgCoin5 = loadImage("../images/project2/coin5.png");
  imgCoin6 = loadImage("../images/project2/coin6.png");

  imgFullHeart = loadImage("../images/project2/fullHeart.png");
  imgEmptyHeart = loadImage("../images/project2/emptyHeart.png");

  imgDrone = loadImage("../images/project2/drone.png");
  imgRobot = loadImage("../images/project2/robot.png");
  imgVacuum = loadImage("../images/project2/vacuumCleaner.png");

  imgUpArrow = loadImage("../images/project2/upArrow.png");
  imgLeftArrow = loadImage("../images/project2/leftArrow.png");
  imgRightArrow = loadImage("../images/project2/rightArrow.png");

  fontScore = loadFont('../font/Chunkfive.otf');
  fontScore = loadFont('../font/Chunkfive.otf');
}

function setup() {

  height = windowHeight - getComputedCSSvalues();
  width = height * 1.777777777777778;
  var myCanvas = createCanvas(width, height);
  myCanvas.parent("p5Canvas");

  //resize cat sprites
  resizeSprites(width, height);


  //   if (navigator.appName == 'Microsoft Internet Explorer' || !!(navigator.userAgent.match(/Trident/) || navigator.userAgent.match(/rv:11/)) || (typeof $.browser !== "undefined" && $.browser.msie == 1)) {
  // console.log('IE');
  //   } else {



  //cast a cat 500/795=543/833
  catObject = new catObject(imgCatStanding, width / 1.5, height / 1.3, imgCatStanding.width, imgCatStanding.height, isJumpingUp, isJumpingDown, initialJumpPosition);

  //load cat sprites
  spriteCat = createSprite(width / 1.5 + imgCatStanding.width / 2, height / 1.3, imgCatStanding.width, imgCatStanding.height);
  spriteCat.addAnimation('stand', imgCatStanding);
  spriteCat.addAnimation('run', imgCatRunning1, imgCatRunning2, imgCatRunning3);
  spriteCat.addAnimation('jump', imgCatJumping);
  spriteCat.addAnimation('nocat', imgCoin6);

  //load coin sprites
  spriteCoin1 = createSprite(width / 1.5 + imgCoin1.width / 2, height / 1.3, imgCoin1.width, imgCoin1.height);
  spriteCoin1.addAnimation('noanimation', imgCoin6);
  spriteCoin1.addAnimation('rotation', imgCoin1, imgCoin2, imgCoin3, imgCoin4, imgCoin5);

  spriteCoin2 = createSprite(width / 1.5 + imgCoin1.width / 2, height / 1.3, imgCoin1.width, imgCoin1.height);
  spriteCoin2.addAnimation('noanimation', imgCoin6);
  spriteCoin2.addAnimation('rotation', imgCoin1, imgCoin2, imgCoin3, imgCoin4, imgCoin5);

  spriteCoin3 = createSprite(width / 1.5 + imgCoin1.width / 2, height / 1.3, imgCoin1.width, imgCoin1.height);
  spriteCoin3.addAnimation('noanimation', imgCoin6);
  spriteCoin3.addAnimation('rotation', imgCoin1, imgCoin2, imgCoin3, imgCoin4, imgCoin5);

  spriteCoin4 = createSprite(width / 1.5 + imgCoin1.width / 2, height / 1.3, imgCoin1.width, imgCoin1.height);
  spriteCoin4.addAnimation('noanimation', imgCoin6);
  spriteCoin4.addAnimation('rotation', imgCoin1, imgCoin2, imgCoin3, imgCoin4, imgCoin5);

  spriteCoin5 = createSprite(width / 1.5 + imgCoin1.width / 2, height / 1.3, imgCoin1.width, imgCoin1.height);
  spriteCoin5.addAnimation('noanimation', imgCoin6);
  spriteCoin5.addAnimation('rotation', imgCoin1, imgCoin2, imgCoin3, imgCoin4, imgCoin5);

  spriteCoin6 = createSprite(width / 1.5 + imgCoin1.width / 2, height / 1.3, imgCoin1.width, imgCoin1.height);
  spriteCoin6.addAnimation('noanimation', imgCoin6);
  spriteCoin6.addAnimation('rotation', imgCoin1, imgCoin2, imgCoin3, imgCoin4, imgCoin5);

  spriteCoin7 = createSprite(width / 1.5 + imgCoin1.width / 2, height / 1.3, imgCoin1.width, imgCoin1.height);
  spriteCoin7.addAnimation('noanimation', imgCoin6);
  spriteCoin7.addAnimation('rotation', imgCoin1, imgCoin2, imgCoin3, imgCoin4, imgCoin5);

  coinDelay1 = floor(random(randomMin, randomMax));
  coinDelay2 = floor(random(randomMin, randomMax));
  coinDelay3 = floor(random(randomMin, randomMax));
  coinDelay4 = floor(random(randomMin, randomMax));
  coinDelay5 = floor(random(randomMin, randomMax));
  coinDelay6 = floor(random(randomMin, randomMax));
  coinDelay7 = floor(random(randomMin, randomMax));

  bulletStartingX = width / 1.36;
  bulletStartingY = height / 1.99;

  droneStartingX = width / 1.5;
  droneStartingY = height / 6;

  enemyStartingX = width / 5;
  enemyStartingY = height / 1.155;

  enemies.push(new enemyObject(enemyStartingX, enemyStartingY, enemyFirstHit, enemyBlinkTrigger, enemyCatLives, enemyDirection));
  drone = new droneObject(droneStartingX, droneStartingY, droneFirstHit, droneBlinkTrigger, droneCatLives);



}



function draw() {

  //   if (navigator.appName == 'Microsoft Internet Explorer' || !!(navigator.userAgent.match(/Trident/) || navigator.userAgent.match(/rv:11/)) || (typeof $.browser !== "undefined" && $.browser.msie == 1)) {
  //     background('#f49890');
  //     stroke('red');
  //     strokeWeight(width / 200);
  //     textSize(width / 20);
  //     fill('#000000');
  //     textFont(fontScore);
  //     textAlign(CENTER);
  //     text("Unfortunately this game won't run on IE. Get a better browser!", this.width / 4, this.height / 2, this.width / 2)
  //   } else {

  //console.log(countDownTimer)
  camera.off(); //make the objects inside of the canvas responsive

  if (paused === true) {

    background('#f49890');
    stroke('red');
    strokeWeight(width / 200);
    textSize(width / 10);
    fill('#000000');
    textFont(fontScore);
    textAlign(CENTER);
    text('Welcome!', this.width / 2, this.height / 4);

    noStroke();
    textSize(width / 30);
    textAlign(CENTER);
    text("Your objective is to collect as much gold as you can. Good cat food is very expensive!", this.width / 2 - this.width / 2.6, this.height / 2.5, this.width / 1.3);

    stroke('red');
    strokeWeight(width / 250);
    text("Enemies", this.width / 2 - this.width / 2.6, this.height / 1.6, this.width / 1.3);

    fill('#ffffff');
    stroke('#222222');
    strokeWeight(width / 200);
    rect(width / 2 - width / 8, height / 1.21, width / 4, height / 8, width / 100);

    stroke('red');
    strokeWeight(width / 300);
    textSize(width / 30);
    fill('#000000');
    textFont(fontScore);
    textAlign(CENTER);
    text("Play!", this.width / 2, this.height / 1.1);

    noStroke();
    textSize(width / 50);
    textAlign(CENTER);

    image(imgRobot, floor(width / 5), floor(height / 1.5));
    text("robot toy", this.width / 4.45, this.height / 1.25);
    image(imgDrone, width / 2 - width / 13, height / 1.6);
    text("drone", this.width / 2.02, this.height / 1.25);
    image(imgVacuum, width / 1.5, height / 1.65);
    text("vacuum cleaner", this.width / 1.35, this.height / 1.25);
    image(imgCoin1, width / 60, height / 2.8);

    image(imgCoin1, width / 1.28, height / 2.8);


  } else if (paused === false) {
    if (catLives != 0 && countDownTimer > 0) { //} && paused === false) {

      background('#f49890');

      stroke('red');
      strokeWeight(width / 100);
      textSize(width / 20);
      fill('#000000');
      textFont(fontScore);
      textAlign(LEFT);
      text(countDownTimer, this.width / 2, this.height / 5);

      //staticObjects = new staticObject(width, height, imgMax, imgMin, imgMaxMinWindowState, catLives);
      staticObjects = new staticObject(width, height, catLives);
      staticObjects.show();
      staticObjects.collide(catObject);
      if (staticObjects.collisionWith === "bottomFloor_" || staticObjects.collisionWith === "bottomFloor_leftLeftwall_" || staticObjects.collisionWith === "bottomFloor_rightRightwall_" || staticObjects.collisionWith === "nothing_bottomShelf_" || staticObjects.collisionWith === "nothing_rightShelf_bottomShelf_" || staticObjects.collisionWith === "nothing_leftShelf_bottomShelf_") {
        isStandingOnSomething = true;
      } else {
        isStandingOnSomething = false;
      }

      noTint();

      catObject.updatePosition(moveX, moveY, isStandingOnSomething, staticObjects.collisionWith);
      //catObject.show();

      collectables = new collectablesObject(width, height, firstFrame1, frameCounter1, coinsCount, firstHit1, firstFrame2, frameCounter2, firstHit2, firstFrame3, frameCounter3, firstHit3, firstFrame4, frameCounter4, firstHit4, firstFrame5, frameCounter5, firstHit5, firstFrame6, frameCounter6, firstHit6, firstFrame7, frameCounter7, firstHit7, coinDelay1, coinDelay2, coinDelay3, coinDelay4, coinDelay5, coinDelay6, coinDelay7);
      collectables.show(catObject);
      coinsCount = collectables.coinsCount;

      firstFrame1 = collectables.firstFrame1;
      frameCounter1 = collectables.frameCounter1;
      firstHit1 = collectables.firstHit1;

      firstFrame2 = collectables.firstFrame2;
      frameCounter2 = collectables.frameCounter2;
      firstHit2 = collectables.firstHit2;

      firstFrame3 = collectables.firstFrame3;
      frameCounter3 = collectables.frameCounter3;
      firstHit3 = collectables.firstHit3;

      firstFrame4 = collectables.firstFrame4;
      frameCounter4 = collectables.frameCounter4;
      firstHit4 = collectables.firstHit4;

      firstFrame5 = collectables.firstFrame5;
      frameCounter5 = collectables.frameCounter5;
      firstHit5 = collectables.firstHit5;

      firstFrame6 = collectables.firstFrame6;
      frameCounter6 = collectables.frameCounter6;
      firstHit6 = collectables.firstHit6;

      firstFrame7 = collectables.firstFrame7;
      frameCounter7 = collectables.frameCounter7;
      firstHit7 = collectables.firstHit7;


      for (var i = 0; i < enemies.length; i++) {
        enemies[i].move();
        enemies[i].show(catObject);

        enemyFirstHit = enemies[i].enemyFirstHit;
        catLives = catLives + enemies[i].enemyCatLives;
        enemyDirection = enemies[i].enemyDirection;

        if (isNaN(enemies[i].frameCounter1)) { } else {
          enemyFrameCounter1 = enemies[i].frameCounter1;
          enemyFrameCounter2 = enemies[i].frameCounter2;
          enemyFrameCounter3 = enemies[i].frameCounter3;
          enemyFrameCounter4 = enemies[i].frameCounter4;
          enemyFrameCounter5 = enemies[i].frameCounter5;
          enemyFrameCounter6 = enemies[i].frameCounter6;
          enemyFrameCounter7 = enemies[i].frameCounter7;
          enemyFrameCounter8 = enemies[i].frameCounter8;
          enemyBlinkTrigger = enemies[i].enemyBlinkTrigger;
        }

        if (enemyBlinkTrigger === true) {
          if (frameCount < enemyFrameCounter1) {
            spriteCat.changeAnimation('nocat');
          } else if (frameCount > enemyFrameCounter1 && frameCount < enemyFrameCounter2) { } else if (frameCount > enemyFrameCounter2 && frameCount < enemyFrameCounter3) {
            spriteCat.changeAnimation('nocat');
          } else if (frameCount > enemyFrameCounter3 && frameCount < enemyFrameCounter4) { } else if (frameCount > enemyFrameCounter4 && frameCount < enemyFrameCounter5) {
            spriteCat.changeAnimation('nocat');
          } else if (frameCount > enemyFrameCounter5 && frameCount < enemyFrameCounter6) { } else if (frameCount > enemyFrameCounter6 && frameCount < enemyFrameCounter7) {
            spriteCat.changeAnimation('nocat');
          } else if (frameCount > enemyFrameCounter6 && frameCount < enemyFrameCounter7) {
            enemyBlinkTrigger = false;
          }
        }
      }

      if (frameCount % 101 === 10) {
        bullets.push(new bulletObject(bulletStartingX, bulletStartingY, bulletFirstHit, bulletBlinkTrigger, bulletCatLives));
      }

      for (var i = 0; i < bullets.length; i++) {
        bullets[i].move();
        bullets[i].show(catObject);
        bulletFirstHit = bullets[i].bulletFirstHit;
        catLives = catLives + bullets[i].bulletCatLives;

        if (isNaN(bullets[i].frameCounter1)) { } else {
          bulletFrameCounter1 = bullets[i].frameCounter1;
          bulletFrameCounter2 = bullets[i].frameCounter2;
          bulletFrameCounter3 = bullets[i].frameCounter3;
          bulletFrameCounter4 = bullets[i].frameCounter4;
          bulletFrameCounter5 = bullets[i].frameCounter5;
          bulletFrameCounter6 = bullets[i].frameCounter6;
          bulletFrameCounter7 = bullets[i].frameCounter7;
          bulletFrameCounter8 = bullets[i].frameCounter8;
          bulletBlinkTrigger = bullets[i].bulletBlinkTrigger;
        }

        if (bulletBlinkTrigger === true) {
          if (frameCount < bulletFrameCounter1) {
            spriteCat.changeAnimation('nocat');
          } else if (frameCount > bulletFrameCounter1 && frameCount < bulletFrameCounter2) { } else if (frameCount > bulletFrameCounter2 && frameCount < bulletFrameCounter3) {
            spriteCat.changeAnimation('nocat');
          } else if (frameCount > bulletFrameCounter3 && frameCount < bulletFrameCounter4) { } else if (frameCount > bulletFrameCounter4 && frameCount < bulletFrameCounter5) {
            spriteCat.changeAnimation('nocat');
          } else if (frameCount > bulletFrameCounter5 && frameCount < bulletFrameCounter6) { } else if (frameCount > bulletFrameCounter6 && frameCount < bulletFrameCounter7) {
            spriteCat.changeAnimation('nocat');
          } else if (frameCount > bulletFrameCounter6 && frameCount < bulletFrameCounter7) {
            bulletBlinkTrigger = false;
          }
        }

      }

      for (var i = 0; i < bullets.length; i++) {
        if (bullets[i].bulletStartingX < width / 30) {
          bullets.splice(i, 1);
        }
      }

      drone.move();
      drone.show(catObject);
      droneFirstHit = drone.droneFirstHit;
      catLives = catLives + drone.droneCatLives;

      if (isNaN(drone.frameCounter1)) { } else {
        droneFrameCounter1 = drone.frameCounter1;
        droneFrameCounter2 = drone.frameCounter2;
        droneFrameCounter3 = drone.frameCounter3;
        droneFrameCounter4 = drone.frameCounter4;
        droneFrameCounter5 = drone.frameCounter5;
        droneFrameCounter6 = drone.frameCounter6;
        droneFrameCounter7 = drone.frameCounter7;
        droneFrameCounter8 = drone.frameCounter8;
        droneBlinkTrigger = drone.droneBlinkTrigger;
      }

      if (droneBlinkTrigger === true) {
        if (frameCount < droneFrameCounter1) {
          spriteCat.changeAnimation('nocat');
        } else if (frameCount > droneFrameCounter1 && frameCount < droneFrameCounter2) { } else if (frameCount > droneFrameCounter2 && frameCount < droneFrameCounter3) {
          spriteCat.changeAnimation('nocat');
        } else if (frameCount > droneFrameCounter3 && frameCount < droneFrameCounter4) { } else if (frameCount > droneFrameCounter4 && frameCount < droneFrameCounter5) {
          spriteCat.changeAnimation('nocat');
        } else if (frameCount > droneFrameCounter5 && frameCount < droneFrameCounter6) { } else if (frameCount > droneFrameCounter6 && frameCount < droneFrameCounter7) {
          spriteCat.changeAnimation('nocat');
        } else if (frameCount > droneFrameCounter6 && frameCount < droneFrameCounter7) {
          droneBlinkTrigger = false;
        }
      }

      stroke('red');
      strokeWeight(width / 400);
      textSize(width / 50);
      fill('#000000');
      textFont(fontScore);
      textAlign(LEFT);
      text('GOLD: ' + coinsCount, this.width / 25, this.height / 25, this.width / 2, this.height / 25);
      text('LIVES', this.width / 25, this.height / 12, this.width / 2, this.height / 25);
      text('FPS: ' + floor(frameRate()), this.width / 25, this.height / 7.8, this.width / 2, this.height / 25);


      if (width < 863) {
        // fill('#f4a442');
        // rect(width / 19, height / 1.95, width / 10, height / 5);
        // rect(width / 5.59, height / 1.95, width / 10, height / 5);
        // rect(width / 1.185, height / 1.95, width / 10, height / 5);
        tint(255, 127);
        image(imgLeftArrow, width / 25, height / 2);
        image(imgRightArrow, width / 6, height / 2);
        image(imgUpArrow, width / 1.2, height / 2);
        noTint();


        moveX = "stand";
        moveY = "stand";

        if (mouseIsPressed && mouseX > width / 19 && mouseX < width / 19 + width / 10 && mouseY > height / 1.95 && mouseY < height / 1.95 + height / 5) {
          moveX = "left";
          //return false;
        } else if (mouseIsPressed && mouseX > width / 5.59 && mouseX < width / 5.59 + width / 10 && mouseY > height / 1.95 && mouseY < height / 1.95 + height / 5) {
          moveX = "right";
          //return false;
        } else {
          moveY = "stand";
          //return false;
        }

        if (mouseIsPressed && mouseX > width / 1.185 && mouseX < width / 1.185 + width / 10 && mouseY > height / 1.95 && mouseY < height / 1.95 + height / 5) {
          moveY = "up";
          //return false;
        } else {
          moveY = "stand";
          //return false;
        }


      }
      drawSprites();

      dateStamp = new Date();
      var currentTimeStamp = dateStamp.getTime();
      countDownTimer = floor((startingTimeStamp - currentTimeStamp) / 1000);

    } else if (catLives === 0 || countDownTimer < 1) {

      background('#f49890');

      stroke('red');
      strokeWeight(width / 200);
      textSize(width / 10);
      fill('#000000');
      textFont(fontScore);
      textAlign(CENTER);
      text('GAME OVER', this.width / 2, this.height / 4);



      noStroke();
      textSize(width / 30);
      text("Gold collected:", this.width / 2, this.height / 2);

      stroke('red');
      strokeWeight(width / 200);
      textSize(width / 15);
      text(coinsCount, this.width / 2, this.height / 1.5);

      fill('#ffffff');
      stroke('#222222');
      strokeWeight(width / 200);
      rect(width / 2 - width / 8, height / 1.21, width / 4, height / 8, width / 100);

      stroke('red');
      strokeWeight(width / 300);
      textSize(width / 30);
      fill('#000000');
      textFont(fontScore);
      textAlign(CENTER);
      text("Play again!", this.width / 2, this.height / 1.1);
    }
  }
}



function windowResized() {

  height = windowHeight;
  width = height * 1.777777777777778;
  // width = canvasDiv.clientWidth - canvasDiv.clientWidth / 10;
  // height = width / 1.777777777777778;
  resizeCanvas(width, height);

  var spritesArray = [imgCatStanding, imgCatRunning1, imgCatRunning2, imgCatRunning3, imgCatJumping];
  //   for (aSprite of spritesArray) {
  //       aSprite.width = floor(width / 20);
  //       aSprite.height = floor(height / 13);
  //   }

  spritesArray.forEach(function (aSprite) {
    aSprite.width = floor(width / 20);
    aSprite.height = floor(height / 13);
  });


  imgTV.width = floor(width / 13);
  imgTV.height = floor(height / 1);

  imgCouch.width = floor(width / 3);
  imgCouch.height = floor(height / 1);

  imgBookshelf.width = floor(width / 4);
  imgBookshelf.height = floor(height / 1);

  imgLamp.width = floor(width / 10);
  imgLamp.height = floor(height / 1);

  var spritesArray2 = [imgCoin1, imgCoin2, imgCoin3, imgCoin4, imgCoin5];
  //   for (aSprite of spritesArray2) {
  //       aSprite.width = floor(width / 5);
  //       aSprite.height = floor(height / 1);
  //   }

  spritesArray2.forEach(function (aSprite) {
    aSprite.width = floor(width / 5);
    aSprite.height = floor(height / 1);
  });



  imgFullHeart.width = floor(width / 42);
  //imgFullHeart.height = floor(height / 1);
  imgFullHeart.height = imgFullHeart.width * 0.8908450704225352;

  imgEmptyHeart.width = floor(width / 42);
  //imgEmptyHeart.height = floor(height / 1);
  imgEmptyHeart.height = imgEmptyHeart.width * 0.8908450704225352;

  imgRobot.width = floor(width / 18);
  imgRobot.height = floor(height / 1);

  imgDrone.width = floor(width / 7);
  imgDrone.height = floor(height / 1);

  imgVacuum.width = floor(width / 8);
  imgVacuum.height = floor(height / 1);

  var spritesArray3 = [imgLeftArrow, imgRightArrow, imgUpArrow];
  //   for (aSprite of spritesArray3) {
  //       aSprite.width = floor(width / 8);
  //       aSprite.height = floor(height / 1);
  //   }

  spritesArray3.forEach(function (aSprite) {
    aSprite.width = floor(width / 8);
    aSprite.height = floor(height / 1);
  });
}



function keyPressed() {
  //if (width > 862) {

  if (keyCode === LEFT_ARROW) {
    moveX = "left";
  } else if (keyCode === RIGHT_ARROW) {
    moveX = "right";
  } else if (keyCode === UP_ARROW) {
    moveY = "up";
  } else {
    moveX = "stand";
    moveY = "stand";
  }
  return false;
  //}
}

function keyReleased() {
  //if (width > 862) {
  if (keyCode === LEFT_ARROW) {
    moveX = "stand";
  } else if (keyCode === RIGHT_ARROW) {
    moveX = "stand";
  } else if (keyCode === UP_ARROW) {
    moveY = "stand";
  } else {
    moveX = "stand";
    moveY = "stand";
  }
  return false;
  // }
}

function mousePressed() {

  if (paused === true) {
    if (mouseX > width / 2 - width / 8 && mouseX < width / 2 - width / 8 + width / 4 && mouseY > height / 1.21 && mouseY < height / 1.21 + height / 8) {
      paused = false;
      dateStamp = new Date();
      startingTimeStamp = dateStamp.getTime() + 60000;
    }
  }

  if (catLives === 0 || countDownTimer < 1) {
    if (mouseX > width / 2 - width / 8 && mouseX < width / 2 - width / 8 + width / 4 && mouseY > height / 1.21 && mouseY < height / 1.21 + height / 8) {
      location.reload();
    }
  }
}


function resizeSprites(width, height) {
  var spritesArray = [imgCatStanding, imgCatRunning1, imgCatRunning2, imgCatRunning3, imgCatJumping];
  //   for (aSprite of spritesArray) {
  //       aSprite.width = floor(width / 20);
  //       aSprite.height = floor(height / 13);
  //   }

  spritesArray.forEach(function (aSprite) {
    aSprite.width = floor(width / 20);
    aSprite.height = floor(height / 13);
  });

  imgTV.width = floor(width / 13);
  imgTV.height = imgTV.width * 1.035714285714286;//floor(height / 1);

  imgCouch.width = floor(width / 3);
  imgCouch.height = imgCouch.width * 0.4117647058823529;//floor(height / 1);

  imgBookshelf.width = floor(width / 4);
  imgBookshelf.height = imgBookshelf.width;//floor(height / 1);

  imgPainting.width = floor(width / 8);
  imgPainting.height = imgPainting.width * 0.686046511627907;//floor(height / 1);

  imgLamp.width = floor(width / 10);
  imgLamp.height = imgLamp.width * 1.457142857142857;//floor(height / 1);

  var spritesArray2 = [imgCoin1, imgCoin2, imgCoin3, imgCoin4, imgCoin5];
  //   for (aSprite of spritesArray2) {
  //       aSprite.width = floor(width / 5);
  //       aSprite.height = floor(height / 1);
  //   }

  spritesArray2.forEach(function (aSprite) {
    aSprite.width = floor(width / 5);
    aSprite.height = aSprite.width * 0.2857142857142857;//floor(height / 1);
  });

  // console.log(imgFullHeart.width)
  // console.log(imgFullHeart.height)

  imgFullHeart.width = floor(width / 42);
  imgFullHeart.height = imgFullHeart.width * 0.8908450704225352;//floor(height / 1);

  imgEmptyHeart.width = floor(width / 42);
  imgEmptyHeart.height = imgEmptyHeart.width * 0.8908450704225352;//floor(height / 1);

  imgRobot.width = floor(width / 18);
  imgRobot.height = imgRobot.width;

  imgDrone.width = floor(width / 7);
  imgDrone.height = imgDrone.width;//floor(height / 1);

  imgVacuum.width = floor(width / 8);
  imgVacuum.height = imgVacuum.width;//floor(height / 1);

  var spritesArray3 = [imgLeftArrow, imgRightArrow, imgUpArrow];
  //   for (aSprite of spritesArray3) {
  //       aSprite.width = floor(width / 8);
  //       aSprite.height = floor(height / 1);
  //   }

  spritesArray3.forEach(function (aSprite) {
    aSprite.width = floor(width / 8);
    aSprite.height = aSprite.width;//floor(height / 1);
  });

}

function getComputedCSSvalues() {

  var element1 = document.querySelector('.navbar');
  var style1 = getComputedStyle(element1);
  var navBarHeight = style1.height;

  var height1 = navBarHeight;
  height1 = height1.substring(0, height1.length - 2);

  var element2 = document.querySelector('body');
  var style2 = getComputedStyle(element2);
  var bodyBottomMargin = style2.marginBottom;

  var height2 = bodyBottomMargin;
  height2 = height2.substring(0, height2.length - 2);

  var element3 = document.querySelector('body');
  var style3 = getComputedStyle(element3);
  var bodyTopMargin = style3.marginTop;

  var height3 = bodyTopMargin;
  height3 = height3.substring(0, height3.length - 2);

  return Number(height1) + Number(height2) + Number(height3);
}