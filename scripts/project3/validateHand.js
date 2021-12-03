function validateHands(firstDeal, player, playersHand) {
  this.firstDeal = firstDeal;
  this.player = player;
  this.playersHand = playersHand;
}

validateHands.prototype.validate = function () {
  splitHandPossibility = false;
  if (this.firstDeal == true && this.player == "player" && this.playersHand[0].charAt(0) == this.playersHand[1].charAt(0)) {
    splitHandPossibility = true;
    playerPointsCount = 0;
    for (var i = 0; i < this.playersHand.length; i++) {
      if (this.playersHand[i].charAt(0) == "2") {
        playerPointsCount = playerPointsCount + 2
      } else if (this.playersHand[i].charAt(0) == "3") {
        playerPointsCount = playerPointsCount + 3
      } else if (this.playersHand[i].charAt(0) == "4") {
        playerPointsCount = playerPointsCount + 4
      } else if (this.playersHand[i].charAt(0) == "5") {
        playerPointsCount = playerPointsCount + 5
      } else if (this.playersHand[i].charAt(0) == "6") {
        playerPointsCount = playerPointsCount + 6
      } else if (this.playersHand[i].charAt(0) == "7") {
        playerPointsCount = playerPointsCount + 7
      } else if (this.playersHand[i].charAt(0) == "8") {
        playerPointsCount = playerPointsCount + 8
      } else if (this.playersHand[i].charAt(0) == "9") {
        playerPointsCount = playerPointsCount + 9
      } else if (this.playersHand[i].charAt(0) == "1") {
        playerPointsCount = playerPointsCount + 10
      } else if (this.playersHand[i].charAt(0) == "J") {
        playerPointsCount = playerPointsCount + 10
      } else if (this.playersHand[i].charAt(0) == "Q") {
        playerPointsCount = playerPointsCount + 10
      } else if (this.playersHand[i].charAt(0) == "K") {
        playerPointsCount = playerPointsCount + 10
      } else if (this.playersHand[i].charAt(0) == "A") {
        playerPointsCount = playerPointsCount + 11
      }
    }

    if (playerPointsCount > 21) { // if hand busts and contains Aces, deduct 10 points for each Ace which busts the hand
      var aceCount = 0;
      for (var j = 0; j < this.playersHand.length; j++) {
        if (this.playersHand[j].charAt(0) == "A") {
          aceCount = aceCount + 1;
        }
      }
      if (aceCount > 0) {
        var aceIncrementor = 0;
        while (playerPointsCount > 21 && aceIncrementor < aceCount) {
          playerPointsCount = playerPointsCount - 10;
          aceIncrementor = aceIncrementor + 1;
        }
      }
    }

  } else if ((this.firstDeal == true || this.firstDeal == false) && this.player == "player") {
    splitHandPossibility = false;
    playerPointsCount = 0;
    for (var i = 0; i < this.playersHand.length; i++) {
      if (this.playersHand[i].charAt(0) == "2") {
        playerPointsCount = playerPointsCount + 2
      } else if (this.playersHand[i].charAt(0) == "3") {
        playerPointsCount = playerPointsCount + 3
      } else if (this.playersHand[i].charAt(0) == "4") {
        playerPointsCount = playerPointsCount + 4
      } else if (this.playersHand[i].charAt(0) == "5") {
        playerPointsCount = playerPointsCount + 5
      } else if (this.playersHand[i].charAt(0) == "6") {
        playerPointsCount = playerPointsCount + 6
      } else if (this.playersHand[i].charAt(0) == "7") {
        playerPointsCount = playerPointsCount + 7
      } else if (this.playersHand[i].charAt(0) == "8") {
        playerPointsCount = playerPointsCount + 8
      } else if (this.playersHand[i].charAt(0) == "9") {
        playerPointsCount = playerPointsCount + 9
      } else if (this.playersHand[i].charAt(0) == "1") {
        playerPointsCount = playerPointsCount + 10
      } else if (this.playersHand[i].charAt(0) == "J") {
        playerPointsCount = playerPointsCount + 10
      } else if (this.playersHand[i].charAt(0) == "Q") {
        playerPointsCount = playerPointsCount + 10
      } else if (this.playersHand[i].charAt(0) == "K") {
        playerPointsCount = playerPointsCount + 10
      } else if (this.playersHand[i].charAt(0) == "A") {
        playerPointsCount = playerPointsCount + 11
      }
    }

    if (playerPointsCount > 21) { // if hand busts and contains Aces, deduct 10 points for each Ace which busts the hand
      var aceCount = 0;
      for (var j = 0; j < this.playersHand.length; j++) {
        if (this.playersHand[j].charAt(0) == "A") {
          aceCount = aceCount + 1;
        }
      }
      if (aceCount > 0) {
        var aceIncrementor = 0;
        while (playerPointsCount > 21 && aceIncrementor < aceCount) {
          playerPointsCount = playerPointsCount - 10;
          aceIncrementor = aceIncrementor + 1;
        }
      }
    }

  } else if (this.firstDeal == false && this.player == "dealer") {
    dealerPointsCount = 0;
    for (var i = 0; i < this.playersHand.length; i++) {
      if (this.playersHand[i].charAt(0) == "2") {
        dealerPointsCount = dealerPointsCount + 2
      } else if (this.playersHand[i].charAt(0) == "3") {
        dealerPointsCount = dealerPointsCount + 3
      } else if (this.playersHand[i].charAt(0) == "4") {
        dealerPointsCount = dealerPointsCount + 4
      } else if (this.playersHand[i].charAt(0) == "5") {
        dealerPointsCount = dealerPointsCount + 5
      } else if (this.playersHand[i].charAt(0) == "6") {
        dealerPointsCount = dealerPointsCount + 6
      } else if (this.playersHand[i].charAt(0) == "7") {
        dealerPointsCount = dealerPointsCount + 7
      } else if (this.playersHand[i].charAt(0) == "8") {
        dealerPointsCount = dealerPointsCount + 8
      } else if (this.playersHand[i].charAt(0) == "9") {
        dealerPointsCount = dealerPointsCount + 9
      } else if (this.playersHand[i].charAt(0) == "1") {
        dealerPointsCount = dealerPointsCount + 10
      } else if (this.playersHand[i].charAt(0) == "J") {
        dealerPointsCount = dealerPointsCount + 10
      } else if (this.playersHand[i].charAt(0) == "Q") {
        dealerPointsCount = dealerPointsCount + 10
      } else if (this.playersHand[i].charAt(0) == "K") {
        dealerPointsCount = dealerPointsCount + 10
      } else if (this.playersHand[i].charAt(0) == "A") {
        dealerPointsCount = dealerPointsCount + 11
      }
    }


    if (dealerPointsCount > 21) { // if hand busts and contains Aces, deduct 10 points for each Ace which busts the hand
      var aceCount = 0;
      for (var j = 0; j < this.playersHand.length; j++) {
        if (this.playersHand[j].charAt(0) == "A") {
          aceCount = aceCount + 1;
        }
      }
      if (aceCount > 0) {
        var aceIncrementor = 0;
        while (dealerPointsCount > 21 && aceIncrementor < aceCount) {
          dealerPointsCount = dealerPointsCount - 10;
          aceIncrementor = aceIncrementor + 1;
        }
      }
    }
  }
}

validateHands.prototype.getCardCount = function () {
    var runningCount;
  if (this.firstDeal == true && this.player == "player") {
    for (var i = 0; i < this.playersHand.length; i++) {
      if (this.playersHand[i].charAt(0) == "2") {
        runningCount = runningCount + 1
      } else if (this.playersHand[i].charAt(0) == "3") {
        runningCount = runningCount + 1
      } else if (this.playersHand[i].charAt(0) == "4") {
        runningCount = runningCount + 1
      } else if (this.playersHand[i].charAt(0) == "5") {
        runningCount = runningCount + 1
      } else if (this.playersHand[i].charAt(0) == "6") {
        runningCount = runningCount + 1
      } else if (this.playersHand[i].charAt(0) == "7") {
        runningCount = runningCount + 0
      } else if (this.playersHand[i].charAt(0) == "8") {
        runningCount = runningCount + 0
      } else if (this.playersHand[i].charAt(0) == "9") {
        runningCount = runningCount + 0
      } else if (this.playersHand[i].charAt(0) == "1") {
        runningCount = runningCount - 1
      } else if (this.playersHand[i].charAt(0) == "J") {
        runningCount = runningCount - 1
      } else if (this.playersHand[i].charAt(0) == "Q") {
        runningCount = runningCount - 1
      } else if (this.playersHand[i].charAt(0) == "K") {
        runningCount = runningCount - 1
      } else if (this.playersHand[i].charAt(0) == "A") {
        runningCount = runningCount - 1
      }
    }
    trueCount = Math.round(runningCount / decks);
  } else if (this.firstDeal == false && this.player == "player") {
    if (this.playersHand[this.playersHand.length - 1].charAt(0) == "2") {
      runningCount = runningCount + 1
    } else if (this.playersHand[this.playersHand.length - 1].charAt(0) == "3") {
      runningCount = runningCount + 1
    } else if (this.playersHand[this.playersHand.length - 1].charAt(0) == "4") {
      runningCount = runningCount + 1
    } else if (this.playersHand[this.playersHand.length - 1].charAt(0) == "5") {
      runningCount = runningCount + 1
    } else if (this.playersHand[this.playersHand.length - 1].charAt(0) == "6") {
      runningCount = runningCount + 1
    } else if (this.playersHand[this.playersHand.length - 1].charAt(0) == "7") {
      runningCount = runningCount + 0
    } else if (this.playersHand[this.playersHand.length - 1].charAt(0) == "8") {
      runningCount = runningCount + 0
    } else if (this.playersHand[this.playersHand.length - 1].charAt(0) == "9") {
      runningCount = runningCount + 0
    } else if (this.playersHand[this.playersHand.length - 1].charAt(0) == "1") {
      runningCount = runningCount - 1
    } else if (this.playersHand[this.playersHand.length - 1].charAt(0) == "J") {
      runningCount = runningCount - 1
    } else if (this.playersHand[this.playersHand.length - 1].charAt(0) == "Q") {
      runningCount = runningCount - 1
    } else if (this.playersHand[this.playersHand.length - 1].charAt(0) == "K") {
      runningCount = runningCount - 1
    } else if (this.playersHand[this.playersHand.length - 1].charAt(0) == "A") {
      runningCount = runningCount - 1
    }
    trueCount = Math.round(runningCount / decks);
  } else if (this.firstDeal == true && this.player == "dealer") {
    if (this.playersHand[0].charAt(0) == "2") {
      runningCount = runningCount + 1
    } else if (this.playersHand[0].charAt(0) == "3") {
      runningCount = runningCount + 1
    } else if (this.playersHand[0].charAt(0) == "4") {
      runningCount = runningCount + 1
    } else if (this.playersHand[0].charAt(0) == "5") {
      runningCount = runningCount + 1
    } else if (this.playersHand[0].charAt(0) == "6") {
      runningCount = runningCount + 1
    } else if (this.playersHand[0].charAt(0) == "7") {
      runningCount = runningCount + 0
    } else if (this.playersHand[0].charAt(0) == "8") {
      runningCount = runningCount + 0
    } else if (this.playersHand[0].charAt(0) == "9") {
      runningCount = runningCount + 0
    } else if (this.playersHand[0].charAt(0) == "1") {
      runningCount = runningCount - 1
    } else if (this.playersHand[0].charAt(0) == "J") {
      runningCount = runningCount - 1
    } else if (this.playersHand[0].charAt(0) == "Q") {
      runningCount = runningCount - 1
    } else if (this.playersHand[0].charAt(0) == "K") {
      runningCount = runningCount - 1
    } else if (this.playersHand[0].charAt(0) == "A") {
      runningCount = runningCount - 1
    }

    trueCount = Math.round(runningCount / decks);
  } else if (this.firstDeal == false && this.player == "dealer") {
    if (this.playersHand[this.playersHand.length - 1].charAt(0) == "2") {
      runningCount = runningCount + 1
    } else if (this.playersHand[this.playersHand.length - 1].charAt(0) == "3") {
      runningCount = runningCount + 1
    } else if (this.playersHand[this.playersHand.length - 1].charAt(0) == "4") {
      runningCount = runningCount + 1
    } else if (this.playersHand[this.playersHand.length - 1].charAt(0) == "5") {
      runningCount = runningCount + 1
    } else if (this.playersHand[this.playersHand.length - 1].charAt(0) == "6") {
      runningCount = runningCount + 1
    } else if (this.playersHand[this.playersHand.length - 1].charAt(0) == "7") {
      runningCount = runningCount + 0
    } else if (this.playersHand[this.playersHand.length - 1].charAt(0) == "8") {
      runningCount = runningCount + 0
    } else if (this.playersHand[this.playersHand.length - 1].charAt(0) == "9") {
      runningCount = runningCount + 0
    } else if (this.playersHand[this.playersHand.length - 1].charAt(0) == "1") {
      runningCount = runningCount - 1
    } else if (this.playersHand[this.playersHand.length - 1].charAt(0) == "J") {
      runningCount = runningCount - 1
    } else if (this.playersHand[this.playersHand.length - 1].charAt(0) == "Q") {
      runningCount = runningCount - 1
    } else if (this.playersHand[this.playersHand.length - 1].charAt(0) == "K") {
      runningCount = runningCount - 1
    } else if (this.playersHand[this.playersHand.length - 1].charAt(0) == "A") {
      runningCount = runningCount - 1
    }
  }
  trueCount = Math.round(runningCount / decks);

}