from fastapi import Depends
from sqlalchemy.ext.asyncio import AsyncSession
from app.db.session import async_session
from typing import AsyncGenerator

async def get_db_session() -> AsyncGenerator[AsyncSession, None]:
    """Get database session"""
    async with async_session() as session:
        try:
            yield session
        finally:
            await session.close()
