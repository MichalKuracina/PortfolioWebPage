function collectablesObject(width, height, firstFrame1, frameCounter1, coinsCount, firstHit1, firstFrame2, frameCounter2, firstHit2, firstFrame3, frameCounter3, firstHit3, firstFrame4, frameCounter4, firstHit4, firstFrame5, frameCounter5, firstHit5, firstFrame6, frameCounter6, firstHit6, firstFrame7, frameCounter7, firstHit7, coinDelay1, coinDelay2, coinDelay3, coinDelay4, coinDelay5, coinDelay6, coinDelay7) {
      this.width = width;
    this.height = height;
    this.coinsCount = coinsCount;

    this.hit1 = false;
    this.firstFrame1 = firstFrame1;
    this.frameCounter1 = frameCounter1;
    this.firstHit1 = firstHit1;
    this.coinDelay1 = coinDelay1;

    this.hit2 = false;
    this.firstFrame2 = firstFrame2;
    this.frameCounter2 = frameCounter2;
    this.firstHit2 = firstHit2;
    this.coinDelay2 = coinDelay2;

    this.hit3 = false;
    this.firstFrame3 = firstFrame3;
    this.frameCounter3 = frameCounter3;
    this.firstHit3 = firstHit3;
    this.coinDelay3 = coinDelay3;

    this.hit4 = false;
    this.firstFrame4 = firstFrame4;
    this.frameCounter4 = frameCounter4;
    this.firstHit4 = firstHit4;
    this.coinDelay4 = coinDelay4;

    this.hit5 = false;
    this.firstFrame5 = firstFrame5;
    this.frameCounter5 = frameCounter5;
    this.firstHit5 = firstHit5;
    this.coinDelay5 = coinDelay5;

    this.hit6 = false;
    this.firstFrame6 = firstFrame6;
    this.frameCounter6 = frameCounter6;
    this.firstHit6 = firstHit6;
    this.coinDelay6 = coinDelay6;

    this.hit7 = false;
    this.firstFrame7 = firstFrame7;
    this.frameCounter7 = frameCounter7;
    this.firstHit7 = firstHit7;
    this.coinDelay7 = coinDelay7;
}

// class collectablesObject {
//   constructor(width, height, firstFrame1, frameCounter1, coinsCount, firstHit1, firstFrame2, frameCounter2, firstHit2, firstFrame3, frameCounter3, firstHit3, firstFrame4, frameCounter4, firstHit4, firstFrame5, frameCounter5, firstHit5, firstFrame6, frameCounter6, firstHit6, firstFrame7, frameCounter7, firstHit7, coinDelay1, coinDelay2, coinDelay3, coinDelay4, coinDelay5, coinDelay6, coinDelay7) {
//     this.width = width;
//     this.height = height;
//     this.coinsCount = coinsCount;

//     this.hit1 = false;
//     this.firstFrame1 = firstFrame1;
//     this.frameCounter1 = frameCounter1;
//     this.firstHit1 = firstHit1;
//     this.coinDelay1 = coinDelay1;

//     this.hit2 = false;
//     this.firstFrame2 = firstFrame2;
//     this.frameCounter2 = frameCounter2;
//     this.firstHit2 = firstHit2;
//     this.coinDelay2 = coinDelay2;

//     this.hit3 = false;
//     this.firstFrame3 = firstFrame3;
//     this.frameCounter3 = frameCounter3;
//     this.firstHit3 = firstHit3;
//     this.coinDelay3 = coinDelay3;

//     this.hit4 = false;
//     this.firstFrame4 = firstFrame4;
//     this.frameCounter4 = frameCounter4;
//     this.firstHit4 = firstHit4;
//     this.coinDelay4 = coinDelay4;

//     this.hit5 = false;
//     this.firstFrame5 = firstFrame5;
//     this.frameCounter5 = frameCounter5;
//     this.firstHit5 = firstHit5;
//     this.coinDelay5 = coinDelay5;

//     this.hit6 = false;
//     this.firstFrame6 = firstFrame6;
//     this.frameCounter6 = frameCounter6;
//     this.firstHit6 = firstHit6;
//     this.coinDelay6 = coinDelay6;

//     this.hit7 = false;
//     this.firstFrame7 = firstFrame7;
//     this.frameCounter7 = frameCounter7;
//     this.firstHit7 = firstHit7;
//     this.coinDelay7 = coinDelay7;
//   }

collectablesObject.prototype.show = function(obj) { //show(obj) {

  

    var coinWidth = imgCoin1.width / 7.5;
    var coinHeigth = imgCoin1.height / 20;

    //Coin no.1 - couch
    //fill('#f44242');
    noStroke();
    var coinPositionX1 = this.width / 5;
    var coinPositionY1 = this.height / 1.4;

    rect(coinPositionX1, coinPositionY1, coinWidth, coinHeigth);

    this.hit1 = collideRectRect(coinPositionX1, coinPositionY1, coinWidth, coinHeigth, obj.x, obj.y, obj.width, obj.height);

    if (this.hit1 === true) {
      hideAcoin1();
      this.firstFrame1 = false;
      if (this.firstHit1 === false) {
        this.coinsCount += 1;
        this.firstHit1 = true;
      }
    } else {
      if (this.firstFrame1 === false) {
        this.frameCounter1 = frameCount;
        this.firstFrame1 = true;
      }
      if (frameCount === 1) {
        castAcoin1();
      } else if (frameCount === this.frameCounter1 + this.coinDelay1) {
        castAcoin1();
        this.firstHit1 = false;
      }
    }

    function hideAcoin1() {
      spriteCoin1.changeAnimation('noanimation');
      spriteCoin1.position.x = coinPositionX1 + imgCoin1.width / 5 / 3;
      spriteCoin1.position.y = coinPositionY1 + imgCoin1.height / 2 - imgCoin1.height / 40;
    }

    function castAcoin1() {
      spriteCoin1.changeAnimation('rotation');
      spriteCoin1.position.x = coinPositionX1 + imgCoin1.width / 5 / 3;
      spriteCoin1.position.y = coinPositionY1 + imgCoin1.height / 2 - imgCoin1.height / 40;
    }

    //Coin no.2 - shelf
    //fill('#f44242');
    noStroke();
    var coinPositionX2 = this.width / 4;
    var coinPositionY2 = this.height / 2.25;

    rect(coinPositionX2, coinPositionY2, coinWidth, coinHeigth);

    this.hit2 = collideRectRect(coinPositionX2, coinPositionY2, coinWidth, coinHeigth, obj.x, obj.y, obj.width, obj.height);

    if (this.hit2 === true) {
      hideAcoin2();
      this.firstFrame2 = false;
      if (this.firstHit2 === false) {
        this.coinsCount += 1;
        this.firstHit2 = true;
      }
    } else {
      if (this.firstFrame2 === false) {
        this.frameCounter2 = frameCount;
        this.firstFrame2 = true;
      }
      if (frameCount === 1) {
        castAcoin2();
      } else if (frameCount === this.frameCounter2 + this.coinDelay2) {
        castAcoin2();
        this.firstHit2 = false;
      }
    }

    function hideAcoin2() {
      spriteCoin2.changeAnimation('noanimation');
      spriteCoin2.position.x = coinPositionX2 + imgCoin1.width / 5 / 3;
      spriteCoin2.position.y = coinPositionY2 + imgCoin1.height / 2 - imgCoin1.height / 40;
    }

    function castAcoin2() {
      spriteCoin2.changeAnimation('rotation');
      spriteCoin2.position.x = coinPositionX2 + imgCoin1.width / 5 / 3;
      spriteCoin2.position.y = coinPositionY2 + imgCoin1.height / 2 - imgCoin1.height / 40;
    }

    //Coin no.3 - lamp
    //fill('#f44242');
    noStroke();
    var coinPositionX3 = this.width / 3.3;
    var coinPositionY3 = this.height / 4.3;

    rect(coinPositionX3, coinPositionY3, coinWidth, coinHeigth);

    this.hit3 = collideRectRect(coinPositionX3, coinPositionY3, coinWidth, coinHeigth, obj.x, obj.y, obj.width, obj.height);

    if (this.hit3 === true) {
      hideAcoin3();
      this.firstFrame3 = false;
      if (this.firstHit3 === false) {
        this.coinsCount += 1;
        this.firstHit3 = true;
      }
    } else {
      if (this.firstFrame3 === false) {
        this.frameCounter3 = frameCount;
        this.firstFrame3 = true;
      }
      if (frameCount === 1) {
        castAcoin3();
      } else if (frameCount === this.frameCounter3 + this.coinDelay3) {
        castAcoin3();
        this.firstHit3 = false;
      }
    }

    function hideAcoin3() {
      spriteCoin3.changeAnimation('noanimation');
      spriteCoin3.position.x = coinPositionX3 + imgCoin1.width / 5 / 3;
      spriteCoin3.position.y = coinPositionY3 + imgCoin1.height / 2 - imgCoin1.height / 40;
    }

    function castAcoin3() {
      spriteCoin3.changeAnimation('rotation');
      spriteCoin3.position.x = coinPositionX3 + imgCoin1.width / 5 / 3;
      spriteCoin3.position.y = coinPositionY3 + imgCoin1.height / 2 - imgCoin1.height / 40;
    }

    //Coin no.4 - picture
    //fill('#f44242');
    noStroke();
    var coinPositionX4 = this.width / 1.9;
    var coinPositionY4 = this.height / 2.75;

    rect(coinPositionX4, coinPositionY4, coinWidth, coinHeigth);

    this.hit4 = collideRectRect(coinPositionX4, coinPositionY4, coinWidth, coinHeigth, obj.x, obj.y, obj.width, obj.height);

    if (this.hit4 === true) {
      hideAcoin4();
      this.firstFrame4 = false;
      if (this.firstHit4 === false) {
        this.coinsCount += 1;
        this.firstHit4 = true;
      }
    } else {
      if (this.firstFrame4 === false) {
        this.frameCounter4 = frameCount;
        this.firstFrame4 = true;
      }
      if (frameCount === 1) {
        castAcoin4();
      } else if (frameCount === this.frameCounter4 + this.coinDelay4) {
        castAcoin4();
        this.firstHit4 = false;
      }
    }

    function hideAcoin4() {
      spriteCoin4.changeAnimation('noanimation');
      spriteCoin4.position.x = coinPositionX4 + imgCoin1.width / 5 / 3;
      spriteCoin4.position.y = coinPositionY4 + imgCoin1.height / 2 - imgCoin1.height / 40;
    }

    function castAcoin4() {
      spriteCoin4.changeAnimation('rotation');
      spriteCoin4.position.x = coinPositionX4 + imgCoin1.width / 5 / 3;
      spriteCoin4.position.y = coinPositionY4 + imgCoin1.height / 2 - imgCoin1.height / 40;
    }

    //Coin no.5 - bookshelf top
    //fill('#f44242');
    noStroke();
    var coinPositionX5 = this.width / 1.2;
    var coinPositionY5 = this.height / 2.5;

    rect(coinPositionX5, coinPositionY5, coinWidth, coinHeigth);

    this.hit5 = collideRectRect(coinPositionX5, coinPositionY5, coinWidth, coinHeigth, obj.x, obj.y, obj.width, obj.height);

    if (this.hit5 === true) {
      hideAcoin5();
      this.firstFrame5 = false;
      if (this.firstHit5 === false) {
        this.coinsCount += 1;
        this.firstHit5 = true;
      }
    } else {
      if (this.firstFrame5 === false) {
        this.frameCounter5 = frameCount;
        this.firstFrame5 = true;
      }
      if (frameCount === 1) {
        castAcoin5();
      } else if (frameCount === this.frameCounter5 + this.coinDelay5) {
        castAcoin5();
        this.firstHit5 = false;
      }
    }

    function hideAcoin5() {
      spriteCoin5.changeAnimation('noanimation');
      spriteCoin5.position.x = coinPositionX5 + imgCoin1.width / 5 / 3;
      spriteCoin5.position.y = coinPositionY5 + imgCoin1.height / 2 - imgCoin1.height / 40;
    }

    function castAcoin5() {
      spriteCoin5.changeAnimation('rotation');
      spriteCoin5.position.x = coinPositionX5 + imgCoin1.width / 5 / 3;
      spriteCoin5.position.y = coinPositionY5 + imgCoin1.height / 2 - imgCoin1.height / 40;
    }

    //Coin no.6 - bookshelf middle
    //fill('#f44242');
    noStroke();
    var coinPositionX6 = this.width / 1.3;
    var coinPositionY6 = this.height / 1.65;

    rect(coinPositionX6, coinPositionY6, coinWidth, coinHeigth);

    this.hit6 = collideRectRect(coinPositionX6, coinPositionY6, coinWidth, coinHeigth, obj.x, obj.y, obj.width, obj.height);

    if (this.hit6 === true) {
      hideAcoin6();
      this.firstFrame6 = false;
      if (this.firstHit6 === false) {
        this.coinsCount += 1;
        this.firstHit6 = true;
      }
    } else {
      if (this.firstFrame6 === false) {
        this.frameCounter6 = frameCount;
        this.firstFrame6 = true;
      }
      if (frameCount === 1) {
        castAcoin6();
      } else if (frameCount === this.frameCounter6 + this.coinDelay6) {
        castAcoin6();
        this.firstHit6 = false;
      }
    }

    function hideAcoin6() {
      spriteCoin6.changeAnimation('noanimation');
      spriteCoin6.position.x = coinPositionX6 + imgCoin1.width / 5 / 3;
      spriteCoin6.position.y = coinPositionY6 + imgCoin1.height / 2 - imgCoin1.height / 40;
    }

    function castAcoin6() {
      spriteCoin6.changeAnimation('rotation');
      spriteCoin6.position.x = coinPositionX6 + imgCoin1.width / 5 / 3;
      spriteCoin6.position.y = coinPositionY6 + imgCoin1.height / 2 - imgCoin1.height / 40;
    }

    //Coin no.7
    //fill('#f44242');
    noStroke();
    var coinPositionX7 = this.width / 1.2;
    var coinPositionY7 = this.height / 1.2;

    rect(coinPositionX7, coinPositionY7, coinWidth, coinHeigth);

    this.hit7 = collideRectRect(coinPositionX7, coinPositionY7, coinWidth, coinHeigth, obj.x, obj.y, obj.width, obj.height);

    if (this.hit7 === true) {
      hideAcoin7();
      this.firstFrame7 = false;
      if (this.firstHit7 === false) {
        this.coinsCount += 1;
        this.firstHit7 = true;
      }
    } else {
      if (this.firstFrame7 === false) {
        this.frameCounter7 = frameCount;
        this.firstFrame7 = true;
      }
      if (frameCount === 1) {
        castAcoin7();
      } else if (frameCount === this.frameCounter7 + this.coinDelay7) {
        castAcoin7();
        this.firstHit7 = false;
      }
    }

    function hideAcoin7() {
      spriteCoin7.changeAnimation('noanimation');
      spriteCoin7.position.x = coinPositionX7 + imgCoin1.width / 5 / 3;
      spriteCoin7.position.y = coinPositionY7 + imgCoin1.height / 2 - imgCoin1.height / 40;
    }

    function castAcoin7() {
      spriteCoin7.changeAnimation('rotation');
      spriteCoin7.position.x = coinPositionX7 + imgCoin1.width / 5 / 3;
      spriteCoin7.position.y = coinPositionY7 + imgCoin1.height / 2 - imgCoin1.height / 40;
    }
  }
