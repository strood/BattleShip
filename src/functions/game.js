import Player from './player';
import Gameboard from './gameboard';
import Ship from './ship';

const generateShips = () => {
  const baseShips = [5, 4, 3, 3, 2];
  return baseShips.map((shipSize) => {
    let ship = Ship(shipSize);
    let randFlip = Math.floor(Math.random() * 2);
    if (randFlip === 1) {
      ship.toggleOrientation();
    }
    return ship;
  });
};

const randomizeShips = (shipsArr, board) => {
  shipsArr.forEach((ship) => {
    let validMove = false;
    let x = 0;
    let y = 0;
    do {
      x = Math.floor(Math.random() * 10);
      y = Math.floor(Math.random() * 10);
      validMove = board.checkPlacement(ship, [x, y]);
    } while (validMove === false);

    board.placeShip(ship, [x, y]);
  });
};

const Game = () => {
  const user = Player(true);
  const computer = Player(false);
  const playerBoard = Gameboard();
  const enemyBoard = Gameboard();
  const playerShips = generateShips();
  const enemyShips = generateShips();

  randomizeShips(enemyShips, enemyBoard);

  return {
    user,
    computer,
    playerBoard,
    enemyBoard,
    playerShips,
    generateShips,
    randomizeShips,
  };
};

export default Game;
