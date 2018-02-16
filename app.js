const fields = Array.from(document.querySelectorAll(".square"));

let currentPlayer = "X";

fields.forEach(field => field.addEventListener("click", function() {
  if (this.innerHTML === "") {
    this.innerHTML = currentPlayer;
    let fieldCoords = this.dataset.no.split(",");
    checkIfGameEnded(fieldCoords[0],fieldCoords[1],currentPlayer);
    changePlayer();
  } 
}));

let newFields = [];
while(fields.length) {
  newFields.push(fields.splice(0,3));
}
console.log(newFields);


function changePlayer() {
  if (currentPlayer === "X") {
    currentPlayer = "O";
  } else {
    currentPlayer = "X";
  }
};

//funkcja ma zwr true jesli symb wygrl gre, false w przeciwienstwie
function checkIfGameEnded(row, col, symb) {
  //row 
  console.log("row");
  for (let i = 0; i <= 2; i++) {
    console.log(newFields[row][i].innerHTML === symb);
  }
  //column
  console.log("col");
  for (let i = 0; i <= 2; i++) {
    console.log(newFields[i][col].innerHTML === symb);
  }
}