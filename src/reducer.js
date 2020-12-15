import Game from './functions/game';

export default function reducer(state, action) {
  if (action.type === 'PLAYER_TURN') {
    const game = state.game;

    game.enemyBoard.receiveAttack(action.payload);

    return { ...state, game: game, userTurn: false };
  }

  if (action.type === 'COMPUTER_TURN') {
    // IM DOIGN THIS INCORRECTLY< LOOK AT OTHER EXAMPLE AND SEE I NEED TO PASS ALL this stuff
    // I want to change when i call the function, then nest it correctly here!
    const game = state.game;

    game.playerBoard.receiveAttack(action.payload);

    console.log('playing a computer turn!');

    return { ...state, game: game, userTurn: true };
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
