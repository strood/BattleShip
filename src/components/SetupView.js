import React from 'react';
import { useGlobalContext } from '../context';

export default function SetupView() {
  const { game, startGame } = useGlobalContext();
  console.log(game);
  console.log(game.playerShips[0].getSegments());

  const startGameButton = () => {
    startGame();
  };

  return (
    <>
      <div className='setupHolder'>
        <div className='playerBoard'>
          {game.playerBoard.getBoard().map((row, i) => {
            return (
              <div key={i} className='boardRow'>
                {row.map((cell, j) => {
                  return (
                    <div
                      key={`${i}${j}`}
                      id={`${i}${j}`}
                      className={`playerBoardCell ${
                        cell.ship ? `ship-${cell.ship[0]}` : ''
                      }`}
                    ></div>
                  );
                })}
              </div>
            );
          })}
        </div>
        {game.playerBoard.getShips().length < 5 && (
          <div className='shipHolder'>
            <h4>Place your Ships</h4>
            <div className='shipDiv'>
              {game.playerShips.map((ship, i) => {
                if (game.playerBoard.getShips().includes(ship)) {
                  return null;
                } else {
                  return (
                    <div className={`ship ${ship.getOrientation()}`}>
                      {ship.getSegments().map((segment) => {
                        return (
                          <div className={`playerShipCell ship-${i}`}></div>
                        );
                      })}
                    </div>
                  );
                }
              })}
            </div>
          </div>
        )}
        {game.playerBoard.getShips().length === 5 && (
          <div className='shipHolder'>
            <h4>Ships have been placed!</h4>
            <button onClick={() => startGameButton()}>Start Game!</button>
          </div>
        )}
      </div>
    </>
  );
}
