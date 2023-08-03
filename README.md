# Sudoku Solver Web Application


![Sudoku Solver](image.png)
sample image

## Description

This web application, called "Sudoku Solver," allows users to play and solve Sudoku puzzles. It generates a random Sudoku puzzle and provides a simple user interface for entering numbers and solving the puzzle. The application includes a timer to track the solving time and displays a success pop-up notification when the puzzle is solved successfully.

## How to Play

1. Visit the [Sudoku Solver](https://sudokusolverjs.netlify.app/) web application.
2. You will see a 9x9 Sudoku board with some cells filled with numbers.
3. Click the "Generate New Puzzle" button to generate a new random Sudoku puzzle.
4. Fill in the empty cells with numbers from 1 to 9 to complete the puzzle.
5. Use the mouse or keyboard to navigate between cells and input numbers.
6. Press the "Solve Puzzle" button if you need help or want to see the solution.
7. The timer at the top of the page will start counting once you generate a puzzle.
8. If you complete the puzzle correctly, a success pop-up will appear.

## Web Application Files

The web application consists of the following files:

### index.html

The main HTML file that contains the structure of the Sudoku Solver web application. It includes the Sudoku board, buttons for generating new puzzles and solving the puzzle, and the timer display.

### styles.css

The CSS file that contains the styling for the web application. It defines the layout, colors, and appearance of the Sudoku board, buttons, timer, and pop-up notifications.

### responsive.css

The CSS file that provides additional styles to ensure the web application is responsive and looks good on different devices and screen sizes.

### script.js

The JavaScript file that handles the logic and functionality of the Sudoku Solver web application. It generates Sudoku puzzles, validates user input, solves the puzzle, and displays the success pop-up notification.

## How the Application Works

1. The `generatePuzzle()` function creates a new random Sudoku puzzle by generating a solved Sudoku puzzle and then removing a certain number of cells to create an empty puzzle.

2. The `displayPuzzle()` function populates the Sudoku board with input cells based on the current puzzle, making some cells read-only if they are pre-filled with numbers.

3. The `checkInput(event)` function is called whenever the user enters a number into a cell. It validates the input to ensure it is a valid number (1-9) and checks whether the move is valid according to Sudoku rules. If the input is valid, the puzzle is updated, and the cell becomes read-only.

4. The `isValidMove(row, col, value)` function checks whether a given number can be placed in a specific row, column, and subgrid of the Sudoku board without violating Sudoku rules.

5. The `solvePuzzle()` function attempts to solve the current puzzle using a backtracking algorithm. If a solution is found, the puzzle is displayed, otherwise, an alert informs the user that there is no solution for the current puzzle.

6. The `startTimer()` function starts the timer when a new puzzle is generated, and the `updateTimer()` function updates the displayed time every second until the puzzle is solved.

7. The `isSolved()` function checks whether the puzzle is fully solved by ensuring there are no empty cells left.

8. The `showSuccessNotification()` function displays a pop-up notification when the puzzle is successfully solved. The pop-up disappears after 3 seconds.

## Play Sudoku Now!

Visit the [Sudoku Solver](https://sudokusolverjs.netlify.app/) web application and have fun solving Sudoku puzzles! Challenge yourself and see how fast you can complete the puzzles. Happy Sudoku solving!