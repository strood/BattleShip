import Game from './functions/game';

export default function reducer(state, action) {
  if (action.type === 'PLAYER_TURN') {
    const game = state.game;
    game.enemyBoard.receiveAttack(action.payload);

    return { ...state, game: game, userTurn: false };
  }

  if (action.type === 'COMPUTER_TURN') {
    const game = state.game;
    game.playerBoard.receiveAttack(action.payload);

    return { ...state, game: game, userTurn: true };
  }

  if (action.type === 'NEW_GAME') {
    return {
      ...state,
      game: Game(),
      setup: true,
      playing: false,
      gameover: false,
      winner: null,
    };
  }

  if (action.type === 'START_GAME') {
    let randFlip = Math.floor(Math.random() * 2);
    let userTurn = false;
    if (randFlip === 1) {
      userTurn = true;
    }
    return { ...state, playing: true, setup: false, userTurn: userTurn };
  }

  if (action.type === 'WIN_GAME') {
    return { ...state, playing: true, gameover: true, winner: action.payload };
  }

  throw new Error('no matching action types');
}
