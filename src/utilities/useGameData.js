import { useState, useEffect } from 'react';
import { getBestOfYearLink, filterAdultContent } from './gameService';

/*custom hook for fetching game data from API */
export function useGameData(apiLink) {
    const [allGames, setAllGames] = useState([]);
    const [hasLoaded, setHasLoaded] = useState(false);
    const [gameCount, setGameCount] = useState(0);
    const [error, setError] = useState(null);
    
    useEffect(() => {
        setHasLoaded(false);
        
        //if no API link provided, use best of year
        const linkToUse = apiLink || getBestOfYearLink();
        
        fetch(linkToUse)
            .then((res) => res.json())
            .then((data) => {
                //filter adult content
                const filteredGames = filterAdultContent(data);
                setAllGames(filteredGames);
                setGameCount(data.count);
                setError(null);
            })
            .catch((err) => {
                console.log(err.message);
                setError(err.message);
                setAllGames([]);
            })
            .finally(() => {
                setHasLoaded(true);
            });
    }, [apiLink]);

    return { allGames, gameCount, hasLoaded, error };
}