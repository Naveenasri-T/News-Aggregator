import httpx
from app.schemas.news import NewsResponse, NewsArticle
from app.core.config import NEWS_API_KEY
NEWS_API_URL = "https://newsapi.org/v2/everything"

async def fetch_news(topic: str) -> NewsResponse:
    """Fetch news articles from NewsAPI"""
    params = {
        "q": topic,
        "apiKey": NEWS_API_KEY,
        "pageSize": 20,
        "sortBy": "publishedAt"
    }
    
    async with httpx.AsyncClient() as client:
        response = await client.get(NEWS_API_URL, params=params)
        data = response.json()
        
        if data.get("status") != "ok":
            raise Exception(f"NewsAPI error: {data.get('message', 'Unknown error')}")
        
        articles = []
        for article in data.get("articles", []):
            articles.append(NewsArticle(
                title=article.get("title", ""),
                description=article.get("description"),
                url=article.get("url", ""),
                published_at=article.get("publishedAt"),
                source=article.get("source", {}).get("name")
            ))
        
        return NewsResponse(
            articles=articles,
            total_results=data.get("totalResults", 0),
            status=data.get("status", "ok")
        )
