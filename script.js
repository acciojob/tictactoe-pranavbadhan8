//your JS code here. If required.
const player1Input = document.getElementById("player-1");
const player2Input = document.getElementById("player-2");
const submitButton = document.getElementById("submit");

// Get the board and message elements
const boardElement = document.getElementById("board");
const messageElement = document.querySelector(".message");

// Create variables to keep track of the players and their moves
let currentPlayer;
let moves;

// Function to start the game
function startGame(event) {
  event.preventDefault();

  // Get the names of the players
  const player1 = player1Input.value;
  const player2 = player2Input.value;

  // Set the initial player and moves
  currentPlayer = player1;
  moves = {
    [player1]: [],
    [player2]: []
  };

  // Show the board and message elements
  boardElement.style.display = "block";
  messageElement.textContent = `${currentPlayer}, you're up!`;

  // Add event listeners to the cells
  const cells = document.querySelectorAll(".cell");
  cells.forEach(cell => cell.addEventListener("click", playMove));

 // Function to handle a move
function playMove(event) {
// Get the id of the clicked cell
const cellId = event.target.id;

// Check if the cell has already been played
if (moves[currentPlayer].includes(cellId)) {
messageElement.textContent = "This cell has already been played!";
return;
}

// Update the moves and cell content
moves[currentPlayer].push(cellId);
event.target.textContent = currentPlayer === player1 ? "X" : "O";

// Check if the current player has won
if (checkWin()) {
messageElement.textContent = ${currentPlayer}, congratulations! You won!;
disableCells();
return;
}

// Check if the game is a draw
if (checkDraw()) {
messageElement.textContent = "It's a draw!";
disableCells();
return;
}

// Switch to the next player
currentPlayer = currentPlayer === player1 ? player2 : player1;
messageElement.textContent = ${currentPlayer}, you're up!;
}

// Function to check if the current player has won
function checkWin() {
const winningCombinations = [
[1, 2, 3],
[4, 5, 6],
[7, 8, 9],
[1, 4, 7],
[2, 5, 8],
[3, 6, 9],
[1, 5, 9],
[3, 5, 7]
];

return winningCombinations.some(combination =>
combination.every(cell => moves[currentPlayer].includes(cell))
);
}

// Function to check if the game is a draw
function checkDraw() {
const allMoves = moves[player1].concat(moves[player2]);
return allMoves.length === 9;
}

// Function to disable the cells after the game is over
function disableCells() {
const cells = document.querySelectorAll(".cell");
cells.forEach(cell => cell.removeEventListener("click", playMove));
}

// Add event listener to the submit button
submitButton.addEventListener("click", startGame)
