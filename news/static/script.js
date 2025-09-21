// API Configuration
const API_BASE_URL = 'http://localhost:8000/api/v1';

// DOM Elements
const searchForm = document.getElementById('searchForm');
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const errorMessage = document.getElementById('errorMessage');
const newsResults = document.getElementById('newsResults');
const trendingContent = document.getElementById('trendingContent');
const historyContent = document.getElementById('historyContent');
const refreshTrending = document.getElementById('refreshTrending');
const refreshHistory = document.getElementById('refreshHistory');

// Utility Functions
function showError(message) {
    errorMessage.textContent = `❌ ${message}`;
    errorMessage.style.display = 'block';
    setTimeout(() => {
        errorMessage.style.display = 'none';
    }, 5000);
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleString();
}

function truncateText(text, maxLength) {
    return text && text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
}

// API Functions
async function fetchNews(topic) {
    try {
        const response = await fetch(`${API_BASE_URL}/search?topic=${encodeURIComponent(topic)}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        throw new Error(`Failed to search news: ${error.message}`);
    }
}

async function fetchTrending() {
    try {
        const response = await fetch(`${API_BASE_URL}/trending`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        throw new Error(`Failed to get trending news: ${error.message}`);
    }
}

async function fetchHistory() {
    try {
        const response = await fetch(`${API_BASE_URL}/history`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        throw new Error(`Failed to get search history: ${error.message}`);
    }
}

// Display Functions
function displaySearchResults(results) {
    if (!results || !results.articles || results.articles.length === 0) {
        newsResults.innerHTML = `
            <div class="no-results">
                📭 No articles found for this topic. Try a different search term.
            </div>
        `;
        return;
    }

    const { articles, total_results } = results;
    
    let html = `
        <h3 class="results-header">📊 Search Results (${total_results} found, showing ${articles.length})</h3>
        <div class="articles-grid">
    `;

    articles.forEach(article => {
        html += `
            <div class="article-card">
                <h4 class="article-title">
                    <a href="${article.url}" target="_blank" rel="noopener noreferrer">
                        ${article.title || 'Untitled'}
                    </a>
                </h4>
                ${article.description ? `<p class="article-description">${article.description}</p>` : ''}
                <div class="article-meta">
                    ${article.source ? `<span class="article-source">📰 ${article.source}</span>` : ''}
                    ${article.published_at ? `<span class="article-date">📅 ${new Date(article.published_at).toLocaleDateString()}</span>` : ''}
                </div>
            </div>
        `;
    });

    html += '</div>';
    newsResults.innerHTML = html;
}

function displayTrending(trending) {
    if (!trending || !trending.articles || trending.articles.length === 0) {
        trendingContent.innerHTML = `
            <div class="no-results">📭 No trending articles available</div>
        `;
        return;
    }

    let html = '<div class="trending-grid">';
    
    trending.articles.slice(0, 6).forEach(article => {
        html += `
            <div class="trending-card">
                <h4 class="trending-title">
                    <a href="${article.url}" target="_blank" rel="noopener noreferrer">
                        ${article.title || 'Untitled'}
                    </a>
                </h4>
                ${article.description ? `<p class="trending-description">${truncateText(article.description, 120)}</p>` : ''}
                ${article.source ? `<div class="trending-source">📰 ${article.source}</div>` : ''}
            </div>
        `;
    });

    html += '</div>';
    trendingContent.innerHTML = html;
}

function displayHistory(history) {
    if (!history || history.length === 0) {
        historyContent.innerHTML = `
            <div class="no-history">📭 No search history yet. Start searching for news!</div>
        `;
        return;
    }

    let html = '<div class="history-list">';
    
    history.forEach(item => {
        html += `
            <div class="history-item">
                <div class="history-topic">🔍 ${item.topic}</div>
                <div class="history-date">📅 ${formatDate(item.searched_at)}</div>
            </div>
        `;
    });

    html += '</div>';
    historyContent.innerHTML = html;
}

// Event Listeners
searchForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const topic = searchInput.value.trim();
    if (!topic) {
        showError('Please enter a search topic');
        return;
    }

    // Update UI to show loading
    searchBtn.disabled = true;
    searchBtn.textContent = '🔄 Searching...';
    newsResults.innerHTML = '<div class="loading">🔄 Loading news articles...</div>';

    try {
        const results = await fetchNews(topic);
        displaySearchResults(results);
        searchInput.value = '';
        
        // Refresh history to show the new search
        loadHistory();
    } catch (error) {
        showError(error.message);
        newsResults.innerHTML = `
            <div class="no-results">
                📰 Enter a topic above to search for news articles
            </div>
        `;
    } finally {
        searchBtn.disabled = false;
        searchBtn.textContent = '🔍 Search';
    }
});

refreshTrending.addEventListener('click', loadTrending);
refreshHistory.addEventListener('click', loadHistory);

// Load Functions
async function loadTrending() {
    trendingContent.innerHTML = '<div class="loading">🔄 Loading trending articles...</div>';
    
    try {
        const trending = await fetchTrending();
        displayTrending(trending);
    } catch (error) {
        trendingContent.innerHTML = `
            <div class="error-message" style="display: block;">
                ❌ ${error.message}
                <br><button onclick="loadTrending()" class="refresh-button" style="margin-top: 10px;">🔄 Retry</button>
            </div>
        `;
    }
}

async function loadHistory() {
    historyContent.innerHTML = '<div class="loading">🔄 Loading history...</div>';
    
    try {
        const history = await fetchHistory();
        displayHistory(history);
    } catch (error) {
        historyContent.innerHTML = `
            <div class="error-message" style="display: block;">
                ❌ ${error.message}
                <br><button onclick="loadHistory()" class="refresh-button" style="margin-top: 10px;">🔄 Retry</button>
            </div>
        `;
    }
}

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    console.log('📰 News Aggregator initialized');
    
    // Load initial data
    loadTrending();
    loadHistory();
    
    // Focus on search input
    searchInput.focus();
});

// Make functions available globally for error retry buttons
window.loadTrending = loadTrending;
window.loadHistory = loadHistory;