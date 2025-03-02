/* eslint-disable react/prop-types */
import { createContext, useState, useContext } from 'react';
import { getBestOfYearLink } from '../utilities/gameService';

const GamesContext = createContext();

export function useGames() {
  return useContext(GamesContext);
}

export function GamesProvider({ children }) {
  const [apiLink, setApiLink] = useState("");

  function changeApiLink(link) {
    setApiLink(link);
  }

  // Set default API link if none provided
  function getDefaultApiLink() {
    if (!apiLink) {
      return getBestOfYearLink();
    }
    return apiLink;
  }

  const value = {
    apiLink,
    changeApiLink,
    getDefaultApiLink
  };

  return (
    <GamesContext.Provider value={value}>
      {children}
    </GamesContext.Provider>
  );
}