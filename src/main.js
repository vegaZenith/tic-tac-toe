const makeGame = () => {
    const makePlayer = (symbol) => {
    const playerSymbol = symbol;

    const getPlayerSymbol = () => {
        return playerSymbol;
    }

    return {
        playerSymbol: playerSymbol
    }
    };
    const player1 = makePlayer("X");
    const player2 = makePlayer("O");

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

        const setPiece = (piece, i, j) => {
            boardState[i][j] = piece;
        }

        boardState = initBoard();
        return {
            board: boardState,
            makeMove: setPiece
        }

    })();
}

