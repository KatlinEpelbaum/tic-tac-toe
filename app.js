const cellDivs = Array.from(document.getElementsByClassName('cell'));
const gameBoardDiv = document.getElementById('board')
const messageDiv = document.getElementById('message');
const resetBtn = document.getElementById('reset-game');

const gameBoardSize = 4;
const symbols = ['X', 'O'];
let winningCombinations = [];
let nextPlayer, playerWon, moveCount, gameState;


initGame();
initWinningCombinations()

resetBtn.addEventListener('click', e => {
    initGame();
    initWinningCombinations()
});

function initWinningCombinations() {
    for(let i = 0; i < gameBoardSize; i++) {
        let row = [];
        let col = [];
        
        for (let j = 0; j < gameBoardSize; j++){
            row.push(`${i}${j}`);
            col.push(`${j}${i}`);
        }
        winningCombinations.push(row)
        winningCombinations.push(col)
    }

    let d1= [];
    let d2= [];

    for (let k = 0; k < gameBoardSize; k++){
        d1.push(`${k}${k}`);
        d2.push(`${k}${gameBoardSize - 1 - k}`);
    }
    winningCombinations.push(d1);
    winningCombinations.push(d2);
    
    console.log(winningCombinations)
}

function initGame () {

    nextPlayer = 0;
    playerWon = false;
    moveCount = 0;
    gameState = [[], []];

    initGameBoard();
    
}

function initGameBoard(){

    gameBoardDiv.innerHTML = '';
    messageDiv.innerText = '';

    gameBoardDiv.style.gridTemplateColumns = `repeat(${gameBoardSize},128px)`;
    gameBoardDiv.style.gridTemplateRows = `repeat(${gameBoardSize},128px)`;

    for ( let y = 0; y < gameBoardSize; y++) {

        for( let x = 0; x < gameBoardSize; x++) {

            const cellDiv = document.createElement('div');
            cellDiv.classList.add('cell')
            cellDiv.dataset.y = y;
            cellDiv.dataset.x = x;

            cellDiv.addEventListener('click', e => {

                if ( !e.target.innerText && !playerWon ) {

                    moveCount++;

                    const move = e.target.dataset.y + e.target.dataset.x;
                    gameState[nextPlayer].push(move);

                    e.target.innerText = symbols[nextPlayer];

                    if ( hasPlayerWon(gameState[nextPlayer]) ) {
                        playerWon = true;
                        messageDiv.innerText = `${symbols[nextPlayer]} won the game!`;
                    } else if ( moveCount == 9 ) {
                        messageDiv.innerText = `The game ended in a draw!`;
                    }

                    nextPlayer = Number(!nextPlayer);
                }
            });

            gameBoardDiv.appendChild(cellDiv);
        }
    }

}

function hasPlayerWon ( moves ) {

    let hasPlayerWon = false;

    winningCombinations.forEach( c => {
        if ( c.every(m => moves.includes(m)) ) {
            hasPlayerWon = true;
            
            c.forEach( ([y, x]) => {
                document.querySelector(`.cell[data-y="${y}"][data-x="${x}"]`).classList.add('winning');
            });

        }
    });
    
    return hasPlayerWon;

}