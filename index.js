//var cardIndex; // the index of a card selected in deck

var userHandUI = $('#userHandUI');
var compHandUI = $('#compHandUI');
var userMatchesUI = $('#userMatchesUI');
var compMatchesUI = $('#compMatchesUI');

var userHandArray = [];
var compHandArray = [];
var userMatchesArray=[];
var compMatchesArray = [];

var newCard;
var deck = [];

// BUILD DECK AUTOMATICALLY
var buildDeck = function() {
	var numberOption =["ace","two","three", "four", "five", "six", "seven", "eight", "nine", "ten", "jack", "queen", "king"];
	var suitOption = ["spades", "clubs", "diamonds", "hearts"];

	for (i = 0; i < numberOption.length; i++) {
		for(var j = 0; j < suitOption.length; j++)  {
		    deck.push(
		    	{"cardNumber": numberOption[i], "cardSuit": suitOption[j], "cardId": suitOption[j] + numberOption[i]}
		    );
		}
	}
}


// SELECT RANDOM CARD FROM DECK

	var drawFromDeck = function() {
		var cardIndex = Math.floor((Math.random() * deck.length - 1) + 1);
		console.log(cardIndex);
		deck.splice(cardIndex, 1);
		newCard = deck[cardIndex];
		return newCard;
	}


//CREATE UI CARD

	var createCard = function(cardObject) {
		console.log('<div class="card cardInHand ' + cardObject.cardId + ' ' + cardObject.cardNumber + '"></div>');
		return '<div class="card cardInHand ' + cardObject.cardId + ' ' + cardObject.cardNumber + '"></div>';
	}


// ADD TO HAND

	var addToHand = function(array, hand, cardDiv, cardObject) {
		console.log('move to hand firing');
		array.push(cardObject);
		hand.append(cardDiv);	
	} 


// DEAL 

var deal = function(){
	while (userHandArray.length < 7) {
		addToHand(compHandArray, compHandUI, createCard(drawFromDeck()), newCard);
		addToHand(userHandArray, userHandUI, createCard(drawFromDeck()), newCard);
	}
}

// CHECK FOR MATCHES IN OPPONENT HAND (and prep for retrieval)

var checkForMatch = function (card, playerHandArray, opponentHandArray) {
	var matches = 0;
	for (var i = 0; i < opponentHandArray.length; i++) {
		if (opponentHandArray[i].cardNumber == card) {
			var uiClass = opponentHandArray[i].cardId;
			$('.' + uiClass).addClass('gotcha');
			playerHandArray.push(opponentHandArray[i]);
			opponentHandArray.splice(opponentHandArray[i], 1);
			matches += 1;
		}
	}
	return matches;
}


// MATCH MESSAGING (right now would need to be called w/ checkForMatch)

var matchMessaging = function(matches) {
	if (matches == 0) {
		console.log('no matches, sorry');
	}
	else if (matches == 1) {
		console.log('you found one!');
	}
	else if (matches > 1 && matches < 4) {
		console.log('you found some!');
	}
	else {
		console.log('error');
	}
}

			//matchMessaging(checkForMatch('six', userHandArray));


// RETRIEVE MATCHES FROM OPPONENT IN UI

var retrieveMatches = function(playerHandUI) {
	var matchesWon = $('.gotcha');
	console.log(matchesWon);
	playerHandUI.append(matchesWon);
	matchesWon.removeClass('gotcha');
}


// CHECK FOR SET 

var checkForSet = function(hand) {
	for (var i = 0; i < hand.length; i++) {
		var setCount = 0;
		var thisCardId = hand[i].cardId;
		for (var j = 0; j < hand.length; j++) {
			if (i != j) {
				if (hand[i].cardNumber == hand[j].cardNumber) {
					setCount += 1;
				}
			}	
		}
		console.log(setCount);
		if (setCount == 3) {
			var setNumber = hand[i].cardNumber;
			$('.' + setNumber).addClass('newSet');
			return setNumber;
		}
	}
}







buildDeck();
deal();
checkForSet(userHandArray);
checkForSet(compHandArray);


		// checkForMatch('eight', userHandArray, compHandArray);
		// 1
		// retrieveMatches(userHandUI, compHandUI);



