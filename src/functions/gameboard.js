// Gameboard Factory

const Gameboard = () => {
  // Properties
  //   let board = Array(10).fill({ hit: false, ship: false, shipID: null });
  let board = [];
  for (let i = 1; i <= 10; i++) {
    let row = [];
    for (let j = 1; j <= 10; j++) {
      let cell = { hit: false, ship: false };
      row.push(cell);
    }
    board.push(row);
  }

  let placedShips = [];

  // Getters
  const getShips = () => placedShips;
  const getBoard = () => board;

  // Functions

  const checkPlacement = (ship, coordinates) => {
    let placementValidity = true;
    let startX = coordinates[0];
    let startY = coordinates[1];
    let orientation = ship.getOrientation();
    let length = ship.getLength();

    let boardSeg = [];
    //check orientaition, and grab board in that direction
    if (orientation === 'horizontal') {
      boardSeg = board[startX].slice(startY);
    } else {
      for (let i = startX; i <= 9; i++) {
        boardSeg.push(board[i][startY]);
      }
    }

    // Check if you will overflow segment
    if (boardSeg.length < length) {
      placementValidity = false;
    } else {
      // check if intersect w/ ship in segment
      for (let i = 1; i < length; i++) {
        if (boardSeg[i].ship) {
          placementValidity = false;
        }
      }
    }

    return placementValidity;
  };

  const placeShip = (ship, coordinates) => {
    const isValid = checkPlacement(ship, coordinates);

    if (isValid) {
      let id = placedShips.push(ship) - 1;

      if (ship.getOrientation() === 'horizontal') {
        let constX = coordinates[0];
        let startY = coordinates[1];
        let endY = startY + ship.getLength();
        // track which segment of ship it is, encode into id so we know for later when hit
        let segcount = 0;
        for (let i = startY; i < endY; i++) {
          board[constX][i].ship = `${id}s${segcount}`;
          segcount++;
        }
      } else {
        let startX = coordinates[0];
        let constY = coordinates[1];
        let endX = startX + ship.getLength();
        // track which segment of ship it is, encode into id so we know for later when hit
        let segcount = 0;
        for (let i = startX; i < endX; i++) {
          board[i][constY].ship = `${id}s${segcount}`;
          segcount++;
        }
      }
    } else {
      // invalid placement
      throw new Error('invalid ship placement');
    }
  };
  return {
    getBoard,
    getShips,
    placeShip,
  };
};

export default Gameboard;
