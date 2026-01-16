import mongoose from 'mongoose';

const ingredientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  amount: {
    type: String,
    required: true
  },
  unit: {
    type: String,
    default: ''
  }
}, { _id: false });

const recipeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide a recipe title'],
    trim: true,
    maxlength: [100, 'Title cannot exceed 100 characters']
  },
  description: {
    type: String,
    trim: true,
    maxlength: [500, 'Description cannot exceed 500 characters']
  },
  image: {
    type: String,
    default: ''
  },
  category: {
    type: String,
    required: true,
    enum: ['breakfast', 'lunch', 'dinner', 'dessert', 'snack', 'beverage'],
    default: 'dinner'
  },
  cuisine: {
    type: String,
    trim: true
  },
  prepTime: {
    type: Number,
    required: true,
    min: [1, 'Prep time must be at least 1 minute']
  },
  cookTime: {
    type: Number,
    required: true,
    min: [1, 'Cook time must be at least 1 minute']
  },
  servings: {
    type: Number,
    required: true,
    min: [1, 'Servings must be at least 1']
  },
  difficulty: {
    type: String,
    enum: ['easy', 'medium', 'hard'],
    default: 'medium'
  },
  ingredients: [ingredientSchema],
  instructions: [{
    type: String,
    required: true,
    trim: true
  }],
  tags: [{
    type: String,
    trim: true
  }],
  nutrition: {
    calories: Number,
    protein: Number,
    carbs: Number,
    fat: Number,
    fiber: Number
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  isPublic: {
    type: Boolean,
    default: true
  },
  views: {
    type: Number,
    default: 0
  },
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  rating: {
    average: {
      type: Number,
      default: 0,
      min: 0,
      max: 5
    },
    count: {
      type: Number,
      default: 0
    }
  }
}, {
  timestamps: true
});

// Index for search
recipeSchema.index({ title: 'text', description: 'text', tags: 'text' });

// Virtual for total time
recipeSchema.virtual('totalTime').get(function() {
  return this.prepTime + this.cookTime;
});

export default mongoose.model('Recipe', recipeSchema);