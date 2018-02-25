const fields = Array.from(document.querySelectorAll(".square"));
let currentPlayer = "X";
let gameFinished = false;
let clickCounter = 0;
let output = document.querySelector(".output");


function startGame(player) {  //gdzie te funkcje wywolac?
  output.style.visibility = "visible";
  output.innerHTML = `
  Select player
  <button>X</button>
  <button>O</button>
  `
  let btn = document.querySelectorAll("button");
  btn.forEach(b => b.addEventListener("click", setCurrentPlayer));
}
startGame();

function setCurrentPlayer(playerBtn) {
  currentPlayer = this.innerHTML;
}

fields.forEach(field => field.addEventListener("click", function() {
  if (this.innerHTML === "" && !gameFinished) { 
    clickCounter++;  
    this.innerHTML = currentPlayer;
    let fieldCoords = this.dataset.no.split(",");
    const row = parseInt(fieldCoords[0]);
    const col = parseInt(fieldCoords[1]);
    // console.log("fieldCoords: " + fieldCoords + " " + typeof(fieldCoords));
    // console.log("fieldCoords[0] " + fieldCoords[0] + " " + typeof(fieldCoords[0]));
    if (checkIfGameEnded(row, col, currentPlayer)) {
      console.log(currentPlayer + " won"); 
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
  } else {
    currentPlayer = "X";
  }

};



function winningFields(f) {
  f.style.color = "rgb(20, 16, 240)";
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

output.addEventListener("click", function clearBoard() {
  document.querySelectorAll(".square").forEach(function(x){
    x.innerHTML = "";
    x.style.color = "black";
  });
  this.style.visibility = "hidden";
  gameFinished = false;
  clickCounter = 0;
});

function showWinner(player) {
  output.style.visibility = "visible";
  if (player == null) {
    output.innerHTML = "It's a draw!";
  } else {
    output.innerHTML = player + " won";
  }
  gameFinished = true;
}



