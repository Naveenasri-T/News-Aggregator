from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, desc
from app.db.models import SearchHistory
from app.db.session import async_session
from app.schemas.news import SearchHistoryResponse
from datetime import datetime
from typing import List

async def save_search(topic: str) -> None:
    """Save search topic to database"""
    async with async_session() as session:
        search_entry = SearchHistory(
            topic=topic,
            searched_at=datetime.utcnow()
        )
        session.add(search_entry)
        await session.commit()

async def get_last_searches(limit: int = 10) -> List[SearchHistoryResponse]:
    """Get last 10 searches from database"""
    async with async_session() as session:
        query = select(SearchHistory).order_by(desc(SearchHistory.searched_at)).limit(limit)
        result = await session.execute(query)
        searches = result.scalars().all()
        
        return [
            SearchHistoryResponse(
                id=search.id,
                topic=search.topic,
                searched_at=search.searched_at
            )
            for search in searches
        ]
