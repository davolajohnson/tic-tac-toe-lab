//1) Define the required variables used to track the state of the game.

//2) Store cached element references.

//3) Upon loading, the game state should be initialized, and a function should 
//   be called to render this game state.

//4) The state of the game should be rendered to the user.

//5) Define the required constants.

//6) Handle a player clicking a square with a `handleClick` function.

//7) Create Reset functionality.


/*-------------------------------- Constants --------------------------------*/
const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];


/*---------------------------- Variables (state) ----------------------------*/
let board;    
let turn;     
let winner;   
let tie;      


/*------------------------ Cached Element References ------------------------*/
const squareEls = document.querySelectorAll('.sqr');
const messageEl = document.querySelector('#message');
const resetBtnEl = document.querySelector('#resetButton');
/*-------------------------------- Functions --------------------------------*/
const placePiece = (idx) => {
    board[idx] = turn;
  };
  
  const checkForTie = () => {
    if (winner) {
      return;
    }
  
    if (!board.includes('')) {
      tie = true;
    }
  };
  
  const checkForWinner = () => {
    for (let combo of winningCombos) {
      const [a, b, c] = combo;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        winner = true;
        return;
      }
    }
  };
  
  
  
  const switchPlayerTurn = () => {
    if (winner) {
      return;
    }
    if (turn === 'X') {
      turn = 'O';
    } else {
      turn = 'X';
    }
  };
  
  const updateBoard = () => {
    board.forEach((cell, idx) => {
      if (cell === 'X') {
        squareEls[idx].textContent = 'X';
      } else if (cell === 'O') {
        squareEls[idx].textContent = 'O';
      } else {
        squareEls[idx].textContent = '';
      }
    });
  };
  
  const updateMessage = () => {
    if (!winner && !tie) {
      if (turn === 'X') {
        messageEl.textContent = "It's X's turn";
      } else {
        messageEl.textContent = "It's O's turn";
      }
    } else if (!winner && tie) {
      messageEl.textContent = 'Tie game!';
    } else {
      if (turn === 'X') {
        messageEl.textContent = 'X wins!';
      } else {
        messageEl.textContent = 'O wins!';
      }
    }
  };
  
  const render = () => {
    updateBoard();
    updateMessage();
  };
  
  const handleClick = (evt) => {
    const sqIdx = Number(evt.target.id);
    if (board[sqIdx] !== '' || winner) return;
  
    placePiece(sqIdx);
    checkForWinner();
    checkForTie();
    if (!winner) switchPlayerTurn();
    render();
  };
  
  
  const init = () => {
    board = ['', '', '', '', '', '', '', '', ''];
    turn = 'X';
    winner = false;
    tie = false;
    render();
  };
  
  init();

/*----------------------------- Event Listeners -----------------------------*/
squareEls.forEach((square) => {
    square.addEventListener('click', handleClick);
  });
  resetBtnEl.addEventListener('click', init);
  
