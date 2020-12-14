import React from 'react';
import { useGlobalContext } from '../context';

export default function NewGameView() {
  const { newGame } = useGlobalContext();
  const newGameButton = () => {
    newGame();
  };
  return (
    <>
      <h1>New Game View!</h1>
      <p>
        Clicking button below will start a new game that has unplaces ships, sow
        e will go to setup view
      </p>
      <button onClick={() => newGameButton()}>Start New Game!</button>
    </>
  );
}
