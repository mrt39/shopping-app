import { useState, useEffect, useMemo } from 'react';
import { getBestOfYearLink, filterAdultContent } from './gameService';

/*custom hook for fetching game data from API */
export function useGameData(apiLink) {
    const [allGames, setAllGames] = useState([]);
    const [hasLoaded, setHasLoaded] = useState(false);
    const [gameCount, setGameCount] = useState(0);
    
    useEffect(() => {
        setHasLoaded(false);
        
        //if no API link provided, use best of year
        const linkToUse = apiLink || getBestOfYearLink();
        
        fetch(linkToUse)
            .then((res) => {
                if (!res.ok) {
                    throw new Error(`API request failed with status: ${res.status}`);
                }
                return res.json();
            })
            .then((data) => {
                //filter adult content
                const filteredGames = filterAdultContent(data);
                setAllGames(filteredGames);
                setGameCount(data.count);
            })
            .catch((err) => {
                console.error("Game data fetch error:", err.message);
                setAllGames([]);
            })
            .finally(() => {
                setHasLoaded(true);
            });
    }, [apiLink]);

    //useMemo prevents recreation of the return object on every render
    //this only recalculates when allGames, gameCount, or hasLoaded actually change
    return useMemo(() => ({ 
        allGames, 
        gameCount, 
        hasLoaded 
    }), [allGames, gameCount, hasLoaded]);
}