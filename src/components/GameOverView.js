import React from 'react';
import { useGlobalContext } from '../context';

export default function NewGameView() {
  const { newGame, winner } = useGlobalContext();

  const newGameButton = () => {
    //Start new game
    newGame();
  };
  return (
    <div className='modal'>
      <div className='modalDiv'>
        <h1>Game Over</h1>
        <hr />
        {winner.human ? <h2>You win!</h2> : <h2>You Lose!</h2>}
        <p>Play again?</p>
        <button className='btn' onClick={() => newGameButton()}>
          Start New Game!
        </button>
      </div>
    </div>
  );
}
