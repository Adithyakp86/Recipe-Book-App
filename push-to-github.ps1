# Script to push project to GitHub
# Usage: .\push-to-github.ps1 YOUR_GITHUB_USERNAME REPO_NAME

param(
    [Parameter(Mandatory=$true)]
    [string]$GitHubUsername,
    
    [Parameter(Mandatory=$false)]
    [string]$RepoName = "advanced-recipe-app"
)

Write-Host "🚀 Pushing to GitHub..." -ForegroundColor Green
Write-Host ""

# Check if remote exists
$remoteExists = git remote get-url origin 2>$null

if ($remoteExists) {
    Write-Host "Remote 'origin' already exists: $remoteExists" -ForegroundColor Yellow
    $remove = Read-Host "Remove and re-add? (y/n)"
    if ($remove -eq 'y') {
        git remote remove origin
        Write-Host "✓ Removed existing remote" -ForegroundColor Green
    } else {
        Write-Host "Using existing remote..." -ForegroundColor Cyan
    }
}

# Add remote
$remoteUrl = "https://github.com/$GitHubUsername/$RepoName.git"
Write-Host "Adding remote: $remoteUrl" -ForegroundColor Cyan
git remote add origin $remoteUrl

# Rename branch to main
Write-Host "Renaming branch to 'main'..." -ForegroundColor Cyan
git branch -M main

# Try to pull first (in case remote has files)
Write-Host "Checking remote repository..." -ForegroundColor Cyan
$pullResult = git pull origin main --allow-unrelated-histories --no-edit 2>&1

if ($LASTEXITCODE -eq 0) {
    Write-Host "✓ Pulled remote changes" -ForegroundColor Green
} else {
    Write-Host "⚠ Remote might be empty or has conflicts" -ForegroundColor Yellow
    Write-Host "Continuing with push..." -ForegroundColor Cyan
}

# Push to GitHub
Write-Host "Pushing to GitHub..." -ForegroundColor Cyan
git push -u origin main

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "✓ Successfully pushed to GitHub!" -ForegroundColor Green
    Write-Host "Repository: https://github.com/$GitHubUsername/$RepoName" -ForegroundColor Cyan
} else {
    Write-Host ""
    Write-Host "✗ Push failed. Try force push?" -ForegroundColor Red
    $force = Read-Host "Force push? (y/n) - WARNING: This overwrites remote!"
    if ($force -eq 'y') {
        git push -u origin main --force
    } else {
        Write-Host "See FIX_PUSH_ERROR.md for troubleshooting" -ForegroundColor Yellow
    }
}