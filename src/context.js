import React, { useState, useContext, useEffect, useReducer } from 'react';
import { useCallback } from 'react';
import Game from './functions/game';
import reducer from './reducer';

const AppContext = React.createContext();

const initialState = {
  game: Game(),
  setup: false,
  playing: true,
  turn: false,
  gameover: false,
  winner: null,
};

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Add in useful methods for incrementing game.

  const newGame = () => {
    dispatch({ type: 'NEW_GAME' });
  };

  const startGame = () => {
    dispatch({ type: 'START_GAME' });
  };

  const playerTurn = (coordinates) => {
    dispatch({ type: 'PLAYER_TURN', payload: coordinates });
  };

  const computerTurn = () => {
    dispatch({ type: 'COMPUTER_TURN' });
  };

  const winGame = (winner) => {
    dispatch({ type: 'WIN_GAME', payload: winner });
  };
  return (
    <AppContext.Provider
      value={{
        ...state,
        newGame,
        startGame,
        playerTurn,
        computerTurn,
        winGame,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
