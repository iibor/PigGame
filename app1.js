/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer, gamePlaying, input, winningScore;

//kutsutaan luotua init funktiota, jossa muuttujat. Koska DRY = Don't Repeat Yourself
init();
var lastDice;

//document.querySelector('#score-' + activePlayer).textContent = dice;



/*function btn() {

}*/
document.querySelector('.btn-set').addEventListener('click', function() {
  input = document.querySelector('.final-score').value;


  //Undefined, 0, null or "" are COERCED to false
  //Anything else is COERCED to true

  if (input) {
    winningScore = input;
  } else {
    winningScore = 100;
  }

  document.querySelector('.winning-score').innerHTML = "Game to " + winningScore + "!";
  })


document.querySelector('.btn-roll').addEventListener('click', function() {
  if(gamePlaying) {
    // 1. Random number
    var dice = Math.floor(Math.random() * 6) + 1;
    var secondDice = Math.floor(Math.random() * 6) + 1;

    // 2. Display the result
    document.getElementById('dice-1').style.display = 'block';
    document.getElementById('dice-2').style.display = 'block';
    document.getElementById('dice-1').src = 'dice-' + dice + '.png';
    document.getElementById('dice-2').src = 'dice-' + secondDice + '.png';



    // 3. Update the round score IF the rolled number was NOT 1
    /*if (lastDice === 6 && dice === 6) {
      scores[activePlayer] = 0;
      document.querySelector('#score-' + activePlayer).textContent = 0;
      nextPlayer();
    } else if (dice !== 1 && secondDice !== 1) {
        //add score
        roundScore = dice + secondDice;
        document.querySelector('#current-' + activePlayer).textContent = roundScore;

    } else {
        //next player
        nextPlayer();
    }

    lastDice = dice;*/
    if (dice !== 1 && secondDice !== 1) {
        //add score
        roundScore += dice + secondDice;
        document.querySelector('#current-' + activePlayer).textContent = roundScore;

    } else {
        //next player
        nextPlayer();
    }
    //console.log(lastDice);
    console.log(dice);
    console.log(secondDice);





}
})

document.querySelector('.btn-hold').addEventListener('click', function() {
  if (gamePlaying) {
    //add current score to global score
    scores[activePlayer] += roundScore;

    //update the UI
    document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

    /*var input = document.querySelector('.final-score').value;
    var winningScore;

    //Undefined, 0, null or "" are COERCED to false
    //Anything else is COERCED to true

    if (input) {
      winningScore = input;
    } else {
      winningScore = 100;
    }*/



    //check if player won the game
    if (scores[activePlayer] >= winningScore) {
        document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
        document.getElementById('dice-1').style.display = 'none';
        document.getElementById('dice-2').style.display = 'none';
        document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
        document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
        gamePlaying = false;
    } else {
        nextPlayer();
    }
  }

})

function nextPlayer() {
    //next player
        activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
        roundScore = 0;

        document.getElementById('current-0').textContent = '0';
        document.getElementById('current-1').textContent = '0';

        document.querySelector('.player-0-panel').classList.toggle('active');
        document.querySelector('.player-1-panel').classList.toggle('active');

        document.getElementById('dice-1').style.display = 'none';
        document.getElementById('dice-2').style.display = 'none';
}

//lisätään "new" -buttonille event listener ja sille init funktio.
document.querySelector('.btn-new').addEventListener('click', init);



function init() {
  scores = [0, 0];
  activePlayer = 0;
  roundScore = 0;
  gamePlaying = true;

  document.getElementById('dice-1').style.display = 'none';
  document.getElementById('dice-2').style.display = 'none';

  document.getElementById('score-0').textContent = '0';
  document.getElementById('score-1').textContent = '0';
  document.getElementById('current-0').textContent = '0';
  document.getElementById('current-1').textContent = '0';
  document.getElementById('name-0').textContent = 'Player 1';
  document.getElementById('name-1').textContent = 'Player 2';
  document.querySelector('.player-0-panel').classList.remove('winner');
  document.querySelector('.player-1-panel').classList.remove('winner');
  document.querySelector('.player-0-panel').classList.remove('active');
  document.querySelector('.player-1-panel').classList.remove('active');
  document.querySelector('.player-0-panel').classList.add('active');

}
