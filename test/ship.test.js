import Ship from '../src/functions/ship';

describe('Ship Factory', () => {
  test('returns a ship object of given length when called', () => {
    const ship3 = Ship(3);
    expect(ship3.getLength()).toBe(3);
  });

  test('ship has no hits when first created', () => {
    const ship = Ship(4);
    expect(ship.getSegments()).toEqual([null, null, null, null]);
  });

  test('by default isSunk is false', () => {
    expect(Ship(3).isSunk()).toEqual(false);
  });

  test('ship hit() function will mark a given segment as hit', () => {
    const ship = Ship(3);
    ship.hit(2);
    expect(ship.getSegments()).toEqual([null, null, 'hit']);
  });

  test('if all segments hit, ship is sunk', () => {
    const ship = Ship(3);
    ship.hit(0);
    ship.hit(1);
    ship.hit(2);

    expect(ship.isSunk()).toBe(true);
  });

  test('ship is by default oriented horizontal', () => {
    expect(Ship(2).getOrientation()).toBe('horizontal');
  });

  test('toggleOrientation will swap the ship direction', () => {
    let ship1 = Ship(3);
    ship1.toggleOrientation();
    expect(ship1.getOrientation()).toBe('vertical');
    ship1.toggleOrientation();
    expect(ship1.getOrientation()).toBe('horizontal');
  });
});
