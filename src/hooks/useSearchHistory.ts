import { useState, useEffect } from 'react';

interface SearchQuery {
  id: string;
  keyword: string;
  location: string;
  timestamp: number;
}

export const useSearchHistory = (maxHistoryItems = 5) => {
  const [searchHistory, setSearchHistory] = useState<SearchQuery[]>([]);

  // Load search history from localStorage on initial render
  useEffect(() => {
    const loadSearchHistory = () => {
      try {
        const historyJson = localStorage.getItem('searchHistory');
        if (historyJson) {
          const parsedHistory = JSON.parse(historyJson);
          setSearchHistory(parsedHistory);
        }
      } catch (error) {
        console.error('Error loading search history:', error);
      }
    };

    loadSearchHistory();
  }, []);

  // Save search history to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
    } catch (error) {
      console.error('Error saving search history to localStorage:', error);
    }
  }, [searchHistory]);

  const addSearchQuery = (keyword: string, location: string) => {
    setSearchHistory((prevHistory) => {
      // Create new search query
      const newQuery: SearchQuery = {
        id: Date.now().toString(),
        keyword,
        location,
        timestamp: Date.now(),
      };

      // Remove duplicates (same keyword and location)
      const filteredHistory = prevHistory.filter(
        (item) => !(item.keyword === keyword && item.location === location)
      );

      // Add new query to the beginning and limit the history size
      return [newQuery, ...filteredHistory].slice(0, maxHistoryItems);
    });
  };

  const clearSearchHistory = () => {
    setSearchHistory([]);
    localStorage.removeItem('searchHistory');
  };

  return {
    searchHistory,
    addSearchQuery,
    clearSearchHistory,
  };
};