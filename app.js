const cellDivs = Array.from(document.getElementsByClassName('cell'));

let nextPlayer = 0;
let symbols = ['X', 'O'];
let gameOver = false
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

        if ( !e.target.innerText && !gameOver) {

            const move = e.target.dataset.y + e.target.dataset.x;
            gameState[nextPlayer].push(move);

            e.target.innerText = symbols[nextPlayer];

            if (isGameOver(gameState[nextPlayer])){
                gameOver = true;
            };

            nextPlayer = Number(!nextPlayer);

        }

    });

});

function isGameOver ( moves ) {

    let isGameOver = false;

    winningCombinations.forEach( c => {
        if ( c.every(m => moves.includes(m)) ) {
            isGameOver = true;
        }
    });
    
    return isGameOver;

}