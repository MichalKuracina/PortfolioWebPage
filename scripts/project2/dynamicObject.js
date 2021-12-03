function catObject(img, x, y, width, height, isJumpingUp, isJumpingDown, initialJumpPosition) {
    this.img = img;
    this.x = x; // x position
    this.y = y; // y position
    this.width = width; //imgCatStanding.width
    this.height = height; //imgCatStanding.height
    this.isJumpingUp = isJumpingUp;
    this.isJumpingDown = isJumpingDown;
    this.initialJumpPosition = initialJumpPosition;
}

// class catObject {
//   constructor(img, x, y, width, height, isJumpingUp, isJumpingDown, initialJumpPosition) {
//     this.img = img;
//     this.x = x; // x position
//     this.y = y; // y position
//     this.width = width; //imgCatStanding.width
//     this.height = height; //imgCatStanding.height
//     this.isJumpingUp = isJumpingUp;
//     this.isJumpingDown = isJumpingDown;
//     this.initialJumpPosition = initialJumpPosition;
//   }

catObject.prototype.updatePosition = function(moveX, moveY, isStandingOnSomething, collisionWith) { //updatePosition(moveX, moveY, isStandingOnSomething, collisionWith) {


  
    //console.log(collisionWith);
    if ((isStandingOnSomething === false && this.isJumpingUp === false && this.isJumpingDown === false && (collisionWith === "nothing_" || collisionWith === "nothing_aboveShelf_" || collisionWith === "nothing_leftLeftwall_" || collisionWith === "nothing_rightRightwall_" || collisionWith === "nothing_rightShelf_aboveShelf_" || collisionWith === "nothing_rightShelf_aboveShelf_bottomShelf_" || collisionWith === "nothing_rightShelf_bottomShelf_" || collisionWith === "nothing_leftShelf_aboveShelf_" || collisionWith === "nothing_leftShelf_aboveShelf_bottomShelf_" || collisionWith === "nothing_leftShelf_bottomShelf_" || collisionWith === "aboveCeiling_"))) {
      this.y += this.height / 8;
      spriteCat.changeAnimation('jump');
      spriteCat.position.y = this.y + this.height / 2;
      //console.log("1");

    } else if (isStandingOnSomething === true && this.isJumpingUp === false && this.isJumpingDown === false && moveY !== "up" && (collisionWith === "bottomFloor_" || collisionWith === "nothing_bottomShelf_" || collisionWith === "bottomFloor_leftLeftwall_" || collisionWith === "bottomFloor_rightRightwall_" || collisionWith === "nothing_rightShelf_bottomShelf_" || collisionWith === "nothing_leftShelf_bottomShelf_")) {
      this.y = this.y;
      spriteCat.changeAnimation('stand');
      spriteCat.position.y = this.y + this.height / 2;
      //console.log("2");

    } else if (isStandingOnSomething === true && this.isJumpingUp === false && this.isJumpingDown === false && moveY === "up" && (collisionWith === "bottomFloor_" || collisionWith === "nothing_bottomShelf_" || collisionWith === "bottomFloor_leftLeftwall_" || collisionWith === "bottomFloor_rightRightwall_" || collisionWith === "nothing_rightShelf_bottomShelf_" || collisionWith === "nothing_leftShelf_bottomShelf_")) {
      this.isJumpingUp = true;
      this.initialJumpPosition = this.y;
      this.y -= this.height / 8;
      //console.log("3");

    } else if (isStandingOnSomething === false && this.isJumpingUp === true && this.isJumpingDown === false && this.y > this.initialJumpPosition - height / 5 && collisionWith !== "nothing_aboveShelf_" && collisionWith !== "nothing_rightShelf_aboveShelf_" && collisionWith !== "nothing_leftShelf_aboveShelf_" && collisionWith !== "aboveCeiling_") {
      if (collisionWith !== "nothing_aboveShelf_" || collisionWith !== "nothing_rightShelf_aboveShelf_" || collisionWith !== "nothing_leftShelf_aboveShelf_") {
        this.y -= this.height / 8;
        spriteCat.changeAnimation('jump');
        spriteCat.position.y = this.y + this.height / 2;
        //console.log("4");
      }

    } else if (isStandingOnSomething === false && this.isJumpingUp === true && this.isJumpingDown === false) {
      if (collisionWith === "aboveCeiling_" || collisionWith === "nothing_leftShelf_bottomShelf_" || collisionWith === "nothing_leftShelf_aboveShelf_" || collisionWith === "nothing_rightShelf_aboveShelf_" || collisionWith === "nothing_aboveShelf_" || this.y <= this.initialJumpPosition - height / 5) {
        this.isJumpingUp = false;
        this.isJumpingDown = false;
        this.y = this.y;
        spriteCat.changeAnimation('jump');
        spriteCat.position.y = this.y + this.height / 2;
        //console.log("5");
      }

    } else if (isStandingOnSomething === false && this.isJumpingUp === false && this.isJumpingDown === true) {

      this.y += this.height / 8;
      spriteCat.changeAnimation('jump');
      spriteCat.position.y = this.y + this.height / 2;
      //console.log("6");

    } else {
      isStandingOnSomething = false;
      this.isJumpingUp = false;
      this.isJumpingDown = false;
      //console.log("else")
    }



    if (moveX === "left") {
      if (collisionWith === "bottomFloor_leftLeftwall_" || collisionWith === "nothing_leftLeftwall_") {
        spriteCat.changeAnimation('stand');
        spriteCat.mirrorX(1);
        this.x = this.x;
        if (moveX === "left" && collisionWith === "nothing_leftLeftwall_") {
          spriteCat.changeAnimation('jump');
          spriteCat.mirrorX(1);
        }
      } else {
        this.x -= this.width / 15;
        if (this.isJumpingUp === false && this.isJumpingDown === false && isStandingOnSomething === true) {
          spriteCat.changeAnimation('run');
          spriteCat.mirrorX(1);
          spriteCat.position.x = this.x + this.width / 2;
        } else if (this.isJumpingUp === false && this.isJumpingDown === false && isStandingOnSomething === false) {
          spriteCat.changeAnimation('jump');
          spriteCat.mirrorX(1);
          spriteCat.position.x = this.x + this.width / 2;
        } else {
          spriteCat.changeAnimation('jump');
          spriteCat.mirrorX(1);
          spriteCat.position.x = this.x + this.width / 2;
        }
      }
    } else if (moveX === "right") {

      if (collisionWith === "bottomFloor_rightRightwall_" || collisionWith === "nothing_rightRightwall_") {
        spriteCat.changeAnimation('stand');
        spriteCat.mirrorX(-1);
        this.x = this.x;
        if (moveX === "right" && collisionWith === "nothing_rightRightwall_") {
          spriteCat.changeAnimation('jump');
          spriteCat.mirrorX(-1);
        }
      } else {
        this.x += this.width / 15;
        if (this.isJumpingUp === false && this.isJumpingDown === false && isStandingOnSomething === true) {
          spriteCat.changeAnimation('run');
          spriteCat.mirrorX(-1);
          spriteCat.position.x = this.x + this.width / 2;
        } else if (this.isJumpingUp === false && this.isJumpingDown === false && isStandingOnSomething === false) {
          spriteCat.changeAnimation('jump');
          spriteCat.mirrorX(-1);
          spriteCat.position.x = this.x + this.width / 2;
        } else {
          spriteCat.changeAnimation('jump');
          spriteCat.mirrorX(-1);
          spriteCat.position.x = this.x + this.width / 2;
        }
      }
    }
  }

catObject.prototype.show = function() { //show() {
    
  
    image(this.img, this.x, this.y, this.width, this.height);
  
}