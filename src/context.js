import React, { useState, useContext, useEffect, useReducer } from 'react';
import { useCallback } from 'react';
import reducer from './reducer';

const AppContext = React.createContext();

const initialState = {
  game: false,
  setup: true,
  modal: false,
};

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <AppContext.Provider value={{ ...state }}>{children}</AppContext.Provider>
  );
};

// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
