# Push Project to GitHub

## Step 1: Create GitHub Repository

1. Go to https://github.com/new
2. Repository name: `advanced-recipe-app` (or any name you prefer)
3. Description: "Advanced full-stack Recipe Book Application with React and Node.js"
4. Choose **Public** or **Private**
5. **DO NOT** initialize with README, .gitignore, or license (we already have these)
6. Click **"Create repository"**

## Step 2: Push to GitHub

After creating the repository, GitHub will show you commands. Use these:

```powershell
cd d:\dailycode\recipi\advanced-recipe-app

# Add your GitHub repository as remote (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/advanced-recipe-app.git

# Or if you prefer SSH:
# git remote add origin git@github.com:YOUR_USERNAME/advanced-recipe-app.git

# Push to GitHub
git branch -M main
git push -u origin main
```

## Alternative: Using GitHub CLI

If you have GitHub CLI installed:

```powershell
cd d:\dailycode\recipi\advanced-recipe-app
gh repo create advanced-recipe-app --public --source=. --remote=origin --push
```

## What's Included

✅ All source code (React frontend + Node.js backend)
✅ Configuration files
✅ Documentation (README, SETUP guides)
✅ .gitignore files (excludes node_modules, .env, etc.)

## What's Excluded (by .gitignore)

❌ node_modules/ (dependencies)
❌ .env files (sensitive data)
❌ build/dist folders
❌ log files

## Important Notes

1. **Never commit .env files** - They contain sensitive data like JWT secrets and database URLs
2. **Create .env.example** - You can create example files for others to reference
3. **Update README** - Make sure installation instructions are clear

## After Pushing

Your repository will be available at:
`https://github.com/YOUR_USERNAME/advanced-recipe-app`

Others can clone it with:
```bash
git clone https://github.com/YOUR_USERNAME/advanced-recipe-app.git
```