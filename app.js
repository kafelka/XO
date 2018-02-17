const fields = Array.from(document.querySelectorAll(".square"));
let currentPlayer = "X";

fields.forEach(field => field.addEventListener("click", function() {
  if (this.innerHTML === "") {
    this.innerHTML = currentPlayer;
    let fieldCoords = this.dataset.no.split(",");
    console.log(fieldCoords);
    console.log(fieldCoords[0]);
    if (checkIfGameEnded(fieldCoords[0], fieldCoords[1], currentPlayer)) {
     console.log(currentPlayer + " won"); 
     clearBoard();
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
  //diagonal missing
  return false;
}

function clearBoard() {
  document.querySelectorAll(".square").forEach(y => y.innerHTML = "");
  // newFields.forEach(x => x.forEach(y => y.innerHTML = ""));
}

// function clearBoard() {
//   for (i = 0; i <= 2; i++) {
//     for (j = 0; j <= 2; j++) {
//       newFields[i][j].innerHTML = "";
//     }
//   }
// }

