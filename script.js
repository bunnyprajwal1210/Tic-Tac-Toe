const cells = document.querySelectorAll('[data-cell]');
const board = document.querySelector('.board');
const messageElement = document.querySelector('.message');
const restartButton = document.getElementById('restartButton');
let currentPlayer = 'X';
let gameActive = true;
const WINNING_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

const handleClick = (e) => {
  const cell = e.target;
  if (cell.innerText !== '' || !gameActive) return;
  
  cell.innerText = currentPlayer;
  if (checkWin(currentPlayer)) {
    messageElement.innerText = `Player ${currentPlayer} has won!`;
    gameActive = false;
    return;
  }

  if (isDraw()) {
    messageElement.innerText = 'Game ended in a draw!';
    gameActive = false;
    return;
  }
  
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  messageElement.innerText = `It's ${currentPlayer}'s turn`;
};

const checkWin = (player) => {
  return WINNING_COMBINATIONS.some(combination => {
    return combination.every(index => {
      return cells[index].innerText === player;
    });
  });
};

const isDraw = () => {
  return [...cells].every(cell => {
    return cell.innerText === 'X' || cell.innerText === 'O';
  });
};

const restartGame = () => {
  cells.forEach(cell => cell.innerText = '');
  currentPlayer = 'X';
  messageElement.innerText = `It's ${currentPlayer}'s turn`;
  gameActive = true;
};

cells.forEach(cell => cell.addEventListener('click', handleClick));
restartButton.addEventListener('click', restartGame);

messageElement.innerText = `It's ${currentPlayer}'s turn`;