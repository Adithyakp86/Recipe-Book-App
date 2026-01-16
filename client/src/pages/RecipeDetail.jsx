import { useParams, Link, useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import api from '../utils/api';
import { useAuth } from '../context/AuthContext';
import { Clock, Users, ChefHat, Heart, Edit, Trash2, ArrowLeft } from 'lucide-react';
import toast from 'react-hot-toast';

export default function RecipeDetail() {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery(
    ['recipe', id],
    async () => {
      const res = await api.get(`/recipes/${id}`);
      return res.data.data;
    }
  );

  const likeMutation = useMutation(
    () => api.post(`/recipes/${id}/like`),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['recipe', id]);
      }
    }
  );

  const deleteMutation = useMutation(
    () => api.delete(`/recipes/${id}`),
    {
      onSuccess: () => {
        toast.success('Recipe deleted successfully');
        navigate('/recipes');
      }
    }
  );

  if (isLoading) {
    return (
      <div className="text-center py-12">
        <div className="spinner" style={{ margin: '0 auto' }}></div>
      </div>
    );
  }

  if (!data) {
    return <div>Recipe not found</div>;
  }

  const isOwner = user && data.author._id === user.id;
  const isLiked = user && data.likes?.some(like => like._id === user.id);

  return (
    <div>
      <Link to="/recipes" className="inline-flex items-center text-primary-600 mb-6">
        <ArrowLeft className="w-4 h-4" style={{ marginRight: '0.5rem' }} />
        Back to Recipes
      </Link>

      <div className="card overflow-hidden">
        {data.image && (
          <div className="h-96 overflow-hidden">
            <img src={data.image} alt={data.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
        )}

        <div className="p-8">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h1 className="text-4xl font-bold text-gray-800 mb-2">{data.title}</h1>
              {data.description && (
                <p className="text-gray-600 text-lg">{data.description}</p>
              )}
            </div>
            {user && (
              <button
                onClick={() => likeMutation.mutate()}
                style={{
                  padding: '0.5rem',
                  borderRadius: '50%',
                  background: isLiked ? 'var(--primary-100)' : 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  color: isLiked ? 'var(--red-600)' : 'var(--gray-400)'
                }}
              >
                <Heart className="w-6 h-6" style={isLiked ? { fill: 'currentColor' } : {}} />
              </button>
            )}
          </div>

          <div className="flex flex-wrap gap-4 mb-6">
            <div className="flex items-center space-x-2 text-gray-600">
              <Clock className="w-5 h-5" />
              <span>Prep: {data.prepTime} min | Cook: {data.cookTime} min</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-600">
              <Users className="w-5 h-5" />
              <span>{data.servings} servings</span>
            </div>
            <span className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm font-medium">
              {data.category}
            </span>
            {data.difficulty && (
              <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">
                {data.difficulty}
              </span>
            )}
          </div>

          {isOwner && (
            <div className="flex space-x-2 mb-6">
              <Link to={`/recipes/${id}/edit`} className="btn btn-secondary flex items-center space-x-2">
                <Edit className="w-4 h-4" />
                <span>Edit</span>
              </Link>
              <button
                onClick={() => {
                  if (window.confirm('Are you sure you want to delete this recipe?')) {
                    deleteMutation.mutate();
                  }
                }}
                className="btn btn-danger flex items-center space-x-2"
              >
                <Trash2 className="w-4 h-4" />
                <span>Delete</span>
              </button>
            </div>
          )}

          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Ingredients</h2>
              <ul className="space-y-2">
                {data.ingredients.map((ingredient, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <span className="text-primary-600" style={{ marginTop: '0.25rem' }}>•</span>
                    <span className="text-gray-700">
                      {ingredient.amount} {ingredient.unit} {ingredient.name}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Instructions</h2>
              <ol className="space-y-4">
                {data.instructions.map((instruction, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <span className="flex-shrink-0 w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold">
                      {index + 1}
                    </span>
                    <span className="text-gray-700" style={{ paddingTop: '0.25rem' }}>{instruction}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>

          {data.nutrition && (
            <div className="mt-8 p-4 bg-gray-50 rounded-lg">
              <h3 className="text-lg font-bold text-gray-800 mb-3">Nutrition Information</h3>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm">
                <div>
                  <span className="text-gray-600">Calories</span>
                  <p className="font-semibold">{data.nutrition.calories || 'N/A'}</p>
                </div>
                <div>
                  <span className="text-gray-600">Protein</span>
                  <p className="font-semibold">{data.nutrition.protein || 'N/A'}g</p>
                </div>
                <div>
                  <span className="text-gray-600">Carbs</span>
                  <p className="font-semibold">{data.nutrition.carbs || 'N/A'}g</p>
                </div>
                <div>
                  <span className="text-gray-600">Fat</span>
                  <p className="font-semibold">{data.nutrition.fat || 'N/A'}g</p>
                </div>
                <div>
                  <span className="text-gray-600">Fiber</span>
                  <p className="font-semibold">{data.nutrition.fiber || 'N/A'}g</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}