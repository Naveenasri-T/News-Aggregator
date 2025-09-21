Write-Host "🚀 Starting News Aggregator Backend..." -ForegroundColor Green

# Activate virtual environment and set Python path
$env:PYTHONPATH = "D:\news_api\news"

# Start the FastAPI server
Write-Host "📡 Starting FastAPI server on http://localhost:8000" -ForegroundColor Cyan
D:\news_api\.venv\Scripts\python.exe -m uvicorn app.main:app --reload --host 0.0.0.0 --port 8000