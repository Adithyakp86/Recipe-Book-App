# Advanced Recipe App Startup Script

Write-Host "🍳 Advanced Recipe App - Starting..." -ForegroundColor Green
Write-Host ""

# Check if MongoDB is running
Write-Host "Checking MongoDB..." -ForegroundColor Yellow
$mongoService = Get-Service -Name MongoDB -ErrorAction SilentlyContinue

if ($mongoService -and $mongoService.Status -eq 'Running') {
    Write-Host "✓ MongoDB is running" -ForegroundColor Green
} else {
    Write-Host "⚠ MongoDB is not running" -ForegroundColor Yellow
    Write-Host "Please start MongoDB first:" -ForegroundColor Yellow
    Write-Host "  Option 1: Start-Service MongoDB" -ForegroundColor Cyan
    Write-Host "  Option 2: Use MongoDB Atlas (cloud)" -ForegroundColor Cyan
    Write-Host "  See SETUP.md for details" -ForegroundColor Cyan
    Write-Host ""
    $continue = Read-Host "Continue anyway? (y/n)"
    if ($continue -ne 'y') {
        exit
    }
}

# Check if .env exists
Write-Host ""
Write-Host "Checking environment configuration..." -ForegroundColor Yellow
if (-not (Test-Path "server\.env")) {
    Write-Host "⚠ .env file not found in server directory" -ForegroundColor Yellow
    Write-Host "Creating .env file..." -ForegroundColor Cyan
    @"
PORT=5000
MONGODB_URI=mongodb://localhost:27017/recipe-app
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production-$(Get-Random)
JWT_EXPIRE=7d
NODE_ENV=development
"@ | Out-File -FilePath "server\.env" -Encoding utf8
    Write-Host "✓ .env file created" -ForegroundColor Green
} else {
    Write-Host "✓ .env file exists" -ForegroundColor Green
}

Write-Host ""
Write-Host "Starting servers..." -ForegroundColor Yellow
Write-Host "Frontend will be available at: http://localhost:3000" -ForegroundColor Cyan
Write-Host "Backend API will be available at: http://localhost:5000" -ForegroundColor Cyan
Write-Host ""
Write-Host "Press Ctrl+C to stop all servers" -ForegroundColor Yellow
Write-Host ""

# Start the application
npm run dev