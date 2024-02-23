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
  //I still need to optimize this logic a lot but for now will have to do. After player2 playing theres no point for checking if player1 won so maybe pass the mark as argument
  const getHorizontalMatch = function (row) {
    if (board[row][0] === null) return;
    if (board[row][0] === board[row][1] && board[row][0] === board[row][2]) {
      console.log(
        `match on horizontal, on row ${row}, value of ${board[row][0]}`
      );
      return board[row][0];
    }
    console.log("no match");
    return false;
  };
  const getVerticalMatch = function (col) {
    if (board[0][col] === null) return;
    if (board[0][col] === board[1][col] && board[0][col] === board[2][col]) {
      console.log(
        `match for vertical on col ${col} and value of ${board[0][col]}`
      );
      return board[0][col];
    }
    console.log("no vertical match found");
  };
  const getDiagonalMatch = function () {
    if (board[1][1] === null) return;
    if (board[0][0] === board[1][1] && board[1][1] === board[2][2]) {
      console.log(
        `Diagonal match found on board[0][0] with value of ${board[0][0]}`
      );
      return board[0][0];
    } else if (board[2][0] === board[1][1] && board[2][0] === board[0][2]) {
      console.log(`Diagonal match on board[2,0] value of ${board[2][0]}`);
      return board[2][0];
    }
    console.log("no diagonal match found");
    return false;
  };
  return {
    getGameboard,
    resetGameboard,
    getGameboardCell,
    setCellValue,
    getHorizontalMatch,
    getVerticalMatch,
    getDiagonalMatch,
  };
})();

const players = (function () {
  const playersList = [];
  // const getPlayerList = () => playersList; it will return a shallow copy, defeats purpose.
  const addToPlayerList = (player) => {
    playersList.push(player);
  };
  const getPlayerByMark = (mark) =>
    playersList.find((player) => player.getPlayerMark() === mark);
  function createPlayer(name, mark) {
    // what if I wanted to keep track of all created players?
    //i can wrap this on an iife called players, but wouldnt that defeat the purpose of the simplicity of factory functions?

    let score = 0;

    //keep an array with the players
    const getPlayerScore = () => score;
    //should this be on the scoreboard object or here?
    const incrementPlayerScore = () => ++score;
    const resetPlayerScore = () => (score = 0);
    const getPlayerMark = () => mark;
    const getPlayerName = () => name;
    const getPlayerByMark = (targetMark) => {};
    const newPlayer = {
      getPlayerScore,
      incrementPlayerScore,
      resetPlayerScore,
      getPlayerMark,
      getPlayerName,
    };
    addToPlayerList(newPlayer);
    return newPlayer;
  }
  return { createPlayer, getPlayerByMark };
})();

const gameController = (function () {
  let playerTurn;
  let move;
  const startNewGame = function () {
    gameboard.resetGameboard();
    player1 = players.createPlayer("player1", "X");
    player2 = players.createPlayer("player2", "O");
    playerTurn = player1;
    move = 0;

    //so vai existir nessa funcao ? acho que existe fora pq n ta com let
  };
  const changePlayer = () =>
    (playerTurn = playerTurn === player1 ? player2 : player1);
  const getCurrentPlayer = () => playerTurn; // stuff like this shouldnt be on player factory instead?
  const playMove = function (row, column) {
    let currentPlayer = playerTurn;
    gameboard.setCellValue(row, column, currentPlayer.getPlayerMark());
    gameboard.getGameboard(); //change to render in the future
    changePlayer();
    move++;
  };

  const checkWinner = () => {};

  const playRound = () => {};

  return { startNewGame, getCurrentPlayer, playMove };
})();

gameController.startNewGame();
gameController.playMove(0, 0);
gameController.playMove(0, 1);
gameController.playMove(1, 0);
gameController.playMove(0, 2);
gameController.playMove(2, 0);
gameController.playMove(1, 2);
gameController.playMove(1, 1);
gameController.playMove(2, 1);
gameController.playMove(2, 2);
