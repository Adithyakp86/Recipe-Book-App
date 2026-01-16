# Quick Setup Guide

## MongoDB Setup

The application requires MongoDB to be running. You have two options:

### Option 1: Local MongoDB (Recommended for Development)

1. **Install MongoDB** (if not already installed):
   - Download from: https://www.mongodb.com/try/download/community
   - Or use Chocolatey: `choco install mongodb`
   - Or use Homebrew (Mac): `brew install mongodb-community`

2. **Start MongoDB**:
   - **Windows**: MongoDB usually runs as a service. Check with:
     ```powershell
     Get-Service MongoDB
     ```
     If not running, start it:
     ```powershell
     Start-Service MongoDB
     ```
   - **Mac/Linux**: 
     ```bash
     mongod
     ```

### Option 2: MongoDB Atlas (Cloud - Free)

1. Go to https://www.mongodb.com/cloud/atlas
2. Create a free account and cluster
3. Get your connection string
4. Update `server/.env`:
   ```
   MONGODB_URI=your-atlas-connection-string
   ```

## Environment Variables

Create a `.env` file in the `server` directory with:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/recipe-app
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRE=7d
NODE_ENV=development
```

## Running the Application

### Method 1: Run Both Together (Recommended)
```bash
cd advanced-recipe-app
npm run dev
```

### Method 2: Run Separately

**Terminal 1 - Backend:**
```bash
cd advanced-recipe-app/server
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd advanced-recipe-app/client
npm run dev
```

## Access the Application

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000
- **API Health**: http://localhost:5000/api/health

## Troubleshooting

### MongoDB Connection Error
- Ensure MongoDB is running
- Check `MONGODB_URI` in `.env` file
- Try: `mongosh` to test MongoDB connection

### Port Already in Use
- Change ports in `server/.env` and `client/vite.config.js`
- Or kill the process using the port

### Dependencies Issues
```bash
# Clean install
rm -rf node_modules package-lock.json
cd server && rm -rf node_modules package-lock.json
cd ../client && rm -rf node_modules package-lock.json
cd .. && npm run install-all
```