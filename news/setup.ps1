# Setup script to install and run the News Aggregator application

# Navigate to frontend directory and install dependencies
Write-Host "📦 Installing React frontend dependencies..." -ForegroundColor Green
Set-Location "frontend"
npm install

Write-Host "✅ Frontend dependencies installed!" -ForegroundColor Green

# Go back to main directory
Set-Location ".."

Write-Host "🚀 Setup complete!" -ForegroundColor Green
Write-Host ""
Write-Host "To run the application:" -ForegroundColor Yellow
Write-Host "1. Start the backend: .\run-backend.ps1" -ForegroundColor Cyan
Write-Host "2. Start the frontend: .\run-frontend.ps1" -ForegroundColor Cyan