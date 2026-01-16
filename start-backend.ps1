# Backend Server Startup Script

Write-Host "🍳 Starting Recipe App Backend Server..." -ForegroundColor Green
Write-Host ""

# Check if .env exists
$envPath = "server\.env"
if (-not (Test-Path $envPath)) {
    Write-Host "⚠ .env file not found. Creating one..." -ForegroundColor Yellow
    @"
PORT=5000
MONGODB_URI=mongodb://localhost:27017/recipe-app
JWT_SECRET=recipe-app-super-secret-jwt-key-2024-change-in-production
JWT_EXPIRE=7d
NODE_ENV=development
"@ | Out-File -FilePath $envPath -Encoding utf8
    Write-Host "✓ .env file created" -ForegroundColor Green
    Write-Host ""
}

# Check MongoDB
Write-Host "Checking MongoDB connection..." -ForegroundColor Yellow
$mongoService = Get-Service -Name MongoDB -ErrorAction SilentlyContinue

if ($mongoService -and $mongoService.Status -eq 'Running') {
    Write-Host "✓ MongoDB service is running" -ForegroundColor Green
} else {
    Write-Host "⚠ MongoDB service not found or not running" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "Options:" -ForegroundColor Cyan
    Write-Host "  1. Start MongoDB: Start-Service MongoDB" -ForegroundColor White
    Write-Host "  2. Use MongoDB Atlas (cloud): See QUICK_START.md" -ForegroundColor White
    Write-Host ""
    Write-Host "The server will start but database operations may fail." -ForegroundColor Yellow
    Write-Host ""
}

Write-Host "Starting server on http://localhost:5000" -ForegroundColor Cyan
Write-Host "Press Ctrl+C to stop" -ForegroundColor Yellow
Write-Host ""

# Start server
Set-Location server
npm run dev