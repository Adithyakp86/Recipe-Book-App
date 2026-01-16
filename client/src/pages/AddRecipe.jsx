import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import api from '../utils/api';
import toast from 'react-hot-toast';

export default function AddRecipe() {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();

  const [ingredients, setIngredients] = useState([{ name: '', amount: '', unit: '' }]);
  const [instructions, setInstructions] = useState(['']);

  const addIngredient = () => {
    setIngredients([...ingredients, { name: '', amount: '', unit: '' }]);
  };

  const removeIngredient = (index) => {
    setIngredients(ingredients.filter((_, i) => i !== index));
  };

  const updateIngredient = (index, field, value) => {
    const updated = [...ingredients];
    updated[index][field] = value;
    setIngredients(updated);
  };

  const addInstruction = () => {
    setInstructions([...instructions, '']);
  };

  const removeInstruction = (index) => {
    setInstructions(instructions.filter((_, i) => i !== index));
  };

  const updateInstruction = (index, value) => {
    const updated = [...instructions];
    updated[index] = value;
    setInstructions(updated);
  };

  const onSubmit = async (data) => {
    try {
      const recipeData = {
        ...data,
        prepTime: parseInt(data.prepTime),
        cookTime: parseInt(data.cookTime),
        servings: parseInt(data.servings),
        ingredients: ingredients.filter(ing => ing.name && ing.amount),
        instructions: instructions.filter(inst => inst.trim())
      };

      await api.post('/recipes', recipeData);
      toast.success('Recipe created successfully!');
      navigate('/recipes');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to create recipe');
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold text-gray-800 mb-8">Add New Recipe</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="card p-8">
        <div className="form-group">
          <label className="form-label">
            Recipe Title *
          </label>
          <input
            {...register('title', { required: 'Title is required' })}
            className="input"
            placeholder="e.g., Chocolate Chip Cookies"
          />
          {errors.title && <p className="text-red-600 text-sm" style={{ marginTop: '0.25rem' }}>{errors.title.message}</p>}
        </div>

        <div className="form-group">
          <label className="form-label">
            Description
          </label>
          <textarea
            {...register('description')}
            className="input"
            rows="3"
            placeholder="Brief description of the recipe"
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label className="form-label">
              Category *
            </label>
            <select
              {...register('category', { required: 'Category is required' })}
              className="input"
            >
              <option value="">Select Category</option>
              <option value="breakfast">Breakfast</option>
              <option value="lunch">Lunch</option>
              <option value="dinner">Dinner</option>
              <option value="dessert">Dessert</option>
              <option value="snack">Snack</option>
              <option value="beverage">Beverage</option>
            </select>
            {errors.category && <p className="text-red-600 text-sm" style={{ marginTop: '0.25rem' }}>{errors.category.message}</p>}
          </div>

          <div className="form-group">
            <label className="form-label">
              Difficulty
            </label>
            <select {...register('difficulty')} className="input">
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">
              Cuisine
            </label>
            <input
              {...register('cuisine')}
              className="input"
              placeholder="e.g., Italian, Mexican"
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label className="form-label">
              Prep Time (minutes) *
            </label>
            <input
              type="number"
              {...register('prepTime', { required: 'Prep time is required', min: 1 })}
              className="input"
            />
            {errors.prepTime && <p className="text-red-600 text-sm" style={{ marginTop: '0.25rem' }}>{errors.prepTime.message}</p>}
          </div>

          <div className="form-group">
            <label className="form-label">
              Cook Time (minutes) *
            </label>
            <input
              type="number"
              {...register('cookTime', { required: 'Cook time is required', min: 1 })}
              className="input"
            />
            {errors.cookTime && <p className="text-red-600 text-sm" style={{ marginTop: '0.25rem' }}>{errors.cookTime.message}</p>}
          </div>

          <div className="form-group">
            <label className="form-label">
              Servings *
            </label>
            <input
              type="number"
              {...register('servings', { required: 'Servings is required', min: 1 })}
              className="input"
            />
            {errors.servings && <p className="text-red-600 text-sm" style={{ marginTop: '0.25rem' }}>{errors.servings.message}</p>}
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">
            Image URL
          </label>
          <input
            {...register('image')}
            type="url"
            className="input"
            placeholder="https://example.com/image.jpg"
          />
        </div>

        <div className="form-group">
          <div className="flex items-center justify-between mb-2">
            <label className="form-label">
              Ingredients *
            </label>
            <button
              type="button"
              onClick={addIngredient}
              className="text-sm text-primary-600"
              style={{ background: 'none', border: 'none', cursor: 'pointer' }}
            >
              + Add Ingredient
            </button>
          </div>
          {ingredients.map((ingredient, index) => (
            <div key={index} className="grid grid-cols-12 gap-2 mb-2">
              <input
                type="text"
                value={ingredient.amount}
                onChange={(e) => updateIngredient(index, 'amount', e.target.value)}
                className="input col-span-3"
                placeholder="Amount"
              />
              <input
                type="text"
                value={ingredient.unit}
                onChange={(e) => updateIngredient(index, 'unit', e.target.value)}
                className="input col-span-3"
                placeholder="Unit"
              />
              <input
                type="text"
                value={ingredient.name}
                onChange={(e) => updateIngredient(index, 'name', e.target.value)}
                className="input col-span-5"
                placeholder="Ingredient name"
              />
              {ingredients.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeIngredient(index)}
                  className="col-span-1 text-red-600"
                  style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.5rem' }}
                >
                  ×
                </button>
              )}
            </div>
          ))}
        </div>

        <div className="form-group">
          <div className="flex items-center justify-between mb-2">
            <label className="form-label">
              Instructions *
            </label>
            <button
              type="button"
              onClick={addInstruction}
              className="text-sm text-primary-600"
              style={{ background: 'none', border: 'none', cursor: 'pointer' }}
            >
              + Add Step
            </button>
          </div>
          {instructions.map((instruction, index) => (
            <div key={index} className="flex items-start space-x-2 mb-2">
              <span className="flex-shrink-0 w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold mt-1">
                {index + 1}
              </span>
              <textarea
                value={instruction}
                onChange={(e) => updateInstruction(index, e.target.value)}
                className="input flex-1"
                rows="2"
                placeholder={`Step ${index + 1}`}
              />
              {instructions.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeInstruction(index)}
                  className="text-red-600"
                  style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.5rem', marginTop: '0.25rem' }}
                >
                  ×
                </button>
              )}
            </div>
          ))}
        </div>

        <div className="flex space-x-4">
          <button type="submit" className="btn btn-primary">
            Create Recipe
          </button>
          <button
            type="button"
            onClick={() => navigate('/recipes')}
            className="btn btn-secondary"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}