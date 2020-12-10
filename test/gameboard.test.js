import Gameboard from '../src/functions/gameboard';
import Ship from '../src/functions/ship';

describe('Gameboard', () => {
  test('Gameboard has 10x10 coordinates, empty on first creation', () => {
    const testBoard = Gameboard();
    expect(testBoard.getBoard()[0].length).toBe(10);
    expect(testBoard.getBoard().length).toBe(10);
    expect(
      testBoard
        .getBoard()[0]
        .every((cell) => cell === { hit: false, ship: false })
    );
    // Could test all rows, going to skip and assume since first row correct, all will be
  });

  test('placeShip() will place a ship on specified coordinates, horizontally', () => {
    const board = Gameboard();
    board.placeShip(Ship(4), [0, 5]);
    expect(board.getBoard()[0][4]).toEqual({
      hit: false,
      ship: false,
    });
    expect(board.getBoard()[0][5]).toEqual({
      hit: false,
      ship: '0s0',
    });
    expect(board.getBoard()[0][6]).toEqual({
      hit: false,
      ship: '0s1',
    });
    expect(board.getBoard()[0][7]).toEqual({
      hit: false,
      ship: '0s2',
    });
    expect(board.getBoard()[0][8]).toEqual({
      hit: false,
      ship: '0s3',
    });
    expect(board.getBoard()[0][9]).toEqual({
      hit: false,
      ship: false,
    });
  });

  test('placeShip() will place a ship on specified coordinates, vertically', () => {
    const board = Gameboard();
    const testShip = Ship(5);
    testShip.toggleOrientation();
    board.placeShip(testShip, [1, 3]);
    expect(board.getBoard()[0][3]).toEqual({
      hit: false,
      ship: false,
    });
    expect(board.getBoard()[1][3]).toEqual({
      hit: false,
      ship: '0s0',
    });
    expect(board.getBoard()[2][3]).toEqual({
      hit: false,
      ship: '0s1',
    });
    expect(board.getBoard()[3][3]).toEqual({
      hit: false,
      ship: '0s2',
    });
    expect(board.getBoard()[4][3]).toEqual({
      hit: false,
      ship: '0s3',
    });
    expect(board.getBoard()[5][3]).toEqual({
      hit: false,
      ship: '0s4',
    });
    expect(board.getBoard()[6][3]).toEqual({
      hit: false,
      ship: false,
    });
  });

  test('if placeShip() is used on an invalid cell and will overflow board(horizontal), return an error', () => {
    const board = Gameboard();
    const testShip = Ship(5);
    expect(() => board.placeShip(testShip, [0, 9])).toThrow(
      'invalid ship placement'
    );
  });

  test('if placeShip() is used on an invalid cell and will intersect other ship(horizontal), return an error', () => {
    const board = Gameboard();
    const testShip = Ship(5);
    const testShip2 = Ship(4);
    board.placeShip(testShip2, [0, 0]);
    expect(() => board.placeShip(testShip, [0, 1])).toThrow(
      'invalid ship placement'
    );
  });

  test('if placeShip() is used on an invalid cell and will overflow board(vertical), return an error', () => {
    const board = Gameboard();
    const testShip = Ship(5);
    testShip.toggleOrientation();
    expect(() => board.placeShip(testShip, [9, 9])).toThrow(
      'invalid ship placement'
    );
  });

  test('if placeShip() is used on an invalid cell and will intersect other ship(vertical), return an error', () => {
    const board = Gameboard();
    const testShip = Ship(5);
    testShip.toggleOrientation();
    const testShip2 = Ship(4);
    board.placeShip(testShip2, [1, 0]);
    expect(() => board.placeShip(testShip, [0, 1])).toThrow(
      'invalid ship placement'
    );
  });

  test('receiveAttack() function will take coordinates, mark spot as hit', () => {
    const board = Gameboard();
    board.receiveAttack([5, 5]);
    expect(board.getBoard()[5][5]).toEqual({ hit: true, ship: false });
  });

  test('receiveAttack() function will take coordinates, mark spot as hit, even if ship present', () => {
    const board = Gameboard();
    const testShip = Ship(5);
    board.placeShip(testShip, [5, 3]);
    board.receiveAttack([5, 5]);
    expect(board.getBoard()[5][5]).toEqual({ hit: true, ship: '0s2' });
  });

  test('receiveAttack() function will take coordinates, mark spot as hit, and tell correct ship its been hit, in correct segment', () => {
    const board = Gameboard();
    const testShip = Ship(5);
    board.placeShip(testShip, [5, 3]);
    board.receiveAttack([5, 5]);

    expect(testShip.getSegments()[2]).toEqual('hit');
  });

  test('shipsRemaining() should return true, unless all ships have been sank', () => {
    const board = Gameboard();
    const testShip1 = Ship(2);
    const testShip2 = Ship(2);
    board.placeShip(testShip1, [0, 0]);
    board.placeShip(testShip2, [1, 0]);
    board.receiveAttack([0, 0]);
    board.receiveAttack([0, 1]);
    board.receiveAttack([1, 0]);
    expect(board.shipsSunk()).toBe(false);
    board.receiveAttack([1, 1]);
    expect(board.shipsSunk()).toBe(true);
  });
});
