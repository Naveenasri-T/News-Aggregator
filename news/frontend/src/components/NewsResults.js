import React from 'react';

const NewsResults = ({ results, loading }) => {
  if (loading) {
    return (
      <div className="news-results">
        <div className="loading">🔄 Loading news articles...</div>
      </div>
    );
  }

  if (!results) {
    return (
      <div className="news-results">
        <div className="no-results">
          📰 Enter a topic above to search for news articles
        </div>
      </div>
    );
  }

  const { articles, total_results } = results;

  if (articles.length === 0) {
    return (
      <div className="news-results">
        <div className="no-results">
          📭 No articles found for this topic. Try a different search term.
        </div>
      </div>
    );
  }

  return (
    <div className="news-results">
      <h3>📊 Search Results ({total_results} found, showing {articles.length})</h3>
      <div className="articles-grid">
        {articles.map((article, index) => (
          <div key={index} className="article-card">
            <h4 className="article-title">
              <a 
                href={article.url} 
                target="_blank" 
                rel="noopener noreferrer"
              >
                {article.title}
              </a>
            </h4>
            {article.description && (
              <p className="article-description">{article.description}</p>
            )}
            <div className="article-meta">
              {article.source && (
                <span className="article-source">📰 {article.source}</span>
              )}
              {article.published_at && (
                <span className="article-date">
                  📅 {new Date(article.published_at).toLocaleDateString()}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewsResults;