# Troubleshooting Guide

## Registration/Login Failed

If you're seeing "Registration failed" or "Login failed" errors, follow these steps:

### 1. Check Backend Server Status

The backend server must be running on port 5000. Check if it's running:

```powershell
netstat -ano | findstr ":5000"
```

If nothing shows up, start the backend server:

```powershell
cd advanced-recipe-app\server
npm run dev
```

Or from the root:
```powershell
cd advanced-recipe-app
npm run server
```

### 2. Check MongoDB Connection

The backend requires MongoDB to be running. You have two options:

#### Option A: Local MongoDB

1. **Check if MongoDB is installed:**
   ```powershell
   mongod --version
   ```

2. **Start MongoDB service (Windows):**
   ```powershell
   Start-Service MongoDB
   ```

3. **Or start MongoDB manually:**
   ```powershell
   mongod
   ```

#### Option B: MongoDB Atlas (Cloud - Recommended)

1. Go to https://www.mongodb.com/cloud/atlas
2. Create a free account
3. Create a free cluster
4. Get your connection string
5. Update `server/.env`:
   ```
   MONGODB_URI=your-atlas-connection-string
   ```

### 3. Check Environment Variables

Make sure `server/.env` file exists with:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/recipe-app
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRE=7d
NODE_ENV=development
```

### 4. Check Browser Console

Open browser DevTools (F12) and check the Console tab for detailed error messages.

### 5. Check Network Tab

In browser DevTools, go to Network tab and check if:
- API requests are being made to `http://localhost:5000/api/auth/register`
- Requests are failing with connection errors
- Check the response status and error messages

### 6. Common Issues

**Issue: "Cannot connect to server"**
- Backend server is not running
- Solution: Start the backend server

**Issue: "MongoDB connection error"**
- MongoDB is not running
- Solution: Start MongoDB or use MongoDB Atlas

**Issue: "Port 5000 already in use"**
- Another process is using port 5000
- Solution: Change PORT in `server/.env` or kill the process

**Issue: CORS errors**
- Backend CORS is not configured correctly
- Solution: Check `server/index.js` has `app.use(cors())`

### 7. Quick Fix: Restart Everything

1. Stop all running servers (Ctrl+C)
2. Start MongoDB (if using local)
3. Start backend: `cd server && npm run dev`
4. Start frontend: `cd client && npm run dev`
5. Try registration again

### 8. Test Backend Directly

Test if backend is working:

```powershell
# In PowerShell
Invoke-WebRequest -Uri http://localhost:5000/api/health
```

Should return: `{"status":"OK","message":"Recipe App API is running"}`

### Still Having Issues?

1. Check server logs in the terminal where backend is running
2. Check browser console for detailed errors
3. Verify all dependencies are installed: `npm install` in both server and client folders
4. Make sure ports 3000 (frontend) and 5000 (backend) are available