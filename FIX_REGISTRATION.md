# Fix "Registration Failed" Error

## The Problem
The backend server is not running, so the frontend can't register users.

## Quick Fix (3 Steps)

### Step 1: Create .env File

Create a file: `advanced-recipe-app/server/.env`

Copy this content:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/recipe-app
JWT_SECRET=recipe-app-super-secret-jwt-key-2024
JWT_EXPIRE=7d
NODE_ENV=development
```

### Step 2: Start MongoDB

**Option A: If MongoDB is installed locally**
```powershell
Start-Service MongoDB
```

**Option B: Use MongoDB Atlas (Cloud - Recommended)**
1. Go to: https://www.mongodb.com/cloud/atlas/register
2. Create free account
3. Create free cluster (takes 3-5 minutes)
4. Click "Connect" → "Connect your application"
5. Copy connection string (looks like: `mongodb+srv://username:password@cluster.mongodb.net/recipe-app`)
6. Replace `<password>` with your database password
7. Update `MONGODB_URI` in `server/.env` with your connection string

### Step 3: Start Backend Server

Open a **NEW** PowerShell terminal and run:

```powershell
cd d:\dailycode\recipi\advanced-recipe-app\server
npm run dev
```

You should see:
```
✓ MongoDB Connected: ...
✓ Server running on port 5000
```

**Keep this terminal open!**

### Step 4: Verify It Works

1. Open browser: http://localhost:3000
2. Click "Login" → "Sign up"
3. Fill the form and register

## Alternative: Use the Startup Script

```powershell
cd d:\dailycode\recipi\advanced-recipe-app
.\start-backend.ps1
```

## Still Not Working?

1. **Check if backend is running:**
   ```powershell
   netstat -ano | findstr ":5000"
   ```
   Should show port 5000 is LISTENING

2. **Check browser console (F12):**
   - Look for error messages
   - Check Network tab for failed requests

3. **Check backend terminal:**
   - Look for error messages
   - MongoDB connection errors will be shown there

4. **Test backend directly:**
   ```powershell
   Invoke-WebRequest http://localhost:5000/api/health
   ```
   Should return: `{"status":"OK","message":"Recipe App API is running"}`

## Common Errors

**"Cannot connect to server"**
→ Backend not running. Start it in Step 3.

**"MongoDB connection error"**
→ MongoDB not running. Start MongoDB or use MongoDB Atlas.

**"Port 5000 already in use"**
→ Another app is using port 5000. Close it or change PORT in .env.