import React, { useState } from 'react';
import './App.css';
import SearchNews from './components/SearchNews';
import NewsResults from './components/NewsResults';
import SearchHistory from './components/SearchHistory';
import TrendingNews from './components/TrendingNews';

function App() {
  const [searchResults, setSearchResults] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSearchResults = (results) => {
    setSearchResults(results);
  };

  return (
    <div className="app">
      <div className="container">
        <header className="header">
          <h1>📰 News Aggregator</h1>
          <p>Search, discover, and stay updated with the latest news from around the world</p>
        </header>
        
        <main className="main-content">
          <div className="left-column">
            <SearchNews onSearchResults={handleSearchResults} />
            <NewsResults results={searchResults} loading={loading} />
          </div>
          
          <div className="right-column">
            <TrendingNews />
            <SearchHistory />
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;