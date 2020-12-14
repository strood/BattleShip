import React, { useEffect } from 'react';
import { useGlobalContext } from '../context';
import GameView from '../components/GameView';
import NewGameView from '../components/NewGameView';
import SetupView from '../components/SetupView';

export default function Main() {
  const { game, setup, playing } = useGlobalContext();

  useEffect(() => {
    if (game.turn === game.computer) {
      // game.playerBoard.receiveAttack(game.computer.playTurn(game.playerBoard));
      // game.toggleTurn();
      console.log('comp turn!');
    }
  }, [game]);

  // console.log(newGame);
  return (
    <main>
      <h1>BattleShip</h1>
      {!game && <NewGameView />}
      {setup && <SetupView game={game} />}
      {playing && <GameView game={game} />}
    </main>
  );
}
