import { useQuery } from 'react-query';
import { useAuth } from '../context/AuthContext';
import api from '../utils/api';
import RecipeCard from '../components/recipes/RecipeCard';
import { User, Mail, Calendar } from 'lucide-react';

export default function Profile() {
  const { user } = useAuth();

  const { data: profileData } = useQuery(
    'user-profile',
    async () => {
      const res = await api.get('/users/profile');
      return res.data;
    },
    { enabled: !!user }
  );

  return (
    <div>
      <h1 className="text-4xl font-bold text-gray-800 mb-8">My Profile</h1>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-1">
          <div className="card p-6">
            <div className="text-center mb-6">
              <div className="w-24 h-24 bg-primary-600 rounded-full flex items-center justify-center" style={{ margin: '0 auto 1rem' }}>
                {user?.avatar ? (
                  <img src={user.avatar} alt={user.name} className="w-24 h-24 rounded-full" />
                ) : (
                  <User className="w-12 h-12 text-white" />
                )}
              </div>
              <h2 className="text-2xl font-bold text-gray-800">{user?.name}</h2>
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-3 text-gray-600">
                <Mail className="w-5 h-5" />
                <span>{user?.email}</span>
              </div>
              {profileData && (
                <div className="flex items-center space-x-3 text-gray-600">
                  <Calendar className="w-5 h-5" />
                  <span>{profileData.recipeCount} Recipes</span>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="md:col-span-2">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">My Recipes</h2>
            {profileData?.userRecipes ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {profileData.userRecipes.map((recipe) => (
                  <RecipeCard key={recipe._id} recipe={recipe} />
                ))}
              </div>
            ) : (
              <p className="text-gray-600">No recipes yet. Start creating!</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}