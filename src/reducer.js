import Game from './functions/game';

export default function reducer(state, action) {
  if (action.type === 'PLAYER_TURN') {
    const game = state.game;

    game.enemyBoard.receiveAttack(action.payload);

    return { ...state, game: game, turn: false };
  }

  if (action.type === 'COMPUTER_TURN') {
    // IM DOIGN THIS INCORRECTLY< LOOK AT OTHER EXAMPLE AND SEE I NEED TO PASS ALL this stuff
    // I want to change when i call the function, then nest it correctly here!
    const game = state.game;
    const attack = game.computer.playTurn(game.playerBoard);
    game.playerBoard.receiveAttack(attack);

    console.log('playing a computer turn!');
    console.log(game);
    return { ...state, game: game, turn: true };
  }

  if (action.type === 'NEW_GAME') {
    return {
      ...state,
      game: Game(),
      setup: true,
      gameover: false,
      winner: null,
    };
  }
  if (action.type === 'START_GAME') {
    return { ...state, playing: true, setup: false };
  }

  if (action.type === 'WIN_GAME') {
    return { ...state, playing: false, gameover: true, winner: action.payload };
  }

  throw new Error('no matching action types');
}
