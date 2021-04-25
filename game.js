let gameBoard = [];
let gameRow = [];



class Board {
    static directions = [[0,1], [0,-1],[-1, 0], [1, 0], [1,1], [-1,1], [-1,-1], [1, -1]];
        
    constructor(height, width ){
        this.height = height;
        this.width = width;
        this.initGameBoard();
    }
    initGameBoard(){
        this.gameBoard = new Array(this.height).map((row) =>  new Array(this.width).map((cell) => false) );   
    }

    toggleSquare(x, y){
        this.gameBoard[x][y] = !this.gameBoard[x][y];
    }

    setSquare(x, y, isAlive){
        this.gameBoard[x][y] = isAlive;
    }

    countLiveCells(x, y){
        return directions.reduce( (count, direction) => {
            try{
                return this.gameBoard[x + direction[0]][y + direction[1]] ? count++ : count;
            }catch{
                return count;
            }
        }, 0);
    }
    printBoard() {
        this.gameBoard.forEach(row => {
            row.forEach(cell => {
                console.log(cell ? 'X' : '-' );
            });
            console.log("\n");
        });
    }
};

let liveCellRules = (liveCellCount) => {
    if(liveCellCount <= 1) return false;
    if(liveCellCount <= 3) return true;
    return false;
}

let deadCellRules = (liveCellCount) => {
    return liveCellCount === 3;
} 

let willBeAlive = (isAlive, liveCellCount) => {
    return isAlive ? liveCellRules(liveCellCount) : deadCellRules(liveCellCount);
} 

let processNextBoard = (board) => {
    return board.gameBoard.map((row, rowIndex) => {
        return row.map((cell, colIndex) => {
            return willBeAlive(cell, board.countLiveCells(colIndex, rowIndex));
        });
    });
}

let board = new Board(100,100);
board.toggleSquare(50, 50);
let nextBoard = new Board(100, 100);
let inProgress = true;
board.printBoard();

while(inProgress){
    nextBoard.gameBoard = processNextBoard(board);
    nextBoard.printBoard();
    inProgress = false;
}


// 1. a live cell with zero or one live neighbours will die.
// 1. a live cell with two or three live neighbours will remain alive
// 1. a live cell with four or more live neighbours will die.

// ## Dead cells:
// 1. a dead cell with exactly three live neighbours becomes alive
// in all other cases a dead cell will stay dead.