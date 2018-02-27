const fields = Array.from(document.querySelectorAll(".square"));
let currentPlayer = "X";
let gameFinished = false;
let clickCounter = 0;
const startGame = document.querySelector(".startGame");
const gameOver = document.querySelector(".gameOver");
const yourTurn = document.querySelector(".whosturn p");
const whosturn = document.querySelector(".whosturn");
const btn = document.querySelectorAll("button");
btn.forEach(b => b.addEventListener("click", setCurrentPlayer));

function setCurrentPlayer(playerBtn) {
  currentPlayer = this.innerHTML;
  startGame.style.display = "none";
  whosturn.style.display = "block";
  yourTurn.innerHTML = `${currentPlayer}`;
}

fields.forEach(field => field.addEventListener("click", function() {
  if (this.innerHTML === "" && !gameFinished) { 
    clickCounter++;  
    this.innerHTML = currentPlayer;
    let fieldCoords = this.dataset.no.split(",");
    const row = parseInt(fieldCoords[0]);
    const col = parseInt(fieldCoords[1]);
    if (checkIfGameEnded(row, col, currentPlayer)) {
      showWinner(currentPlayer);
    } else if (clickCounter == 9) {
      showWinner(null);
    }
    changePlayer();
  } 
}));

let newFields = [];
while(fields.length) {
  newFields.push(fields.splice(0,3));
}

function changePlayer() {
  if (currentPlayer === "X") {
    currentPlayer = "O";
    yourTurn.innerHTML = `${currentPlayer}`;
  } else {
    currentPlayer = "X";
    yourTurn.innerHTML = `${currentPlayer}`;
  }
};

function winningFields(f) {
  f.style.color = "rgb(20, 16, 240)";
}

gameOver.addEventListener("click", function clearBoard() {
  document.querySelectorAll(".square").forEach(function(x){
    x.innerHTML = "";
    x.style.color = "black";
  });
  this.style.display = "none";
  startGame.style.display = "block";
  gameFinished = false;
  clickCounter = 0;
});

function showWinner(player) {
  gameOver.style.display = "block";
  whosturn.style.display = "none";
  if (player == null) {
    gameOver.innerHTML = `It's a draw!`;
  } else {
    gameOver.innerHTML = `Player ${player} won!<br><br>Game over`;
  }
  gameFinished = true;
}

function checkIfGameEnded(row, col, symb) {
  if (newFields[row].every(x => x.innerHTML === symb)) {
    newFields[row].forEach(x => winningFields(x));
    return true;
  } 
  if ([newFields[0][col], newFields[1][col], newFields[2][col]].every(x => x.innerHTML === symb)) {
    [newFields[0][col], newFields[1][col], newFields[2][col]].forEach(x => winningFields(x));
    return true;
  }
  if (row === col && [newFields[0][0], newFields[1][1], newFields[2][2]].every(x => x.innerHTML === symb)) {
    [newFields[0][0], newFields[1][1], newFields[2][2]].forEach(x => winningFields(x));
    return true;
  }
  if ((row + col == 2) && [newFields[0][2], newFields[1][1], newFields[2][0]].every(x => x.innerHTML === symb)) {
    [newFields[0][2], newFields[1][1], newFields[2][0]].forEach(x => winningFields(x));
    return true;
  }
  return false;
}