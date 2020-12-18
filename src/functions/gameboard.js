// Gameboard Factory

const Gameboard = () => {
  const hitEvent = new Event('hit');
  const missEvent = new Event('miss');

  // Properties
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
  const shipsSunk = () => {
    return placedShips.every((ship) => ship.isSunk() === true);
  };

  // Functions

  const resetBoard = () => {
    board = [];
    for (let i = 1; i <= 10; i++) {
      let row = [];
      for (let j = 1; j <= 10; j++) {
        let cell = { hit: false, ship: false };
        row.push(cell);
      }
      board.push(row);
    }

    placedShips = [];
  };

  const checkPlacement = (ship, coordinates) => {
    let placementValidity = true;
    let startX = coordinates[0];
    let startY = coordinates[1];
    let orientation = ship.getOrientation();
    let length = ship.getLength();
    let boardSeg = [];

    // dont ANY accept if x < 0 or y < 0 or x or 7 > 9

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
      for (let i = 0; i < length; i++) {
        if (boardSeg[i].ship) {
          placementValidity = false;
        }
      }
    }

    return placementValidity;
  };

  // Place ship at given coords, unless invalid, then return error
  const placeShip = (ship, coordinates) => {
    const isValid = checkPlacement(ship, coordinates);

    if (isValid) {
      // Grab length for id used in color, index used later when marking hit
      let id = ship.getLength();
      let index = placedShips.push(ship) - 1;

      if (ship.getOrientation() === 'horizontal') {
        let constX = coordinates[0];
        let startY = coordinates[1];
        let endY = startY + ship.getLength();
        // track which segment of ship it is, encode into id so we know for later when hit
        let segcount = 0;
        for (let i = startY; i < endY; i++) {
          board[constX][i].ship = `${index}s${id}s${segcount}`;
          segcount++;
        }
      } else {
        let startX = coordinates[0];
        let constY = coordinates[1];
        let endX = startX + ship.getLength();
        // track which segment of ship it is, encode into id so we know for later when hit
        let segcount = 0;
        for (let i = startX; i < endX; i++) {
          board[i][constY].ship = `${index}s${id}s${segcount}`;
          segcount++;
        }
      }
    } else {
      // invalid placement
      throw new Error('invalid ship placement');
    }
  };

  // Receive attack coordinates, mark as hit, notify ship of hit segment if present
  const receiveAttack = (coordinates) => {
    const main = document.querySelector('main');
    let x = coordinates[0];
    let y = coordinates[1];
    board[x][y].hit = true;
    if (board[x][y].ship) {
      let shipInfo = board[x][y].ship.split('s');
      let index = shipInfo[0];
      let shipSeg = shipInfo[2];
      placedShips[index].hit(shipSeg);
      main.dispatchEvent(hitEvent);
    } else {
      main.dispatchEvent(missEvent);
    }
  };

  return {
    getBoard,
    getShips,
    placeShip,
    shipsSunk,
    receiveAttack,
    checkPlacement,
    resetBoard,
  };
};

export default Gameboard;
