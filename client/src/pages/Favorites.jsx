import { useQuery } from 'react-query';
import api from '../utils/api';
import RecipeCard from '../components/recipes/RecipeCard';
import { Heart } from 'lucide-react';

export default function Favorites() {
  const { data, isLoading } = useQuery(
    'favorites',
    async () => {
      const res = await api.get('/users/favorites');
      return res.data.data;
    }
  );

  return (
    <div>
      <div className="flex items-center space-x-3 mb-8">
        <Heart className="w-8 h-8 text-red-600" />
        <h1 className="text-4xl font-bold text-gray-800">My Favorite Recipes</h1>
      </div>

      {isLoading ? (
        <div className="text-center py-12">
          <div className="spinner" style={{ margin: '0 auto' }}></div>
        </div>
      ) : data && data.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {data.map((recipe) => (
            <RecipeCard key={recipe._id} recipe={recipe} />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <Heart className="empty-state-icon" />
          <p className="empty-state-text">No favorite recipes yet</p>
          <p className="text-gray-500">Start liking recipes to see them here!</p>
        </div>
      )}
    </div>
  );
}