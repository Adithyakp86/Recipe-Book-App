# Quick Start Guide - Fix Registration Failed Error

## The Problem
"Registration failed" means the frontend can't connect to the backend server.

## Solution - 3 Steps

### Step 1: Create Server .env File

Create a file `server/.env` with this content:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/recipe-app
JWT_SECRET=recipe-app-super-secret-jwt-key-2024-change-in-production
JWT_EXPIRE=7d
NODE_ENV=development
```

**Or use MongoDB Atlas (Cloud - Easier):**

1. Go to https://www.mongodb.com/cloud/atlas
2. Sign up (free)
3. Create a free cluster
4. Click "Connect" → "Connect your application"
5. Copy the connection string
6. Replace `<password>` with your database password
7. Use that string in `MONGODB_URI`

### Step 2: Start MongoDB

**Option A: Local MongoDB**
```powershell
Start-Service MongoDB
```

**Option B: MongoDB Atlas (Cloud)**
- No need to start anything, it's in the cloud!

### Step 3: Start Backend Server

Open a new terminal and run:

```powershell
cd advanced-recipe-app\server
npm run dev
```

You should see:
```
MongoDB Connected: ...
Server running on port 5000
```

### Step 4: Verify Frontend is Running

In another terminal:

```powershell
cd advanced-recipe-app\client
npm run dev
```

Frontend should be at: http://localhost:3000

## Test Registration

1. Go to http://localhost:3000
2. Click "Login" → "Sign up"
3. Fill in the form
4. Click "Create Account"

If you still get errors, check:
- Browser console (F12) for detailed errors
- Backend terminal for server errors
- Make sure both servers are running

## Common Issues

**"Cannot connect to server"**
→ Backend server not running. Start it with `npm run dev` in server folder.

**"MongoDB connection error"**
→ MongoDB not running. Start MongoDB service or use MongoDB Atlas.

**Port 5000 already in use**
→ Another app is using port 5000. Change PORT in server/.env or close that app.