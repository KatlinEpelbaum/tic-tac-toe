const cellDivs = Array.from(document.getElementsByClassName('cell'));
const messageDiv = document.getElementById('message');
const resetBtn = document.getElementById('reset-game');

let nextPlayer, symbols, playerWon, moveCount;

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

cellDivs.forEach( cellDiv => {
    
    cellDiv.addEventListener('click', e => {

        if ( !e.target.innerText && !playerWon ) {

            moveCount++;

            const move = e.target.dataset.y + e.target.dataset.x;
            gameState[nextPlayer].push(move);

            e.target.innerText = symbols[nextPlayer];

            if ( hasPlayerWon(gameState[nextPlayer]) ) {
                playerWon = true;
                messageDiv.innerText = `${symbols[nextPlayer]} VÕITIS MÄNGU!`;
            } else if ( moveCount == 9 ) {
                messageDiv.innerText = `MÄNG JÄI VIIKI!`;
            }

            nextPlayer = Number(!nextPlayer);

        }

    });

});

resetBtn.addEventListener('click', e => {
    initGame();
});

function initGame () {

    nextPlayer = 0;
    symbols = ['X', 'O'];
    playerWon = false;
    moveCount = 0;
    
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