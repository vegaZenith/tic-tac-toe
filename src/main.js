const {
    board: gameBoard,
    makeMove: makeMove
} = (function() {
    const boardDimension = 3;
    let boardState = []
    const initBoard = () => {
        let gameBoard = [];
        for(let i = 0; i < boardDimension; i++){
            gameBoard.push([]);
            for(let j = 0; j < boardDimension; j++){
                gameBoard[i].push("_");
            }
        }
        return gameBoard;
    }

    const setPeice = (peice, i, j) => {
        boardState[i][j] = peice;
    }

    boardState = initBoard();
    return {
        board: boardState,
        makeMove: setPeice
    }

})();

console.log(gameBoard);
