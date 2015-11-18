var hf = require('./helperFunctions.js');
var gl = require('./gameLoop.js');

var cardImages = [];
var promises = [];
var numCards = 12;
var delay = 500;
var openingAnimationComplete = false;


for (var i=0; i<numCards/2; i++){
  promises.push(hf.retrieveImage());
}

Promise.all(promises).then(function(imageArrays){
  imageArrays.map(function(elem){
    cardImages.push(hf.handleImage(elem));
  });
  hf.elmiminateDuplicateArrayElements(cardImages);
  cardImages = cardImages.concat(cardImages);
  cardImages = hf.shuffleArrayElements(cardImages);
  hf.insertCards(numCards, cardImages);
  hf.showAllCardsThenHide('.card', 'flip', delay, numCards, gl.gameLoop);
});



// TODO: get n/2 unique images - done - fixed - done
// TODO: concat the array with copy of itself - done
// TODO: shuffle the array for randomness - done
// TODO: create cards with image on flip slide - done
// TODO: add click events to each card - done
// TODO: show all images to begin the game - done
// TODO: hide all images to start the game - done
// TODO: when two images are revealed check to see if they are equal - done
// TODO: hide pair of images if they don't match - done
// TODO: increment score as needed - done
// TODO: display score on gameboard - done
// TODO: message api to display message on gameboard - done
// TODO: end game when all images are revealed - done
