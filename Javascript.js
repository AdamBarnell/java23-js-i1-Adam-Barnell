const message = document.querySelector("#message");
const userName = document.querySelector("#userName");
const rolledDice = document.querySelector("#score");
const btnRoll = document.querySelector("#newRoll");
const btnHold = document.querySelector("#holdRoll");
const btnNewGame = document.querySelector("#newGame");
const playerMessage = document.querySelector("#playerMessage");
const usernameButton = document.querySelector("#usernameButton");
const displayRoundscore = document.querySelector("#roundBox");
const displayTotalscore = document.querySelector("#totalBox");
const displayDice = document.querySelector("#diceBox");
const displayCount = document.querySelector("#countBox");

let totalScore = 0;
let count = 0;
let roundScore = 0;

btnRoll.addEventListener("click", handleRolls);
btnHold.addEventListener("click", holdGame);
btnNewGame.addEventListener("click", newGame);
usernameButton.addEventListener("click", displayPlayer);
/*
Handles the rolling function with creating a random number if it rolls a 1 the roundscore is set to 0.
If you roll 2-6 you will get the chance to hold() or continue rolling. 
If you get 100 in roundscore and totalscore together you win the game.
*/
function handleRolls(event) {
  event.preventDefault();
  const randomNumber = Math.ceil(Math.random() * 6);
  count += 1;
  if (randomNumber === 1) {
    btnRoll.style.backgroundColor = "red";
    roundScore = 0;
    displayDice.innerText = `Dice: ${randomNumber}`;
    displayRoundscore.innerText = `Round Score: ${roundScore}`;
  } else {
    roundScore += randomNumber;
    displayDice.innerText = `Dice: ${randomNumber}`;
    displayRoundscore.innerText = `Round Score: ${roundScore}`;
    displayTotalscore.innerText = `Total Score: ${totalScore}`;
    displayCount.innerText = `Total Rounds: ${count}`;
    if (roundScore + totalScore >= 100) {
      message.innerText = `Congratulations! You've won the game with a total score of [${(totalScore +=
        roundScore)}.] and rounds [${count}]`;
      roundScore = 0;
      totalScore = 0;
      count = 0;
    }
  }
  rolledDice.innerText = randomNumber;
}
/*
Saving the roundscore into the totalscore and sets the roundscore to 0 again.
*/
function holdGame(event) {
  event.preventDefault();
  if (totalScore >= 100) {
    message.innerText = `Congratulations! You've won the game with a total score of [${totalScore}.]`;
    btnRoll.disabled = true;
    btnRoll.style.backgroundColor = "green";
  } else {
    totalScore += roundScore;
    roundScore = 0;
    btnRoll.style.backgroundColor = "lightblue";
  }
  displayRoundscore.innerText = `Round Score: ${roundScore}`;
  displayTotalscore.innerText = `Total Score: ${totalScore}`;
}
/*
If you want to play a new game this function resets every savings of count, roundscore,totalscore 
*/
function newGame(event) {
  event.preventDefault();
  btnRoll.disabled = false;
  btnRoll.style.backgroundColor = "lightblue";
  roundScore = 0;
  totalScore = 0;
  count = 0;

  playerMessage.innerText = `Welcome!`;

  document.querySelector(".formContainer").style.display = "block";

  userName.value = "";
  message.innerText = "";
  displayRoundscore.innerText = "Round Score: 0";
  displayTotalscore.innerText = "Total Score: 0";
  displayCount.innerText = "Total Rounds: 0";
  displayDice.innerText = "Dice: -";
}
//You can register a player through this function
function displayPlayer(event) {
  event.preventDefault();
  const user = userName.value;
  playerMessage.innerText = `Welcome ${user}!`;
  document.querySelector(".formContainer").style.display = "none";
}
