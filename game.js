const term = require("terminal-kit").terminal;

let gameBoard = [];
let gameRow = [];

class Board {
  DIRECTIONS = [
    [0, 1],
    [0, -1],
    [-1, 0],
    [1, 0],
    [1, 1],
    [-1, 1],
    [-1, -1],
    [1, -1],
  ];

  constructor(height, width) {
    this.height = height;
    this.width = width;
    this.initGameBoard();
  }

  initGameBoard() {
    this.gameBoard = Array.from({ length: this.height }, () =>
      Array.from({ length: this.width }, () => false)
    );
  }

  toggleSquare(x, y) {
    this.gameBoard[x][y] = !this.gameBoard[x][y];
  }

  setSquare(x, y, isAlive) {
    this.gameBoard[x][y] = isAlive;
  }

  countLiveCells(x, y) {
    return this.DIRECTIONS.reduce((count, direction) => {
      try {
        return this.gameBoard[y + direction[1]][x + direction[0]]
          ? count + 1
          : count;
      } catch {
        return count;
      }
    }, 0);
  }

  printBoard() {
    this.gameBoard.forEach((row) => {
      console.log(
        row.reduce((prev, cell) => {
          return cell ? `${prev}X` : `${prev}_`;
        }, "")
      );
    });
    console.log("\n");
  }
}

let liveCellRules = (liveCellCount) => {
  if (liveCellCount <= 1) return false;
  if (liveCellCount <= 3) return true;
  return false;
};

let deadCellRules = (liveCellCount) => {
  return liveCellCount === 3;
};

let willBeAlive = (isAlive, liveCellCount) => {
  return isAlive ? liveCellRules(liveCellCount) : deadCellRules(liveCellCount);
};

let processNextBoard = (board) => {
  return board.gameBoard.map((row, rowIndex) => {
    return row.map((cell, colIndex) => {
      return willBeAlive(cell, board.countLiveCells(colIndex, rowIndex));
    });
  });
};

let board = new Board(20, 20);
board.toggleSquare(9, 9);
board.toggleSquare(10, 9);
board.toggleSquare(9, 10);
board.toggleSquare(9, 11);

let nextBoard = new Board(20, 20);
let inProgress = true;
board.printBoard();

let count = 0;
while (inProgress) {
  nextBoard.gameBoard = processNextBoard(board);
  nextBoard.printBoard();
  board = nextBoard;
  count++;
  if (count === 6) inProgress = false;
}

// 1. a live cell with zero or one live neighbours will die.
// 1. a live cell with two or three live neighbours will remain alive
// 1. a live cell with four or more live neighbours will die.

// ## Dead cells:
// 1. a dead cell with exactly three live neighbours becomes alive
// in all other cases a dead cell will stay dead.
