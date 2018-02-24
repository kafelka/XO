const fields = Array.from(document.querySelectorAll(".square"));
let currentPlayer = "X";
let gameFinished = false;
let clickCounter = 0;

fields.forEach(field => field.addEventListener("click", function() {
  if (this.innerHTML === "" && !gameFinished) { //use the field only if it's empty
    clickCounter++;  
    console.log(clickCounter);
    this.innerHTML = currentPlayer;
    let fieldCoords = this.dataset.no.split(",");
    const row = parseInt(fieldCoords[0]);
    const col = parseInt(fieldCoords[1]);
    // console.log("Row: " + row + " " + typeof(row));
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

function checkIfGameEnded(row, col, symb) {
  if (newFields[row].every(x => x.innerHTML === symb)) {
    return true;
  } 
  if ([newFields[0][col], newFields[1][col], newFields[2][col]].every(x => x.innerHTML === symb)) {
    return true;
  }
  if (row === col && [newFields[0][0], newFields[1][1], newFields[2][2]].every(x => x.innerHTML === symb)) {
    return true;
  }
  console.log("row + col = " + (row + col)); 

  if ((row + col == 2) && [newFields[0][2], newFields[1][1], newFields[2][0]].every(x => x.innerHTML === symb)) {
    return true;
  }
  return false;
}

function clearBoard() {
    document.querySelectorAll(".square").forEach(function(x){
      x.innerHTML = "";
    });
    output.style.visibility = "hidden";
    gameFinished = false;
    clickCounter = 0;
    // document.querySelectorAll(".square").forEach(y => y.innerHTML = "");
    
  // newFields.forEach(x => x.forEach(y => y.innerHTML = ""));
}

// function clearBoard() {
//   for (i = 0; i <= 2; i++) {
//     for (j = 0; j <= 2; j++) {
//       newFields[i][j].innerHTML = "";
//     }
//   }
// }

let output = document.querySelector(".output");
output.addEventListener("click", clearBoard);

function showWinner(player) {
  output.style.visibility = "visible";
  if (player == null) {
    output.innerHTML = "It's a draw!";
  } else {
    output.innerHTML = player + " won";
  }
  gameFinished = true;
}


