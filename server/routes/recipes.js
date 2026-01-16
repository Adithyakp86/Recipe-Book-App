import express from 'express';
import { body, validationResult, query } from 'express-validator';
import Recipe from '../models/Recipe.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// @route   GET /api/recipes
// @desc    Get all recipes (with filters)
// @access  Public
router.get('/', [
  query('category').optional().isIn(['breakfast', 'lunch', 'dinner', 'dessert', 'snack', 'beverage']),
  query('difficulty').optional().isIn(['easy', 'medium', 'hard']),
  query('search').optional().isString(),
  query('page').optional().isInt({ min: 1 }),
  query('limit').optional().isInt({ min: 1, max: 100 })
], async (req, res) => {
  try {
    const {
      category,
      difficulty,
      search,
      page = 1,
      limit = 12,
      sort = '-createdAt'
    } = req.query;

    // Build query
    const query = { isPublic: true };

    if (category) {
      query.category = category;
    }

    if (difficulty) {
      query.difficulty = difficulty;
    }

    if (search) {
      query.$text = { $search: search };
    }

    const skip = (page - 1) * limit;

    const recipes = await Recipe.find(query)
      .populate('author', 'name avatar')
      .sort(sort)
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Recipe.countDocuments(query);

    res.json({
      success: true,
      count: recipes.length,
      total,
      page: parseInt(page),
      pages: Math.ceil(total / limit),
      data: recipes
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// @route   GET /api/recipes/:id
// @desc    Get single recipe
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id)
      .populate('author', 'name avatar')
      .populate('likes', 'name');

    if (!recipe) {
      return res.status(404).json({
        success: false,
        message: 'Recipe not found'
      });
    }

    // Increment views
    recipe.views += 1;
    await recipe.save();

    res.json({
      success: true,
      data: recipe
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// @route   POST /api/recipes
// @desc    Create new recipe
// @access  Private
router.post('/', protect, [
  body('title').trim().notEmpty().withMessage('Title is required'),
  body('category').isIn(['breakfast', 'lunch', 'dinner', 'dessert', 'snack', 'beverage']),
  body('prepTime').isInt({ min: 1 }),
  body('cookTime').isInt({ min: 1 }),
  body('servings').isInt({ min: 1 }),
  body('ingredients').isArray().withMessage('Ingredients must be an array'),
  body('instructions').isArray().withMessage('Instructions must be an array')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array()
      });
    }

    const recipeData = {
      ...req.body,
      author: req.user.id
    };

    const recipe = await Recipe.create(recipeData);

    res.status(201).json({
      success: true,
      data: recipe
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// @route   PUT /api/recipes/:id
// @desc    Update recipe
// @access  Private
router.put('/:id', protect, async (req, res) => {
  try {
    let recipe = await Recipe.findById(req.params.id);

    if (!recipe) {
      return res.status(404).json({
        success: false,
        message: 'Recipe not found'
      });
    }

    // Check ownership
    if (recipe.author.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this recipe'
      });
    }

    recipe = await Recipe.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    res.json({
      success: true,
      data: recipe
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// @route   DELETE /api/recipes/:id
// @desc    Delete recipe
// @access  Private
router.delete('/:id', protect, async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);

    if (!recipe) {
      return res.status(404).json({
        success: false,
        message: 'Recipe not found'
      });
    }

    // Check ownership
    if (recipe.author.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this recipe'
      });
    }

    await recipe.deleteOne();

    res.json({
      success: true,
      message: 'Recipe deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// @route   POST /api/recipes/:id/like
// @desc    Like/Unlike recipe
// @access  Private
router.post('/:id/like', protect, async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);

    if (!recipe) {
      return res.status(404).json({
        success: false,
        message: 'Recipe not found'
      });
    }

    const isLiked = recipe.likes.includes(req.user.id);

    if (isLiked) {
      recipe.likes = recipe.likes.filter(
        id => id.toString() !== req.user.id.toString()
      );
    } else {
      recipe.likes.push(req.user.id);
    }

    await recipe.save();

    res.json({
      success: true,
      data: recipe
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

export default router;