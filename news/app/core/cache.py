import json
import os
from typing import Optional
from app.schemas.news import NewsResponse

# Simple in-memory cache for trending topics
# In production, use Redis or similar
_cache = {}
CACHE_TTL = 300  # 5 minutes

async def get_trending_cached() -> Optional[NewsResponse]:
    """Get cached trending news"""
    cached_data = _cache.get("trending")
    if cached_data:
        # In production, check TTL here
        return NewsResponse(**cached_data)
    return None

async def set_trending_cached(news: NewsResponse) -> None:
    """Cache trending news"""
    _cache["trending"] = news.model_dump()

async def clear_cache() -> None:
    """Clear all cache"""
    _cache.clear()
