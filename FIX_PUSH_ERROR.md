# Fix "Failed to push some refs to 'origin'" Error

## Common Causes & Solutions

### Solution 1: Remote Repository Has Initial Files

If you created the GitHub repo with README, .gitignore, or license, you need to pull first:

```powershell
cd d:\dailycode\recipi\advanced-recipe-app

# Rename branch to main
git branch -M main

# Pull and merge remote changes
git pull origin main --allow-unrelated-histories

# Resolve any conflicts if needed, then:
git push -u origin main
```

### Solution 2: Force Push (Use with Caution!)

**⚠️ Only use this if you're sure you want to overwrite the remote repository:**

```powershell
cd d:\dailycode\recipi\advanced-recipe-app
git branch -M main
git push -u origin main --force
```

**Warning:** This will overwrite any files in the remote repository!

### Solution 3: Remove and Re-add Remote

If the remote is misconfigured:

```powershell
cd d:\dailycode\recipi\advanced-recipe-app

# Remove existing remote
git remote remove origin

# Add remote again (replace YOUR_USERNAME)
git remote add origin https://github.com/YOUR_USERNAME/advanced-recipe-app.git

# Verify
git remote -v

# Push
git branch -M main
git push -u origin main
```

### Solution 4: Create Fresh Repository on GitHub

1. Delete the existing GitHub repository
2. Create a new one **without** README, .gitignore, or license
3. Then push:

```powershell
cd d:\dailycode\recipi\advanced-recipe-app
git remote add origin https://github.com/YOUR_USERNAME/advanced-recipe-app.git
git branch -M main
git push -u origin main
```

## Recommended Approach

**Best solution if remote has initial files:**

```powershell
cd d:\dailycode\recipi\advanced-recipe-app

# 1. Rename to main
git branch -M main

# 2. Pull remote changes
git pull origin main --allow-unrelated-histories --no-edit

# 3. If conflicts occur, resolve them, then:
git add .
git commit -m "Merge remote repository"

# 4. Push
git push -u origin main
```

## Check Current Status

```powershell
# Check remote
git remote -v

# Check branch
git branch

# Check status
git status
```