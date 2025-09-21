import React, { useState } from 'react';
import { newsAPI } from '../services/api';

const SearchNews = ({ onSearchResults }) => {
  const [searchTopic, setSearchTopic] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchTopic.trim()) {
      setError('Please enter a search topic');
      return;
    }

    setLoading(true);
    setError('');
    
    try {
      const results = await newsAPI.searchNews(searchTopic.trim());
      onSearchResults(results);
      setSearchTopic('');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="search-container">
      <h2>🔍 Search News</h2>
      <form onSubmit={handleSearch} className="search-form">
        <div className="input-group">
          <input
            type="text"
            value={searchTopic}
            onChange={(e) => setSearchTopic(e.target.value)}
            placeholder="Enter topic (e.g., technology, python, AI...)"
            className="search-input"
            disabled={loading}
          />
          <button 
            type="submit" 
            className="search-button"
            disabled={loading}
          >
            {loading ? '🔄 Searching...' : '🔍 Search'}
          </button>
        </div>
      </form>
      {error && <div className="error-message">❌ {error}</div>}
    </div>
  );
};

export default SearchNews;