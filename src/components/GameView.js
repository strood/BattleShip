import React, { useEffect } from 'react';
import { useGlobalContext } from '../context';

export default function GameView() {
  const {
    playerTurn,
    computerTurn,
    winGame,
    game,
    userTurn,
    gameover,
  } = useGlobalContext();

  const handleClick = (e) => {
    // Handle user attack, respond with computer attack
    if (userTurn) {
      if (
        !e.target.classList.contains('hit') &&
        !e.target.classList.contains('hitShip')
      ) {
        playerTurn([e.target.id[0], e.target.id[1]]);

        const attack = game.computer.playTurn(game.playerBoard);
        setTimeout(() => {
          computerTurn(attack);
        }, 1000);
      } else {
        console.log('invalid move');
      }
    }
  };

  let main = document.querySelector('main');
  main.addEventListener('hit', () => {
    main.classList.add('success');
    setTimeout(() => {
      main.classList.remove('success');
    }, 550);
  });

  main.addEventListener('miss', () => {
    main.classList.add('error');
    setTimeout(() => {
      main.classList.remove('error');
    }, 550);
  });

  useEffect(() => {
    // Only used for first load if coomputer first move
    if (!userTurn) {
      const attack = game.computer.playTurn(game.playerBoard);

      setTimeout(() => {
        computerTurn(attack);
      }, 550);
    }
  }, []);

  useEffect(() => {
    // Check for game win
    if (!gameover) {
      if (game.playerBoard.shipsSunk()) {
        console.log('computer wins!');
        winGame(game.computer);
      }
      if (game.enemyBoard.shipsSunk()) {
        console.log('player wins!');
        winGame(game.user);
      }
    }
  });

  return (
    <div className='boardHolder'>
      <div className='playerBoardDiv'>
        <div className='headerDiv'>
          <h4 className='header'>Your Board</h4>
          {userTurn && <p>&#8226;</p>}
        </div>

        <div className='playerBoard'>
          {game.playerBoard.getBoard().map((row, i) => {
            return (
              <div key={i} className='boardRow'>
                {row.map((cell, j) => {
                  return (
                    <div
                      key={`${i}${j}`}
                      id={`${i}${j}`}
                      className={` ${cell.hit && !cell.ship ? 'hit' : ''}
                       ${cell.ship ? `ship-${cell.ship[2]}` : ''}
                       ${
                         cell.ship && cell.hit ? 'hitShip' : ''
                       } playerBoardCell`}
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
      <br />

      <div className='enemyBoardDiv'>
        <div className='headerDiv'>
          <h4 className='header'>Enemy Board</h4>
          {!userTurn && <p>&#8226;</p>}
        </div>
        <div className='enemyBoard'>
          {game.enemyBoard.getBoard().map((row, i) => {
            return (
              <div key={i} className='boardRow'>
                {row.map((cell, j) => {
                  return (
                    <div
                      onClick={(e) => handleClick(e)}
                      key={`${i}${j}`}
                      id={`${i}${j}`}
                      className={`enemyBoardCell ${
                        cell.hit && !cell.ship ? 'hit' : ''
                      }
                        ${cell.ship && cell.hit ? 'hitShip' : ''}
                         ${
                           cell.ship && gameover ? `ship-${cell.ship[2]}` : ''
                         }`}
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
