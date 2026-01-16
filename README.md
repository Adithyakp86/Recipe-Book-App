# Advanced Recipe Book Application 🍳

A full-stack, production-ready Recipe Book application built with modern technologies including React, Node.js, Express, and MongoDB.

## 🚀 Features

### Core Features
- **User Authentication**: Secure JWT-based authentication system
- **Recipe Management**: Full CRUD operations for recipes
- **Advanced Search**: Search recipes by name, ingredients, cuisine, and more
- **Filtering**: Filter by category, difficulty, and other criteria
- **Favorites System**: Save and manage favorite recipes
- **Meal Planning**: Create and manage weekly meal plans
- **Recipe Details**: Comprehensive recipe view with ingredients, instructions, and nutrition info
- **User Profiles**: Personal profile pages with user recipes
- **Responsive Design**: Beautiful, modern UI that works on all devices

### Technical Features
- **RESTful API**: Well-structured backend API with Express.js
- **Database**: MongoDB with Mongoose ODM
- **State Management**: React Query for server state
- **Form Handling**: React Hook Form for form validation
- **Styling**: Tailwind CSS for modern, responsive design
- **Routing**: React Router for client-side routing
- **Error Handling**: Comprehensive error handling and user feedback

## 📁 Project Structure

```
advanced-recipe-app/
├── server/                 # Backend API
│   ├── models/            # MongoDB models
│   ├── routes/            # API routes
│   ├── middleware/        # Auth middleware
│   └── index.js          # Server entry point
├── client/                # Frontend React app
│   ├── src/
│   │   ├── components/   # Reusable components
│   │   ├── pages/        # Page components
│   │   ├── context/      # React context
│   │   └── utils/        # Utility functions
│   └── package.json
└── package.json          # Root package.json
```

## 🛠️ Tech Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **express-validator** - Input validation

### Frontend
- **React 18** - UI library
- **Vite** - Build tool
- **React Router** - Routing
- **React Query** - Data fetching
- **React Hook Form** - Form handling
- **Tailwind CSS** - Styling
- **Axios** - HTTP client
- **React Hot Toast** - Notifications

## 📦 Installation

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

### Setup Steps

1. **Clone or navigate to the project directory**
   ```bash
   cd advanced-recipe-app
   ```

2. **Install all dependencies**
   ```bash
   npm run install-all
   ```
   Or install separately:
   ```bash
   npm install
   cd server && npm install
   cd ../client && npm install
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the `server` directory:
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/recipe-app
   JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
   JWT_EXPIRE=7d
   NODE_ENV=development
   ```

4. **Start MongoDB**
   
   Make sure MongoDB is running on your system. If using local MongoDB:
   ```bash
   # On Windows (if installed as service, it should auto-start)
   # On Mac/Linux
   mongod
   ```

   Or use MongoDB Atlas (cloud) and update `MONGODB_URI` in `.env`.

5. **Run the application**
   
   From the root directory:
   ```bash
   npm run dev
   ```
   
   This will start both the backend server (port 5000) and frontend dev server (port 3000).

   Or run separately:
   ```bash
   # Terminal 1 - Backend
   npm run server
   
   # Terminal 2 - Frontend
   npm run client
   ```

## 🌐 Access the Application

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000
- **API Health Check**: http://localhost:5000/api/health

## 📝 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (protected)

### Recipes
- `GET /api/recipes` - Get all recipes (with filters)
- `GET /api/recipes/:id` - Get single recipe
- `POST /api/recipes` - Create recipe (protected)
- `PUT /api/recipes/:id` - Update recipe (protected)
- `DELETE /api/recipes/:id` - Delete recipe (protected)
- `POST /api/recipes/:id/like` - Like/unlike recipe (protected)

### Users
- `GET /api/users/profile` - Get user profile (protected)
- `PUT /api/users/profile` - Update profile (protected)
- `GET /api/users/favorites` - Get favorites (protected)
- `POST /api/users/favorites/:recipeId` - Add favorite (protected)
- `DELETE /api/users/favorites/:recipeId` - Remove favorite (protected)

### Meal Plans
- `GET /api/meal-plans` - Get user's meal plans (protected)
- `POST /api/meal-plans` - Create meal plan (protected)
- `PUT /api/meal-plans/:id` - Update meal plan (protected)
- `DELETE /api/meal-plans/:id` - Delete meal plan (protected)

## 🎯 Usage

1. **Register/Login**: Create an account or login to access all features
2. **Browse Recipes**: View all public recipes on the recipes page
3. **Search & Filter**: Use search bar and filters to find specific recipes
4. **Add Recipes**: Create your own recipes with detailed information
5. **Manage Favorites**: Like recipes and view them in your favorites
6. **Meal Planning**: Create meal plans for organized cooking
7. **Profile**: View your profile and manage your recipes

## 🔒 Security Features

- Password hashing with bcrypt
- JWT token-based authentication
- Protected routes on both frontend and backend
- Input validation and sanitization
- CORS configuration
- Environment variables for sensitive data

## 🚀 Deployment

### Backend Deployment
1. Set environment variables on your hosting platform
2. Ensure MongoDB connection string is correct
3. Deploy to platforms like:
   - Heroku
   - Railway
   - Render
   - DigitalOcean

### Frontend Deployment
1. Build the production bundle:
   ```bash
   cd client
   npm run build
   ```
2. Deploy the `dist` folder to:
   - Vercel
   - Netlify
   - GitHub Pages
   - Any static hosting

## 🐛 Troubleshooting

### MongoDB Connection Issues
- Ensure MongoDB is running
- Check `MONGODB_URI` in `.env` file
- Verify network connectivity if using cloud MongoDB

### Port Already in Use
- Change ports in `server/.env` and `client/vite.config.js`
- Kill processes using the ports

### CORS Errors
- Ensure backend CORS is configured correctly
- Check API base URL in frontend

## 📄 License

MIT License - feel free to use this project for learning or commercial purposes.

## 🙏 Credits

Built with modern web technologies and best practices.

---

**Happy Cooking! 🍳👨‍🍳**