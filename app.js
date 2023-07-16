// The default first marker is X
let currentPlayer = 'X';
let cells = document.querySelectorAll('td');

function getCurrentPlayer() {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

// Handle when click on the square
let chessBoard = document.getElementById('chessboard');

chessBoard.addEventListener('click', handleCellClick);

function handleCellClick(e) {
    // Get the ticked square in the current
    let clickedCell = e.target;
    // Determine if it is a square in the chessboard
    if (clickedCell.tagName === 'TD' && clickedCell.textContent === '') {
        clickedCell.textContent = currentPlayer;
        clickedCell.classList.add(currentPlayer.toLowerCase());
        markedCells++;
        checkWin();
        getCurrentPlayer();
        updatePlayerTurn();
    }
}

// Show next turn
let playerTurn = document.getElementById('player-turn');

function updatePlayerTurn() {
    playerTurn.textContent = 'Lượt chơi: ' + currentPlayer;
}

// Handle when draw
let markedCells = 0;

function checkDraw() {
    // Check if all the boxes in the chessboard are marked 
    // But no winner is counted as a draw
    if (markedCells === cells.length) {
        setTimeout(() => {
            alert('Draw!');
            resetGame();
        }, 100)
    }
}

// Check win
function checkWin() {
    // Summarize play types to win
    let winningCombos = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    // Check out each combos
    for (let i = 0; i < winningCombos.length; i++) {
        let combo = winningCombos[i];
        if (
            cells[combo[0]].textContent === currentPlayer &&
            cells[combo[1]].textContent === currentPlayer &&
            cells[combo[2]].textContent === currentPlayer
        ) {
            cells[combo[0]].classList.add('winning-cell');
            cells[combo[1]].classList.add('winning-cell');
            cells[combo[2]].classList.add('winning-cell');

            let winner = currentPlayer;

            setTimeout(() => {
                if (winner === 'X') {
                    alert('X wins!');
                } else {
                    alert('O wins!');
                }
                getCurrentPlayer();
                resetGame();
            }, 100);
            return;
        }
    }
    checkDraw();
}

// Reset game
function resetGame() {
    for (let i = 0; i < cells.length; i++) {
        cells[i].textContent = '';
        cells[i].classList.remove('x');
        cells[i].classList.remove('o');
        cells[i].classList.remove('winning-cell');
    }
    markedCells = 0;
    getCurrentPlayer();
    updatePlayerTurn();
}

// Press reset btn
let resetBtn = document.getElementById('reset-btn');

resetBtn.addEventListener('click', resetGame);