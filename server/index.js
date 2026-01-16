import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Import routes
import authRoutes from './routes/auth.js';
import recipeRoutes from './routes/recipes.js';
import userRoutes from './routes/users.js';
import mealPlanRoutes from './routes/mealPlans.js';

// Load environment variables
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploaded files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/recipes', recipeRoutes);
app.use('/api/users', userRoutes);
app.use('/api/meal-plans', mealPlanRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Recipe App API is running' });
});

// Connect to MongoDB
const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/recipe-app';
    console.log('Attempting to connect to MongoDB...');
    const conn = await mongoose.connect(mongoURI);
    console.log(`✓ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error('✗ Error connecting to MongoDB:', error.message);
    console.error('\nPlease make sure MongoDB is running:');
    console.error('  - Local: Start MongoDB service or run "mongod"');
    console.error('  - Cloud: Use MongoDB Atlas and update MONGODB_URI in .env file');
    console.error('\nThe server will continue but database operations will fail.');
    console.error('You can still test the API endpoints, but registration/login won\'t work.\n');
    // Don't exit - allow server to start for testing
    // process.exit(1);
  }
};

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    message: err.message || 'Internal Server Error',
    error: process.env.NODE_ENV === 'development' ? err : {}
  });
});

const PORT = process.env.PORT || 5000;

// Start server
const startServer = async () => {
  // Try to connect to MongoDB, but don't block server startup
  connectDB().catch(() => {
    console.log('Server will continue without database connection.');
  });
  
  app.listen(PORT, () => {
    console.log(`\n✓ Server running on port ${PORT}`);
    console.log(`✓ Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log(`✓ API available at: http://localhost:${PORT}/api`);
    console.log(`✓ Health check: http://localhost:${PORT}/api/health\n`);
  });
};

startServer();