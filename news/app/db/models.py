from sqlalchemy import Column, Integer, String, DateTime
from sqlalchemy.ext.declarative import declarative_base
from datetime import datetime


Base = declarative_base()

class SearchHistory(Base):
    __tablename__ = "search_history"
    id = Column(Integer, primary_key=True, index=True)
    topic = Column(String, index=True)
    searched_at = Column(DateTime, default=datetime.utcnow)
