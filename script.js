const gameboard = (function () {
  const board = [];
  const resetGameboard = () => {
    for (let row = 0; row < 3; row++) {
      board.push([]);
      for (let column = 0; column < 3; column++) {
        board[row].push(null);
      }
    }
    return board;
  };
  const getGameboard = () => board;
  const getGameboardCell = (row, column) => board[row][column];
  const setCellValue = (row, column, mark) => (board[row][column] = mark);
  return { getGameboard, resetGameboard, getGameboardCell, setCellValue };
})();

function CreatePlayer(name, mark) {
  let score = 0;

  const getPlayerScore = () => score;
  //should this be on the scoreboard object or here?
  const incrementPlayerScore = () => ++score;
  const resetPlayerScore = () => (score = 0);
  const getPlayerMark = () => mark;
  const getPlayerName = () => name;

  return {
    getPlayerScore,
    incrementPlayerScore,
    resetPlayerScore,
    getPlayerMark,
    getPlayerName,
  };
}

const gameController = (function () {
  let playerTurn;
  const startNewGame = function () {
    gameboard.resetGameboard();
    player1 = CreatePlayer("player1", "X");
    player2 = CreatePlayer("player2", "O");
    playerTurn = player1;

    //so vai existir nessa funcao ? acho que existe fora pq n ta com let
  };
  const changePlayer = () =>
    (playerTurn = playerTurn === player1 ? player2 : player1);
  const getCurrentPlayer = () => playerTurn;
  const playMove = function (row, column) {
    let currentPlayer = playerTurn;
    gameboard.setCellValue(row, column, currentPlayer.getPlayerMark());
    gameboard.getGameboard(); //change to render in the future
    changePlayer();
  };

  return { startNewGame, getCurrentPlayer, playMove };
})();
