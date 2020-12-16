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
      <h1>Game Over</h1>
      {winner.human ? <h2>You win!</h2> : <h2>You Lose!</h2>}
      <p>play a new game?</p>
      <button onClick={() => newGameButton()}>Start New Game!</button>
    </div>
  );
}
