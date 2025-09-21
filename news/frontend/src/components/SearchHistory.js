import React, { useState, useEffect } from 'react';
import { newsAPI } from '../services/api';

const SearchHistory = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      setLoading(true);
      const historyData = await newsAPI.getSearchHistory();
      setHistory(historyData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  if (loading) {
    return (
      <div className="search-history">
        <h3>📚 Search History</h3>
        <div className="loading">🔄 Loading history...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="search-history">
        <h3>📚 Search History</h3>
        <div className="error-message">❌ {error}</div>
        <button onClick={fetchHistory} className="retry-button">
          🔄 Retry
        </button>
      </div>
    );
  }

  return (
    <div className="search-history">
      <div className="history-header">
        <h3>📚 Search History (Last 10)</h3>
        <button onClick={fetchHistory} className="refresh-button">
          🔄 Refresh
        </button>
      </div>
      
      {history.length === 0 ? (
        <div className="no-history">
          📭 No search history yet. Start searching for news!
        </div>
      ) : (
        <div className="history-list">
          {history.map((item) => (
            <div key={item.id} className="history-item">
              <div className="history-topic">🔍 {item.topic}</div>
              <div className="history-date">📅 {formatDate(item.searched_at)}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchHistory;