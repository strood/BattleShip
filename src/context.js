import React, { useState, useContext, useEffect, useReducer } from 'react';
import { useCallback } from 'react';
import Game from './functions/game';
import reducer from './reducer';

const AppContext = React.createContext();

const initialState = {
  game: false,
  setup: false,
  playing: false,
  userTurn: false,
  gameover: false,
  winner: null,
};

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const newGame = () => {
    dispatch({ type: 'NEW_GAME' });
  };

  const startGame = () => {
    dispatch({ type: 'START_GAME' });
  };

  const playerTurn = (coordinates) => {
    dispatch({ type: 'PLAYER_TURN', payload: coordinates });
  };

  const computerTurn = (attack) => {
    dispatch({ type: 'COMPUTER_TURN', payload: attack });
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
