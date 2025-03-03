/* eslint-disable react/prop-types */
import { createContext, useState, useContext, useCallback, useMemo } from 'react';
import { getBestOfYearLink } from '../utilities/gameService';

const GamesContext = createContext();

export function useGames() {
  return useContext(GamesContext);
}

export function GamesProvider({ children }) {
  const [apiLink, setApiLink] = useState("");

  //useCallback prevents recreation of this function between renders
  //this will make load time faster because this function is passed to many components
  const changeApiLink = useCallback((link) => {
    setApiLink(link);
  }, []);

  //set default API link if none provided, while using useCallback
  const getDefaultApiLink = useCallback(() => {
    if (!apiLink) {
      return getBestOfYearLink();
    }
    return apiLink;
  }, [apiLink]);

  //useMemo prevents the context value object from being recreated on every render
  //this prevents unnecessary re-renders of all components that consume this context
  const value = useMemo(() => ({
    apiLink,
    changeApiLink,
    getDefaultApiLink
  }), [apiLink, changeApiLink, getDefaultApiLink]);

  return (
    <GamesContext.Provider value={value}>
      {children}
    </GamesContext.Provider>
  );
}