from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from app.api.v1.endpoints import router
from app.core.config import DATABASE_URL

app = FastAPI(
    title="News Aggregator API",
    description="Search news articles and track search history",
    version="1.0.0"
)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins for development
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mount static files
app.mount("/static", StaticFiles(directory="news/static"), name="static")

# Include API routes
app.include_router(router, prefix="/api/v1")

@app.get("/")
async def read_index():
    return FileResponse('news/static/index.html')

@app.get("/health")
async def health_check():
    return {"status": "healthy"}
