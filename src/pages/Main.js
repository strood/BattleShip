import React from 'react';
import { useGlobalContext } from '../context';
import GameView from '../components/GameView';
import NewGameView from '../components/NewGameView';
import SetupView from '../components/SetupView';
import GameOverView from '../components/GameOverView';

export default function Main() {
  const { game, setup, playing, gameover } = useGlobalContext();

  return (
    <main>
      <h1>BattleShip</h1>
      {!game && <NewGameView />}
      {setup && <SetupView />}
      {playing && <GameView />}
      {gameover && <GameOverView />}
    </main>
  );
}
