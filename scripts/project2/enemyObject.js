function enemyObject(enemyStartingX, enemyStartingY, enemyFirstHit, enemyBlinkTrigger, enemyCatLives, enemyDirection) {
    this.enemyStartingX = enemyStartingX;
    this.enemyStartingY = enemyStartingY;
    this.hit = false;
    this.enemyFirstHit = enemyFirstHit;
    this.enemyBlinkTrigger = enemyBlinkTrigger;
    this.enemyCatLives = enemyCatLives;
    this.enemyDirection = enemyDirection;
}

// class enemyObject {
//   constructor(enemyStartingX, enemyStartingY, enemyFirstHit, enemyBlinkTrigger, enemyCatLives, enemyDirection) {
//     this.enemyStartingX = enemyStartingX;
//     this.enemyStartingY = enemyStartingY;
//     this.hit = false;
//     this.enemyFirstHit = enemyFirstHit;
//     this.enemyBlinkTrigger = enemyBlinkTrigger;
//     this.enemyCatLives = enemyCatLives;
//     this.enemyDirection = enemyDirection;
//   }

enemyObject.prototype.move = function(){ //move() {
  
    var enemyWidth = width / 15;
    var enemyHeight = height / 30;

    if (this.enemyDirection === "left") {
      this.enemyStartingX -= width / 1000;
      if (this.enemyStartingX < width / 30) {
        this.enemyDirection = "right";
      }
    }

    if (this.enemyDirection === "right") {
      this.enemyStartingX += width / 1000;
      if (this.enemyStartingX + enemyWidth > width - width / 30) {
        this.enemyDirection = "left";
      }
    }
  }

enemyObject.prototype.show = function(obj){ // show(obj) {

 

    var enemyWidth = width / 15;
    var enemyHeight = height / 30;

    noStroke();
    image(imgVacuum, this.enemyStartingX - width / 35, this.enemyStartingY - height / 10.55);
    this.hit = collideRectRect(this.enemyStartingX, this.enemyStartingY, enemyWidth, enemyHeight, obj.x, obj.y, obj.width, obj.height);

    if (this.hit === true) {
      if (this.enemyFirstHit === false) {
        this.frameCounter1 = frameCount + 10;
        this.frameCounter2 = frameCount + 20;
        this.frameCounter3 = frameCount + 30;
        this.frameCounter4 = frameCount + 40;
        this.frameCounter5 = frameCount + 50;
        this.frameCounter6 = frameCount + 60;
        this.frameCounter7 = frameCount + 70;
        this.frameCounter8 = frameCount + 80;
        this.enemyFirstHit = true;
        this.enemyBlinkTrigger = true;
        this.enemyCatLives = -1;

        if (enemies.length < 3) {
          if (this.enemyDirection === "left") {
            enemies.push(new enemyObject(obj.x, enemyStartingY, true, enemyBlinkTrigger, enemyCatLives, "right"));
          } else {
            enemies.push(new enemyObject(obj.x, enemyStartingY, true, enemyBlinkTrigger, enemyCatLives, "left"));
          }
        }
      } else {
        this.enemyCatLives = 0;
      }
    } else {
      this.enemyFirstHit = false;
    }
  }
