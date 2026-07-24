const game = (() => {
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
    let currentPlayer = player1;

    const {
        gameBoard: gameBoard,
        setPiece: setPiece,
        display: display,
    } = (function() {
            const boardDimension = 3;
            const emptySpace = "_"
            let boardState = []
            const initBoard = () => {
                let gameBoard = [];
                for(let i = 0; i < boardDimension; i++){
                    gameBoard.push([]);
                    for(let j = 0; j < boardDimension; j++){
                        gameBoard[i].push(emptySpace);
                    }
                }
                return gameBoard;
            }

            const setPiece = (i, j, playerSymbol) => {
                if(!isSpaceTaken(i, j)){
                    boardState[i][j] = playerSymbol;
                    return true;
                }
                return false;
            }
        
            const isSpaceTaken = (i, j) => {
                return boardState[i][j] != emptySpace;
            };

            const displayBoard = () => {
                for(let i = 0; i < boardDimension; i++){
                    let logBuffer = "";
                    for(let j = 0; j < boardDimension; j++){
                        logBuffer += boardState[i][j] + " ";
                    }
                    console.log(logBuffer);
                }
            };


            boardState = initBoard();
            return {
                gameBoard: boardState,
                setPiece: setPiece,
                display: displayBoard
            }

        })();

    const makeMove = (i, j) => {
        if(setPiece(i, j, currentPlayer.playerSymbol)){
            currentPlayer = currentPlayer === player1 ? player2 : player1;
        }
        display();
    };

    return {
        makeMove : makeMove
    }

})();


