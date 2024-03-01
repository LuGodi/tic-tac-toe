const gameboard = (function () {
  const board = [];
  const initGameboard = () => {
    //check if a gameboard already exists, if so, remove it from the list
    if (board.length > 1) board.splice(0, board.length);
    for (let row = 0; row < 3; row++) {
      board.push([]);
      for (let column = 0; column < 3; column++) {
        board[row].push(null);
      }
    }
    return board;
  };
  const renderGameboard = () => {
    let textBoard = "";
    for (row of board) {
      textBoard += `${JSON.stringify(row)}\n`;
    }
    return textBoard;
  };
  const getCellValue = (row, column) => board[row][column];
  const setCellValue = (row, column, mark) => {
    board[row][column] = mark;
  };
  //I still need to optimize this logic a lot but for now will have to do. After player2 playing theres no point for checking if player1 won so maybe pass the mark as argument
  const getHorizontalMatch = function (row) {
    if (board[row][0] === null) return;
    if (board[row][0] === board[row][1] && board[row][0] === board[row][2]) {
      console.log(
        `match on horizontal, on row ${row}, value of ${board[row][0]}`
      );
      // return board[row][0];
      return true;
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
      return true;
    }
    console.log("no vertical match found");
  };
  const getDiagonalMatch = function () {
    if (board[1][1] === null) return;
    if (board[0][0] === board[1][1] && board[1][1] === board[2][2]) {
      console.log(
        `Diagonal match found on board[0][0] with value of ${board[0][0]}`
      );
      return true;
    } else if (board[2][0] === board[1][1] && board[2][0] === board[0][2]) {
      console.log(`Diagonal match on board[2,0] value of ${board[2][0]}`);
      return true;
    }
    console.log("no diagonal match found");
    return false;
  };
  const checkEmptyCells = () => {
    for (row of board) {
      if (row.some((element) => element === null)) return true;
    }
    return false;
  };
  return {
    initGameboard,
    setCellValue,
    getHorizontalMatch,
    getVerticalMatch,
    getDiagonalMatch,
    renderGameboard,
    getCellValue,
    checkEmptyCells,
  };
})();

const players = (function () {
  const playersList = [];
  // const getPlayerList = () => playersList; it will return a shallow copy, defeats purpose.
  const getPlayersName = () => {
    const playersName = [];
    for (let player of playersList) {
      playersName.push(player.getPlayerName());
    }
    return playersName;
  };
  // const getPlayersList = () => JSON.stringify(playersList); /// to prevent access to the playersList from outside
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
  const playersOverview = function () {};
  return { createPlayer, getPlayerByMark, getPlayersName, playersList };
})();

const gameController = (function () {
  let playerTurn;
  let move;
  const player1 = players.createPlayer("player1", "X");
  const player2 = players.createPlayer("player2", "O");
  let winner;
  const startNewGame = function () {
    gameboard.initGameboard();
    playerTurn = player1;
    move = 0;
    gameover = false;
    winner = "";
    gameboard.renderGameboard();

    //so vai existir nessa funcao ? acho que existe fora pq n ta com let
  };
  const changePlayer = () =>
    (playerTurn = playerTurn === player1 ? player2 : player1);
  const getCurrentPlayer = () => playerTurn; // stuff like this shouldnt be on player factory instead?
  const playMove = function (row, column) {
    let currentPlayer = playerTurn;
    if (gameboard.getCellValue(row, column) !== null) {
      console.error(
        "cannot overwrite cell value, please playmove again and select another one"
      );
      return;
    }

    gameboard.setCellValue(row, column, currentPlayer.getPlayerMark());
    console.log(
      `player ${gameController
        .getCurrentPlayer()
        .getPlayerName()}, marked ${gameController
        .getCurrentPlayer()
        .getPlayerMark()}, on cell ${row},${column} succeeded`
    );
    //to prevent changing the playerTurn if he doesnt make a move

    //i have to be sure they suceeded on set cell value
    //I can check when I ask for a prompt
    let currentGameboard = gameboard.renderGameboard(); //change to render in the future
    console.log(currentGameboard);
    move++;
    if (move >= 4) {
      checkWinnerMove(row, column);
      checkTie();
    }

    //how can i implement tie?

    // if (gameboard.checkEmptyCells() === false)
    changePlayer();
  };

  const checkWinnerMove = (row, column) => {
    gameover = !!(
      gameboard.getDiagonalMatch() ||
      gameboard.getHorizontalMatch(row) ||
      gameboard.getVerticalMatch(column)
    );
    if (gameover === true) {
      winner = getCurrentPlayer();
      winner.incrementPlayerScore();

      console.log(`${winner.getPlayerName()} won this round`);
      console.log(renderScore());
    }
  };
  const checkTie = () => {
    if (gameboard.checkEmptyCells() === false) {
      gameover = true;
      winner = "tie";
      console.log(`It's a Tie, no points have been awarded`);
      console.log(renderScore());
    }
  };

  const playRound = () => {
    startNewGame();
    while (gameover === false) {
      let [row, column] = prompt(
        `Player ${playerTurn.getPlayerName()}'s turn, Select row and column to play`
      ).split(" ");
      playMove(row, column);
    }
    console.log(gameover);
    return gameover;
  };

  const renderScore = () => {
    const scoreBoard = {};
    for (let player of players.playersList) {
      scoreBoard[player.getPlayerName()] = player.getPlayerScore();
    }
    let scoreBoardVisual = `-------  S C O R E  --------\n\n`;
    for (const key in scoreBoard) {
      scoreBoardVisual += `${key} ............. ${scoreBoard[key]} \n`;
    }
    scoreBoardVisual += `--------------------------------`;
    return scoreBoardVisual;
  };
  return { startNewGame, getCurrentPlayer, playMove, playRound, renderScore };
})();
