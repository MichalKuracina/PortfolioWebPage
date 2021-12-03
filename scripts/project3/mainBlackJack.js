//debugger;
// 1492 - trueThis as reference to scene object
//http://www.html5gamedevs.com/topic/32369-managing-scope-for-function-calls-without-bind/
//http://www.html5gamedevs.com/topic/32369-managing-scope-for-function-calls-without-bind/

var canvasHeight;
var canvasWidth;
//"use strict";
window.onload = function () {
  // var canvasWidth = 360; //window.innerWidth; //800;  //window.clientWidth, // '100%'
  // var canvasHeight = canvasWidth * 1.777777777777778; // 640; //window.innerHeight; //600; //window.clientHeight, // '100%'


  var navBarHeightElement;
  var element1 = document.querySelector('.navbar')
  var style1 = getComputedStyle(element1)
  var navBarHeight = style1.height
  var height1 = navBarHeight;
  height1 = height1.substring(0, height1.length - 2);
  var element2 = document.querySelector('body')
  var style2 = getComputedStyle(element2)
  var bodyBottomMargin = style2.marginBottom
  var height2 = bodyBottomMargin;
  height2 = height2.substring(0, height2.length - 2);
  var element3 = document.querySelector('body')
  var style3 = getComputedStyle(element3)
  var bodyTopMargin = style3.marginTop
  var height3 = bodyTopMargin;
  height3 = height3.substring(0, height3.length - 2);
  navBarHeightElement = Number(height1) + Number(height2) + Number(height3);
  var element4 = document.querySelector('.navbar')
  var style4 = getComputedStyle(element4)
  var navBarWidth = style4.width
  var width1 = navBarWidth;
  width1 = width1.substring(0, width1.length - 2);

  if (Number(width1) > 360) {
    canvasWidth = 360;
  } else {
    canvasWidth = Number(width1);
  }
  canvasHeight = window.innerHeight - navBarHeightElement;

  var config = {
    type: Phaser.AUTO,
    backgroundColor: '#14ace5', //'#ffffff', //#3fa825'
    scale: { // https://phaser.io/phaser3/devlog/136
      width: canvasWidth,
      height: canvasHeight,
      autoCenter: Phaser.DOM.CENTER_BOTH,
    },
    scene: {
      preload: preload,
      create: create,
      update: update
    },
    canvas: document.querySelector('canvasContainer'),
    parent: 'canvasContainer',
  };

  var game = new Phaser.Game(config);


};

var decks = 8; // min 1 max 8
var cards = 52;
var round = 0;

// clubs ♣, diamonds ♦, hearts ♥, spades ♠ 
var deckContent = ["2_club", "3_club", "4_club", "5_club", "6_club", "7_club", "8_club", "9_club", "10_club", "J_club", "Q_club", "K_club", "A_club",
  "2_diamond", "3_diamond", "4_diamond", "5_diamond", "6_diamond", "7_diamond", "8_diamond", "9_diamond", "10_diamond", "J_diamond", "Q_diamond", "K_diamond", "A_diamond",
  "2_heart", "3_heart", "4_heart", "5_heart", "6_heart", "7_heart", "8_heart", "9_heart", "10_heart", "J_heart", "Q_heart", "K_heart", "A_heart",
  "2_spade", "3_spade", "4_spade", "5_spade", "6_spade", "7_spade", "8_spade", "9_spade", "10_spade", "J_spade", "Q_spade", "K_spade", "A_spade"
];

var keyONE;
var keyTWO;
var keyTHREE;
var keyFOUR;
var keyFIVE;

var dealersShoe = [];
var trashCards = [];
var dealersHand = [];
var playersHand = [];
var playersHand2 = [];

var firstDeal = true;
var validateHand;
var runningCount;
var splitHandPossibility = false;
var playerInput = false;

var playerPointsCount;
var playerPointsCount1;
var playerPointsCount2;
var dealerPointsCount;

var dealersTurn = false;
var currentHand = 1;
var openingHandDealer = true;

var plasticPlaceholder = 0;
var aBetHand1 = 0;
var aBetHand2 = 0;
var betOne = 1;
var betTwo = betOne * 2;
var betThree = betOne * 3;
var betFour = betOne * 4;
var betFive = betOne * 5;
var wallet = betOne * 100;
var betPlacedMessage = true;
var betPlacedAction = false;

var text1;
var text2;
var text3;
var whatHappened;
var textDelay = 2000;
var cardMinimizeCoefficient = 4;
var backsideCadsShoe = [];
var backsideCadsTrash = [];

var cleanBackSidecardsFlag = true;
var dealersBackSideCard;
var chip_black;
var chip_green;
var chip_purple;
var chip_red;
var chip_white;

var frontsideCards1_1 = [];
var frontsideCards1_2 = [];
var frontsideCards1_3 = [];
var frontsideCards1_4 = [];
var frontsideCards1_5 = [];
var frontsideCards1_6 = [];
var frontsideCards1_7 = [];
var frontsideCards1_8 = [];
var frontsideCards2_1 = [];
var frontsideCards2_2 = [];
var frontsideCards2_3 = [];
var frontsideCards2_4 = [];
var frontsideCards2_5 = [];
var frontsideCards2_6 = [];
var frontsideCards2_7 = [];
var frontsideCards2_8 = [];
var frontsideCards3_1 = [];
var frontsideCards3_2 = [];
var frontsideCards3_3 = [];
var frontsideCards3_4 = [];
var frontsideCards3_5 = [];
var frontsideCards3_6 = [];
var frontsideCards3_7 = [];
var frontsideCards3_8 = [];

var depthZindex = 0;
var spritesheetPointer;

var timedEvent;
var timerReady = false;
var dealerWins = false;
var playerWins = false;
var playerWinsFirst = false;
var playerWinsSecond = false;
var playerLostFirst = false;
var playerLostSecond = false;

// clubs ♣, diamonds ♦, hearts ♥, spades ♠ 
var deckDictionary = {};
var orginalDictionary = {
  0: "A_club",
  1: "2_club",
  2: "3_club",
  3: "4_club",
  4: "5_club",
  5: "6_club",
  6: "7_club",
  7: "8_club",
  8: "9_club",
  9: "10_club",
  10: "J_club",
  11: "Q_club",
  12: "K_club",
  13: "A_diamond",
  14: "2_diamond",
  15: "3_diamond",
  16: "4_diamond",
  17: "5_diamond",
  18: "6_diamond",
  19: "7_diamond",
  20: "8_diamond",
  21: "9_diamond",
  22: "10_diamond",
  23: "J_diamond",
  24: "Q_diamond",
  25: "K_diamond",
  26: "A_heart",
  27: "2_heart",
  28: "3_heart",
  29: "4_heart",
  30: "5_heart",
  31: "6_heart",
  32: "7_heart",
  33: "8_heart",
  34: "9_heart",
  35: "10_heart",
  36: "J_heart",
  37: "Q_heart",
  38: "K_heart",
  39: "A_spade",
  40: "2_spade",
  41: "3_spade",
  42: "4_spade",
  43: "5_spade",
  44: "6_spade",
  45: "7_spade",
  46: "8_spade",
  47: "9_spade",
  48: "10_spade",
  49: "J_spade",
  50: "Q_spade",
  51: "K_spade"
}

var buttonBet1;
var buttonBet2;
var buttonBet3;
var buttonBet4;
var buttonBet5;

var buttonBet1Rect;
var buttonBet2Rect;
var buttonBet3Rect;
var buttonBet4Rect;
var buttonBet5Rect;

var buttonAction1;
var buttonAction2;
var buttonAction3;
var buttonAction4;
var buttonAction5;

var buttonAction1Rect;
var buttonAction2Rect;
var buttonAction3Rect;
var buttonAction4Rect;
var buttonAction5Rect;

var activateButtons = true;

//var printSomething;
//var testTest;
var trueThis;

function preload() {
  this.load.image('backSide', '../images/project3/backSide.png');
  this.load.spritesheet('deckSpritesheet', '../images/project3/cardsSpritesheet.png', {
    frameWidth: 71,
    frameHeight: 96
  });
  this.load.image('chip_black', '../images/project3/chip_black.png');
  this.load.image('chip_green', '../images/project3/chip_green.png');
  this.load.image('chip_purple', '../images/project3/chip_purple.png');
  this.load.image('chip_red', '../images/project3/chip_red.png');
  this.load.image('chip_white', '../images/project3/chip_white.png');
  console.log("Preload function passed.")
}

function create() {

  for (var j = 0; j < decks; j++) {
    for (var i = 0; i < deckContent.length; i++) {
      dealersShoe.push(deckContent[i] + "_" + j);
    }
  }

  shuffleArray(dealersShoe);
  console.log("Shuffling cards...");
  plasticPlaceholder = getRandomIntInclusive(60, 75);
  console.log("Cutting cards...");
  console.log(dealersShoe)

  keyONE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ONE);
  keyTWO = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.TWO);
  keyTHREE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.THREE);
  keyFOUR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.FOUR);
  keyFIVE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.FIVE);

  // Image

  dealersBackSideCard = this.add.image(0, 0, 'backSide').setScale(0.1 * cardMinimizeCoefficient);
  dealersBackSideCard.visible = false;

  chip_black = this.add.image(canvasWidth / 2, canvasHeight / 2, 'chip_black').setScale(0.1 * cardMinimizeCoefficient);
  chip_black.visible = false;

  chip_green = this.add.image(canvasWidth / 2, canvasHeight / 2, 'chip_green').setScale(0.1 * cardMinimizeCoefficient);
  chip_green.visible = false;

  chip_purple = this.add.image(canvasWidth / 2, canvasHeight / 2, 'chip_purple').setScale(0.1 * cardMinimizeCoefficient);
  chip_purple.visible = false;

  chip_red = this.add.image(canvasWidth / 2, canvasHeight / 2, 'chip_red').setScale(0.1 * cardMinimizeCoefficient);
  chip_red.visible = false;

  chip_white = this.add.image(canvasWidth / 2, canvasHeight / 2, 'chip_white').setScale(0.1 * cardMinimizeCoefficient);
  chip_white.visible = false;


  for (var i = 0; i < dealersShoe.length; i++) { // add backSide
    backsideCadsShoe.push(this.add.image(0, 0, 'backSide').setScale(0.1 * cardMinimizeCoefficient));
  }

  for (var i = 0; i < dealersShoe.length; i++) { // add backSide
    backsideCadsTrash.push(this.add.image(0, 0, 'backSide').setScale(0.1 * cardMinimizeCoefficient));
  }

  for (var i = 0; i < 52; i++) {
    frontsideCards1_1.push(this.add.image(canvasWidth / 2, canvasHeight / 2, 'deckSpritesheet', i));
    frontsideCards1_2.push(this.add.image(canvasWidth / 2, canvasHeight / 2, 'deckSpritesheet', i));
    frontsideCards1_3.push(this.add.image(canvasWidth / 2, canvasHeight / 2, 'deckSpritesheet', i));
    frontsideCards1_4.push(this.add.image(canvasWidth / 2, canvasHeight / 2, 'deckSpritesheet', i));
    frontsideCards1_5.push(this.add.image(canvasWidth / 2, canvasHeight / 2, 'deckSpritesheet', i));
    frontsideCards1_6.push(this.add.image(canvasWidth / 2, canvasHeight / 2, 'deckSpritesheet', i));
    frontsideCards1_7.push(this.add.image(canvasWidth / 2, canvasHeight / 2, 'deckSpritesheet', i));
    frontsideCards1_8.push(this.add.image(canvasWidth / 2, canvasHeight / 2, 'deckSpritesheet', i));
  }
  for (var i = 0; i < 52; i++) {
    frontsideCards1_1[i].visible = false;
    frontsideCards1_2[i].visible = false;
    frontsideCards1_3[i].visible = false;
    frontsideCards1_4[i].visible = false;
    frontsideCards1_5[i].visible = false;
    frontsideCards1_6[i].visible = false;
    frontsideCards1_7[i].visible = false;
    frontsideCards1_8[i].visible = false;
  }

  for (var i = 0; i < 52; i++) {
    frontsideCards2_1.push(this.add.image(canvasWidth / 2, canvasHeight / 2, 'deckSpritesheet', i));
    frontsideCards2_2.push(this.add.image(canvasWidth / 2, canvasHeight / 2, 'deckSpritesheet', i));
    frontsideCards2_3.push(this.add.image(canvasWidth / 2, canvasHeight / 2, 'deckSpritesheet', i));
    frontsideCards2_4.push(this.add.image(canvasWidth / 2, canvasHeight / 2, 'deckSpritesheet', i));
    frontsideCards2_5.push(this.add.image(canvasWidth / 2, canvasHeight / 2, 'deckSpritesheet', i));
    frontsideCards2_6.push(this.add.image(canvasWidth / 2, canvasHeight / 2, 'deckSpritesheet', i));
    frontsideCards2_7.push(this.add.image(canvasWidth / 2, canvasHeight / 2, 'deckSpritesheet', i));
    frontsideCards2_8.push(this.add.image(canvasWidth / 2, canvasHeight / 2, 'deckSpritesheet', i));
  }
  for (var i = 0; i < 52; i++) {
    frontsideCards2_1[i].visible = false;
    frontsideCards2_2[i].visible = false;
    frontsideCards2_3[i].visible = false;
    frontsideCards2_4[i].visible = false;
    frontsideCards2_5[i].visible = false;
    frontsideCards2_6[i].visible = false;
    frontsideCards2_7[i].visible = false;
    frontsideCards2_8[i].visible = false;
  }

  for (var i = 0; i < 52; i++) {
    frontsideCards3_1.push(this.add.image(canvasWidth / 2, canvasHeight / 2, 'deckSpritesheet', i));
    frontsideCards3_2.push(this.add.image(canvasWidth / 2, canvasHeight / 2, 'deckSpritesheet', i));
    frontsideCards3_3.push(this.add.image(canvasWidth / 2, canvasHeight / 2, 'deckSpritesheet', i));
    frontsideCards3_4.push(this.add.image(canvasWidth / 2, canvasHeight / 2, 'deckSpritesheet', i));
    frontsideCards3_5.push(this.add.image(canvasWidth / 2, canvasHeight / 2, 'deckSpritesheet', i));
    frontsideCards3_6.push(this.add.image(canvasWidth / 2, canvasHeight / 2, 'deckSpritesheet', i));
    frontsideCards3_7.push(this.add.image(canvasWidth / 2, canvasHeight / 2, 'deckSpritesheet', i));
    frontsideCards3_8.push(this.add.image(canvasWidth / 2, canvasHeight / 2, 'deckSpritesheet', i));
  }
  for (var i = 0; i < 52; i++) {
    frontsideCards3_1[i].visible = false;
    frontsideCards3_2[i].visible = false;
    frontsideCards3_3[i].visible = false;
    frontsideCards3_4[i].visible = false;
    frontsideCards3_5[i].visible = false;
    frontsideCards3_6[i].visible = false;
    frontsideCards3_7[i].visible = false;
    frontsideCards3_8[i].visible = false;
  }

  // dictionary
  for (var key in orginalDictionary) {
    deckDictionary[key] = [orginalDictionary[key] + "_0", orginalDictionary[key] + "_1", orginalDictionary[key] + "_2", orginalDictionary[key] + "_3", orginalDictionary[key] + "_4", orginalDictionary[key] + "_5", orginalDictionary[key] + "_6", orginalDictionary[key] + "_7"];
  }

  // Details
  text1 = this.add.text(canvasWidth / 4, canvasHeight / 30, "", {
    fontFamily: 'Courier',
    fontSize: canvasHeight / 20 + 'px',
    fontStyle: '',
    backgroundColor: null,
    color: '#000',
    stroke: '#000',
    strokeThickness: 2,
    shadow: {
      offsetX: 0,
      offsetY: 0,
      color: '#000',
      blur: 0,
      stroke: false,
      fill: false
    },
    align: 'left', // 'left'|'center'|'right'
    maxLines: 0,
    lineSpacing: 0,
    fixedWidth: 0,
    fixedHeight: 0,
    rtl: false,
    testString: '|MÉqgy',
    wordWrap: {
      width: null,
      callback: null,
      callbackScope: null,
      useAdvancedWrap: false
    }
  });
  text1.setOrigin(0.5, 0.2);

  text3 = this.add.text(canvasWidth / 1.2, canvasHeight / 30, "", {
    fontFamily: 'Courier',
    fontSize: canvasHeight / 20 + 'px',
    fontStyle: '',
    backgroundColor: null,
    color: '#000',
    stroke: '#000',
    strokeThickness: 2,
    shadow: {
      offsetX: 0,
      offsetY: 0,
      color: '#000',
      blur: 0,
      stroke: false,
      fill: false
    },
    align: 'left', // 'left'|'center'|'right'
    maxLines: 0,
    lineSpacing: 0,
    fixedWidth: 0,
    fixedHeight: 0,
    rtl: false,
    testString: '|MÉqgy',
    wordWrap: {
      width: null,
      callback: null,
      callbackScope: null,
      useAdvancedWrap: false
    }
  });

  text3.setOrigin(0.5, 0.2);

  text2 = this.add.text(canvasWidth / 2, canvasHeight / 2, "", {
    fontFamily: 'Courier',
    fontSize: canvasWidth / 5 + 'px',
    fontStyle: '',
    backgroundColor: null,
    color: '#ff0000',
    stroke: '#fff',
    strokeThickness: 3,
    shadow: {
      offsetX: 0,
      offsetY: 0,
      color: '#000',
      blur: 0,
      stroke: false,
      fill: false
    },
    align: 'center', // 'left'|'center'|'right'
    maxLines: 0,
    lineSpacing: 0,
    fixedWidth: 0,
    fixedHeight: 0,
    rtl: false,
    testString: '|MÉqgy',
    wordWrap: {
      width: null,
      callback: null,
      callbackScope: null,
      useAdvancedWrap: false
    }
  });

  text2.setOrigin(0.5, 0.5);

  //  buttons

  var betStyle = {
    fontFamily: 'Courier',
    fontSize: canvasWidth / 13 + 'px',
    fontStyle: '',
    backgroundColor: null,
    color: '#000',
    stroke: '#000',
    strokeThickness: 3,
    shadow: {
      offsetX: 0,
      offsetY: 0,
      color: '#fff',
      blur: 0,
      stroke: false,
      fill: false
    },
    align: 'center', // 'left'|'center'|'right'
    maxLines: 0,
    lineSpacing: 0,
    fixedWidth: 0,
    fixedHeight: 0,
    rtl: false,
    testString: '|MÉqgy',
    wordWrap: {
      width: null,
      callback: null,
      callbackScope: null,
      useAdvancedWrap: false
    }
  };

  var buttonBetRectY = canvasHeight / 1.6;
  var buttonBetRectWidth = canvasWidth / 8;
  var buttonBetRectHeight = canvasHeight / 15;
  var buttonBetRectCorner = canvasWidth / 30;

  buttonBet1Rect = this.add.graphics();
  buttonBet1Rect.fillStyle(0xffff00, 1);
  buttonBet1Rect.fillRoundedRect(canvasWidth / 8.5, buttonBetRectY, buttonBetRectWidth, buttonBetRectHeight, buttonBetRectCorner);
  buttonBet1Rect.lineStyle(2, 000, 1);
  buttonBet1Rect.strokeRoundedRect(canvasWidth / 8.5, buttonBetRectY, buttonBetRectWidth, buttonBetRectHeight, buttonBetRectCorner);
  buttonBet1Rect.visible = false;

  buttonBet2Rect = this.add.graphics();
  buttonBet2Rect.fillStyle(0xffff00, 1);
  buttonBet2Rect.fillRoundedRect(canvasWidth / 3.6, buttonBetRectY, buttonBetRectWidth, buttonBetRectHeight, buttonBetRectCorner);
  buttonBet2Rect.lineStyle(2, 000, 1);
  buttonBet2Rect.strokeRoundedRect(canvasWidth / 3.6, buttonBetRectY, buttonBetRectWidth, buttonBetRectHeight, buttonBetRectCorner);
  buttonBet2Rect.visible = false;

  buttonBet3Rect = this.add.graphics();
  buttonBet3Rect.fillStyle(0xffff00, 1);
  buttonBet3Rect.fillRoundedRect(canvasWidth / 2.3, buttonBetRectY, buttonBetRectWidth, buttonBetRectHeight, buttonBetRectCorner);
  buttonBet3Rect.lineStyle(2, 000, 1);
  buttonBet3Rect.strokeRoundedRect(canvasWidth / 2.3, buttonBetRectY, buttonBetRectWidth, buttonBetRectHeight, buttonBetRectCorner);
  buttonBet3Rect.visible = false;

  buttonBet4Rect = this.add.graphics();
  buttonBet4Rect.fillStyle(0xffff00, 1);
  buttonBet4Rect.fillRoundedRect(canvasWidth / 1.7, buttonBetRectY, buttonBetRectWidth, buttonBetRectHeight, buttonBetRectCorner);
  buttonBet4Rect.lineStyle(2, 000, 1);
  buttonBet4Rect.strokeRoundedRect(canvasWidth / 1.7, buttonBetRectY, buttonBetRectWidth, buttonBetRectHeight, buttonBetRectCorner);
  buttonBet4Rect.visible = false;

  buttonBet5Rect = this.add.graphics();
  buttonBet5Rect.fillStyle(0xffff00, 1);
  buttonBet5Rect.fillRoundedRect(canvasWidth / 1.35, buttonBetRectY, buttonBetRectWidth, buttonBetRectHeight, buttonBetRectCorner);
  buttonBet5Rect.lineStyle(2, 000, 1);
  buttonBet5Rect.strokeRoundedRect(canvasWidth / 1.35, buttonBetRectY, buttonBetRectWidth, buttonBetRectHeight, buttonBetRectCorner);
  buttonBet5Rect.visible = false;

  buttonBet1 = this.add.text(canvasWidth / 8.5, canvasHeight / 1.58, betOne + '€', betStyle);
  buttonBet1.setInteractive();
  buttonBet1.visible = false;

  buttonBet2 = this.add.text(canvasWidth / 3.6, canvasHeight / 1.58, betTwo + '€', betStyle);
  buttonBet2.setInteractive();
  buttonBet2.visible = false;

  buttonBet3 = this.add.text(canvasWidth / 2.3, canvasHeight / 1.58, betThree + '€', betStyle);
  buttonBet3.setInteractive();
  buttonBet3.visible = false;

  buttonBet4 = this.add.text(canvasWidth / 1.7, canvasHeight / 1.58, betFour + '€', betStyle);
  buttonBet4.setInteractive();
  buttonBet4.visible = false;

  buttonBet5 = this.add.text(canvasWidth / 1.35, canvasHeight / 1.58, betFive + '€', betStyle);
  buttonBet5.setInteractive();
  buttonBet5.visible = false;

  var actionStyle = {
    fontFamily: 'Courier',
    fontSize: canvasWidth / 20 + 'px',
    fontStyle: '',
    backgroundColor: null,
    color: '#000',
    stroke: '#000',
    strokeThickness: 2,
    shadow: {
      offsetX: 0,
      offsetY: 0,
      color: '#fff',
      blur: 0,
      stroke: false,
      fill: false
    },
    align: 'center', // 'left'|'center'|'right'
    maxLines: 0,
    lineSpacing: 0,
    fixedWidth: 0,
    fixedHeight: 0,
    rtl: false,
    testString: '|MÉqgy',
    wordWrap: {
      width: null,
      callback: null,
      callbackScope: null,
      useAdvancedWrap: false
    }
  };

  buttonAction1Rect = this.add.graphics();
  buttonAction1Rect.fillStyle(0xffff00, 1);
  buttonAction1Rect.fillRoundedRect(canvasWidth / 10, canvasHeight / 1.58, canvasWidth / 6.2, canvasHeight / 30, canvasWidth / 50);
  buttonAction1Rect.lineStyle(2, 000, 1);
  buttonAction1Rect.strokeRoundedRect(canvasWidth / 10, canvasHeight / 1.58, canvasWidth / 6.2, canvasHeight / 30, canvasWidth / 50);
  buttonAction1Rect.visible = false;

  buttonAction2Rect = this.add.graphics();
  buttonAction2Rect.fillStyle(0xffff00, 1);
  buttonAction2Rect.fillRoundedRect(canvasWidth / 3.3, canvasHeight / 1.58, canvasWidth / 4.5, canvasHeight / 30, canvasWidth / 50);
  buttonAction2Rect.lineStyle(2, 000, 1);
  buttonAction2Rect.strokeRoundedRect(canvasWidth / 3.3, canvasHeight / 1.58, canvasWidth / 4.5, canvasHeight / 30, canvasWidth / 50);
  buttonAction2Rect.visible = false;

  buttonAction3Rect = this.add.graphics();
  buttonAction3Rect.fillStyle(0xffff00, 1);
  buttonAction3Rect.fillRoundedRect(canvasWidth / 1.8, canvasHeight / 1.58, canvasWidth / 2.5, canvasHeight / 30, canvasWidth / 50);
  buttonAction3Rect.lineStyle(2, 000, 1);
  buttonAction3Rect.strokeRoundedRect(canvasWidth / 1.8, canvasHeight / 1.58, canvasWidth / 2.5, canvasHeight / 30, canvasWidth / 50);
  buttonAction3Rect.visible = false;

  buttonAction4Rect = this.add.graphics();
  buttonAction4Rect.fillStyle(0xffff00, 1);
  buttonAction4Rect.fillRoundedRect(canvasWidth / 5, canvasHeight / 1.45, canvasWidth / 2.9, canvasHeight / 30, canvasWidth / 50);
  buttonAction4Rect.lineStyle(2, 000, 1);
  buttonAction4Rect.strokeRoundedRect(canvasWidth / 5, canvasHeight / 1.45, canvasWidth / 2.9, canvasHeight / 30, canvasWidth / 50);
  buttonAction4Rect.visible = false;

  buttonAction5Rect = this.add.graphics();
  buttonAction5Rect.fillStyle(0xffff00, 1);
  buttonAction5Rect.fillRoundedRect(canvasWidth / 1.7, canvasHeight / 1.45, canvasWidth / 4.5, canvasHeight / 30, canvasWidth / 50);
  buttonAction5Rect.lineStyle(2, 000, 1);
  buttonAction5Rect.strokeRoundedRect(canvasWidth / 1.7, canvasHeight / 1.45, canvasWidth / 4.5, canvasHeight / 30, canvasWidth / 50);
  buttonAction5Rect.visible = false;

  buttonAction1 = this.add.text(canvasWidth / 10, canvasHeight / 1.58, '1 Hit', actionStyle);
  buttonAction1.setInteractive();
  buttonAction1.visible = false;

  buttonAction2 = this.add.text(canvasWidth / 3.3, canvasHeight / 1.58, '2 Stand', actionStyle);
  buttonAction2.setInteractive();
  buttonAction2.visible = false;

  buttonAction3 = this.add.text(canvasWidth / 1.8, canvasHeight / 1.58, '3 Double down', actionStyle);
  buttonAction3.setInteractive();
  buttonAction3.visible = false;

  buttonAction4 = this.add.text(canvasWidth / 5, canvasHeight / 1.45, '4 Surrender', actionStyle);
  buttonAction4.setInteractive();
  buttonAction4.visible = false;

  buttonAction5 = this.add.text(canvasWidth / 1.7, canvasHeight / 1.45, '5 Split', actionStyle);
  buttonAction5.setInteractive();
  buttonAction5.visible = false;

  trueThis = this;
  document.querySelector('canvas').style.marginTop = '0';
}



function update() {

  text1.setText(['Money: \n' + wallet]);

  text3.setText(['Round: \n' + round]);

  if (timerReady == true) {
    text2.setText(whatHappened);
  } else {
    text2.setText('');
  } //text2.setText('Event.progress: ' + timedEvent.getProgress().toString().substr(0, 4));

  // ------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  if (cleanBackSidecardsFlag == true) {
    cleanBackSidecards();
    cleanBackSidecardsFlag = false;
  }

  // players hands
  if (playersHand.length > 0 && playersHand2.length == 0) {
    depthZindex = 0;
    for (var i = 0; i < playersHand.length; i++) {
      depthZindex += 1;
      for (var key in deckDictionary) {
        if (playersHand[i] == deckDictionary[key][0] || playersHand[i] == deckDictionary[key][1] || playersHand[i] == deckDictionary[key][2] || playersHand[i] == deckDictionary[key][3] || playersHand[i] == deckDictionary[key][4] || playersHand[i] == deckDictionary[key][5] || playersHand[i] == deckDictionary[key][6] || playersHand[i] == deckDictionary[key][7]) {
          if (playersHand[i].slice(-1) == "0") {
            spritesheetPointer = frontsideCards1_1;
          } else if (playersHand[i].slice(-1) == "1") {
            spritesheetPointer = frontsideCards1_2;
          } else if (playersHand[i].slice(-1) == "2") {
            spritesheetPointer = frontsideCards1_3;
          } else if (playersHand[i].slice(-1) == "3") {
            spritesheetPointer = frontsideCards1_4;
          } else if (playersHand[i].slice(-1) == "4") {
            spritesheetPointer = frontsideCards1_5;
          } else if (playersHand[i].slice(-1) == "5") {
            spritesheetPointer = frontsideCards1_6;
          } else if (playersHand[i].slice(-1) == "6") {
            spritesheetPointer = frontsideCards1_7;
          } else if (playersHand[i].slice(-1) == "7") {
            spritesheetPointer = frontsideCards1_8;
          }
          spritesheetPointer[key].visible = true;
          spritesheetPointer[key].setX(Phaser.Math.RoundTo(canvasWidth / 2) + i * cardMinimizeCoefficient * 4);
          spritesheetPointer[key].setY(Phaser.Math.RoundTo(canvasHeight / 1.2) - i * cardMinimizeCoefficient * 2);
          spritesheetPointer[key].depth = depthZindex;
        }
      }
    }
  } else if (playersHand.length > 0 && playersHand2.length > 0) {
    depthZindex = 0;
    for (var i = 0; i < playersHand.length; i++) {
      depthZindex += 1;
      for (var key in deckDictionary) {
        if (playersHand[i] == deckDictionary[key][0] || playersHand[i] == deckDictionary[key][1] || playersHand[i] == deckDictionary[key][2] || playersHand[i] == deckDictionary[key][3] || playersHand[i] == deckDictionary[key][4] || playersHand[i] == deckDictionary[key][5] || playersHand[i] == deckDictionary[key][6] || playersHand[i] == deckDictionary[key][7]) {
          if (playersHand[i].slice(-1) == "0") {
            spritesheetPointer = frontsideCards1_1;
          } else if (playersHand[i].slice(-1) == "1") {
            spritesheetPointer = frontsideCards1_2;
          } else if (playersHand[i].slice(-1) == "2") {
            spritesheetPointer = frontsideCards1_3;
          } else if (playersHand[i].slice(-1) == "3") {
            spritesheetPointer = frontsideCards1_4;
          } else if (playersHand[i].slice(-1) == "4") {
            spritesheetPointer = frontsideCards1_5;
          } else if (playersHand[i].slice(-1) == "5") {
            spritesheetPointer = frontsideCards1_6;
          } else if (playersHand[i].slice(-1) == "6") {
            spritesheetPointer = frontsideCards1_7;
          } else if (playersHand[i].slice(-1) == "7") {
            spritesheetPointer = frontsideCards1_8;
          }
          spritesheetPointer[key].visible = true;
          spritesheetPointer[key].setX(Phaser.Math.RoundTo(canvasWidth / 4) + i * cardMinimizeCoefficient * 4);
          spritesheetPointer[key].setY(Phaser.Math.RoundTo(canvasHeight / 1.2) - i * cardMinimizeCoefficient * 2);
          spritesheetPointer[key].depth = depthZindex;
        }
      }
    }
    depthZindex = 0;
    for (var i = 0; i < playersHand2.length; i++) {
      depthZindex += 1;
      for (var key in deckDictionary) {
        if (playersHand2[i] == deckDictionary[key][0] || playersHand2[i] == deckDictionary[key][1] || playersHand2[i] == deckDictionary[key][2] || playersHand2[i] == deckDictionary[key][3] || playersHand2[i] == deckDictionary[key][4] || playersHand2[i] == deckDictionary[key][5] || playersHand2[i] == deckDictionary[key][6] || playersHand2[i] == deckDictionary[key][7]) {
          if (playersHand2[i].slice(-1) == "0") {
            spritesheetPointer = frontsideCards2_1;
          } else if (playersHand2[i].slice(-1) == "1") {
            spritesheetPointer = frontsideCards2_2;
          } else if (playersHand2[i].slice(-1) == "2") {
            spritesheetPointer = frontsideCards2_3;
          } else if (playersHand2[i].slice(-1) == "3") {
            spritesheetPointer = frontsideCards2_4;
          } else if (playersHand2[i].slice(-1) == "4") {
            spritesheetPointer = frontsideCards2_5;
          } else if (playersHand2[i].slice(-1) == "5") {
            spritesheetPointer = frontsideCards2_6;
          } else if (playersHand2[i].slice(-1) == "6") {
            spritesheetPointer = frontsideCards2_7;
          } else if (playersHand2[i].slice(-1) == "7") {
            spritesheetPointer = frontsideCards2_8;
          }
          spritesheetPointer[key].visible = true;
          spritesheetPointer[key].setX(Phaser.Math.RoundTo(canvasWidth / 1.3) + i * cardMinimizeCoefficient * 4);
          spritesheetPointer[key].setY(Phaser.Math.RoundTo(canvasHeight / 1.2) - i * cardMinimizeCoefficient * 2);
          spritesheetPointer[key].depth = depthZindex;
        }
      }
    }
  } else if (playersHand.length == 0 && playersHand2.length > 0) {
    depthZindex = 0;
    for (var i = 0; i < playersHand2.length; i++) {
      depthZindex += 1;
      for (var key in deckDictionary) {
        if (playersHand2[i] == deckDictionary[key][0] || playersHand2[i] == deckDictionary[key][1] || playersHand2[i] == deckDictionary[key][2] || playersHand2[i] == deckDictionary[key][3] || playersHand2[i] == deckDictionary[key][4] || playersHand2[i] == deckDictionary[key][5] || playersHand2[i] == deckDictionary[key][6] || playersHand2[i] == deckDictionary[key][7]) {
          if (playersHand2[i].slice(-1) == "0") {
            spritesheetPointer = frontsideCards2_1;
          } else if (playersHand2[i].slice(-1) == "1") {
            spritesheetPointer = frontsideCards2_2;
          } else if (playersHand2[i].slice(-1) == "2") {
            spritesheetPointer = frontsideCards2_3;
          } else if (playersHand2[i].slice(-1) == "3") {
            spritesheetPointer = frontsideCards2_4;
          } else if (playersHand2[i].slice(-1) == "4") {
            spritesheetPointer = frontsideCards2_5;
          } else if (playersHand2[i].slice(-1) == "5") {
            spritesheetPointer = frontsideCards2_6;
          } else if (playersHand2[i].slice(-1) == "6") {
            spritesheetPointer = frontsideCards2_7;
          } else if (playersHand2[i].slice(-1) == "7") {
            spritesheetPointer = frontsideCards2_8;
          }
          spritesheetPointer[key].visible = true;
          spritesheetPointer[key].setX(Phaser.Math.RoundTo(canvasWidth / 2) + i * cardMinimizeCoefficient * 4);
          spritesheetPointer[key].setY(Phaser.Math.RoundTo(canvasHeight / 1.2) - i * cardMinimizeCoefficient * 2);
          spritesheetPointer[key].depth = depthZindex;
        }
      }
    }
  }

  // dealer's hand

  if (dealersTurn == false) {
    for (var i = 0; i < dealersHand.length; i++) {
      for (var key in deckDictionary) {
        if (dealersHand[i] == deckDictionary[key][0] || dealersHand[i] == deckDictionary[key][1] || dealersHand[i] == deckDictionary[key][2] || dealersHand[i] == deckDictionary[key][3] || dealersHand[i] == deckDictionary[key][4] || dealersHand[i] == deckDictionary[key][5] || dealersHand[i] == deckDictionary[key][6] || dealersHand[i] == deckDictionary[key][7]) {
          if (i == 1) {
            if (dealersHand[i].slice(-1) == "0") {
              spritesheetPointer = frontsideCards3_1;
            } else if (dealersHand[i].slice(-1) == "1") {
              spritesheetPointer = frontsideCards3_2;
            } else if (dealersHand[i].slice(-1) == "2") {
              spritesheetPointer = frontsideCards3_3;
            } else if (dealersHand[i].slice(-1) == "3") {
              spritesheetPointer = frontsideCards3_4;
            } else if (dealersHand[i].slice(-1) == "4") {
              spritesheetPointer = frontsideCards3_5;
            } else if (dealersHand[i].slice(-1) == "5") {
              spritesheetPointer = frontsideCards3_6;
            } else if (dealersHand[i].slice(-1) == "6") {
              spritesheetPointer = frontsideCards3_7;
            } else if (dealersHand[i].slice(-1) == "7") {
              spritesheetPointer = frontsideCards3_8;
            }
            spritesheetPointer[key].visible = false;
            spritesheetPointer[key].setX(Phaser.Math.RoundTo(canvasWidth / 2) + i * cardMinimizeCoefficient * 4);
            spritesheetPointer[key].setY(Phaser.Math.RoundTo(canvasHeight / 4) - i * cardMinimizeCoefficient * 2);
            dealersBackSideCard.visible = true;
            dealersBackSideCard.setX(Phaser.Math.RoundTo(canvasWidth / 2) + i * cardMinimizeCoefficient * 4);
            dealersBackSideCard.setY(Phaser.Math.RoundTo(canvasHeight / 4) - i * cardMinimizeCoefficient * 2);
          } else {
            if (dealersHand[i].slice(-1) == "0") {
              spritesheetPointer = frontsideCards3_1;
            } else if (dealersHand[i].slice(-1) == "1") {
              spritesheetPointer = frontsideCards3_2;
            } else if (dealersHand[i].slice(-1) == "2") {
              spritesheetPointer = frontsideCards3_3;
            } else if (dealersHand[i].slice(-1) == "3") {
              spritesheetPointer = frontsideCards3_4;
            } else if (dealersHand[i].slice(-1) == "4") {
              spritesheetPointer = frontsideCards3_5;
            } else if (dealersHand[i].slice(-1) == "5") {
              spritesheetPointer = frontsideCards3_6;
            } else if (dealersHand[i].slice(-1) == "6") {
              spritesheetPointer = frontsideCards3_7;
            } else if (dealersHand[i].slice(-1) == "7") {
              spritesheetPointer = frontsideCards3_8;
            }
            dealersBackSideCard.visible = false;
            spritesheetPointer[key].visible = true;
            spritesheetPointer[key].setX(Phaser.Math.RoundTo(canvasWidth / 2) + i * cardMinimizeCoefficient * 4);
            spritesheetPointer[key].setY(Phaser.Math.RoundTo(canvasHeight / 4) - i * cardMinimizeCoefficient * 2);
          }
        }
      }
    }
  } else if (dealersTurn == true) {
    hideFrontSideCards3();
    depthZindex = 0;
    for (var i = 0; i < dealersHand.length; i++) {
      depthZindex += 1;
      for (var key in deckDictionary) {
        if (dealersHand[i] == deckDictionary[key][0] || dealersHand[i] == deckDictionary[key][1] || dealersHand[i] == deckDictionary[key][2] || dealersHand[i] == deckDictionary[key][3] || dealersHand[i] == deckDictionary[key][4] || dealersHand[i] == deckDictionary[key][5] || dealersHand[i] == deckDictionary[key][6] || dealersHand[i] == deckDictionary[key][7]) {
          if (dealersHand[i].slice(-1) == "0") {
            spritesheetPointer = frontsideCards3_1;
          } else if (dealersHand[i].slice(-1) == "1") {
            spritesheetPointer = frontsideCards3_2;
          } else if (dealersHand[i].slice(-1) == "2") {
            spritesheetPointer = frontsideCards3_3;
          } else if (dealersHand[i].slice(-1) == "3") {
            spritesheetPointer = frontsideCards3_4;
          } else if (dealersHand[i].slice(-1) == "4") {
            spritesheetPointer = frontsideCards3_5;
          } else if (dealersHand[i].slice(-1) == "5") {
            spritesheetPointer = frontsideCards3_6;
          } else if (dealersHand[i].slice(-1) == "6") {
            spritesheetPointer = frontsideCards3_7;
          } else if (dealersHand[i].slice(-1) == "7") {
            spritesheetPointer = frontsideCards3_8;
          }
          spritesheetPointer[key].visible = true;
          spritesheetPointer[key].setX(Phaser.Math.RoundTo(canvasWidth / 2) + i * cardMinimizeCoefficient * 4);
          spritesheetPointer[key].setY(Phaser.Math.RoundTo(canvasHeight / 4) - i * cardMinimizeCoefficient * 2);
          spritesheetPointer[key].depth = depthZindex;
        }
      }
    }
  }

  // ------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  if (firstDeal == true && playerInput == false) {
    if (dealersShoe.length < plasticPlaceholder) {
      console.log("The amount of cards in dealer's shoe reached minimum allowed number set by plastic insert card. Cards were reshuffled.");
      for (var i = 0; i < trashCards.length; i++) {
        dealersShoe.push(trashCards[i]);
      }
      trashCards = [];
      shuffleArray(dealersShoe);
      console.log("Shuffling cards...");
      plasticPlaceholder = getRandomIntInclusive(60, 75);
      console.log("Cutting cards...");
      console.log(dealersShoe)
      cleanBackSidecards();
    }

    if (wallet < betOne) {
      console.log("You don't have enough money to place a bet. Good luck next time!")
      firstDeal = false;
      playerInput = false;
      dealersTurn = false;
    } else {

      if (betPlacedMessage == true && betPlacedAction == false) {
        console.log("You have " + wallet + " EUR in your wallet. Place a bet. \n 1. " + betOne + " EUR \n 2. " + betTwo + " EUR \n 3. " + betThree + " EUR \n 4. " + betFour + " EUR \n 5. " + betFive + " EUR");
        betPlacedMessage = false;
        betPlacedAction = true;
        aBetHand1 = 0;
        aBetHand2 = 0;




      } else if (betPlacedMessage == false && betPlacedAction == true) {

        buttonBet1.visible = true;
        buttonBet1Rect.visible = true;
        buttonBet2.visible = true;
        buttonBet2Rect.visible = true;
        buttonBet3.visible = true;
        buttonBet3Rect.visible = true;
        buttonBet4.visible = true;
        buttonBet4Rect.visible = true;
        buttonBet5.visible = true;
        buttonBet5Rect.visible = true;

        buttonBet1.removeAllListeners('pointerdown');
        buttonBet2.removeAllListeners('pointerdown');
        buttonBet3.removeAllListeners('pointerdown');
        buttonBet4.removeAllListeners('pointerdown');
        buttonBet5.removeAllListeners('pointerdown');

        buttonBet1.on('pointerdown', function () {
          console.log("You bet " + betOne + " EUR.")
          aBetHand1 = betOne;
          betPlacedMessage = false;
          betPlacedAction = false;
          hideFrontSideCards1();
          hideFrontSideCards2();
          hideFrontSideCards3();
          cleanBackSidecards();
          hideChips();
          chip_black.visible = true;
          chip_black.setX(Phaser.Math.RoundTo(canvasWidth / 2));
          chip_black.setY(Phaser.Math.RoundTo(canvasHeight / 2));
          hideButtonBets();
          wallet = wallet - aBetHand1;
        });


        buttonBet2.on('pointerdown', function () {
          console.log("You bet " + betTwo + " EUR.")
          aBetHand1 = betTwo;
          betPlacedMessage = false;
          betPlacedAction = false;
          hideFrontSideCards1();
          hideFrontSideCards2();
          hideFrontSideCards3();
          cleanBackSidecards();
          hideChips();

          chip_green.visible = true;
          chip_green.setX(Phaser.Math.RoundTo(canvasWidth / 2));
          chip_green.setY(Phaser.Math.RoundTo(canvasHeight / 2));
          hideButtonBets();
          wallet = wallet - aBetHand1;
        });


        buttonBet3.on('pointerdown', function () {
          console.log("You bet " + betThree + " EUR.")
          aBetHand1 = betThree;
          betPlacedMessage = false;
          betPlacedAction = false;
          hideFrontSideCards1();
          hideFrontSideCards2();
          hideFrontSideCards3();
          cleanBackSidecards();
          hideChips();

          chip_purple.visible = true;
          chip_purple.setX(Phaser.Math.RoundTo(canvasWidth / 2));
          chip_purple.setY(Phaser.Math.RoundTo(canvasHeight / 2));
          hideButtonBets();
          wallet = wallet - aBetHand1;
        });


        buttonBet4.on('pointerdown', function () {
          console.log("You bet " + betFour + " EUR.")
          aBetHand1 = betFour;
          betPlacedMessage = false;
          betPlacedAction = false;
          hideFrontSideCards1();
          hideFrontSideCards2();
          hideFrontSideCards3();
          cleanBackSidecards();
          hideChips();

          chip_red.visible = true;
          chip_red.setX(Phaser.Math.RoundTo(canvasWidth / 2));
          chip_red.setY(Phaser.Math.RoundTo(canvasHeight / 2));
          hideButtonBets();
          wallet = wallet - aBetHand1;
        });


        buttonBet5.on('pointerdown', function () {
          console.log("You bet " + betFive + " EUR.")
          aBetHand1 = betFive;
          betPlacedMessage = false;
          betPlacedAction = false;
          hideFrontSideCards1();
          hideFrontSideCards2();
          hideFrontSideCards3();
          cleanBackSidecards();
          hideChips();

          chip_white.visible = true;
          chip_white.setX(Phaser.Math.RoundTo(canvasWidth / 2));
          chip_white.setY(Phaser.Math.RoundTo(canvasHeight / 2));
          hideButtonBets();
          wallet = wallet - aBetHand1;
        });
        if (Phaser.Input.Keyboard.JustDown(keyONE)) {
          //buttonBet1.visible = false;
          console.log("You bet " + betOne + " EUR.")
          aBetHand1 = betOne;
          betPlacedMessage = false;
          betPlacedAction = false;
          hideFrontSideCards1();
          hideFrontSideCards2();
          hideFrontSideCards3();
          cleanBackSidecards();
          hideChips();
          chip_black.visible = true;
          chip_black.setX(Phaser.Math.RoundTo(canvasWidth / 2));
          chip_black.setY(Phaser.Math.RoundTo(canvasHeight / 2));
          hideButtonBets();

        } else if (Phaser.Input.Keyboard.JustDown(keyTWO)) {
          console.log("You bet " + betTwo + " EUR.")
          aBetHand1 = betTwo;
          betPlacedMessage = false;
          betPlacedAction = false;
          hideFrontSideCards1();
          hideFrontSideCards2();
          hideFrontSideCards3();
          cleanBackSidecards();
          hideChips();
          hideButtonBets();

          chip_green.visible = true;
          chip_green.setX(Phaser.Math.RoundTo(canvasWidth / 2));
          chip_green.setY(Phaser.Math.RoundTo(canvasHeight / 2));
        } else if (Phaser.Input.Keyboard.JustDown(keyTHREE)) {
          console.log("You bet " + betThree + " EUR.")
          aBetHand1 = betThree;
          betPlacedMessage = false;
          betPlacedAction = false;
          hideFrontSideCards1();
          hideFrontSideCards2();
          hideFrontSideCards3();
          cleanBackSidecards();
          hideChips();
          hideButtonBets();

          chip_purple.visible = true;
          chip_purple.setX(Phaser.Math.RoundTo(canvasWidth / 2));
          chip_purple.setY(Phaser.Math.RoundTo(canvasHeight / 2));
        } else if (Phaser.Input.Keyboard.JustDown(keyFOUR)) {
          console.log("You bet " + betFour + " EUR.")
          aBetHand1 = betFour;
          betPlacedMessage = false;
          betPlacedAction = false;
          hideFrontSideCards1();
          hideFrontSideCards2();
          hideFrontSideCards3();
          cleanBackSidecards();
          hideChips();
          hideButtonBets();

          chip_red.visible = true;
          chip_red.setX(Phaser.Math.RoundTo(canvasWidth / 2));
          chip_red.setY(Phaser.Math.RoundTo(canvasHeight / 2));
        } else if (Phaser.Input.Keyboard.JustDown(keyFIVE)) {
          console.log("You bet " + betFive + " EUR.")
          aBetHand1 = betFive;
          betPlacedMessage = false;
          betPlacedAction = false;
          hideFrontSideCards1();
          hideFrontSideCards2();
          hideFrontSideCards3();
          cleanBackSidecards();
          hideChips();
          hideButtonBets();

          chip_white.visible = true;
          chip_white.setX(Phaser.Math.RoundTo(canvasWidth / 2));
          chip_white.setY(Phaser.Math.RoundTo(canvasHeight / 2));
        }
        wallet = wallet - aBetHand1;
      } else if (betPlacedMessage == false && betPlacedAction == false) {
        playersHand.push(dealersShoe[0]);
        dealersShoe.shift();
        playersHand.push(dealersShoe[0]);
        dealersShoe.shift();

        dealersHand.push(dealersShoe[0]);
        dealersShoe.shift();
        dealersHand.push(dealersShoe[0]);
        dealersShoe.shift();

        round += 1;

        validateHand = new validateHands(firstDeal, "player", playersHand);
        validateHand.validate()
        console.log("Player's opening hand: " + playersHand)
        console.log("Player's playerPointsCount: " + playerPointsCount);
        console.log("Player's splitHandPossibility: " + splitHandPossibility);
        validateHand.getCardCount()
        validateHand = new validateHands(firstDeal, "dealer", dealersHand);
        validateHand.getCardCount()
        console.log("Dealer's hand: " + dealersHand)

        if (playerPointsCount == 21) { // opening hand won with blackjack
          console.log(" -- Player has natural blackjack and wins this round! -- ");
          for (var i = 0; i < playersHand.length; i++) {
            trashCards.push(playersHand[i]);
          }
          playersHand = [];

          for (var i = 0; i < dealersHand.length; i++) {
            trashCards.push(dealersHand[i]);
          }
          dealersHand = [];
          firstDeal = true;
          playerInput = false;
          betPlacedMessage = true;
          betPlacedAction = false;
          wallet = wallet + aBetHand1 + aBetHand1 * 1.5;

          whatHappened = 'You win!';
          timedEvent = this.time.delayedCall(textDelay, onEvent, [], this);
          timerReady = true;

        } else { //continue with opening hand
          if (splitHandPossibility == true && wallet >= aBetHand1) {
            console.log("Press key 1 - 4: \n 1. Hit \n 2. Stand \n 3. Double down \n 4. Surrender \n 5. Split");
          } else if (splitHandPossibility == false) {
            console.log("Press key 1 - 3: \n 1. Hit \n 2. Stand \n 3. Double down \n 4. Surrender");
          }
          firstDeal = false;
          playerInput = true;
          activateButtons = true;
        }
      }
    }
  }

  if (firstDeal == false && playerInput == true) {
    if (splitHandPossibility == true) {

      buttonAction1.visible = true;
      buttonAction1Rect.visible = true;
      buttonAction2.visible = true;
      buttonAction2Rect.visible = true;
      buttonAction3.visible = true;
      buttonAction3Rect.visible = true;
      buttonAction4.visible = true;
      buttonAction4Rect.visible = true;
      buttonAction5.visible = true;
      buttonAction5Rect.visible = true;

      buttonAction1.removeAllListeners('pointerdown');
      buttonAction2.removeAllListeners('pointerdown');
      buttonAction3.removeAllListeners('pointerdown');
      buttonAction4.removeAllListeners('pointerdown');
      buttonAction5.removeAllListeners('pointerdown');

      buttonAction1.on('pointerdown', function () {
        console.log("Hit.")
        firstDeal = false;
        playerInput = false;
        actionHit();
        actionValidate();
        if (playerWins == true) {
          whatHappened = 'You win!';
          timedEvent = trueThis.time.delayedCall(textDelay, onEvent, [], trueThis);
          timerReady = true;
          playerWins = false;
        } else if (dealerWins == true) {
          whatHappened = 'Dealer \n wins!';
          timedEvent = trueThis.time.delayedCall(textDelay, onEvent, [], trueThis);
          timerReady = true;
          dealerWins = false;
        } else if (playerWinsFirst == true) {
          whatHappened = 'Your first hand wins!';
          timedEvent = trueThis.time.delayedCall(textDelay, onEvent, [], trueThis);
          timerReady = true;
          playerWinsFirst = false;
        } else if (playerLostFirst == true) {
          whatHappened = 'Your first hand lost!';
          timedEvent = trueThis.time.delayedCall(textDelay, onEvent, [], trueThis);
          timerReady = true;
          playerLostFirst = false;
        } else if (playerWinsSecond == true) {
          whatHappened = 'Your second hand wins!';
          timedEvent = trueThis.time.delayedCall(textDelay, onEvent, [], trueThis);
          timerReady = true;
          playerWinsSecond = false;
        } else if (playerLostSecond == true) {
          whatHappened = 'Your second hand lost!';
          timedEvent = trueThis.time.delayedCall(textDelay, onEvent, [], trueThis);
          timerReady = true;
          playerLostSecond = false;
        }
        hideActionButtons();
      });

      buttonAction2.on('pointerdown', function () {
        console.log("Stand.")
        firstDeal = false;
        playerInput = false;
        actionStand();
        hideActionButtons();
      });

      buttonAction3.on('pointerdown', function () {
        console.log("Double down.")
        firstDeal = false;
        playerInput = false;
        actionDoubleDown();
        if (playerWins == true) {
          whatHappened = 'You win!';
          timedEvent = trueThis.time.delayedCall(textDelay, onEvent, [], trueThis);
          timerReady = true;
          playerWins = false;
        } else if (dealerWins == true) {
          whatHappened = 'Dealer \n wins!';
          timedEvent = trueThis.time.delayedCall(textDelay, onEvent, [], trueThis);
          timerReady = true;
          dealerWins = false;
        }
        hideActionButtons();
      });

      buttonAction4.on('pointerdown', function () {
        console.log("Surrender.")
        firstDeal = true;
        playerInput = false;
        betPlacedMessage = true;
        betPlacedAction = false;
        actionSurrender();
        hideActionButtons();
      });

      buttonAction5.on('pointerdown', function () {
        console.log("Split.")
        firstDeal = false;
        playerInput = false;
        actionSplit();
        if (playerWins == true) {
          whatHappened = 'You win!';
          timedEvent = trueThis.time.delayedCall(textDelay, onEvent, [], trueThis);
          timerReady = true;
          playerWins = false;
        } else if (playerWinsFirst == true) {
          whatHappened = 'Your first hand wins!';
          timedEvent = trueThis.time.delayedCall(textDelay, onEvent, [], trueThis);
          timerReady = true;
          playerWinsFirst = false;
        } else if (playerWinsSecond == true) {
          whatHappened = 'Your second hand wins!';
          timedEvent = trueThis.time.delayedCall(textDelay, onEvent, [], trueThis);
          timerReady = true;
          playerWinsSecond = false;
        }
        actionValidate();
        if (playerWins == true) {
          whatHappened = 'You win!';
          timedEvent = trueThis.time.delayedCall(textDelay, onEvent, [], trueThis);
          timerReady = true;
          playerWins = false;
        } else if (dealerWins == true) {
          whatHappened = 'Dealer \n wins!';
          timedEvent = trueThis.time.delayedCall(textDelay, onEvent, [], trueThis);
          timerReady = true;
          dealerWins = false;
        } else if (playerWinsFirst == true) {
          whatHappened = 'Your first hand wins!';
          timedEvent = trueThis.time.delayedCall(textDelay, onEvent, [], trueThis);
          timerReady = true;
          playerWinsFirst = false;
        } else if (playerLostFirst == true) {
          whatHappened = 'Your first hand lost!';
          timedEvent = trueThis.time.delayedCall(textDelay, onEvent, [], trueThis);
          timerReady = true;
          playerLostFirst = false;
        } else if (playerWinsSecond == true) {
          whatHappened = 'Your second hand wins!';
          timedEvent = trueThis.time.delayedCall(textDelay, onEvent, [], trueThis);
          timerReady = true;
          playerWinsSecond = false;
        } else if (playerLostSecond == true) {
          whatHappened = 'Your second hand lost!';
          timedEvent = trueThis.time.delayedCall(textDelay, onEvent, [], trueThis);
          timerReady = true;
          playerLostSecond = false;
        }
        aBetHand2 = aBetHand1;
        wallet = wallet - aBetHand2;
        hideFrontSideCards1();
        hideActionButtons();
      });


      if (Phaser.Input.Keyboard.JustDown(keyONE)) { // HIT

        console.log("Hit.")
        firstDeal = false;
        playerInput = false;
        actionHit();
        actionValidate();
        if (playerWins == true) {
          whatHappened = 'You win!';
          timedEvent = this.time.delayedCall(textDelay, onEvent, [], this);
          timerReady = true;
          playerWins = false;
        } else if (dealerWins == true) {
          whatHappened = 'Dealer \n wins!';
          timedEvent = this.time.delayedCall(textDelay, onEvent, [], this);
          timerReady = true;
          dealerWins = false;
        } else if (playerWinsFirst == true) {
          whatHappened = 'Your first hand wins!';
          timedEvent = this.time.delayedCall(textDelay, onEvent, [], this);
          timerReady = true;
          playerWinsFirst = false;
        } else if (playerLostFirst == true) {
          whatHappened = 'Your first hand lost!';
          timedEvent = this.time.delayedCall(textDelay, onEvent, [], this);
          timerReady = true;
          playerLostFirst = false;
        } else if (playerWinsSecond == true) {
          whatHappened = 'Your second hand wins!';
          timedEvent = this.time.delayedCall(textDelay, onEvent, [], this);
          timerReady = true;
          playerWinsSecond = false;
        } else if (playerLostSecond == true) {
          whatHappened = 'Your second hand lost!';
          timedEvent = this.time.delayedCall(textDelay, onEvent, [], this);
          timerReady = true;
          playerLostSecond = false;
        }
      } else if (Phaser.Input.Keyboard.JustDown(keyTWO)) { // STAND
        console.log("Stand.")
        firstDeal = false;
        playerInput = false;
        actionStand();
      } else if (Phaser.Input.Keyboard.JustDown(keyTHREE)) { // DOUBLE DOWN
        console.log("Double down.")
        firstDeal = false;
        playerInput = false;
        actionDoubleDown();
        if (playerWins == true) {
          whatHappened = 'You win!';
          timedEvent = this.time.delayedCall(textDelay, onEvent, [], this);
          timerReady = true;
          playerWins = false;
        } else if (dealerWins == true) {
          whatHappened = 'Dealer \n wins!';
          timedEvent = this.time.delayedCall(textDelay, onEvent, [], this);
          timerReady = true;
          dealerWins = false;
        }
      } else if (Phaser.Input.Keyboard.JustDown(keyFOUR)) { // SURRENDER
        console.log("Surrender.")
        firstDeal = true;
        playerInput = false;
        betPlacedMessage = true;
        betPlacedAction = false;
        actionSurrender();
      } else if (Phaser.Input.Keyboard.JustDown(keyFIVE)) { // SPLIT
        console.log("Split.")
        firstDeal = false;
        playerInput = false;
        actionSplit();
        if (playerWins == true) {
          whatHappened = 'You win!';
          timedEvent = this.time.delayedCall(textDelay, onEvent, [], this);
          timerReady = true;
          playerWins = false;
        } else if (playerWinsFirst == true) {
          whatHappened = 'Your first hand wins!';
          timedEvent = this.time.delayedCall(textDelay, onEvent, [], this);
          timerReady = true;
          playerWinsFirst = false;
        } else if (playerWinsSecond == true) {
          whatHappened = 'Your second hand wins!';
          timedEvent = this.time.delayedCall(textDelay, onEvent, [], this);
          timerReady = true;
          playerWinsSecond = false;
        }
        actionValidate();
        if (playerWins == true) {
          whatHappened = 'You win!';
          timedEvent = this.time.delayedCall(textDelay, onEvent, [], this);
          timerReady = true;
          playerWins = false;
        } else if (dealerWins == true) {
          whatHappened = 'Dealer \n wins!';
          timedEvent = this.time.delayedCall(textDelay, onEvent, [], this);
          timerReady = true;
          dealerWins = false;
        } else if (playerWinsFirst == true) {
          whatHappened = 'Your first hand wins!';
          timedEvent = this.time.delayedCall(textDelay, onEvent, [], this);
          timerReady = true;
          playerWinsFirst = false;
        } else if (playerLostFirst == true) {
          whatHappened = 'Your first hand lost!';
          timedEvent = this.time.delayedCall(textDelay, onEvent, [], this);
          timerReady = true;
          playerLostFirst = false;
        } else if (playerWinsSecond == true) {
          whatHappened = 'Your second hand wins!';
          timedEvent = this.time.delayedCall(textDelay, onEvent, [], this);
          timerReady = true;
          playerWinsSecond = false;
        } else if (playerLostSecond == true) {
          whatHappened = 'Your second hand lost!';
          timedEvent = this.time.delayedCall(textDelay, onEvent, [], this);
          timerReady = true;
          playerLostSecond = false;
        }
        aBetHand2 = aBetHand1;
        wallet = wallet - aBetHand2;
        hideFrontSideCards1();
      }

    } else if (splitHandPossibility == false) {
      //------------------------------------------------------------------------------------------------------------------------------------------------------------------------
      //------------------------------------------------------------------------------------------------------------------------------------------------------------------------

      if (activateButtons == true) {
        buttonAction1.visible = true;
        buttonAction1Rect.visible = true;
        buttonAction2.visible = true;
        buttonAction2Rect.visible = true;
        buttonAction3.visible = true;
        buttonAction3Rect.visible = true;
        buttonAction4.visible = true;
        buttonAction4Rect.visible = true;
        buttonAction1.removeAllListeners('pointerdown');
        buttonAction2.removeAllListeners('pointerdown');
        buttonAction3.removeAllListeners('pointerdown');
        buttonAction4.removeAllListeners('pointerdown');
        buttonAction5.removeAllListeners('pointerdown');

        buttonAction1.on('pointerdown', function () {
          console.log("Hit.")
          firstDeal = false;
          playerInput = false;
          actionHit();
          actionValidate();
          if (playerWins == true) {
            whatHappened = 'You win!';
            timedEvent = trueThis.time.delayedCall(textDelay, onEvent, [], trueThis);
            timerReady = true;
            playerWins = false;
          } else if (dealerWins == true) {
            whatHappened = 'Dealer \n wins!';
            timedEvent = trueThis.time.delayedCall(textDelay, onEvent, [], this);
            timerReady = true;
            dealerWins = false;
          } else if (playerWinsFirst == true) {
            whatHappened = 'Your first hand wins!';
            timedEvent = trueThis.time.delayedCall(textDelay, onEvent, [], trueThis);
            timerReady = true;
            playerWinsFirst = false;
          } else if (playerLostFirst == true) {
            whatHappened = 'Your first hand lost!';
            timedEvent = trueThis.time.delayedCall(textDelay, onEvent, [], trueThis);
            timerReady = true;
            playerLostFirst = false;
          } else if (playerWinsSecond == true) {
            whatHappened = 'Your second hand wins!';
            timedEvent = trueThis.time.delayedCall(textDelay, onEvent, [], trueThis);
            timerReady = true;
            playerWinsSecond = false;
          } else if (playerLostSecond == true) {
            whatHappened = 'Your second hand lost!';
            timedEvent = trueThis.time.delayedCall(textDelay, onEvent, [], trueThis);
            timerReady = true;
            playerLostSecond = false;
          }
          hideActionButtons();
        });

        buttonAction2.on('pointerdown', function () {
          console.log("Stand.")
          firstDeal = false;
          playerInput = false;
          actionStand();
          hideActionButtons();
        });

        buttonAction3.on('pointerdown', function () {
          console.log("Double down.")
          firstDeal = false;
          playerInput = false;
          actionDoubleDown();
          if (playerWins == true) {
            whatHappened = 'You win!';
            timedEvent = trueThis.time.delayedCall(textDelay, onEvent, [], trueThis);
            timerReady = true;
            playerWins = false;
          } else if (dealerWins == true) {
            whatHappened = 'Dealer \n wins!';
            timedEvent = trueThis.time.delayedCall(textDelay, onEvent, [], trueThis);
            timerReady = true;
            dealerWins = false;
          }
          hideActionButtons();
        });

        buttonAction4.on('pointerdown', function () {
          console.log("Surrender.")
          firstDeal = true;
          playerInput = false;
          betPlacedMessage = true;
          betPlacedAction = false;
          actionSurrender();
          hideActionButtons();
        });
        activateButtons = false;
      }

      if (Phaser.Input.Keyboard.JustDown(keyONE)) { // HIT
        console.log("Hit.")
        firstDeal = false;
        playerInput = false;
        actionHit();
        actionValidate();
        if (playerWins == true) {
          whatHappened = 'You win!';
          timedEvent = this.time.delayedCall(textDelay, onEvent, [], this);
          timerReady = true;
          playerWins = false;
        } else if (dealerWins == true) {
          whatHappened = 'Dealer \n wins!';
          timedEvent = this.time.delayedCall(textDelay, onEvent, [], this);
          timerReady = true;
          dealerWins = false;
        } else if (playerWinsFirst == true) {
          whatHappened = 'Your first hand wins!';
          timedEvent = this.time.delayedCall(textDelay, onEvent, [], this);
          timerReady = true;
          playerWinsFirst = false;
        } else if (playerLostFirst == true) {
          whatHappened = 'Your first hand lost!';
          timedEvent = this.time.delayedCall(textDelay, onEvent, [], this);
          timerReady = true;
          playerLostFirst = false;
        } else if (playerWinsSecond == true) {
          whatHappened = 'Your second hand wins!';
          timedEvent = this.time.delayedCall(textDelay, onEvent, [], this);
          timerReady = true;
          playerWinsSecond = false;
        } else if (playerLostSecond == true) {
          whatHappened = 'Your second hand lost!';
          timedEvent = this.time.delayedCall(textDelay, onEvent, [], this);
          timerReady = true;
          playerLostSecond = false;
        }
      } else if (Phaser.Input.Keyboard.JustDown(keyTWO)) { // STAND
        console.log("Stand.")
        firstDeal = false;
        playerInput = false;
        actionStand();
      } else if (Phaser.Input.Keyboard.JustDown(keyTHREE)) { // DOUBLE DOWN
        console.log("Double down.")
        firstDeal = false;
        playerInput = false;
        actionDoubleDown();
        if (playerWins == true) {
          whatHappened = 'You win!';
          timedEvent = this.time.delayedCall(textDelay, onEvent, [], this);
          timerReady = true;
          playerWins = false;
        } else if (dealerWins == true) {
          whatHappened = 'Dealer \n wins!';
          timedEvent = this.time.delayedCall(textDelay, onEvent, [], this);
          timerReady = true;
          dealerWins = false;
        }
      } else if (Phaser.Input.Keyboard.JustDown(keyFOUR)) { // SURRENDER
        console.log("Surrender.")
        firstDeal = true;
        playerInput = false;
        betPlacedMessage = true;
        betPlacedAction = false;
        actionSurrender();
      }
    }
  }



  if (dealersTurn == true) {
    hideFrontSideCards3();
    for (var i = 0; i < dealersHand.length; i++) {
      for (var key in deckDictionary) {
        if (dealersHand[i] == deckDictionary[key][0] || dealersHand[i] == deckDictionary[key][1] || dealersHand[i] == deckDictionary[key][2] || dealersHand[i] == deckDictionary[key][3] || dealersHand[i] == deckDictionary[key][4] || dealersHand[i] == deckDictionary[key][5] || dealersHand[i] == deckDictionary[key][6] || dealersHand[i] == deckDictionary[key][7]) {
          if (dealersHand[i].slice(-1) == "0") {
            spritesheetPointer = frontsideCards3_1;
          } else if (dealersHand[i].slice(-1) == "1") {
            spritesheetPointer = frontsideCards3_2;
          } else if (dealersHand[i].slice(-1) == "2") {
            spritesheetPointer = frontsideCards3_3;
          } else if (dealersHand[i].slice(-1) == "3") {
            spritesheetPointer = frontsideCards3_4;
          } else if (dealersHand[i].slice(-1) == "4") {
            spritesheetPointer = frontsideCards3_5;
          } else if (dealersHand[i].slice(-1) == "5") {
            spritesheetPointer = frontsideCards3_6;
          } else if (dealersHand[i].slice(-1) == "6") {
            spritesheetPointer = frontsideCards3_7;
          } else if (dealersHand[i].slice(-1) == "7") {
            spritesheetPointer = frontsideCards3_8;
          }
          spritesheetPointer[key].visible = true;
          spritesheetPointer[key].setX(Phaser.Math.RoundTo(canvasWidth / 2) + i * cardMinimizeCoefficient * 4);
          spritesheetPointer[key].setY(Phaser.Math.RoundTo(canvasHeight / 4) - i * cardMinimizeCoefficient * 2);
        }
      }
    }

    if (openingHandDealer == true) {
      console.log("Dealer's turn.");
    } else {
      console.log("Dealer's hand is: " + dealersHand);
    }

    openingHandDealer = false;
    validateHand = new validateHands(openingHandDealer, "dealer", dealersHand);
    validateHand.validate()
    console.log("Dealer's dealerPointsCount: " + dealerPointsCount);

    if (playersHand.length == 0 && playersHand2.length == 0) { // both player's hands busted during player's turn -> dealer wins
      console.log("Dealer wins with " + dealerPointsCount + " and hand " + dealersHand);
      for (var i = 0; i < dealersHand.length; i++) {
        trashCards.push(dealersHand[i]);
      }
      dealersHand = [];
      firstDeal = true;
      playerInput = false;
      dealersTurn = false;
      betPlacedMessage = true;
      betPlacedAction = false;

      whatHappened = 'Dealer \n wins!';
      timedEvent = this.time.delayedCall(textDelay, onEvent, [], this);
      timerReady = true;

    } else if (dealerPointsCount < 17) {
      console.log("Dealer is picking a card...");
      dealersHand.push(dealersShoe[0]);
      dealersShoe.shift();
      firstDeal = false;
      playerInput = false;
      dealersTurn = true;
      openingHandDealer = false;
    } else if (dealerPointsCount == 21) {
      console.log("Dealer wins with " + dealerPointsCount + " and hand " + dealersHand);
      for (var i = 0; i < playersHand.length; i++) {
        trashCards.push(playersHand[i]);
      }
      playersHand = [];
      for (var i = 0; i < playersHand2.length; i++) {
        trashCards.push(playersHand2[i]);
      }
      playersHand2 = [];
      for (var i = 0; i < dealersHand.length; i++) {
        trashCards.push(dealersHand[i]);
      }
      dealersHand = [];
      firstDeal = true;
      playerInput = false;
      dealersTurn = false;
      openingHandDealer = true;
      betPlacedMessage = true;
      betPlacedAction = false;

      whatHappened = 'Dealer \n wins!';
      timedEvent = this.time.delayedCall(textDelay, onEvent, [], this);
      timerReady = true;

    } else if (dealerPointsCount > 21) {
      if (playersHand.length > 0) {
        validateHand = new validateHands(false, "player", playersHand);
        validateHand.validate()
        console.log("Player wins with " + playerPointsCount + " points and hand " + playersHand);
        for (var i = 0; i < playersHand.length; i++) {
          trashCards.push(playersHand[i]);
        }
        playersHand = [];
        wallet = wallet + aBetHand1 * 2
      }
      if (playersHand2.length > 0) {
        validateHand = new validateHands(false, "player", playersHand2);
        validateHand.validate()
        console.log("Player wins with " + playerPointsCount + " points and hand " + playersHand2);
        for (var i = 0; i < playersHand2.length; i++) {
          trashCards.push(playersHand2[i]);
        }
        playersHand2 = [];
        wallet = wallet + aBetHand2 * 2
      }

      for (var i = 0; i < dealersHand.length; i++) {
        trashCards.push(dealersHand[i]);
      }
      dealersHand = [];
      firstDeal = true;
      playerInput = false;
      dealersTurn = false;
      openingHandDealer = true;
      betPlacedMessage = true;
      betPlacedAction = false;
    } else if (dealerPointsCount >= 17 && dealerPointsCount < 21) {

      if (playersHand.length > 0) {
        validateHand = new validateHands(false, "player", playersHand);
        validateHand.validate()

        validateHand = new validateHands(false, "dealer", dealersHand);
        validateHand.validate()

        if (playerPointsCount > dealerPointsCount) {
          console.log("Player wins with " + playerPointsCount + " points over dealer's " + dealerPointsCount + " points.");
          wallet = wallet + aBetHand1 * 2
          whatHappened = 'You win!';
          timedEvent = this.time.delayedCall(textDelay, onEvent, [], this);
          timerReady = true;
        } else if (playerPointsCount == dealerPointsCount) {
          console.log("Push! Equal hand value of " + playerPointsCount + " points.");
          wallet = wallet + aBetHand1
          whatHappened = 'Push!';
          timedEvent = this.time.delayedCall(textDelay, onEvent, [], this);
          timerReady = true;
        } else if (playerPointsCount < dealerPointsCount) {
          console.log("Dealer wins with " + dealerPointsCount + " points over player's " + playerPointsCount + " points.");
          whatHappened = 'Dealer \n wins!';
          timedEvent = this.time.delayedCall(textDelay, onEvent, [], this);
          timerReady = true;
        }

        for (var i = 0; i < playersHand.length; i++) {
          trashCards.push(playersHand[i]);
        }
        playersHand = [];
      }

      if (playersHand2.length > 0) {
        validateHand = new validateHands(false, "player", playersHand2);
        validateHand.validate()

        validateHand = new validateHands(false, "dealer", dealersHand);
        validateHand.validate()

        if (playerPointsCount > dealerPointsCount) {
          console.log("Player wins with " + playerPointsCount + " points over dealer's " + dealerPointsCount + " points.");
          wallet = wallet + aBetHand2 * 2;
          whatHappened = 'You win!';
          timedEvent = this.time.delayedCall(textDelay, onEvent, [], this);
          timerReady = true;
        } else if (playerPointsCount == dealerPointsCount) {
          console.log("Push! Equal hand value of " + playerPointsCount + " points.");
          wallet = wallet + aBetHand2;
          whatHappened = 'Push!';
          timedEvent = this.time.delayedCall(textDelay, onEvent, [], this);
          timerReady = true;
        } else if (playerPointsCount < dealerPointsCount) {
          console.log("Dealer wins with " + dealerPointsCount + " points over player's " + playerPointsCount + " points.");
          whatHappened = 'Dealer \n wins!';
          timedEvent = this.time.delayedCall(textDelay, onEvent, [], this);
          timerReady = true;
        }
        for (var i = 0; i < playersHand2.length; i++) {
          trashCards.push(playersHand2[i]);
        }
        playersHand2 = [];
      }

      for (var i = 0; i < dealersHand.length; i++) {
        trashCards.push(dealersHand[i]);
      }
      dealersHand = [];
      firstDeal = true;
      playerInput = false;
      dealersTurn = false;
      openingHandDealer = true;
      betPlacedMessage = true;
      betPlacedAction = false;
    }
  }
}

// 1
function actionHit() {
  if (playersHand2.length == 0 && currentHand == 1) { // only one active hand
    playersHand.push(dealersShoe[0]);
    dealersShoe.shift();
  } else if (playersHand2.length > 0 && currentHand == 1) { // two active hands- 1st on turn
    playersHand.push(dealersShoe[0]);
    dealersShoe.shift();
  } else if (playersHand2.length > 0 && currentHand == 2) { // two active hands- 2nd on turn
    playersHand2.push(dealersShoe[0]);
    dealersShoe.shift();
  }
}

// 2
function actionStand() {
  if (playersHand2.length == 0 && currentHand == 1) { // only one active hand
    dealersTurn = true;
  } else if (playersHand2.length > 0 && currentHand == 1) { // two active hands- 1st on turn
    console.log("Player's second hand: " + playersHand2);
    console.log("Press key 1 - 3: \n 1. Hit \n 2. Stand \n 3. Double down \n 4. Surrender");
    firstDeal = false;
    playerInput = true;
    activateButtons = true;
    currentHand = 2;
  } else if (playersHand2.length > 0 && currentHand == 2) { // two active hands- 2nd on turn
    dealersTurn = true;
    currentHand = 1;
  }
}

// 3
function actionDoubleDown() {
  if (playersHand2.length == 0 && currentHand == 1) { // only one active hand
    playersHand.push(dealersShoe[0]);
    dealersShoe.shift();
    console.log("Player's first hand: " + playersHand);

    validateHand = new validateHands(firstDeal, "player", playersHand);
    validateHand.validate();

    if (playerPointsCount >= 21) { // round is over - player won or lost
      if (playerPointsCount == 21) {
        console.log("Player's hand " + playersHand + " reached 21 points and wins!");
        wallet = wallet + aBetHand1 * 2;
        playerWins = true;

      } else if (playerPointsCount > 21) {
        console.log("Player's hand " + playersHand + " busts with " + playerPointsCount + " points. Next round.");
        dealerWins = true;

      }

      for (var i = 0; i < playersHand.length; i++) {
        trashCards.push(playersHand[i]);
      }
      playersHand = [];

      for (var i = 0; i < dealersHand.length; i++) {
        trashCards.push(dealersHand[i]);
      }
      dealersHand = [];
      firstDeal = true;
      playerInput = false;
      betPlacedMessage = true;
      betPlacedAction = false;
    } else if (playerPointsCount < 21) { // player is on move, didn't reach 21
      dealersTurn = true;
    }

  } else if (playersHand2.length > 0 && currentHand == 1) { // two active hands- 1st on turn
    playersHand.push(dealersShoe[0]);
    dealersShoe.shift();
    console.log("Player's first hand: " + playersHand);

    validateHand = new validateHands(firstDeal, "player", playersHand);
    validateHand.validate();

    if (playerPointsCount >= 21) { // round is over - player won or lost
      if (playerPointsCount == 21) {
        console.log("Player's hand " + playersHand + " reached 21 points and wins!");
        wallet = wallet + aBetHand1 * 2;
        whatHappened = 'Your first hand wins!';
        timedEvent = this.time.delayedCall(textDelay, onEvent, [], this);
        timerReady = true;
      } else if (playerPointsCount > 21) {
        console.log("Player's hand " + playersHand + " busts with " + playerPointsCount + " points.");
        whatHappened = 'Your first hand lost!';
        timedEvent = this.time.delayedCall(textDelay, onEvent, [], this);
        timerReady = true;
      }

      for (var i = 0; i < playersHand.length; i++) {
        trashCards.push(playersHand[i]);
      }
      playersHand = [];
    }
    firstDeal = false;
    playerInput = true;
    activateButtons = true;
    currentHand = 2;
    betPlacedMessage = true;
    betPlacedAction = false;

  } else if (playersHand2.length > 0 && currentHand == 2) { // two active hands- 2nd on turn
    playersHand2.push(dealersShoe[0]);
    dealersShoe.shift();
    console.log("Player's second hand: " + playersHand2);

    validateHand = new validateHands(firstDeal, "player", playersHand2);
    validateHand.validate();

    if (playerPointsCount >= 21) { // round is over - player won or lost
      if (playerPointsCount == 21) {
        console.log("Player's second hand " + playersHand2 + " reached 21 points and wins!");
        wallet = wallet + aBetHand1 * 2;
        whatHappened = 'Your second hand wins!';
        timedEvent = this.time.delayedCall(textDelay, onEvent, [], this);
        timerReady = true;
      } else if (playerPointsCount > 21) {
        console.log("Player's second hand " + playersHand2 + " busts with " + playerPointsCount + " points.");
        whatHappened = 'Your second hand lost!';
        timedEvent = this.time.delayedCall(textDelay, onEvent, [], this);
        timerReady = true;
      }

      for (var i = 0; i < playersHand2.length; i++) {
        trashCards.push(playersHand2[i]);
      }
      playersHand2 = [];

      if (playersHand.length == 0) {
        firstDeal = true;
        playerInput = false;
        betPlacedMessage = true;
        betPlacedAction = false;
      } else {
        dealersTurn = true;
        currentHand = 1;
      }
    } else if (playerPointsCount < 21) { // player is on move, didn't reach 21
      dealersTurn = true;
      currentHand = 1;
    }
  }
}

// 4
function actionSurrender() {
  if (playersHand2.length == 0 && currentHand == 1) { // only one active hand
    for (var i = 0; i < playersHand.length; i++) {
      trashCards.push(playersHand[i]);
    }
    playersHand = [];
    for (var i = 0; i < dealersHand.length; i++) {
      trashCards.push(dealersHand[i]);
    }
    dealersHand = [];
    wallet = wallet + aBetHand1 / 2;
  } else if (playersHand2.length > 0 && currentHand == 1) { // two active hands- 1st on turn
    for (var i = 0; i < playersHand.length; i++) {
      trashCards.push(playersHand[i]);
    }
    playersHand = [];
    wallet = wallet + aBetHand1 / 2;
    console.log("Player's second hand: " + playersHand2);
    console.log("Press key 1 - 3: \n 1. Hit \n 2. Stand \n 3. Double down \n 4. Surrender");
    firstDeal = false;
    playerInput = true;
    activateButtons = true;
    currentHand = 2;
  } else if (playersHand2.length > 0 && currentHand == 2) { // two active hands- 2nd on turn
    if (playersHand.length == 0) {
      for (var i = 0; i < playersHand2.length; i++) {
        trashCards.push(playersHand2[i]);
      }
      playersHand2 = [];

      for (var i = 0; i < dealersHand.length; i++) {
        trashCards.push(dealersHand[i]);
      }
      dealersHand = [];
      firstDeal = true;
      playerInput = false;
      dealersTurn = false;
      currentHand = 1;
      betPlacedMessage = true;
      betPlacedAction = false;
      wallet = wallet + aBetHand2 / 2;
    } else {
      for (var i = 0; i < playersHand2.length; i++) {
        trashCards.push(playersHand2[i]);
      }
      playersHand2 = [];
      dealersTurn = true;
      currentHand = 1;
      wallet = wallet + aBetHand2 / 2;
    }
  }
}

// 5
function actionSplit() {
  playersHand2.push(playersHand[0]);
  playersHand.shift();
  playersHand.push(dealersShoe[0]);
  dealersShoe.shift();
  playersHand2.push(dealersShoe[0]);
  dealersShoe.shift();
  actionValidateSplit();
}

function shuffleArray(a) {
  //https://stackoverflow.com/questions/6274339/how-can-i-shuffle-an-array
  var j, x, i;
  for (i = a.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    x = a[i];
    a[i] = a[j];
    a[j] = x;
  }
  return a;
}

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function actionValidate() {
  if (playersHand2.length == 0 && currentHand == 1) { // single hand, or last hand
    validateHand = new validateHands(firstDeal, "player", playersHand);
    validateHand.validate();
    if (playerPointsCount >= 21) { // round is over - player won or lost
      if (playerPointsCount == 21) {
        console.log("Player's hand " + playersHand + " reached 21 points and wins!");
        wallet = wallet + aBetHand1 * 2;
        playerWins = true;

      } else if (playerPointsCount > 21) {
        console.log("Player's hand " + playersHand + " busts with " + playerPointsCount + " points. Next round.");
        dealerWins = true;

      }

      depthZindex = 0;
      for (var i = 0; i < playersHand.length; i++) {
        depthZindex += 1;
        for (var key in deckDictionary) {
          if (playersHand[i] == deckDictionary[key][0] || playersHand[i] == deckDictionary[key][1] || playersHand[i] == deckDictionary[key][2] || playersHand[i] == deckDictionary[key][3] || playersHand[i] == deckDictionary[key][4] || playersHand[i] == deckDictionary[key][5] || playersHand[i] == deckDictionary[key][6] || playersHand[i] == deckDictionary[key][7]) {
            if (playersHand[i].slice(-1) == "0") {
              spritesheetPointer = frontsideCards1_1;
            } else if (playersHand[i].slice(-1) == "1") {
              spritesheetPointer = frontsideCards1_2;
            } else if (playersHand[i].slice(-1) == "2") {
              spritesheetPointer = frontsideCards1_3;
            } else if (playersHand[i].slice(-1) == "3") {
              spritesheetPointer = frontsideCards1_4;
            } else if (playersHand[i].slice(-1) == "4") {
              spritesheetPointer = frontsideCards1_5;
            } else if (playersHand[i].slice(-1) == "5") {
              spritesheetPointer = frontsideCards1_6;
            } else if (playersHand[i].slice(-1) == "6") {
              spritesheetPointer = frontsideCards1_7;
            } else if (playersHand[i].slice(-1) == "7") {
              spritesheetPointer = frontsideCards1_8;
            }
            spritesheetPointer[key].visible = true;
            spritesheetPointer[key].setX(Phaser.Math.RoundTo(canvasWidth / 2) + i * cardMinimizeCoefficient * 4);
            spritesheetPointer[key].setY(Phaser.Math.RoundTo(canvasHeight / 1.2) - i * cardMinimizeCoefficient * 2);
            spritesheetPointer[key].depth = depthZindex;
          }
        }
      }

      for (var i = 0; i < playersHand.length; i++) {
        trashCards.push(playersHand[i]);
      }
      playersHand = [];

      for (var i = 0; i < dealersHand.length; i++) {
        trashCards.push(dealersHand[i]);
      }
      dealersHand = [];
      firstDeal = true;
      playerInput = false;
      betPlacedMessage = true;
      betPlacedAction = false;
    } else if (playerPointsCount < 21) { // player is on move, didn't reach 21
      console.log("Player's hand: " + playersHand);
      console.log("Player's playerPointsCount: " + playerPointsCount);
      console.log("Press key 1 - 3: \n 1. Hit \n 2. Stand \n 3. Double down \n 4. Surrender");
      firstDeal = false;
      playerInput = true;
      activateButtons = true;
      //buttonAction1.removeInteractive();
    }

  } else if (playersHand2.length > 0 && currentHand == 1) { // two active hands in game - first is on move

    validateHand = new validateHands(firstDeal, "player", playersHand);
    validateHand.validate();
    if (playerPointsCount >= 21) { // 1st hand won or lost
      if (playerPointsCount == 21) {
        console.log("Player's first hand " + playersHand + " reached 21 points and wins!");
        wallet = wallet + aBetHand1 * 2;
        playerWinsFirst = true;

      } else if (playerPointsCount > 21) {
        console.log("Player's first hand " + playersHand + " busts with " + playerPointsCount + " points.");
        playerLostFirst = true;

      }

      depthZindex = 0;
      for (var i = 0; i < playersHand.length; i++) {
        depthZindex += 1;
        for (var key in deckDictionary) {
          if (playersHand[i] == deckDictionary[key][0] || playersHand[i] == deckDictionary[key][1] || playersHand[i] == deckDictionary[key][2] || playersHand[i] == deckDictionary[key][3] || playersHand[i] == deckDictionary[key][4] || playersHand[i] == deckDictionary[key][5] || playersHand[i] == deckDictionary[key][6] || playersHand[i] == deckDictionary[key][7]) {
            if (playersHand[i].slice(-1) == "0") {
              spritesheetPointer = frontsideCards1_1;
            } else if (playersHand[i].slice(-1) == "1") {
              spritesheetPointer = frontsideCards1_2;
            } else if (playersHand[i].slice(-1) == "2") {
              spritesheetPointer = frontsideCards1_3;
            } else if (playersHand[i].slice(-1) == "3") {
              spritesheetPointer = frontsideCards1_4;
            } else if (playersHand[i].slice(-1) == "4") {
              spritesheetPointer = frontsideCards1_5;
            } else if (playersHand[i].slice(-1) == "5") {
              spritesheetPointer = frontsideCards1_6;
            } else if (playersHand[i].slice(-1) == "6") {
              spritesheetPointer = frontsideCards1_7;
            } else if (playersHand[i].slice(-1) == "7") {
              spritesheetPointer = frontsideCards1_8;
            }
            spritesheetPointer[key].visible = true;
            spritesheetPointer[key].setX(Phaser.Math.RoundTo(canvasWidth / 2) + i * cardMinimizeCoefficient * 4);
            spritesheetPointer[key].setY(Phaser.Math.RoundTo(canvasHeight / 1.2) - i * cardMinimizeCoefficient * 2);
            spritesheetPointer[key].depth = depthZindex;
          }
        }
      }

      for (var i = 0; i < playersHand.length; i++) {
        trashCards.push(playersHand[i]);
      }
      playersHand = [];

      console.log("Player's'second hand: " + playersHand2);
      console.log("Press key 1 - 3: \n 1. Hit \n 2. Stand \n 3. Double down \n 4. Surrender");
      firstDeal = false;
      playerInput = true;
      activateButtons = true;
      currentHand = 2
    } else if (playerPointsCount < 21) { // player is on move, didn't reach 21
      console.log("Player's hand: " + playersHand);
      console.log("Press key 1 - 3: \n 1. Hit \n 2. Stand \n 3. Double down \n 4. Surrender");
      firstDeal = false;
      playerInput = true;
      activateButtons = true;
      currentHand = 1;
    }

  } else if (playersHand2.length > 0 && currentHand == 2) { // two active hands in game - second hand is on move

    validateHand = new validateHands(firstDeal, "player", playersHand2);
    validateHand.validate();
    if (playerPointsCount >= 21) { // 2nd hand won or lost
      if (playerPointsCount == 21) {
        console.log("Player's second hand " + playersHand2 + " reached 21 points and wins!");
        playerWinsSecond = true;

      } else if (playerPointsCount > 21) {
        console.log("Player's second hand " + playersHand2 + " busts with " + playerPointsCount + " points.");
        playerLostSecond = true;

      }

      depthZindex = 0;
      for (var i = 0; i < playersHand2.length; i++) {
        depthZindex += 1;
        for (var key in deckDictionary) {
          if (playersHand2[i] == deckDictionary[key][0] || playersHand2[i] == deckDictionary[key][1] || playersHand2[i] == deckDictionary[key][2] || playersHand2[i] == deckDictionary[key][3] || playersHand2[i] == deckDictionary[key][4] || playersHand2[i] == deckDictionary[key][5] || playersHand2[i] == deckDictionary[key][6] || playersHand2[i] == deckDictionary[key][7]) {
            if (playersHand2[i].slice(-1) == "0") {
              spritesheetPointer = frontsideCards1_1;
            } else if (playersHand2[i].slice(-1) == "1") {
              spritesheetPointer = frontsideCards1_2;
            } else if (playersHand2[i].slice(-1) == "2") {
              spritesheetPointer = frontsideCards1_3;
            } else if (playersHand2[i].slice(-1) == "3") {
              spritesheetPointer = frontsideCards1_4;
            } else if (playersHand2[i].slice(-1) == "4") {
              spritesheetPointer = frontsideCards1_5;
            } else if (playersHand2[i].slice(-1) == "5") {
              spritesheetPointer = frontsideCards1_6;
            } else if (playersHand2[i].slice(-1) == "6") {
              spritesheetPointer = frontsideCards1_7;
            } else if (playersHand2[i].slice(-1) == "7") {
              spritesheetPointer = frontsideCards1_8;
            }
            spritesheetPointer[key].visible = true;
            spritesheetPointer[key].setX(Phaser.Math.RoundTo(canvasWidth / 2) + i * cardMinimizeCoefficient * 4);
            spritesheetPointer[key].setY(Phaser.Math.RoundTo(canvasHeight / 1.2) - i * cardMinimizeCoefficient * 2);
            spritesheetPointer[key].depth = depthZindex;
          }
        }
      }

      for (var i = 0; i < playersHand2.length; i++) {
        trashCards.push(playersHand2[i]);
      }
      playersHand2 = [];

      dealersTurn = true;
      currentHand = 1;
    } else if (playerPointsCount < 21) { // player is on move, didn't reach 21
      console.log("Player's second hand: " + playersHand2);
      console.log("Press key 1 - 3: \n 1. Hit \n 2. Stand \n 3. Double down \n 4. Surrender");
      firstDeal = false;
      playerInput = true;
      activateButtons = true;
      currentHand = 2;
    }
  }
}

function actionValidateSplit() {
  console.log("Player's hand 1: " + playersHand)
  validateHand = new validateHands(firstDeal, "player", playersHand);
  validateHand.validate()
  playerPointsCount1 = playerPointsCount;

  console.log("Player's hand 2: " + playersHand2)
  validateHand = new validateHands(firstDeal, "player", playersHand2);
  validateHand.validate()
  playerPointsCount2 = playerPointsCount;

  if (playerPointsCount1 == 21 && playerPointsCount2 == 21) { // both 1st and 2nd hand won
    console.log("Both hands reached 21 points and won!")
    for (var i = 0; i < playersHand.length; i++) {
      trashCards.push(playersHand[i]);
    }
    playersHand = [];

    for (var i = 0; i < playersHand2.length; i++) {
      trashCards.push(playersHand2[i]);
    }
    playersHand2 = [];

    for (var i = 0; i < dealersHand.length; i++) {
      trashCards.push(dealersHand[i]);
    }
    dealersHand = [];

    playerPointsCount = 0;
    playerPointsCount1 = 0;
    playerPointsCount2 = 0;
    currentHand = 1;

    firstDeal = true;
    playerInput = false;
    betPlacedMessage = true;
    betPlacedAction = false;
    playerWins = true;

  } else if (playerPointsCount1 == 21 && playerPointsCount2 < 21) { // only 1st hand won
    console.log("First hand  " + playersHand + " won with 21 points.");
    playerWinsFirst = true;


    for (var i = 0; i < playersHand.length; i++) {
      trashCards.push(playersHand[i]);
    }
    playersHand = [];
    playersHand = playersHand2;
    playersHand2 = [];

    playerPointsCount = 0;
    playerPointsCount1 = 0;
    playerPointsCount2 = 0;

    validateHand = new validateHands(firstDeal, "player", playersHand);
    validateHand.validate()

    console.log("Player's second hand  " + playersHand2 + " has " + playerPointsCount + " points. ");
    console.log("Press key 1 - 3: \n 1. Hit \n 2. Stand \n 3. Double down \n 4. Surrender");

    firstDeal = false;
    playerInput = true;
    activateButtons = true;
    currentHand = 1;

  } else if (playerPointsCount1 < 21 && playerPointsCount2 == 21) { // only 2nd hand won
    console.log("Second hand  " + playersHand2 + " won with 21 points.");
    playerWinsSecond = true;


    for (var i = 0; i < playersHand2.length; i++) {
      trashCards.push(playersHand2[i]);
    }
    playersHand2 = [];
    playerPointsCount = 0;
    playerPointsCount1 = 0;
    playerPointsCount2 = 0;

    validateHand = new validateHands(firstDeal, "player", playersHand);
    validateHand.validate()

    console.log("Player's first hand  " + playersHand + " has " + playerPointsCount + " points. ");
    console.log("Press key 1 - 3: \n 1. Hit \n 2. Stand \n 3. Double down \n 4. Surrender");

    firstDeal = false;
    playerInput = true;
    activateButtons = true;
    currentHand = 1;

  } else { // 1st and 2nd hand have less than 21 points
    firstDeal = false;
    playerInput = true;
    activateButtons = true;
    currentHand = 1;
  }
}

function hideFrontSideCards1() {
  for (var i = 0; i < frontsideCards1_1.length; i++) {
    frontsideCards1_1[i].visible = false;
    frontsideCards1_2[i].visible = false;
    frontsideCards1_3[i].visible = false;
    frontsideCards1_4[i].visible = false;
    frontsideCards1_5[i].visible = false;
    frontsideCards1_6[i].visible = false;
    frontsideCards1_7[i].visible = false;
    frontsideCards1_8[i].visible = false;
  }
}

function hideFrontSideCards2() {
  for (var i = 0; i < frontsideCards2_1.length; i++) {
    frontsideCards2_1[i].visible = false;
    frontsideCards2_2[i].visible = false;
    frontsideCards2_3[i].visible = false;
    frontsideCards2_4[i].visible = false;
    frontsideCards2_5[i].visible = false;
    frontsideCards2_6[i].visible = false;
    frontsideCards2_7[i].visible = false;
    frontsideCards2_8[i].visible = false;
  }
}

function hideFrontSideCards3() {
  for (var i = 0; i < frontsideCards3_1.length; i++) {
    frontsideCards3_1[i].visible = false;
    frontsideCards3_2[i].visible = false;
    frontsideCards3_3[i].visible = false;
    frontsideCards3_4[i].visible = false;
    frontsideCards3_5[i].visible = false;
    frontsideCards3_6[i].visible = false;
    frontsideCards3_7[i].visible = false;
    frontsideCards3_8[i].visible = false;
  }
}

function cleanBackSidecards() {
  for (var i = 0; i < cards * decks; i++) {
    backsideCadsShoe[i].visible = false;
  }
  for (var i = 0; i < dealersShoe.length; i++) {
    backsideCadsShoe[i].setX(Phaser.Math.RoundTo(canvasWidth / 1.25) + i * cardMinimizeCoefficient / 60);
    backsideCadsShoe[i].setY(Phaser.Math.RoundTo(canvasHeight / 2) - i * cardMinimizeCoefficient / 60);
    backsideCadsShoe[i].visible = true;
  }

  for (var i = 0; i < cards * decks; i++) {
    backsideCadsTrash[i].visible = false;
  }
  for (var i = 0; i < trashCards.length; i++) {
    backsideCadsTrash[i].setX(Phaser.Math.RoundTo(canvasWidth / 5) + i * cardMinimizeCoefficient / 60);
    backsideCadsTrash[i].setY(Phaser.Math.RoundTo(canvasHeight / 2) - i * cardMinimizeCoefficient / 60);
    backsideCadsTrash[i].visible = true;
  }
}

function hideChips() {
  chip_black.visible = false;
  chip_green.visible = false;
  chip_purple.visible = false;
  chip_red.visible = false;
  chip_white.visible = false;
}

function onEvent() {
  timerReady = false;
}

function hideButtonBets() {
  buttonBet1.visible = false;
  buttonBet1Rect.visible = false;
  buttonBet2.visible = false;
  buttonBet2Rect.visible = false;
  buttonBet3.visible = false;
  buttonBet3Rect.visible = false;
  buttonBet4.visible = false;
  buttonBet4Rect.visible = false;
  buttonBet5.visible = false;
  buttonBet5Rect.visible = false;
}

function hideActionButtons() {
  buttonAction1.visible = false;
  buttonAction1Rect.visible = false;
  buttonAction2.visible = false;
  buttonAction2Rect.visible = false;
  buttonAction3.visible = false;
  buttonAction3Rect.visible = false;
  buttonAction4.visible = false;
  buttonAction4Rect.visible = false;
  buttonAction5.visible = false;
  buttonAction5Rect.visible = false;
}

