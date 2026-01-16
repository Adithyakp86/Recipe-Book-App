import express from 'express';
import MealPlan from '../models/MealPlan.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// @route   GET /api/meal-plans
// @desc    Get user's meal plans
// @access  Private
router.get('/', protect, async (req, res) => {
  try {
    const mealPlans = await MealPlan.find({ user: req.user.id })
      .populate('meals.recipe')
      .sort('-createdAt');

    res.json({
      success: true,
      count: mealPlans.length,
      data: mealPlans
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// @route   POST /api/meal-plans
// @desc    Create new meal plan
// @access  Private
router.post('/', protect, async (req, res) => {
  try {
    const { name, startDate, endDate, meals, notes } = req.body;

    const mealPlan = await MealPlan.create({
      user: req.user.id,
      name,
      startDate,
      endDate,
      meals,
      notes
    });

    res.status(201).json({
      success: true,
      data: mealPlan
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// @route   PUT /api/meal-plans/:id
// @desc    Update meal plan
// @access  Private
router.put('/:id', protect, async (req, res) => {
  try {
    let mealPlan = await MealPlan.findById(req.params.id);

    if (!mealPlan) {
      return res.status(404).json({
        success: false,
        message: 'Meal plan not found'
      });
    }

    if (mealPlan.user.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized'
      });
    }

    mealPlan = await MealPlan.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    res.json({
      success: true,
      data: mealPlan
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// @route   DELETE /api/meal-plans/:id
// @desc    Delete meal plan
// @access  Private
router.delete('/:id', protect, async (req, res) => {
  try {
    const mealPlan = await MealPlan.findById(req.params.id);

    if (!mealPlan) {
      return res.status(404).json({
        success: false,
        message: 'Meal plan not found'
      });
    }

    if (mealPlan.user.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized'
      });
    }

    await mealPlan.deleteOne();

    res.json({
      success: true,
      message: 'Meal plan deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

export default router;