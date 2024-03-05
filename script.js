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
      const result = [
        [row, 0],
        [row, 1],
        [row, 2],
      ];
      console.log(result);
      return result;
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

      const results = [
        [0, parseInt(col)],
        [1, parseInt(col)],
        [2, parseInt(col)],
      ];
      console.log(results);
      return results;
    }

    console.log("no vertical match found");
    return false;
  };
  const getDiagonalMatch = function () {
    if (board[1][1] === null) return;
    if (board[0][0] === board[1][1] && board[1][1] === board[2][2]) {
      console.log(
        `Diagonal match found on board[0][0] with value of ${board[0][0]}`
      );
      const result = [
        [0, 0],
        [1, 1],
        [2, 2],
      ];
      console.log(result);
      return result;
    } else if (board[2][0] === board[1][1] && board[2][0] === board[0][2]) {
      console.log(`Diagonal match on board[2,0] value of ${board[2][0]}`);
      const result = [
        [2, 0],
        [1, 1],
        [2, 0],
      ];
      console.log(result);
      return result;
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
  //if im revealing all functions, is factory even necessary?
  return {
    board,
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

  //create player factory
  function createPlayer(name, mark) {
    // what if I wanted to keep track of all created players?
    //i can wrap this on an iife called players, but wouldnt that defeat the purpose of the simplicity of factory functions?

    let score = 0;
    const changePlayerName = (newName) => {
      name = newName ?? "";
    };
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
      changePlayerName,
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
  let gameover;
  const player1 = players.createPlayer("player 1", "X");
  const player2 = players.createPlayer("player 2", "O");
  let winner;
  const startNewGame = function () {
    gameboard.initGameboard();
    playerTurn = player1;
    move = 0;
    gameover = false;
    winner = "";
    gameboard.renderGameboard(); //this renders for the console
    //i want the game controller to only handle the game logic, let the displayController take care of the rendering
    // displayController.renderBoardDisplay(gameboard.board);
    // displayController.logTurn();
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
      if (checkWinnerMove(row, column)) return checkWinnerMove(row, column);
      //TODO upon checking for winner  move, return so it wont check for a tie
      else if (checkTie()) return;
      // can I refactor this to checkWinnerMove(row,column)||checkTie() ) ?
    }
    changePlayer();
    displayController.logTurn();
  };

  const checkWinnerMove = (row, column) => {
    gameover =
      gameboard.getDiagonalMatch() ||
      gameboard.getHorizontalMatch(row) ||
      gameboard.getVerticalMatch(column);
    if (!!gameover === true) {
      winner = getCurrentPlayer();
      winner.incrementPlayerScore();

      displayController.logWinner(winner);
      console.log(`${winner.getPlayerName()} won this round`);
      console.log(renderScore());
      console.log(`gameover result is`);
      console.log(gameover);
      return gameover;
    }
  };
  const checkTie = () => {
    if (gameboard.checkEmptyCells() === false) {
      gameover = true;
      winner = "tie";
      displayController.logWinner(winner);
      console.log(`It's a Tie, no points have been awarded`);
      console.log(renderScore());
      return true;
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
    //TODO here i should print the winner and the result, after play
    console.log(gameover);
    return gameover;
  };
  const gameStatus = () => gameover; //if true game is over, false means theres a ongoing game

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
  return {
    startNewGame,
    getCurrentPlayer,
    playMove,
    playRound,
    renderScore,
    gameStatus,
  };
})();

const displayController = (function () {
  //DOM
  const gridContainerEl = document.querySelector(".game-container");
  const newGameButton = document.querySelector("#new-game-button");
  const turnLogger = document.querySelector(".turn-heading");
  const gamelogSpan = document.querySelector("#game-log-span");
  const scoreboardDiv = document.querySelector(".scoreboard-div");

  //Listeners
  gridContainerEl.addEventListener("click", placeMark);
  newGameButton.addEventListener("click", (e) => {
    e.target.classList.add("hidden");
    turnLogger.classList.remove("hidden");
    startNewGame();
  });
  scoreboardDiv.addEventListener("keydown", (e) => {
    if (e.target.dataset.playerIdentifier === undefined) return;
    if (e.key === "Enter") {
      e.target.blur();
    }
  });
  scoreboardDiv.addEventListener("focusout", (e) => {
    console.log(e.target.textContent);
    changePlayerNameHandler(e);
    renderScoreboardDisplay();
    //I have to change on the banner as well, here a pubsub would be fun
    //but only change it if theres a ongoing game
    if (gameController.gameStatus() === false) logTurn();
  });

  //
  const TicTacToeBoard = (() => {
    const boardElements = [];
    for (let row = 0; row < 3; row++) {
      for (let column = 0; column < 3; column++) {
        const cellDiv = document.createElement("div");
        cellDiv.classList.add("grid-cell");
        cellDiv.dataset.coordinates = `${row},${column}`;
        boardElements.push(cellDiv);
      }
    }
    gridContainerEl.append(...boardElements);
    return boardElements;
  })();
  const renderBoardDisplay = (board) => {
    const gb = board.flat();
    for (let i = 0; i < gb.length; i++) {
      TicTacToeBoard[i].innerText = gb[i];
    }
  };

  //TODO
  const renderScoreboardDisplay = () => {
    const elements = [];
    for (let i = 0; i < players.playersList.length; i++) {
      const divEl = document.createElement("div");
      divEl.classList.add("scoreboard-div-child");
      const nameSpan = document.createElement("span");
      nameSpan.setAttribute("contenteditable", "plaintext-only");
      nameSpan.textContent = players.playersList[i].getPlayerName();
      nameSpan.dataset.playerIdentifier = i;
      const pointSpan = document.createElement("span");
      pointSpan.textContent = players.playersList[i].getPlayerScore();
      divEl.append(nameSpan, pointSpan);
      elements.push(divEl);
    }
    scoreboardDiv.replaceChildren(...elements);
  };

  const changePlayerNameHandler = (event) => {
    const playerIndex = event.target.dataset.playerIdentifier;
    const newName = event.target.textContent;
    players.playersList[playerIndex].changePlayerName(newName);
  };
  //hoisting
  //this function should only place a mark
  function placeMark(event) {
    if (gameController.gameStatus() === true) return; //means the game is over or there is no game
    const [row, column] = event.target.dataset.coordinates.split(",");
    console.log({ row, column });
    gameController.playMove(row, column);
    renderBoardDisplay(gameboard.board);

    //for play move to be called I need to init the board through gamecontroller start new game or there will be no board and no players.
  }

  function logTurn() {
    // turnLogger.classList.remove("hidden"); //make sure its not hidden
    turnLogger.textContent = `${gameController
      .getCurrentPlayer()
      .getPlayerName()} Turn`;
  }

  function logWinner(winner) {
    turnLogger.classList.remove("hidden");
    let text = "";
    if (winner === "tie") {
      text = "Its a tie";
    } else {
      text = `Game over, ${winner.getPlayerName()} won`;
    }
    renderScoreboardDisplay();
    turnLogger.textContent = text;
    const paragraphEl = document.createElement("p");
    paragraphEl.textContent = "Click here to start a new game";
    //im adding event listener repeatly ?
    paragraphEl.addEventListener("click", (e) => {
      startNewGame();
      e.target.remove();
      console.log("click");
    });
    gamelogSpan.append(paragraphEl);
  }

  function showNewGameButton() {
    newGameButton.style.display = "block";
  }

  function startNewGame() {
    gameController.startNewGame();
    logTurn();
    renderBoardDisplay(gameboard.board);
    renderScoreboardDisplay();
  }
  return {
    placeMark,
    renderBoardDisplay,
    logTurn,
    logWinner,
    renderScoreboardDisplay,
  };
})();
