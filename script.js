const board = document.getElementById('board');
const winnerDisplay = document.getElementById('winner');
let cells = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let gameOver = false;

function renderBoard() {
    board.innerHTML = '';
    cells.forEach((cell, index) => {
        const cellElement = document.createElement('div');
        cellElement.classList.add('cell');
        cellElement.textContent = cell;
        cellElement.addEventListener('click', () => handleMove(index));
        board.appendChild(cellElement);
    });
}

function handleMove(index) {
    if (!cells[index] && !gameOver) {
        cells[index] = currentPlayer;
        if (checkWinner()) {
            winnerDisplay.innerHTML = `Player ${currentPlayer} Wins!`;
            gameOver = true;
        } else if (!cells.includes('')) {
            winnerDisplay.innerHTML = "It's a Draw!";
        } else {
            if (currentPlayer === 'X') {
                currentPlayer = 'O'
            }
            else {
                currentPlayer = 'X'
            }
        }
        renderBoard();
    }
}

function checkWinner() {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6]             // Diagonals
    ];
    return winPatterns.some(pattern => {
        const [a, b, c] = pattern;
        if (cells[a] && cells[a] === cells[b] && cells[a] === cells[c]){
            return true
        }
        else{
            return false
        }
       
    });
}

function resetGame() {
    cells = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    gameOver = false;
    winnerDisplay.textContent = '';
    renderBoard();
}

renderBoard();