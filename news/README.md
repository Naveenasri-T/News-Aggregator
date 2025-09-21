# News Aggregator API 📰

A FastAPI-based news aggregation service that fetches articles from NewsAPI, stores search history, and provides caching for trending topics.

## Features 🚀

- **Search News**: Search articles by topic/keyword using NewsAPI
- **Search History**: Store and retrieve last 10 searches from PostgreSQL database
- **Trending Topics**: Cached trending news for improved performance
- **RESTful API**: JSON responses with headlines, descriptions, and links
- **Async Support**: Built with FastAPI and async/await for high performance

## Tech Stack 🛠️

**Backend:**
- **Framework**: FastAPI
- **Database**: PostgreSQL with SQLAlchemy (Async)
- **External API**: NewsAPI
- **Caching**: In-memory (production: Redis recommended)
- **Server**: Uvicorn with auto-reload

**Frontend:**
- **Framework**: React 18
- **Styling**: CSS3 with responsive design
- **HTTP Client**: Axios
- **Development**: Create React App

**Environment**: Python 3.13+ with virtual environment, Node.js for frontend

## Project Structure 📁

```
news_aggregator_api/
├── app/                      # Backend FastAPI application
│   ├── api/v1/
│   │   └── endpoints.py      # API routes (search, history, trending)
│   ├── core/
│   │   ├── config.py         # Environment variables and settings
│   │   └── cache.py          # Caching logic for trending topics
│   ├── db/
│   │   ├── models.py         # SQLAlchemy models (SearchHistory)
│   │   └── session.py        # Database connection and session
│   ├── services/
│   │   ├── news_api.py       # NewsAPI integration
│   │   └── search.py         # Search history database operations
│   ├── schemas/
│   │   └── news.py           # Pydantic models for request/response
│   ├── main.py               # FastAPI application entry point
│   └── dependencies.py       # Database session dependencies
├── frontend/                 # React frontend application
│   ├── public/
│   │   └── index.html        # HTML template
│   ├── src/
│   │   ├── components/       # React components
│   │   │   ├── SearchNews.js
│   │   │   ├── NewsResults.js
│   │   │   ├── SearchHistory.js
│   │   │   └── TrendingNews.js
│   │   ├── services/
│   │   │   └── api.js        # API integration functions
│   │   ├── App.js            # Main React component
│   │   ├── App.css           # Styling
│   │   └── index.js          # React entry point
│   └── package.json          # Frontend dependencies
├── tests/
├── .env                      # Environment variables (API keys, DB URL)
├── requirements.txt          # Python backend dependencies
├── init_db.py               # Database initialization script
├── setup.ps1                # Setup script for full application
├── run-backend.ps1           # Script to start FastAPI server
├── run-frontend.ps1          # Script to start React development server
└── README.md                # This file
```

## Installation & Setup 🔧

### Prerequisites
- Python 3.13+
- Node.js 16+ and npm
- PostgreSQL database
- NewsAPI key (get from https://newsapi.org/)

### Quick Start (Automated Setup) 🚀

**Option 1: Using Setup Scripts**
```powershell
# 1. Run full setup (installs all dependencies)
.\setup.ps1

# 2. Start backend (in terminal 1)
.\run-backend.ps1

# 3. Start frontend (in terminal 2) 
.\run-frontend.ps1
```

### Manual Setup (Step-by-Step) 🔧

#### Backend Setup

##### 1. Navigate to Project
```bash
cd D:\news_api\news
```

##### 2. Create Virtual Environment
```bash
python -m venv ..\.venv
```

##### 3. Activate Virtual Environment
**Windows PowerShell:**
```powershell
. ..\.venv\Scripts\Activate
```

**Windows CMD:**
```cmd
..\.venv\Scripts\activate
```

##### 4. Install Backend Dependencies
```bash
pip install -r requirements.txt
```

##### 5. Environment Configuration
Create/update `.env` file with your credentials:
```env
DATABASE_URL=postgresql+asyncpg://username:password@host:port/database
NEWS_API_KEY=your_newsapi_key_here
REDIS_URL=redis://localhost:6379/0
```

**⚠️ Important Notes:**
- Remove `?sslmode=require&channel_binding=require` from DATABASE_URL (asyncpg doesn't support these as URL parameters)
- Get NewsAPI key from https://newsapi.org/register

##### 6. Initialize Database
```bash
python init_db.py
```

**Expected Output:**
```
INFO sqlalchemy.engine.Engine CREATE TABLE search_history (...)
INFO sqlalchemy.engine.Engine COMMIT
```

##### 7. Start Backend Server
```bash
# Set Python path and run server
$env:PYTHONPATH="D:\news_api\news"
D:\news_api\.venv\Scripts\python.exe -m uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

**Expected Output:**
```
INFO:     Uvicorn running on http://0.0.0.0:8000 (Press CTRL+C to quit)
INFO:     Started reloader process [XXXX] using WatchFiles
INFO:     Application startup complete.
```

#### Frontend Setup

##### 1. Navigate to Frontend Directory
```bash
cd frontend
```

##### 2. Install Frontend Dependencies
```bash
npm install
```

##### 3. Start Frontend Development Server
```bash
npm start
```

**Expected Output:**
```
Compiled successfully!

You can now view news-aggregator-frontend in the browser.

  Local:            http://localhost:3000
  On Your Network:  http://192.168.x.x:3000
```

### Access the Application 🌐

Once both servers are running, you can access:

- **Frontend UI**: http://localhost:3000 (React App)
- **Backend API**: http://localhost:8000 (FastAPI)
- **API Docs**: http://localhost:8000/docs (Swagger UI)

## Application Features 🎯

### Frontend UI Features
- **🔍 Search Interface**: Clean search form with real-time results
- **📰 Article Display**: Cards showing title, description, source, and date
- **📚 Search History**: Sidebar showing last 10 searches with timestamps
- **🔥 Trending Section**: Cached trending news for quick access
- **📱 Responsive Design**: Works on desktop, tablet, and mobile
- **⚡ Real-time Updates**: Automatic refresh and loading states

### How to Use the Application

1. **Search News**: 
   - Enter any topic in the search box (e.g., "technology", "python", "AI")
   - Click "Search" or press Enter
   - View results in the main area

2. **View Article Details**:
   - Click on any article title to open the full article
   - Articles open in new tabs

3. **Check Search History**:
   - View your recent searches in the right sidebar
   - Click "Refresh" to update the list

4. **Browse Trending**:
   - See trending articles in the trending section
   - Updated automatically with caching

### Backend API Features
INFO:     Started reloader process [XXXX] using WatchFiles
INFO:     Application startup complete.
```

## API Endpoints 🛡️

### Base URL: `http://127.0.0.1:8000`

#### 1. Health Check
```http
GET /health
```
**Response:**
```json
{"status": "healthy"}
```

#### 2. Root Endpoint
```http
GET /
```
**Response:**
```json
{
  "message": "News Aggregator API",
  "version": "1.0.0"
}
```

#### 3. Search News
```http
GET /api/v1/search?topic={keyword}
```
**Parameters:**
- `topic` (string): Search keyword (e.g., "technology", "python", "AI")

**Response:**
```json
{
  "articles": [
    {
      "title": "Article Title",
      "description": "Article description...",
      "url": "https://example.com/article",
      "published_at": "2025-09-18T10:30:00Z",
      "source": "TechCrunch"
    }
  ],
  "total_results": 150,
  "status": "ok"
}
```

#### 4. Search History
```http
GET /api/v1/history
```
**Response:**
```json
[
  {
    "id": 1,
    "topic": "python",
    "searched_at": "2025-09-18T12:23:30.123456"
  }
]
```

#### 5. Trending News
```http
GET /api/v1/trending
```
**Response:** Same as search endpoint but cached for performance

## Testing the API 🧪

### 1. Interactive Documentation
Visit: http://127.0.0.1:8000/docs

### 2. Manual Testing Examples

**Search for Python news:**
```bash
curl "http://127.0.0.1:8000/api/v1/search?topic=python"
```

**Get search history:**
```bash
curl "http://127.0.0.1:8000/api/v1/history"
```

**Get trending news:**
```bash
curl "http://127.0.0.1:8000/api/v1/trending"
```

## Troubleshooting 🔍

### Backend Issues

#### 1. Module 'app' not found
**Error:**
```
ModuleNotFoundError: No module named 'app'
```
**Solution:**
```bash
# Ensure you're in the correct directory
cd D:\news_api\news

# Set PYTHONPATH
$env:PYTHONPATH="D:\news_api\news"

# Run with full path
D:\news_api\.venv\Scripts\python.exe -m uvicorn app.main:app --reload
```

#### 2. Database URL Error
**Error:**
```
sqlalchemy.exc.ArgumentError: Expected string or URL object, got None
```
**Solutions:**
- Check `.env` file exists and contains `DATABASE_URL`
- Ensure no `?sslmode=require` in URL for asyncpg
- Verify environment variables are loaded correctly

#### 3. CORS Errors in Browser
**Error:**
```
Access to XMLHttpRequest blocked by CORS policy
```
**Solution:**
- Ensure FastAPI has CORS middleware enabled
- Check backend is running on correct port (8000)
- Verify frontend is making requests to correct URL

### Frontend Issues

#### 1. npm install fails
**Error:**
```
npm ERR! Cannot resolve dependency
```
**Solution:**
```bash
# Clear npm cache and reinstall
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

#### 2. Frontend can't connect to backend
**Error:**
```
Network Error / Request failed with status code 500
```
**Solution:**
- Ensure backend is running on http://localhost:8000
- Check API endpoints in `src/services/api.js`
- Verify CORS is enabled in FastAPI backend

#### 3. React app won't start
**Error:**
```
Something is already running on port 3000
```
**Solution:**
```bash
# Kill process on port 3000
npx kill-port 3000
# Or use different port
npm start -- --port 3001
```

### Database Issues

#### 4. PostgreSQL Connection Issues
**Error:**
```
asyncpg.exceptions.InvalidCatalogNameError: database "dbname" does not exist
```
**Solutions:**
- Create database in PostgreSQL
- Verify connection string format
- Check database credentials

#### 5. NewsAPI Key Issues
**Error:**
```
NewsAPI error: Invalid API key
```
**Solutions:**
- Get valid key from https://newsapi.org/register
- Add `NEWS_API_KEY=your_key` to `.env`
- Check key format (32 characters)

#### 6. Virtual Environment Issues
**Error:**
```
'uvicorn' is not recognized as the name of a cmdlet
```
**Solutions:**
```bash
# Activate virtual environment first
. ..\.venv\Scripts\Activate

# Or use full path
D:\news_api\.venv\Scripts\python.exe -m uvicorn app.main:app --reload
```

#### 7. Port Already in Use
**Error:**
```
OSError: [WinError 10048] Only one usage of each socket address is normally permitted
```
**Solution:**
```bash
# Use different port for backend
uvicorn app.main:app --reload --port 8001

# Update frontend API URL in src/services/api.js
const API_BASE_URL = 'http://localhost:8001/api/v1';
```

## Production Deployment 🚀

### Full-Stack Deployment Options

#### 1. Frontend (React) Deployment
**Build for Production:**
```bash
cd frontend
npm run build
```

**Deployment Options:**
- **Netlify**: Drag and drop `build` folder
- **Vercel**: Connect GitHub repository
- **AWS S3 + CloudFront**: Upload build files
- **Firebase Hosting**: `firebase deploy`

#### 2. Backend (FastAPI) Deployment
**Containerize with Docker:**
```dockerfile
# Dockerfile
FROM python:3.13-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY . .
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
```

**Deployment Options:**
- **Heroku**: Easy deployment with buildpacks
- **Railway**: Git-based deployment
- **AWS EC2/ECS**: Scalable container hosting
- **Digital Ocean App Platform**: Simple deployment

### Environment Variables for Production
```env
# Backend
DATABASE_URL=postgresql+asyncpg://user:pass@prod-db:5432/newsdb
NEWS_API_KEY=prod_api_key
REDIS_URL=redis://redis-server:6379/0
LOG_LEVEL=INFO
MAX_CONNECTIONS=20

# Frontend (build time)
REACT_APP_API_URL=https://your-backend-domain.com/api/v1
```

### Security & Performance

#### Production Checklist
- [ ] Enable HTTPS/SSL certificates
- [ ] Set up proper CORS origins (not `*`)
- [ ] Add rate limiting to API endpoints
- [ ] Implement API authentication/authorization
- [ ] Use production database (not SQLite)
- [ ] Set up monitoring and logging
- [ ] Configure CDN for frontend assets
- [ ] Enable database connection pooling
- [ ] Set up backup strategy
**Solutions:**
- Check `.env` file exists and contains `DATABASE_URL`
- Ensure no `?sslmode=require` in URL for asyncpg
- Verify environment variables are loaded correctly

#### 3. NewsAPI Key Issues
**Error:**
```
NewsAPI error: Invalid API key
```
**Solutions:**
- Get valid key from https://newsapi.org/register
- Add `NEWS_API_KEY=your_key` to `.env`
- Check key format (32 characters)

#### 4. PostgreSQL Connection Issues
**Error:**
```
asyncpg.exceptions.InvalidCatalogNameError: database "dbname" does not exist
```
**Solutions:**
- Create database in PostgreSQL
- Verify connection string format
- Check database credentials

#### 5. Virtual Environment Issues
**Error:**
```
'uvicorn' is not recognized as the name of a cmdlet
```
**Solutions:**
```bash
# Activate virtual environment first
. .\.venv\Scripts\Activate

# Or use full path
D:\news_api\.venv\Scripts\python.exe -m uvicorn app.main:app --reload
```

#### 6. Port Already in Use
**Error:**
```
OSError: [WinError 10048] Only one usage of each socket address is normally permitted
```
**Solution:**
```bash
# Use different port
uvicorn app.main:app --reload --port 8001
```

## Development Notes 📝

### Database Models
- `SearchHistory`: Stores search topics with timestamps
- Automatic table creation via `init_db.py`
- Async SQLAlchemy for non-blocking database operations

### Caching Strategy
- In-memory caching for trending topics
- 5-minute TTL (configurable)
- Production: Replace with Redis

### Security Considerations
- Environment variables for sensitive data
- API key validation
- Rate limiting (recommended for production)

### Performance Optimizations
- Async/await throughout the application
- Connection pooling via SQLAlchemy
- Response caching for trending topics

## Production Deployment 🚀

### Recommended Changes
1. **Database**: Use connection pooling and replica reads
2. **Caching**: Replace in-memory cache with Redis
3. **Security**: Add API authentication and rate limiting
4. **Monitoring**: Add logging and health checks
5. **Docker**: Containerize the application

### Environment Variables for Production
```env
DATABASE_URL=postgresql+asyncpg://user:pass@prod-db:5432/newsdb
NEWS_API_KEY=prod_api_key
REDIS_URL=redis://redis-server:6379/0
LOG_LEVEL=INFO
MAX_CONNECTIONS=20
```

## Contributing 🤝

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## License 📄

This project is licensed under the MIT License.

## Support 💬

For issues and questions:
- Create an issue on GitHub
- Check the troubleshooting section above
- Verify your environment setup matches the requirements
