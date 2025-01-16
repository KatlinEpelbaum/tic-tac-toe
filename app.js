const cellDivs = Array.from(document.getElementsByClassName('cell'));
const messageDiv = document.getElementById('message');
const resetBtn = document.getElementById('reset-game')

let nextPlayer, playerWon, moveCount;
let symbols = ['X', 'O'];

initGame();

const winningCombinations = [
    ['00', '01', '02'], // top row
    ['10', '11', '12'], // middle row
    ['20', '21', '22'], // bottom row
    ['00', '10', '20'], // left column
    ['01', '11', '21'], // middle column
    ['02', '12', '22'], // right column
    ['00', '11', '22'], // top-left to bottom-right diagonal
    ['02', '11', '20']  // top-right to bottom-left diagonal
];

let gameState = [[], []];

cellDivs.forEach(cellDiv => {
    
    cellDiv.addEventListener('click', e => {

        if (!e.target.innerText && !playerWon) {

            const move = e.target.dataset.y + e.target.dataset.x;
            gameState[nextPlayer].push(move);

            e.target.innerText = symbols[nextPlayer];

            moveCount++;

            if (hasPlayerWon(gameState[nextPlayer])) {
                playerWon = true;
                messageDiv.innerText = `${symbols[nextPlayer]} won the game`;
            } else if (moveCount == 9) {
                messageDiv.innerText = `The game was a draw`;
            }

            nextPlayer = Number(!nextPlayer);

        }
    });

});
resetBtn.addEventListener('click', e =>{
    initGame();
});

function initGame() {

    nextPlayer = 0;
    playerWon = false;
    moveCount = 0;
    for ( let i = 0; i < sizes; y++) {

        const tr = document.createElement('tr')

        for( let x = 0; x < sizes; x++) {

            const td = document.createElement('td')
            td.classList.add('cell');
            td.dataset.y = y;
            td.dataset.x = x;
            
            tr.appendChild(td)
        }
    gameBoardTable
    }
}

function hasPlayerWon( moves ) {

    let hasPlayerWon = false;

    winningCombinations.forEach( c => {
        if ( c.every(m => moves.includes(m)) ) {
            hasPlayerWon = true;

            c.forEach( ([y, x]) => {
                console.log(y, x);
                document.querySelector(`.cell[data-y="${y}"].cell[data-x="${x}"]`).classList.add('winning');
            });
        }
    });

    return hasPlayerWon;
}
