import { useState, useEffect } from 'react';

export function usePagination(initialApiLink, changeApiLink) {
  const [page, setPage] = useState(1);
  
  //synchronizes the page state with the current API link whenever it changes
  useEffect(() => {
    if (initialApiLink) {
      try {
        //using example.com as a base URL is required for URL constructor with partial URLs
        const url = new URL(initialApiLink, 'https://example.com');
        
        //extract page parameter from the URL query string if it exists
        const pageParam = url.searchParams.get('page');
        if (pageParam) {
          //convert page parameter to integer and update state
          setPage(parseInt(pageParam));
        } else {
          //if no page parameter is found, default to page 1
          setPage(1);
        }
      } catch (error) {
        //to page 1 if URL parsing fails 
        setPage(1);
      }
    }
  }, [initialApiLink]);

  const handlePageChange = (event, value) => {
    //create URL object from current API link to properly manipulate parameters
    const url = new URL(initialApiLink, 'https://example.com');
    
    //update or add the page parameter with the new page value
    url.searchParams.set('page', value);
    
    //convert back to string and remove the temporary base URL
    const newApiLink = url.toString().replace('https://example.com/', '');
    
    //update the API link in the parent context
    changeApiLink(newApiLink);
    
    //update local page state to ensure UI reflects the correct page
    setPage(value);
  };

  const handlePageCount = (gameCount) => {
    //calculate total pages by dividing total games by items per page (39)
    let pageCount = Math.max(1, parseInt(gameCount / 39));
    
    //cap at 100 pages to prevent excessive pagination
    if (pageCount > 100) {
      pageCount = 100;
    }
    return pageCount;
  };

  return {
    page,
    setPage,
    handlePageChange,
    handlePageCount
  };
}