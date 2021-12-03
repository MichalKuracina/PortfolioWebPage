function bulletObject(bulletStartingX, bulletStartingY, bulletFirstHit, bulletBlinkTrigger, bulletCatLives) {
    this.bulletStartingX = bulletStartingX;
    this.bulletStartingY = bulletStartingY;
    this.hit = false;
    this.bulletFirstHit = bulletFirstHit;
    this.bulletBlinkTrigger = bulletBlinkTrigger;
    this.bulletCatLives = bulletCatLives;
}

// class bulletObject {

//   constructor(bulletStartingX, bulletStartingY, bulletFirstHit, bulletBlinkTrigger, bulletCatLives) {

//     this.bulletStartingX = bulletStartingX;
//     this.bulletStartingY = bulletStartingY;
//     this.hit = false;
//     this.bulletFirstHit = bulletFirstHit;
//     this.bulletBlinkTrigger = bulletBlinkTrigger;
//     this.bulletCatLives = bulletCatLives;
//   }

bulletObject.prototype.move = function(){ //  move() {

    this.bulletStartingX -= 5;
  }

bulletObject.prototype.show = function(obj){ //    show(obj) {

    var bulletWidth = width / 15;
    var bulletHeight = width / 200;
    noStroke();
    fill('#ffe900');
    rect(this.bulletStartingX, this.bulletStartingY, bulletWidth, bulletHeight);

    this.hit = collideRectRect(this.bulletStartingX, this.bulletStartingY, bulletWidth, bulletHeight, obj.x, obj.y, obj.width, obj.height);

    if (this.hit === true) {
      if (this.bulletFirstHit === false) {
        this.frameCounter1 = frameCount + 10;
        this.frameCounter2 = frameCount + 20;
        this.frameCounter3 = frameCount + 30;
        this.frameCounter4 = frameCount + 40;
        this.frameCounter5 = frameCount + 50;
        this.frameCounter6 = frameCount + 60;
        this.frameCounter7 = frameCount + 70;
        this.frameCounter8 = frameCount + 80;
        this.bulletFirstHit = true;
        this.bulletBlinkTrigger = true;
        this.bulletCatLives = -1;
      } else {
        this.bulletCatLives = 0;
      }

    } else {
      this.bulletFirstHit = false;
    }
  }
