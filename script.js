gameboard = (function () {
  board = [];
  const resetGameboard = () => {
    for (let row = 0; row < 3; row++) {
      board.push([]);
      for (let column = 0; column < 3; column++) {
        board[row].push(null);
      }
    }
  };
  const getGameboard = () => board;
  const getCell = (row, column) => board[row][column];

  return { getGameboard, resetGameboard, getCell };
})();
