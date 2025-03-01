import { getThisYear } from './utils';

const API_KEY = import.meta.env.VITE_API_KEY;
const BASE_URL = 'https://api.rawg.io/api';

/*function to fetch data from the RAWG API */
async function fetchFromApi(endpoint) {
    try {
        const response = await fetch(`${BASE_URL}/${endpoint}`);
        if (!response.ok) {
            throw new Error(`API request failed with status ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('API fetch error:', error.message);
        throw error;
    }
}

/*fetches games with specified parameters for store page */
export function fetchGames(params = {}) {
    const queryParams = new URLSearchParams({
        key: API_KEY,
        page_size: params.pageSize || 39,
        stores: params.stores || '1,2,3,5,6,7,11',
        exclude_stores: params.excludeStores || '4,8,9',
        ordering: params.ordering || '-metacritic',
        page: params.page || 1,
        ...params.additionalParams
    }).toString();
    
    return fetchFromApi(`games?${queryParams}`);
}

/*fetches game details by ID for the game page */
export function fetchGameDetails(gameId) {
    return fetchFromApi(`games/${gameId}?key=${API_KEY}`);
}

/*fetches store links for a game */
export function fetchGameStores(gameId) {
    return fetchFromApi(`games/${gameId}/stores?key=${API_KEY}`);
}

/*creates API link for the best games of current year */
export function getBestOfYearLink(page = 1) {
    return `${BASE_URL}/games?key=${API_KEY}&page_size=39&stores=1,2,3,5,6,7,11&exclude_stores=4,8,9&ordering=-metacritic&dates=${getThisYear()}-01-01,${getThisYear()}-12-31&page=${page}`;
}

/*creates API link for searching games */
export function getSearchLink(searchTerm, page = 1) {
    return `${BASE_URL}/games?key=${API_KEY}&search=${searchTerm}&page=${page}`;
}

/*filters adult content from game results exactly as in the original code */
export function filterAdultContent(data) {
    for (let x=0 ; x<(data.results).length; x++){
        if(data.results[x].tags !== null){
            if (data.results[x].tags.find(element => element.id === 50)){
                data.results.splice(x, 1)  
            }
        }
    }
    return data.results;
}

/*SORT API LINKS FOR THE LEFT SIDEBAR*/
/*returns API link based on category name */
export function getCategoryApiLink(categoryName, page = 1) {
    const commonParams = `key=${API_KEY}&page_size=39&stores=1,2,3,5,6,7,11&exclude_stores=4,8,9&page=${page}`;
    
    switch(categoryName) {
        case 'highestRated':
            return `${BASE_URL}/games?${commonParams}&ordering=-metacritic`;
        case 'mostPopular':
            return `${BASE_URL}/games?${commonParams}&ordering=-rating`;
        case 'newReleases':
            return `${BASE_URL}/games?${commonParams}&dates=1960-01-01,${getThisYear()}-12-31&ordering=-released`;
        case 'bestOfYear':
            return getBestOfYearLink(page);
        case 'action':
            return `${BASE_URL}/games?${commonParams}&ordering=-metacritic&genres=action`;
        case 'shooter':
            return `${BASE_URL}/games?${commonParams}&ordering=-metacritic&genres=shooter`;
        case 'strategy':
            return `${BASE_URL}/games?${commonParams}&ordering=-metacritic&genres=strategy`;
        case 'rpg':
            return `${BASE_URL}/games?${commonParams}&ordering=-metacritic&genres=role-playing-games-rpg`;
        case 'adventure':
            return `${BASE_URL}/games?${commonParams}&ordering=-metacritic&genres=adventure`;
        default:
            return `${BASE_URL}/games?${commonParams}&ordering=-metacritic`;
    }
}