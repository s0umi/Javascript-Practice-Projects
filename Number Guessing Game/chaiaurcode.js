let randomNumber = Math.round(Math.random() * 100 + 1);

const submit = document.querySelector('#subt');
const userInput = document.querySelector('#guessField');
const guessSlot = document.querySelector('.guesses');
const remaining = document.querySelector('.lastResult');
const loOrHigh = document.querySelector('.lowOrHi');
const startOver = document.querySelector('.resultParas');

const p = document.createElement('p');

let prevGuess = [];
let numOfGuess = 1;
let playGame = true;

if (playGame) {
  submit.addEventListener('click', (e) => {
    e.preventDefault();
    const guess = parseInt(userInput.value);
    console.log(guess);
    validateGuess(guess);
  });
}

function validateGuess(guess) {
  if (isNaN(guess) || guess < 0 || guess > 101) {
    alert('Please enter a valid number');
  } else {
    prevGuess.push(guess);
    if (numOfGuess === 11) {
      displayMessage(`Game over. The random number is ${randomNumber}`);
      endGame();
    } else {
      displayGuess(guess);
      checkGuess(guess);
    }
  }
}
function checkGuess(guess) {
  //check high low or correct
  if (guess === randomNumber) {
    displayMessage(`You guessed it right`);
    endGame();
  } else if (guess > randomNumber) {
    displayMessage(`You guessed too high`);
  } else if (guess < randomNumber) {
    displayMessage(`You guessed too low`);
  }
}
function displayGuess(guess) {
  userInput.value = '';
  guessSlot.innerHTML += `${guess}, `;
  numOfGuess++;
  remaining.innerHTML = `${11 - numOfGuess}`;
}
function displayMessage(message) {
  loOrHigh.innerHTML = `<h2>${message}</h2>`;
}
function endGame() {
  userInput.value = '';
  userInput.setAttribute('disabled', '');
  p.classList.add('button');
  p.innerHTML = `<h2 id= "newGame">start over a new game</h2>`;
  startOver.appendChild(p);
  playGame = false;
  newGame();
}
function newGame() {
  const newGameButton = document.querySelector('#newGame');
  newGameButton.addEventListener('click', function (e) {
    randomNumber = Math.round(Math.random() * 100 + 1);
    prevGuess = [];
    numOfGuess = '';
    guessSlot.innerHTML = '';
    remaining.innerHTML = `${11 - numOfGuess}`;
    userInput.removeAttribute('disabled');
    startOver.removeChild(p);
    loOrHigh.innerHTML = '';
    playGame = true;
  });
}
