import { Link } from 'react-router-dom';
import { useQuery } from 'react-query';
import api from '../utils/api';
import RecipeCard from '../components/recipes/RecipeCard';
import { ChefHat, TrendingUp, Clock, Users } from 'lucide-react';

export default function Home() {
  const { data: featuredRecipes } = useQuery(
    'featured-recipes',
    async () => {
      const res = await api.get('/recipes?limit=6&sort=-views');
      return res.data.data;
    }
  );

  return (
    <div>
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">
            Discover Amazing Recipes
          </h1>
          <p className="hero-subtitle">
            Your personal collection of delicious recipes from around the world.
            Create, share, and enjoy culinary masterpieces.
          </p>
          <div className="flex space-x-4">
            <Link to="/recipes" className="btn" style={{ background: 'white', color: 'var(--primary-600)' }}>
              Browse Recipes
            </Link>
            <Link to="/add-recipe" className="btn" style={{ background: 'var(--primary-700)', color: 'white', border: '2px solid white' }}>
              Add Your Recipe
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="grid grid-cols-1 md:grid-cols-4 mb-8">
        <div className="card p-6 text-center">
          <ChefHat className="w-12 h-12 text-primary-600" style={{ margin: '0 auto 1rem' }} />
          <h3 className="text-3xl font-bold text-gray-800">1000+</h3>
          <p className="text-gray-600">Recipes</p>
        </div>
        <div className="card p-6 text-center">
          <Users className="w-12 h-12 text-primary-600" style={{ margin: '0 auto 1rem' }} />
          <h3 className="text-3xl font-bold text-gray-800">500+</h3>
          <p className="text-gray-600">Chefs</p>
        </div>
        <div className="card p-6 text-center">
          <Clock className="w-12 h-12 text-primary-600" style={{ margin: '0 auto 1rem' }} />
          <h3 className="text-3xl font-bold text-gray-800">24/7</h3>
          <p className="text-gray-600">Available</p>
        </div>
        <div className="card p-6 text-center">
          <TrendingUp className="w-12 h-12 text-primary-600" style={{ margin: '0 auto 1rem' }} />
          <h3 className="text-3xl font-bold text-gray-800">Growing</h3>
          <p className="text-gray-600">Community</p>
        </div>
      </section>

      {/* Featured Recipes */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold text-gray-800">Featured Recipes</h2>
          <Link to="/recipes" className="text-primary-600 font-medium">
            View All →
          </Link>
        </div>
        {featuredRecipes ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {featuredRecipes.map((recipe) => (
              <RecipeCard key={recipe._id} recipe={recipe} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="spinner" style={{ margin: '0 auto' }}></div>
          </div>
        )}
      </section>
    </div>
  );
}