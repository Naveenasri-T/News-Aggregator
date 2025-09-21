from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime

class NewsArticle(BaseModel):
    title: str
    description: Optional[str] = None
    url: str
    published_at: Optional[str] = None
    source: Optional[str] = None

class NewsResponse(BaseModel):
    articles: List[NewsArticle]
    total_results: int
    status: str

class SearchHistoryResponse(BaseModel):
    id: int
    topic: str
    searched_at: datetime
