function staticObject(width, height, catLives) {
  this.width = width;
  this.height = height;
  this.hit = false;
  this.collisionWith = "nothing_";
  this.catLives = catLives;
}

staticObject.prototype.show = function () {

  //floor
  fill('#66442c');
  noStroke();
  rect(0, this.height - (this.height / 10), this.width, this.height / 10);

  //leftwall
  fill('#473125');
  noStroke();
  rect(0, 0, this.width / 30, this.height - (this.height / 10));

  //rightwall
  fill('#473125');
  noStroke();
  rect(this.width - this.width / 30, 0, this.width / 30, this.height - (this.height / 10));

  //ceiling
  fill('#473125');
  noStroke();
  rect(0, 0, this.width, this.height / 30);

  //TV
  noTint();
  image(imgTV, this.width / 2, this.height - this.height / 4.15);

  //Couch
  noTint();
  image(imgCouch, this.width / 10.3, this.height / 1.52);

  //Bookshelf
  image(imgBookshelf, this.width - this.width / 3.35, this.height / 2.19);

  //Painting
  image(imgPainting, this.width / 2, this.height / 2.5);

  //Lamp
  image(imgLamp, this.width / 3.5, this.height / 30);

  //Robot
  image(imgRobot, this.width / 1.25, this.height / 2.15);

  if (catLives === 7) {
    //Heart 1
    image(imgFullHeart, this.width / 7.5, this.height / 12);
    //Heart 2
    image(imgFullHeart, this.width / 6.2, this.height / 12);
    //Heart 3
    image(imgFullHeart, this.width / 5.25, this.height / 12);
    //Heart 4
    image(imgFullHeart, this.width / 4.55, this.height / 12);
    //Heart 5
    image(imgFullHeart, this.width / 4, this.height / 12);
    //Heart 6
    image(imgFullHeart, this.width / 3.55, this.height / 12);
    //Heart 7
    image(imgFullHeart, this.width / 3.2, this.height / 12);
  } else if (catLives === 6) {
    image(imgFullHeart, this.width / 7.5, this.height / 12);
    //Heart 2
    image(imgFullHeart, this.width / 6.2, this.height / 12);
    //Heart 3
    image(imgFullHeart, this.width / 5.25, this.height / 12);
    //Heart 4
    image(imgFullHeart, this.width / 4.55, this.height / 12);
    //Heart 5
    image(imgFullHeart, this.width / 4, this.height / 12);
    //Heart 6
    image(imgFullHeart, this.width / 3.55, this.height / 12);
    //Heart 7
    image(imgEmptyHeart, this.width / 3.2, this.height / 12);
  } else if (catLives === 5) {
    image(imgFullHeart, this.width / 7.5, this.height / 12);
    //Heart 2
    image(imgFullHeart, this.width / 6.2, this.height / 12);
    //Heart 3
    image(imgFullHeart, this.width / 5.25, this.height / 12);
    //Heart 4
    image(imgFullHeart, this.width / 4.55, this.height / 12);
    //Heart 5
    image(imgFullHeart, this.width / 4, this.height / 12);
    //Heart 6
    image(imgEmptyHeart, this.width / 3.55, this.height / 12);
    //Heart 7
    image(imgEmptyHeart, this.width / 3.2, this.height / 12);
  } else if (catLives === 4) {
    image(imgFullHeart, this.width / 7.5, this.height / 12);
    //Heart 2
    image(imgFullHeart, this.width / 6.2, this.height / 12);
    //Heart 3
    image(imgFullHeart, this.width / 5.25, this.height / 12);
    //Heart 4
    image(imgFullHeart, this.width / 4.55, this.height / 12);
    //Heart 5
    image(imgEmptyHeart, this.width / 4, this.height / 12);
    //Heart 6
    image(imgEmptyHeart, this.width / 3.55, this.height / 12);
    //Heart 7
    image(imgEmptyHeart, this.width / 3.2, this.height / 12);
  } else if (catLives === 3) {
    image(imgFullHeart, this.width / 7.5, this.height / 12);
    //Heart 2
    image(imgFullHeart, this.width / 6.2, this.height / 12);
    //Heart 3
    image(imgFullHeart, this.width / 5.25, this.height / 12);
    //Heart 4
    image(imgEmptyHeart, this.width / 4.55, this.height / 12);
    //Heart 5
    image(imgEmptyHeart, this.width / 4, this.height / 12);
    //Heart 6
    image(imgEmptyHeart, this.width / 3.55, this.height / 12);
    //Heart 7
    image(imgEmptyHeart, this.width / 3.2, this.height / 12);
  } else if (catLives === 2) {
    image(imgFullHeart, this.width / 7.5, this.height / 12);
    //Heart 2
    image(imgFullHeart, this.width / 6.2, this.height / 12);
    //Heart 3
    image(imgEmptyHeart, this.width / 5.25, this.height / 12);
    //Heart 4
    image(imgEmptyHeart, this.width / 4.55, this.height / 12);
    //Heart 5
    image(imgEmptyHeart, this.width / 4, this.height / 12);
    //Heart 6
    image(imgEmptyHeart, this.width / 3.55, this.height / 12);
    //Heart 7
    image(imgEmptyHeart, this.width / 3.2, this.height / 12);
  } else if (catLives === 1) {
    image(imgFullHeart, this.width / 7.5, this.height / 12);
    //Heart 2
    image(imgEmptyHeart, this.width / 6.2, this.height / 12);
    //Heart 3
    image(imgEmptyHeart, this.width / 5.25, this.height / 12);
    //Heart 4
    image(imgEmptyHeart, this.width / 4.55, this.height / 12);
    //Heart 5
    image(imgEmptyHeart, this.width / 4, this.height / 12);
    //Heart 6
    image(imgEmptyHeart, this.width / 3.55, this.height / 12);
    //Heart 7
    image(imgEmptyHeart, this.width / 3.2, this.height / 12);
  } else {
    image(imgEmptyHeart, this.width / 7.5, this.height / 12);
    //Heart 2
    image(imgEmptyHeart, this.width / 6.2, this.height / 12);
    //Heart 3
    image(imgEmptyHeart, this.width / 5.25, this.height / 12);
    //Heart 4
    image(imgEmptyHeart, this.width / 4.55, this.height / 12);
    //Heart 5
    image(imgEmptyHeart, this.width / 4, this.height / 12);
    //Heart 6
    image(imgEmptyHeart, this.width / 3.55, this.height / 12);
    //Heart 7
    image(imgEmptyHeart, this.width / 3.2, this.height / 12);
  }

  //shelf 1 - shelf
  fill('#66442c');
  noStroke();
  var xShelf1 = this.width / 6.5;
  var yShelf1 = this.height - this.height / 2;
  var wShelf1 = this.width / 5;
  var hShelf1 = this.height / 60;
  rect(xShelf1, yShelf1, wShelf1, hShelf1);

  //shelf 2 - painting
  noFill();
  noStroke();
  var xShelf2 = this.width / 2;
  var yShelf2 = this.height / 2.4;
  var wShelf2 = this.width / 8.1;
  var hShelf2 = this.height / 60;
  rect(xShelf2, yShelf2, wShelf2, hShelf2);

  //shelf 3 - couch - bottom
  noFill();
  noStroke();
  var xShelf3 = this.width / 10;
  var yShelf3 = this.height - this.height / 4.5;
  var wShelf3 = this.width / 3.06;
  var hShelf3 = this.height / 60;
  rect(xShelf3, yShelf3, wShelf3, hShelf3);

  //shelf 4 - couch - top
  noFill();
  noStroke();
  var xShelf4 = this.width / 8.5;
  var yShelf4 = this.height - this.height / 2.93;
  var wShelf4 = this.width / 3.5;
  var hShelf4 = this.height / 60;
  rect(xShelf4, yShelf4, wShelf4, hShelf4);

  //shelf 5 - bookshelf - top
  noFill();
  noStroke();
  var xShelf5 = this.width / 1.36;
  var yShelf5 = this.height - this.height / 1.85;
  var wShelf5 = this.width / 5.5;
  var hShelf5 = this.height / 60;
  rect(xShelf5, yShelf5, wShelf5, hShelf5);

  //shelf 6 - bookshelf 2nd from the top
  noFill();
  noStroke();
  var xShelf6 = this.width / 1.36;
  var yShelf6 = this.height - this.height / 2.28;
  var wShelf6 = this.width / 5.5;
  var hShelf6 = this.height / 60;
  rect(xShelf6, yShelf6, wShelf6, hShelf6);

  //shelf 7 - bookshelf 3rd from the top
  noFill();
  noStroke();
  var xShelf7 = this.width / 1.36;
  var yShelf7 = this.height - this.height / 2.98;
  var wShelf7 = this.width / 5.5;
  var hShelf7 = this.height / 60;
  rect(xShelf7, yShelf7, wShelf7, hShelf7);

  //shelf 8 - bookshelf 4th from the top
  noFill();
  noStroke();
  var xShelf8 = this.width / 1.36;
  var yShelf8 = this.height - this.height / 4.3;
  var wShelf8 = this.width / 5.5;
  var hShelf8 = this.height / 60;
  rect(xShelf8, yShelf8, wShelf8, hShelf8);

  //shelf 9 - lamp
  noFill();
  noStroke();
  var xShelf9 = this.width / 3.35;
  var yShelf9 = this.height / 3.6;
  var wShelf9 = this.width / 14;
  var hShelf9 = this.height / 60;
  rect(xShelf9, yShelf9, wShelf9, hShelf9);
};

staticObject.prototype.collide = function (obj) {

  //floor
  this.hit = collideRectRect(0, this.height - (this.height / 10), this.width, this.height / 10, obj.x, obj.y, obj.width, obj.height);
  if (this.hit && obj.y + obj.height + obj.height / 1000 > this.height - (this.height / 10)) {
    this.collisionWith = "bottomFloor_";
  }
  //leftwall
  this.hit = collideRectRect(0, 0, this.width / 30, this.height - (this.height / 10), obj.x, obj.y, obj.width, obj.height);
  if (this.hit && obj.x - this.width / 1000 < this.width / 30) {
    this.collisionWith = this.collisionWith + "leftLeftwall_";
  }
  //ceiling
  this.hit = collideRectRect(0, 0, this.width, this.height / 30, obj.x, obj.y, obj.width, obj.height);
  if (this.hit && obj.y - this.height / 1000 < 0) {
    this.collisionWith = "aboveCeiling_";
  }
  //rightwall
  this.hit = collideRectRect(this.width - this.width / 30, 0, this.width / 30, this.height - (this.height / 10), obj.x, obj.y, obj.width, obj.height);
  if (this.hit && obj.x + obj.width + this.width / 1000 > this.width - this.width / 30) {
    this.collisionWith = this.collisionWith + "rightRightwall_";
  }

  //shelf1
  var xShelf1 = this.width / 6.5;
  var yShelf1 = this.height - this.height / 2;
  var wShelf1 = this.width / 5;
  var hShelf1 = this.height / 60;

  this.hit = collideRectRect(xShelf1, yShelf1, wShelf1, hShelf1, obj.x, obj.y, obj.width, obj.height);

  if (this.hit && (obj.x + obj.width + width / 1000 > xShelf1) && (obj.x < xShelf1)) {
    this.collisionWith = this.collisionWith + "rightShelf_";
  }
  if (this.hit && (obj.x - width / 1000 < xShelf1 + wShelf1) && (obj.x + obj.width > xShelf1 + wShelf1)) {
    this.collisionWith = this.collisionWith + "leftShelf_";
  }
  if (this.hit && (obj.y - obj.height / 1000 < (yShelf1 + hShelf1)) && ((obj.y + obj.height) > (yShelf1 + hShelf1))) {
    this.collisionWith = this.collisionWith + "aboveShelf_";
  }
  if (this.hit && (obj.y + obj.height + obj.height / 1000 > yShelf1) && (obj.y < yShelf1)) {
    this.collisionWith = this.collisionWith + "bottomShelf_";
  }

  //shelf2
  var xShelf2 = this.width / 2;
  var yShelf2 = this.height / 2.4;
  var wShelf2 = this.width / 8.1;
  var hShelf2 = this.height / 60;

  this.hit = collideRectRect(xShelf2, yShelf2, wShelf2, hShelf2, obj.x, obj.y, obj.width, obj.height);

  if (this.hit && (obj.x + obj.width + width / 1000 > xShelf2) && (obj.x < xShelf2)) {
    this.collisionWith = this.collisionWith + "rightShelf_";
  }
  if (this.hit && (obj.x - width / 1000 < xShelf2 + wShelf2) && (obj.x + obj.width > xShelf2 + wShelf2)) {
    this.collisionWith = this.collisionWith + "leftShelf_";
  }
  if (this.hit && (obj.y - obj.height / 1000 < (yShelf2 + hShelf2)) && ((obj.y + obj.height) > (yShelf2 + hShelf2))) {
    this.collisionWith = this.collisionWith + "aboveShelf_";
  }
  if (this.hit && (obj.y + obj.height + obj.height / 1000 > yShelf2) && (obj.y < yShelf2)) {
    this.collisionWith = this.collisionWith + "bottomShelf_";
  }

  //shelf3
  var xShelf3 = this.width / 10;
  var yShelf3 = this.height - this.height / 4.5;
  var wShelf3 = this.width / 3.06;
  var hShelf3 = this.height / 60;

  this.hit = collideRectRect(xShelf3, yShelf3, wShelf3, hShelf3, obj.x, obj.y, obj.width, obj.height);

  if (this.hit && (obj.x + obj.width + width / 1000 > xShelf3) && (obj.x < xShelf3)) {
    this.collisionWith = this.collisionWith + "rightShelf_";
  }
  if (this.hit && (obj.x - width / 1000 < xShelf3 + wShelf3) && (obj.x + obj.width > xShelf3 + wShelf3)) {
    this.collisionWith = this.collisionWith + "leftShelf_";
  }
  if (this.hit && (obj.y - obj.height / 1000 < (yShelf3 + hShelf3)) && ((obj.y + obj.height) > (yShelf3 + hShelf3))) {
    this.collisionWith = this.collisionWith + "aboveShelf_";
  }
  if (this.hit && (obj.y + obj.height + obj.height / 1000 > yShelf3) && (obj.y < yShelf3)) {
    this.collisionWith = this.collisionWith + "bottomShelf_";
  }

  //shelf4
  var xShelf4 = this.width / 8.5;
  var yShelf4 = this.height - this.height / 2.93;
  var wShelf4 = this.width / 3.5;
  var hShelf4 = this.height / 60;

  this.hit = collideRectRect(xShelf4, yShelf4, wShelf4, hShelf4, obj.x, obj.y, obj.width, obj.height);

  if (this.hit && (obj.x + obj.width + width / 1000 > xShelf4) && (obj.x < xShelf4)) {
    this.collisionWith = this.collisionWith + "rightShelf_";
  }
  if (this.hit && (obj.x - width / 1000 < xShelf4 + wShelf4) && (obj.x + obj.width > xShelf4 + wShelf4)) {
    this.collisionWith = this.collisionWith + "leftShelf_";
  }
  if (this.hit && (obj.y - obj.height / 1000 < (yShelf4 + hShelf4)) && ((obj.y + obj.height) > (yShelf4 + hShelf4))) {
    this.collisionWith = this.collisionWith + "aboveShelf_";
  }
  if (this.hit && (obj.y + obj.height + obj.height / 1000 > yShelf4) && (obj.y < yShelf4)) {
    this.collisionWith = this.collisionWith + "bottomShelf_";
  }

  //shelf5
  var xShelf5 = this.width / 1.36;
  var yShelf5 = this.height - this.height / 1.85;
  var wShelf5 = this.width / 5.5;
  var hShelf5 = this.height / 60;

  this.hit = collideRectRect(xShelf5, yShelf5, wShelf5, hShelf5, obj.x, obj.y, obj.width, obj.height);

  if (this.hit && (obj.x + obj.width + width / 1000 > xShelf5) && (obj.x < xShelf5)) {
    this.collisionWith = this.collisionWith + "rightShelf_";
  }
  if (this.hit && (obj.x - width / 1000 < xShelf5 + wShelf5) && (obj.x + obj.width > xShelf5 + wShelf5)) {
    this.collisionWith = this.collisionWith + "leftShelf_";
  }
  if (this.hit && (obj.y - obj.height / 1000 < (yShelf5 + hShelf5)) && ((obj.y + obj.height) > (yShelf5 + hShelf5))) {
    this.collisionWith = this.collisionWith + "aboveShelf_";
  }
  if (this.hit && (obj.y + obj.height + obj.height / 1000 > yShelf5) && (obj.y < yShelf5)) {
    this.collisionWith = this.collisionWith + "bottomShelf_";
  }

  //shelf6
  var xShelf6 = this.width / 1.36;
  var yShelf6 = this.height - this.height / 2.28;
  var wShelf6 = this.width / 5.5;
  var hShelf6 = this.height / 60;

  this.hit = collideRectRect(xShelf6, yShelf6, wShelf1, hShelf1, obj.x, obj.y, obj.width, obj.height);

  if (this.hit && (obj.x + obj.width + width / 1000 > xShelf6) && (obj.x < xShelf6)) {
    this.collisionWith = this.collisionWith + "rightShelf_";
  }
  if (this.hit && (obj.x - width / 1000 < xShelf6 + wShelf1) && (obj.x + obj.width > xShelf6 + wShelf1)) {
    this.collisionWith = this.collisionWith + "leftShelf_";
  }
  if (this.hit && (obj.y - obj.height / 1000 < (yShelf6 + hShelf1)) && ((obj.y + obj.height) > (yShelf6 + hShelf1))) {
    this.collisionWith = this.collisionWith + "aboveShelf_";
  }
  if (this.hit && (obj.y + obj.height + obj.height / 1000 > yShelf6) && (obj.y < yShelf6)) {
    this.collisionWith = this.collisionWith + "bottomShelf_";
  }

  //shelf7
  var xShelf7 = this.width / 1.36;
  var yShelf7 = this.height - this.height / 2.98;
  var wShelf7 = this.width / 5.5;
  var hShelf7 = this.height / 60;

  this.hit = collideRectRect(xShelf7, yShelf7, wShelf7, hShelf7, obj.x, obj.y, obj.width, obj.height);

  if (this.hit && (obj.x + obj.width + width / 1000 > xShelf7) && (obj.x < xShelf7)) {
    this.collisionWith = this.collisionWith + "rightShelf_";
  }
  if (this.hit && (obj.x - width / 1000 < xShelf7 + wShelf7) && (obj.x + obj.width > xShelf7 + wShelf7)) {
    this.collisionWith = this.collisionWith + "leftShelf_";
  }
  if (this.hit && (obj.y - obj.height / 1000 < (yShelf7 + hShelf7)) && ((obj.y + obj.height) > (yShelf7 + hShelf7))) {
    this.collisionWith = this.collisionWith + "aboveShelf_";
  }
  if (this.hit && (obj.y + obj.height + obj.height / 1000 > yShelf7) && (obj.y < yShelf7)) {
    this.collisionWith = this.collisionWith + "bottomShelf_";
  }

  //shelf8
  var xShelf8 = this.width / 1.36;
  var yShelf8 = this.height - this.height / 4.3;
  var wShelf8 = this.width / 5.5;
  var hShelf8 = this.height / 60;

  this.hit = collideRectRect(xShelf8, yShelf8, wShelf8, hShelf8, obj.x, obj.y, obj.width, obj.height);

  if (this.hit && (obj.x + obj.width + width / 1000 > xShelf8) && (obj.x < xShelf8)) {
    this.collisionWith = this.collisionWith + "rightShelf_";
  }
  if (this.hit && (obj.x - width / 1000 < xShelf8 + wShelf8) && (obj.x + obj.width > xShelf8 + wShelf8)) {
    this.collisionWith = this.collisionWith + "leftShelf_";
  }
  if (this.hit && (obj.y - obj.height / 1000 < (yShelf8 + hShelf8)) && ((obj.y + obj.height) > (yShelf8 + hShelf8))) {
    this.collisionWith = this.collisionWith + "aboveShelf_";
  }
  if (this.hit && (obj.y + obj.height + obj.height / 1000 > yShelf8) && (obj.y < yShelf8)) {
    this.collisionWith = this.collisionWith + "bottomShelf_";
  }

  //shelf9
  var xShelf9 = this.width / 3.35;
  var yShelf9 = this.height / 3.6;
  var wShelf9 = this.width / 14;
  var hShelf9 = this.height / 60;

  this.hit = collideRectRect(xShelf9, yShelf9, wShelf9, hShelf9, obj.x, obj.y, obj.width, obj.height);

  if (this.hit && (obj.x + obj.width + width / 1000 > xShelf9) && (obj.x < xShelf9)) {
    this.collisionWith = this.collisionWith + "rightShelf_";
  }
  if (this.hit && (obj.x - width / 1000 < xShelf9 + wShelf9) && (obj.x + obj.width > xShelf9 + wShelf9)) {
    this.collisionWith = this.collisionWith + "leftShelf_";
  }
  if (this.hit && (obj.y - obj.height / 1000 < (yShelf9 + hShelf9)) && ((obj.y + obj.height) > (yShelf9 + hShelf9))) {
    this.collisionWith = this.collisionWith + "aboveShelf_";
  }
  if (this.hit && (obj.y + obj.height + obj.height / 1000 > yShelf9) && (obj.y < yShelf9)) {
    this.collisionWith = this.collisionWith + "bottomShelf_";
  }
};
