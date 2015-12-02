/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var hf = __webpack_require__(1);
	var gl = __webpack_require__(2);

	var cardImages = [];
	var promises = [];
	var numCards = 12;
	var delay = 250;
	var openingAnimationComplete = false;


	$('.highscorenumeric').replaceWith('<h2 class="highscorenumeric">' +
	  (+localStorage.getItem('highScore')).toFixed(0) + '</h2>');

	for (var i=0; i<numCards; i++){
	  promises.push(hf.retrieveImage());
	}

	Promise.all(promises).then(function(imageArrays){
	  imageArrays.map(function(elem){
	    cardImages.push(hf.handleImage(elem));
	  });
	  cardImages = hf.elmiminateDuplicateArrayElements(cardImages);
	  if (cardImages.length > numCards/2){
	    cardImages = cardImages.slice(0, numCards/2);
	  }
	  cardImages = cardImages.concat(cardImages);
	  cardImages = hf.shuffleArrayElements(cardImages);
	  hf.insertCards(numCards, cardImages);
	  hf.showAllCardsThenHide('.card', 'flip', delay, numCards, gl.gameLoop);
	});


/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = {
	  createCard: function(selector, image, num){
	    $(selector).append('<div class="container"><div class="card"><div\
	     class="face front"><p>'+num+'</p></div><div class="face back"><img\
	     id="'+ num + '" src="' + image + '"</div></div></div>');
	  },

	  insertCards: function(count, imageArray){
	    for (var i=0; i<count; i=i+1){
	      this.createCard($('.main'), imageArray[i], i);
	    }
	    return true;
	  },

	  retrieveImage: function(){
	    return new Promise(function(succeed, fail){
	      var req = new XMLHttpRequest();
	      req.responseType = 'arraybuffer';
	      req.open('GET', 'http://lorempixel.com/150/150/', true);
	      req.onload = function(){
	        if (req.status < 400) {
	          succeed(req.response);
	        } else {
	          fail(new Error('Request failed: ' + req.statusText));
	        }
	      };
	      req.addEventListener('error', function(){
	        fail(new Error('Network error'));
	      });
	      req.send(null);
	    });
	  },

	  handleImage: function(text){
	    var arr = new Uint8Array(text);
	    var raw = String.fromCharCode.apply(null, arr);
	    var b64 = btoa(raw);
	    var dataURL='data:image/jpeg;base64,'+b64;
	    return dataURL;
	  },

	  addClickEventListener: function(target, cssClass){
	    // usage addClickEventListener('.card', 'flip')
	    $(target).click(function(){
	      $(this).addClass(cssClass);
	    });
	  },

	  removeClickEventListener: function(target){
	    $(target).off('click');
	  },

	  elmiminateDuplicateArrayElements: function(arr){
	    var uniqueArray = arr.filter(function(elem, pos) {
	      return arr.indexOf(elem) === pos;
	    });
	    return uniqueArray;
	  },

	  shuffleArrayElements: function(array){
	    for (var i = array.length - 1; i > 0; i--) {
	      var j = Math.floor(Math.random() * (i + 1));
	      var temp = array[i];
	      array[i] = array[j];
	      array[j] = temp;
	    }
	    return array;
	  },

	  showAllCardsThenHide: function(target, cssClass, delay, numCards, cb){
	    // reveal card images one by one to give preview opportunity
	    $(target).each(function(i) {
	      var $card = $(this);
	      setTimeout(function() {
	        $card.addClass(cssClass);
	        // $card.click(function(){
	        //   $card.toggleClass(cssClass);
	        // });
	      }, delay*i);
	    });
	    // now hide them in reverse order
	    // have to delay this function until the previous code is complete
	    setTimeout(function() {
	      // $($(target).get().reverse()).each(function(i) {
	        // var $card = $(this);
	      //   setTimeout(function() {
	          $(target).toggleClass(cssClass);
	        // }, delay*i);
	      // });
	    }, delay*numCards)
	    setTimeout(cb, delay*numCards*1.1);
	  }
	};


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var hf = __webpack_require__(1);

	var score = {
	  score: 0,
	  multiplier: 1000,
	  consecutiveCorrect: 0,
	  consecutiveWrong: 0,
	  startTime: 0,
	  endTime: 0
	};

	mainTimer = null;

	function gameLoop(){
	  // animation is complete now - make it possible to reveal a card

	  hf.addClickEventListener('.card', 'flip');
	  $('.turnMessage>h2').replaceWith('<h2 class="turnMessage">' + 'Go! Time counts!' + '</h2>');
	  if (score.startTime === 0) {
	    score.startTime = Date.now();
	  };
	  mainTimer = setInterval(checkForMatch, 30);
	}

	function checkForMatch(){
	  // this function handles game state managment
	  var $flippedCards = $('div.card.flip').not($('div.card.matched'));
	  // user flipped a card
	  if ($flippedCards.length === 1){
	    if (score.startTime===0) {
	      score.startTime = Date.now();
	    }
	  }
	  // user flipped over second card - match?
	  if ($flippedCards.length === 2){
	    if (score.endTime===0) {
	      score.endTime = Date.now();
	    }
	    //check to see that the src of the images are equal
	    if ($flippedCards.find('img')[0].src === $flippedCards.find('img')[1].src){
	      $flippedCards.addClass('matched');
	      $flippedCards.removeClass('flip');
	      correctMatchScore();
	    } else {
	      setTimeout(function(){
	        $flippedCards.removeClass('flip');
	      }, 300); // delay so user can see cards don't match
	      incorrectMatchScore();
	    }
	  }
	  // check to see if all cards are matched and end game
	  var $matchedCards = $('div.card.matched');
	  if ($matchedCards.length === $('div.card').length){
	    window.clearInterval(mainTimer);
	    gameComplete();
	  }
	}

	function calculateScore(score, correct){
	  var turnScore = (score.multiplier / ((score.endTime - score.startTime)/1000));
	  if (correct){
	    turnScore *= score.consecutiveCorrect;
	    score.score += turnScore;
	  } else {
	    turnScore *= score.consecutiveWrong;
	    score.score -= turnScore;
	    if (score.score < 0) score.score = 0;
	  }
	  $('.scoreNumeric').replaceWith('<h2 class="scoreNumeric">' + score.score.toFixed(0) + '</h2>');
	  score.endTime = 0;
	  score.startTime = 0;
	  return score;
	}

	function incorrectMatchScore() {
	  score.consecutiveCorrect = 0;
	  score.consecutiveWrong ++;
	  calculateScore(score, false);
	}

	function correctMatchScore() {
	  score.consecutiveCorrect ++;
	  score.consecutiveWrong = 0;
	  calculateScore(score, true);
	}


	function gameComplete(){
	  // display game complete message
	  $('.turnMessage>h2').replaceWith('<h2 class="turnMessage">' + 'Fantastic! Game complete.'+
	    '</h2>');
	  // save email and score if highest to localstorage
	  if (+localStorage.getItem('highScore')< score.score){
	    localStorage.setItem('highScore', score.score.toFixed(0))
	    $('.turnMessage>h2').replaceWith('<h2 class="turnMessage">' + 'Fantastic! Game complete.'+
	    ' New high score saved!' + '</h2>');
	  }
	}

	module.exports = {
	  gameLoop: gameLoop,
	  checkForMatch: checkForMatch
	}


/***/ }
/******/ ]);