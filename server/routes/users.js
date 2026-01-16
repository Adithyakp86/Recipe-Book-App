import express from 'express';
import User from '../models/User.js';
import Recipe from '../models/Recipe.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// @route   GET /api/users/profile
// @desc    Get user profile
// @access  Private
router.get('/profile', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
      .populate('favoriteRecipes')
      .select('-password');

    const userRecipes = await Recipe.find({ author: req.user.id });

    res.json({
      success: true,
      user,
      recipeCount: userRecipes.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// @route   PUT /api/users/profile
// @desc    Update user profile
// @access  Private
router.put('/profile', protect, async (req, res) => {
  try {
    const { name, avatar } = req.body;

    const user = await User.findByIdAndUpdate(
      req.user.id,
      { name, avatar },
      { new: true, runValidators: true }
    ).select('-password');

    res.json({
      success: true,
      user
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// @route   POST /api/users/favorites/:recipeId
// @desc    Add recipe to favorites
// @access  Private
router.post('/favorites/:recipeId', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const recipe = await Recipe.findById(req.params.recipeId);

    if (!recipe) {
      return res.status(404).json({
        success: false,
        message: 'Recipe not found'
      });
    }

    if (user.favoriteRecipes.includes(req.params.recipeId)) {
      return res.status(400).json({
        success: false,
        message: 'Recipe already in favorites'
      });
    }

    user.favoriteRecipes.push(req.params.recipeId);
    await user.save();

    res.json({
      success: true,
      message: 'Recipe added to favorites'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// @route   DELETE /api/users/favorites/:recipeId
// @desc    Remove recipe from favorites
// @access  Private
router.delete('/favorites/:recipeId', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    user.favoriteRecipes = user.favoriteRecipes.filter(
      id => id.toString() !== req.params.recipeId
    );
    await user.save();

    res.json({
      success: true,
      message: 'Recipe removed from favorites'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// @route   GET /api/users/favorites
// @desc    Get user's favorite recipes
// @access  Private
router.get('/favorites', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate('favoriteRecipes');

    res.json({
      success: true,
      count: user.favoriteRecipes.length,
      data: user.favoriteRecipes
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

export default router;