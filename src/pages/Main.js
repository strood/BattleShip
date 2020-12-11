import React, { useEffect } from 'react';
import Game from '../functions/game';

export default function Main() {
  const newGame = Game();
  console.log(newGame.enemyBoard.getBoard());
  const playerBoard = newGame.playerBoard.getBoard();
  const enemyBoard = newGame.enemyBoard.getBoard();
  return (
    <main>
      <h1>BattleShip</h1>
      <div className='boardHolder'>
        <div className='playerBoardDiv'>
          <h3>Your Board</h3>
          <div className='playerBoard'>
            {playerBoard.map((row, i) => {
              return (
                <div key={i} className='boardRow'>
                  {row.map((cell, j) => {
                    return (
                      <div
                        key={`${i}${j}`}
                        id={`${i}${j}`}
                        className='boardCell'
                      ></div>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>
        <div className='enemyBoardDiv'>
          <h3>Enemy Board</h3>
          <div className='enemyBoard'>
            {enemyBoard.map((row, i) => {
              return (
                <div key={i} className='boardRow'>
                  {row.map((cell, j) => {
                    return (
                      <div
                        key={`${i}${j}`}
                        id={`${i}${j}`}
                        className='boardCell'
                      ></div>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </main>
  );
}
