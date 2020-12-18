import React, { useState } from 'react';
import { useGlobalContext } from '../context';

export default function SetupView() {
  const { game, startGame } = useGlobalContext();
  const [currentShipSeg, setCurrentShipSeg] = useState(null);

  // Start game
  const startGameButton = () => {
    startGame();
  };

  const allowDrop = (e) => {
    e.preventDefault();
  };

  // Handle drop on board
  const drop = (e) => {
    e.preventDefault();
    let val = e.dataTransfer.getData('text').split('-')[1];

    const coords = e.target.id.split('');
    const segOffset = currentShipSeg.split('-')[2];
    const ship = game.playerShips[val];

    // Make a mutaed array to account for segment offset
    let mutatedCoords = [];
    if (ship.getOrientation() === 'horizontal') {
      mutatedCoords[0] = coords[0] - 0;
      mutatedCoords[1] = coords[1] - segOffset;
    } else {
      mutatedCoords[0] = coords[0] - segOffset;
      mutatedCoords[1] = coords[1] - 0;
    }

    // Now try to place ship, catch the error if throw to trigger notice
    let success = true;
    try {
      game.playerBoard.placeShip(ship, mutatedCoords);
    } catch (Error) {
      success = false;
      console.log('Cant make that placement!');
    } finally {
      if (success) {
        toggleShipSuccess();
      } else {
        toggleShipError();
      }
      setCurrentShipSeg(null);
    }
  };

  // Set drag data to be used on drop
  const drag = (e) => {
    e.dataTransfer.setData('text', e.target.id);
  };

  //Rotate ship opn doublke click and reload page
  const rotateShip = (e) => {
    let val = e.target.id.split('-')[1];
    const ship = game.playerShips[val];
    ship.toggleOrientation();
    setCurrentShipSeg(null);
  };

  //Randomize player ship placement
  const randomizeShips = () => {
    game.playerShips = game.generateShips();
    game.playerBoard.resetBoard();
    game.randomizeShips(game.playerShips, game.playerBoard);
    setCurrentShipSeg(!currentShipSeg);
  };

  // Handle placement success or error feedback
  const toggleShipSuccess = () => {
    let main = document.querySelector('main');
    main.classList.add('success');
    setTimeout(() => {
      main.classList.remove('success');
    }, 1000);
  };
  const toggleShipError = () => {
    let main = document.querySelector('main');
    main.classList.add('error');
    setTimeout(() => {
      main.classList.remove('error');
    }, 1000);
  };

  return (
    <>
      <div className='setupHolder'>
        <div className='playerBoard'>
          <h4 className='header'>Your Board</h4>
          {game.playerBoard.getBoard().map((row, i) => {
            return (
              <div key={i} className='boardRow'>
                {row.map((cell, j) => {
                  if (cell.ship) {
                    return (
                      <div
                        key={`${i}${j}`}
                        id={`${i}${j}`}
                        className={`playerBoardCell ${`ship-${cell.ship[2]}`}`}
                      ></div>
                    );
                  } else {
                    return (
                      <div
                        key={`${i}${j}`}
                        id={`${i}${j}`}
                        className={`playerBoardCell`}
                        onDrop={(e) => drop(e)}
                        onDragOver={(e) => allowDrop(e)}
                      ></div>
                    );
                  }
                })}
              </div>
            );
          })}
        </div>

        {game.playerBoard.getShips().length < 5 && (
          <div className='shipHolder'>
            <h4 className='header'>Place Ships</h4>
            <hr />
            <button className='btn' onClick={() => randomizeShips()}>
              Randomize
            </button>
            <div className='shipDiv'>
              {game.playerShips.map((ship, i) => {
                if (game.playerBoard.getShips().includes(ship)) {
                  return null;
                } else {
                  return (
                    <div
                      key={`ship-${i}`}
                      id={`ship-${i}`}
                      className={`ship ${ship.getOrientation()}`}
                      draggable='true'
                      onDoubleClick={(e) => rotateShip(e)}
                      onMouseDown={(e) => setCurrentShipSeg(e.target.id)}
                      onDragStart={(e) => drag(e)}
                    >
                      {ship.getSegments().map((segment, j) => {
                        return (
                          <div
                            id={`ship-${i}-${j}`}
                            key={`${ship}-${i}-${j}`}
                            className={`playerShipCell ship-${ship.getLength()}`}
                            onDragStart={(e) => drag(e)}
                          ></div>
                        );
                      })}
                    </div>
                  );
                }
              })}
            </div>
            <hr />
            <p>Double-click ship to turn</p>
          </div>
        )}
        {game.playerBoard.getShips().length === 5 && (
          <div className='shipHolder'>
            <h4 className='header'>Ships have been placed!</h4>
            <hr />
            <button className='btn' onClick={() => randomizeShips()}>
              Re-Randomize
            </button>
            <button className='btn' onClick={() => startGameButton()}>
              Start Game
            </button>
          </div>
        )}
      </div>
    </>
  );
}
