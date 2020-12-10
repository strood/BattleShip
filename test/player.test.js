import Player from '../src/functions/player';
import Gameboard from '../src/functions/gameboard';
import Ship from '../src/functions/ship';

describe('Player', () => {
  test('player can be either human, or computer controlled', () => {
    expect(Player(true).human).toBe(true);
    expect(Player(false).human).toBe(false);
  });

  test('playTurn(enemyBoard) will return a coordinate within standard board dimensions', () => {
    let board = Gameboard();
    let player = Player(false);
    let attack = player.playTurn(board);
    expect(attack[0]).toBeGreaterThanOrEqual(0);
    expect(attack[1]).toBeGreaterThanOrEqual(0);
    expect(attack[0]).toBeLessThanOrEqual(9);
    expect(attack[1]).toBeLessThanOrEqual(9);
  });

  test('playTurn(enemyBoard) will return a coordinate that has not already been hit', () => {
    const board = Gameboard();
    let player = Player(false);
    // Fill in all but [9,9] with hit== true so only one valid option remains
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 10; j++) {
        board.receiveAttack([i, j]);
      }
    }
    for (let i = 9; i < 10; i++) {
      for (let j = 0; j < 9; j++) {
        board.receiveAttack([i, j]);
      }
    }
    let attack = player.playTurn(board);
    // Expoect last remaining move
    expect(attack).toEqual([9, 9]);
  });
});
