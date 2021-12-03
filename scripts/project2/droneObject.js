function droneObject(droneStartingX, droneStartingY, droneFirstHit, droneBlinkTrigger, droneCatLives){
    this.droneStartingX = droneStartingX;
    this.droneStartingY = droneStartingY;
    this.hit = false;
    this.droneFirstHit = droneFirstHit;
    this.droneBlinkTrigger = droneBlinkTrigger;
    this.droneCatLives = droneCatLives;
    this.radians = 0;
    this.velocity = 0.02;
}
  
// class droneObject {

//   constructor(droneStartingX, droneStartingY, droneFirstHit, droneBlinkTrigger, droneCatLives) {

//     this.droneStartingX = droneStartingX;
//     this.droneStartingY = droneStartingY;
//     this.hit = false;
//     this.droneFirstHit = droneFirstHit;
//     this.droneBlinkTrigger = droneBlinkTrigger;
//     this.droneCatLives = droneCatLives;
//     this.radians = 0;
//     this.velocity = 0.02;
//   }

droneObject.prototype.move = function(){ //  move() {

    this.radians += this.velocity;
    this.droneStartingX = droneStartingX + Math.cos(this.radians) * width / 5;
    //this.droneStartingX += random(-1, 1);
    this.droneStartingY = droneStartingY + Math.sin(this.radians) * height / 8;
    this.droneStartingY += random(-1, 1);
  }

droneObject.prototype.show = function(obj){ //  show(obj) {

  
    var droneWidth = width / 12;
    var droneHeight = height / 24;
    noStroke();

    image(imgDrone, this.droneStartingX - width / 35, this.droneStartingY - height / 15);

    this.hit = collideRectRect(this.droneStartingX, this.droneStartingY, droneWidth, droneHeight, obj.x, obj.y, obj.width, obj.height);

    if (this.hit === true) {
      if (this.droneFirstHit === false) {
        this.frameCounter1 = frameCount + 10;
        this.frameCounter2 = frameCount + 20;
        this.frameCounter3 = frameCount + 30;
        this.frameCounter4 = frameCount + 40;
        this.frameCounter5 = frameCount + 50;
        this.frameCounter6 = frameCount + 60;
        this.frameCounter7 = frameCount + 70;
        this.frameCounter8 = frameCount + 80;
        this.droneFirstHit = true;
        this.droneBlinkTrigger = true;
        this.droneCatLives = -1;
      } else {
        this.droneCatLives = 0;
      }

    } else {
      this.droneFirstHit = false;
    }



  }
