const game = (() => {
    let gameActive;
    const makePlayer = (name, symbol) => {
        const playerSymbol = symbol;
        const playerName = name;

        const getPlayerSymbol = () => {
            return playerSymbol;
        }

        return {
            playerSymbol: playerSymbol,
            name: playerName
        }
    };

    let player1;
    let player2;
    let currentPlayer;
    let eventListenersAdded = false;

    let board;

    const makeBoard = function() {
            const boardDimension = 3;
            const emptySpace = "_";
            let boardState = [];
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

            boardState = initBoard();
            const setPiece = (i, j, playerSymbol) => {
                if(!isSpaceTaken(i, j)){
                    boardState[i][j] = playerSymbol;
                    return true;
                }
                return false; // space taken
            }

            const isBoardFull = () => {
                return boardState.every(row => {
                    return row.every(column => column !== emptySpace);
                })
            };
        
            const isSpaceTaken = (i, j) => {
                return boardState[i][j] !== emptySpace;
            };

            const threeInARow = (symbol) => {
                for(let i = 0; i < boardDimension; i++){
                    if(boardState[i].every(column => column === symbol)){
                        return true;
                    }
                    if(boardState.map(row => row[i]).every(e => e === symbol)){
                        return true;
                    }
                } 
                if(range(0, boardDimension).every(i => boardState[i][i] === symbol)){
                    return true;
                }
                if(range(0, boardDimension).every(i => boardState[i][boardDimension - 1 - i] === symbol)){
                    return true;
                }               
                return false;
            };

            function* range(start, end, step = 1) {
                for(let i = start; i < end; i += step){
                    yield i;
                }
            }

            const displayBoard = () => {
                for(let i = 0; i < boardDimension; i++){
                    let logBuffer = "";
                    for(let j = 0; j < boardDimension; j++){
                        logBuffer += boardState[i][j] + " ";
                    }
                    console.log(logBuffer);
                }
            };

            const renderBoard = function(){
                let i = 0, j = 0;
                document.querySelectorAll(".space").forEach(space => {
                    space.textContent = boardState[i][j];
                    if(space.textContent === "_"){
                        space.textContent = " ";
                    }
                    if(j === 2){
                        i++;
                        j = 0;
                    } else {
                        j++;
                    }
                });
            };


            
            return {
                gameBoard: boardState,
                setPiece: setPiece,
                display: renderBoard,
                threeInARow, threeInARow,
                isBoardFull, isBoardFull
            }

        };

        const addEventListeners = () => {
            if(eventListenersAdded){
                return;
            }
            eventListenersAdded = true;
            document.querySelectorAll(".space").forEach((space, index) => {
                space.addEventListener("click", function(e){
                    let i = Math.floor(index / 3);
                    let j = index % 3;
                    
                    let sym = currentPlayer.playerSymbol;
                    if(makeMove(i, j)){
                        e.target.textContent = sym;
                    }
                });
            });
        };

        const startGame = (p1, p2) => {
            gameActive = true;
            player1 = makePlayer(p1, "X");
            player2 = makePlayer(p2, "O");
            currentPlayer = player1;
            board = makeBoard();
            board.display();
            addEventListeners();
            document.querySelector(".message").innerHTML = "";
        };

    const makeMove = (i, j) => {
        if(!gameActive){
            return;
        }
        document.querySelector(".message").innerHTML = "";
        if(board.setPiece(i, j, currentPlayer.playerSymbol)){ // if the space is not taken
            if(board.threeInARow(currentPlayer.playerSymbol)){
                document.querySelector(".message").innerHTML = currentPlayer.name + " Wins!";
                gameActive = false;
            } else if(board.isBoardFull()){
                document.querySelector(".message").innerHTML = "Tie!";
                gameActive = false;
            }
            currentPlayer = currentPlayer === player1 ? player2 : player1;
            return true;
        } else {
            document.querySelector(".message").innerHTML = "Space already taken! Try again.";
            return false;
        }
    };

    return {
        makeMove : makeMove,
        startGame : startGame
    }

})();

document.querySelector(".start").addEventListener("click", (e) =>{
    const player1 = document.querySelector("#player-1").value;
    const player2 = document.querySelector("#player-2").value;
    game.startGame(player1, player2);
});


