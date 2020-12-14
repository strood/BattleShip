import React from 'react';

export default function GameView({ game }) {
  const handleClick = (e) => {
    console.log(e);
    console.log(e.target.id);
    // game.enemyBoard.receiveAttack([e.target.id[0], e.target.id[1]]);
  };
  console.log(game);
  return (
    <div className='boardHolder'>
      <div className='playerBoardDiv'>
        <h3>Your Board</h3>
        <div className='playerBoard'>
          {game.playerBoard.getBoard().map((row, i) => {
            return (
              <div key={i} className='boardRow'>
                {row.map((cell, j) => {
                  return (
                    <div
                      key={`${i}${j}`}
                      id={`${i}${j}`}
                      className={`playerBoardCell ${cell.hit ? 'hit' : ''}
                       ${cell.ship ? `ship ship-${cell.ship[0]}` : ''}`}
                    >
                      {cell.ship && cell.hit ? 'X' : null}
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
      {game.turn === game.user ? <h3>Your Move!</h3> : ''}
      <div className='enemyBoardDiv'>
        <h3>Enemy Board</h3>
        <div className='enemyBoard'>
          {game.enemyBoard.getBoard().map((row, i) => {
            return (
              <div key={i} className='boardRow'>
                {row.map((cell, j) => {
                  console.log(cell);
                  return (
                    <div
                      onClick={(e) => handleClick(e)}
                      key={`${i}${j}`}
                      id={`${i}${j}`}
                      className={`enemyBoardCell ${
                        cell.hit && !cell.ship ? 'hit' : ''
                      }
                        ${cell.ship && cell.hit ? 'hitShip' : ''}`}
                    >
                      {cell.ship && cell.hit ? 'X' : null}
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
