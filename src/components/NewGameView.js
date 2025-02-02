import React from 'react';
import { useGlobalContext } from '../context';

export default function NewGameView() {
  const { newGame } = useGlobalContext();
  const newGameButton = () => {
    newGame();
  };
  return (
    <>
      <button className='btn' onClick={() => newGameButton()}>
        Play
      </button>
    </>
  );
}
