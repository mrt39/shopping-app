import { getThisYear } from './utils';

const API_KEY = import.meta.env.VITE_API_KEY;
const BASE_URL = 'https://api.rawg.io/api';

//cache object - stores API responses keyed by endpoint URL
//this in-memory cache persists throughout the user's session
const cache = {};

/*function to fetch data from the RAWG API with basic caching 
caching prevents unnecessary API calls by storing previous responses
this improves performance in many ways:
1. Reduces network requests, saving bandwidth and API rate limits
2. Provides instant data when revisiting the same content
3. Makes the app feel more responsive by eliminating loading times for repeat requests
*/
async function fetchFromApi(endpoint) {
    try {
        //check if already fetched this endpoint in this session
        //if found in cache, return without making an API request
        if (cache[endpoint]) {
            console.log('Using cached data for:', endpoint);
            return cache[endpoint];
        }

        //only fetch from network if data isn't in cache
        console.log('Fetching fresh data for:', endpoint);
        const response = await fetch(`${BASE_URL}/${endpoint}`);
        if (!response.ok) {
            throw new Error(`API request failed with status ${response.status}`);
        }
        
        const data = await response.json();
        //store the response in cache for future use
        cache[endpoint] = data;
        
        return data;
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
    return `${BASE_URL}/games?key=${API_KEY}&page_size=39&stores=1,2,3,5,6,7,11&exclude_stores=4,8,9&search=${searchTerm}&page=${page}`;
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