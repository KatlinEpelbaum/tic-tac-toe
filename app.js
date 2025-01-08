const cellDivs = Array.from(document.getElementsByClassName('cell'));

let nextPlayer = 0;
let symbols = ['X', 'O'];

const winningCombinations = [
    ['00', '01', '02'],
    ['10', '11', '12'],
    ['20', '21', '22'],
    ['00', '10', '20'],
    ['01', '11', '21'],
    ['02', '12', '22'],
    ['00', '11', '22'],
    ['02', '11', '20'],
];

let player0 = [];
let player1 = [];

let gameState = [[], []];

cellDivs.forEach( cellDiv => {

    cellDiv.addEventListener('click', e => {

        if ( !e.target.innerText) {

            const move = e.target.dataset.y + e.target.dataset.x;
            gameState[nextPlayer].push(move);

            e.target.innerText = symbols[nextPlayer];

            isGameOver(gameState[nextPlayer]);

            nextPlayer = Number(!nextPlayer);

            console.log(gameState)
        }
    });
});

function isGameOver ( moves ) {
    let isGameOver = false;

    winningCombinations.forEach(c => {
        if (c.every(m => moves.includes(m))) {
            isGameOver = true
        }
    });

    return isGameOver

}
