import Game from './functions/game';

export default function reducer(state, action) {
  if (action.type === 'PLAYER_TURN') {
  }

  if (action.type === 'NEW_GAME') {
    return { ...state, game: Game(), setup: true };
  }
  if (action.type === 'START_GAME') {
    return { ...state, playing: true };
  }

  throw new Error('no matching action types');
}
