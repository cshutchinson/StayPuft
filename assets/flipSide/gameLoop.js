var hf = require('./helperFunctions.js');

var score = {
  score: 0,
  multiplier: 1000,
  consecutiveCorrect: 0,
  consecutiveWrong: 0,
  startTime: 0,
  endTime: 0
};

function gameLoop(){
  // animation is complete now - make it possible to reveal a card
  hf.addClickEventListener('.card', 'flip');
  $('.turnMessage>h2').replaceWith('<h2 class="turnMessage">' + 'Go! Time counts!' + '</h2>');
  if (score.startTime === 0) {
    score.startTime = Date.now();
  };
  var mainTimer = setInterval(onTimerTick, 600);
  function onTimerTick() {
    checkForMatch(mainTimer);
  }
}

function checkForMatch(timer){
  // this function handles game state managment

  var $flippedCards = $('div.card.flip>div.face.back>img')
    .not($('div.card.matched>div.face.back>img'));
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
    hf.removeClickEventListener($flippedCards);
    //check to see that the src of the images are equal
    if ($flippedCards[0].src === $flippedCards[1].src){
      $flippedCards.parent().parent().addClass('matched');
      $flippedCards.parent().parent().removeClass('flip');
      $('.turnMessage>h2').replaceWith('<h2 class="turnMessage">' + matchMessage(true) + '</h2>');

      correctMatchScore();
    } else {
      setTimeout(function(){
        $flippedCards.parent().parent().removeClass('flip');
        $('.turnMessage>h2').replaceWith('<h2 class="turnMessage">' + matchMessage(false) +
          '</h2>');
        }, 500);
      incorrectMatchScore();
    }
  }
  // check to see if all cards are matched and end game
  var $matchedCards = $('div.card.matched>div.face.back>img');
  if ($matchedCards.length === $('div.card').length){
    window.clearInterval(timer);
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
  $('.scoreNumeric').replaceWith('<h2 class="scoreNumeric game-status">' + score.score.toFixed(0) + '</h2>');
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

function matchMessage(match){
  matchMessages = ['You are rocking it!', 'Great match.', 'Speed demon!',
    'Your memory is astonishing!', 'Are you a genius?', 'Your parents must be\
    proud!', 'Way to go!', 'I admire your finesse!', 'Your performance is\
    impressive!', 'Wow, a raise is in your future!', 'Your kids will be super \
    intelligent!', 'Can you do that again?', 'Watch out your boss is coming!'];
  failMessages = ['You can do better than this!', 'Sad...try again!', 'Keep \
    trying!', 'Is this the best you can do?', 'Do you need another drink?',
    'This game can really help you.', 'Good thing you found this game!',
    'This is the worst performance ever!', 'Did you repeat a grade?']
    ;
  if (match){
    return (matchMessages[Math.floor(Math.random()*matchMessages.length)]);
  } else {
    return (failMessages[Math.floor(Math.random()*failMessages.length)]);
  }
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
