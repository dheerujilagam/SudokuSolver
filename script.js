const board = document.getElementById("board");
const timerDisplay = document.getElementById("timer");
let puzzle = Array.from({ length: 9 }, () => Array.from({ length: 9 }, () => 0));
let startTime = null;
let timerInterval = null;
let isPuzzleSolved = false;

function generatePuzzle() {
  puzzle = Array.from({ length: 9 }, () => Array.from({ length: 9 }, () => 0));
  generateSudoku();
  displayPuzzle();
  startTimer();
  isPuzzleSolved = false;
}

function startTimer() {
  startTime = new Date().getTime();
  timerInterval = setInterval(updateTimer, 1000);
}

function updateTimer() {
  if (!isPuzzleSolved) {
    const currentTime = new Date().getTime();
    const elapsedTime = currentTime - startTime;
    const minutes = Math.floor(elapsedTime / 60000);
    const seconds = Math.floor((elapsedTime % 60000) / 1000);

    timerDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }
}

function stopTimer() {
  clearInterval(timerInterval);
}

function generateSudoku() {
  solveSudoku();
  let emptyCells = 45; // Number of cells to be cleared (you can adjust this value).

  while (emptyCells > 0) {
    const row = Math.floor(Math.random() * 9);
    const col = Math.floor(Math.random() * 9);

    if (puzzle[row][col] !== 0) {
      puzzle[row][col] = 0;
      emptyCells--;
    }
  }
}

function displayPuzzle() {
  board.innerHTML = "";

  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      const cell = document.createElement("input");
      cell.type = "text";
      cell.classList.add("cell");
      cell.value = puzzle[row][col] === 0 ? "" : puzzle[row][col];
      cell.dataset.row = row;
      cell.dataset.col = col;

      // Check if the cell is read-only and disable it.
      cell.readOnly = cell.value !== "";

      // If the cell is not read-only, add the input event listener for validation.
      if (!cell.readOnly) {
        cell.addEventListener("input", checkInput);
      }

      board.appendChild(cell);
    }
  }
}

function checkInput(event) {
  const input = event.target;
  const row = parseInt(input.dataset.row);
  const col = parseInt(input.dataset.col);
  const value = parseInt(input.value);

  // Validate the input to make sure it's a valid number (1-9) or clear the cell.
  if (isNaN(value) || value < 1 || value > 9) {
    input.value = "";
    return;
  }

  // Check if the input is valid for the Sudoku puzzle.
  if (isValidMove(row, col, value)) {
    // Update the puzzle with the valid move.
    puzzle[row][col] = value;

    // Mark the cell as filled (read-only) to prevent further input.
    input.readOnly = true;
    input.setAttribute("data-filled", "true");

    // Check if the puzzle is solved after each valid move.
    if (isSolved()) {
      isPuzzleSolved = true;
      stopTimer();
      showSuccessNotification(); // Call the function to show the success pop-up.
    }
  } else {
    // If the move is not valid, clear the cell and show an alert.
    input.value = "";
    alert("Invalid move! This number violates Sudoku rules.");
  }
}

function isValidMove(row, col, value) {
  return (
    isValidRow(row, value) &&
    isValidColumn(col, value) &&
    isValidSubgrid(row - (row % 3), col - (col % 3), value)
  );
}

function isValidRow(row, value) {
  return !puzzle[row].includes(value);
}

function isValidColumn(col, value) {
  return !puzzle.some((row) => row[col] === value);
}

function isValidSubgrid(startRow, startCol, value) {
  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 3; col++) {
      if (puzzle[startRow + row][startCol + col] === value) {
        return false;
      }
    }
  }
  return true;
}

function solvePuzzle() {
  const copyPuzzle = JSON.parse(JSON.stringify(puzzle));
  if (solveSudoku()) {
    displayPuzzle();
  } else {
    alert("No solution found for the puzzle.");
    puzzle = copyPuzzle;
  }
}

function isSolved() {
  // Check if the puzzle is solved by making sure there are no empty cells left.
  return puzzle.every(row => row.every(cell => cell !== 0));
}

function showSuccessNotification() {
  const successPopup = document.createElement("div");
  successPopup.classList.add("popup");
  successPopup.textContent = "Sudoku solved successfully!";
  document.body.appendChild(successPopup);

  // Automatically remove the pop-up after 3 seconds.
  setTimeout(() => {
    successPopup.remove();
  }, 3000);
}

function solveSudoku() {
  const emptyCell = findEmptyCell();

  if (!emptyCell) {
    return true;
  }

  const { row, col } = emptyCell;

  for (let num = 1; num <= 9; num++) {
    if (isValidMove(row, col, num)) {
      puzzle[row][col] = num;

      if (solveSudoku()) {
        return true;
      }

      puzzle[row][col] = 0; // Backtrack and try another number.
    }
  }

  return false; // Trigger backtracking.
}

function findEmptyCell() {
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (puzzle[row][col] === 0) {
        return { row, col };
      }
    }
  }
  return null; // If no empty cell is found, the puzzle is solved.
}

generatePuzzle();
