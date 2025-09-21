import React, { useState, useEffect } from 'react';
import { newsAPI } from '../services/api';

const TrendingNews = () => {
  const [trending, setTrending] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchTrending();
  }, []);

  const fetchTrending = async () => {
    try {
      setLoading(true);
      const trendingData = await newsAPI.getTrendingNews();
      setTrending(trendingData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="trending-news">
        <h3>🔥 Trending News</h3>
        <div className="loading">🔄 Loading trending articles...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="trending-news">
        <h3>🔥 Trending News</h3>
        <div className="error-message">❌ {error}</div>
        <button onClick={fetchTrending} className="retry-button">
          🔄 Retry
        </button>
      </div>
    );
  }

  if (!trending || trending.articles.length === 0) {
    return (
      <div className="trending-news">
        <h3>🔥 Trending News</h3>
        <div className="no-results">📭 No trending articles available</div>
      </div>
    );
  }

  return (
    <div className="trending-news">
      <div className="trending-header">
        <h3>🔥 Trending News</h3>
        <button onClick={fetchTrending} className="refresh-button">
          🔄 Refresh
        </button>
      </div>
      
      <div className="trending-grid">
        {trending.articles.slice(0, 6).map((article, index) => (
          <div key={index} className="trending-card">
            <h4 className="trending-title">
              <a 
                href={article.url} 
                target="_blank" 
                rel="noopener noreferrer"
              >
                {article.title}
              </a>
            </h4>
            {article.description && (
              <p className="trending-description">
                {article.description.length > 120 
                  ? `${article.description.substring(0, 120)}...` 
                  : article.description}
              </p>
            )}
            <div className="trending-meta">
              {article.source && (
                <span className="trending-source">📰 {article.source}</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrendingNews;