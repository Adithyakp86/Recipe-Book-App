import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import api from '../utils/api';
import toast from 'react-hot-toast';

export default function EditRecipe() {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data: recipe, isLoading } = useQuery(
    ['recipe', id],
    async () => {
      const res = await api.get(`/recipes/${id}`);
      return res.data.data;
    }
  );

  const [ingredients, setIngredients] = useState([{ name: '', amount: '', unit: '' }]);
  const [instructions, setInstructions] = useState(['']);

  useEffect(() => {
    if (recipe) {
      setIngredients(
        recipe.ingredients.length > 0
          ? recipe.ingredients
          : [{ name: '', amount: '', unit: '' }]
      );
      setInstructions(
        recipe.instructions.length > 0 ? recipe.instructions : ['']
      );
    }
  }, [recipe]);

  const updateMutation = useMutation(
    (data) => api.put(`/recipes/${id}`, data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['recipe', id]);
        toast.success('Recipe updated successfully!');
        navigate(`/recipes/${id}`);
      }
    }
  );

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

  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);

    try {
      const recipeData = {
        ...data,
        prepTime: parseInt(data.prepTime),
        cookTime: parseInt(data.cookTime),
        servings: parseInt(data.servings),
        ingredients: ingredients.filter(ing => ing.name && ing.amount),
        instructions: instructions.filter(inst => inst.trim())
      };

      updateMutation.mutate(recipeData);
    } catch (error) {
      toast.error('Failed to update recipe');
    }
  };

  if (isLoading) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
      </div>
    );
  }

  if (!recipe) {
    return <div>Recipe not found</div>;
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold text-gray-800 mb-8">Edit Recipe</h1>

      <form onSubmit={onSubmit} className="card p-8 space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Recipe Title *
          </label>
          <input
            name="title"
            defaultValue={recipe.title}
            className="input"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Description
          </label>
          <textarea
            name="description"
            defaultValue={recipe.description}
            className="input"
            rows="3"
          />
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category *
            </label>
            <select name="category" className="input" defaultValue={recipe.category} required>
              <option value="breakfast">Breakfast</option>
              <option value="lunch">Lunch</option>
              <option value="dinner">Dinner</option>
              <option value="dessert">Dessert</option>
              <option value="snack">Snack</option>
              <option value="beverage">Beverage</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Difficulty
            </label>
            <select name="difficulty" className="input" defaultValue={recipe.difficulty}>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Cuisine
            </label>
            <input
              name="cuisine"
              defaultValue={recipe.cuisine}
              className="input"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Prep Time (minutes) *
            </label>
            <input
              type="number"
              name="prepTime"
              defaultValue={recipe.prepTime}
              className="input"
              required
              min="1"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Cook Time (minutes) *
            </label>
            <input
              type="number"
              name="cookTime"
              defaultValue={recipe.cookTime}
              className="input"
              required
              min="1"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Servings *
            </label>
            <input
              type="number"
              name="servings"
              defaultValue={recipe.servings}
              className="input"
              required
              min="1"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Image URL
          </label>
          <input
            name="image"
            type="url"
            defaultValue={recipe.image}
            className="input"
          />
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="block text-sm font-medium text-gray-700">
              Ingredients *
            </label>
            <button
              type="button"
              onClick={addIngredient}
              className="text-sm text-primary-600 hover:text-primary-700"
            >
              + Add Ingredient
            </button>
          </div>
          {ingredients.map((ingredient, index) => (
            <div key={index} className="grid grid-cols-12 gap-2 mb-2">
              <input
                type="text"
                value={ingredient.amount || ''}
                onChange={(e) => updateIngredient(index, 'amount', e.target.value)}
                className="input col-span-3"
                placeholder="Amount"
              />
              <input
                type="text"
                value={ingredient.unit || ''}
                onChange={(e) => updateIngredient(index, 'unit', e.target.value)}
                className="input col-span-3"
                placeholder="Unit"
              />
              <input
                type="text"
                value={ingredient.name || ''}
                onChange={(e) => updateIngredient(index, 'name', e.target.value)}
                className="input col-span-5"
                placeholder="Ingredient name"
              />
              {ingredients.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeIngredient(index)}
                  className="col-span-1 text-red-600 hover:text-red-700"
                >
                  ×
                </button>
              )}
            </div>
          ))}
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="block text-sm font-medium text-gray-700">
              Instructions *
            </label>
            <button
              type="button"
              onClick={addInstruction}
              className="text-sm text-primary-600 hover:text-primary-700"
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
                value={instruction || ''}
                onChange={(e) => updateInstruction(index, e.target.value)}
                className="input flex-1"
                rows="2"
                placeholder={`Step ${index + 1}`}
              />
              {instructions.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeInstruction(index)}
                  className="text-red-600 hover:text-red-700 mt-1"
                >
                  ×
                </button>
              )}
            </div>
          ))}
        </div>

        <div className="flex space-x-4">
          <button type="submit" className="btn btn-primary" disabled={updateMutation.isLoading}>
            {updateMutation.isLoading ? 'Updating...' : 'Update Recipe'}
          </button>
          <button
            type="button"
            onClick={() => navigate(`/recipes/${id}`)}
            className="btn btn-secondary"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}