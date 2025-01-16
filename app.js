const cellDivs = Array.from(document.getElementsByClassName('cell'));
const messageDiv = document.getElementById('message');

let nextPlayer = 0;
let symbols = ['X', 'O'];
let playerWon = false;
let moveCount = 0;  // Initialize move count

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

            moveCount++;  // Increment the move count

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

function hasPlayerWon(moves) {

    let hasPlayerWon = false;

    winningCombinations.forEach(c => {
        if (c.every(m => moves.includes(m))) {
            hasPlayerWon = true;
        }
    });

    return hasPlayerWon;
}
