from fastapi import APIRouter, Depends, HTTPException
from app.services.news_api import fetch_news
from app.services.search import save_search, get_last_searches
from app.core.cache import get_trending_cached, set_trending_cached
from app.schemas.news import NewsResponse

router = APIRouter()

@router.get("/search", response_model=NewsResponse)
async def search_news(topic: str):
	# Save search to DB
	await save_search(topic)
	# Fetch news articles
	news = await fetch_news(topic)
	return news

@router.get("/history")
async def search_history():
	# Return last 10 searches
	return await get_last_searches()

@router.get("/trending", response_model=NewsResponse)
async def trending():
	# Try cache first
	cached = await get_trending_cached()
	if cached:
		return cached
	# Otherwise fetch and cache
	news = await fetch_news("trending")
	await set_trending_cached(news)
	return news
