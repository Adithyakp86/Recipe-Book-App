import { useState } from 'react';
import { useQuery } from 'react-query';
import api from '../utils/api';
import RecipeCard from '../components/recipes/RecipeCard';
import RecipeFilters from '../components/recipes/RecipeFilters';
import SearchBar from '../components/recipes/SearchBar';

export default function Recipes() {
  const [filters, setFilters] = useState({
    category: '',
    difficulty: '',
    search: '',
    page: 1
  });

  const { data, isLoading } = useQuery(
    ['recipes', filters],
    async () => {
      const params = new URLSearchParams();
      if (filters.category) params.append('category', filters.category);
      if (filters.difficulty) params.append('difficulty', filters.difficulty);
      if (filters.search) params.append('search', filters.search);
      params.append('page', filters.page);
      params.append('limit', '12');

      const res = await api.get(`/recipes?${params.toString()}`);
      return res.data;
    }
  );

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">All Recipes</h1>
        <p className="text-gray-600">Discover and explore amazing recipes from our community</p>
      </div>

      <div className="mb-6">
        <SearchBar
          value={filters.search}
          onChange={(value) => setFilters({ ...filters, search: value, page: 1 })}
        />
      </div>

      <div className="mb-6">
        <RecipeFilters
          filters={filters}
          onChange={(newFilters) => setFilters({ ...filters, ...newFilters, page: 1 })}
        />
      </div>

      {isLoading ? (
        <div className="text-center py-12">
          <div className="spinner" style={{ margin: '0 auto' }}></div>
        </div>
      ) : data?.data?.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mb-8">
            {data.data.map((recipe) => (
              <RecipeCard key={recipe._id} recipe={recipe} />
            ))}
          </div>
          {data.pages > 1 && (
            <div className="flex justify-center space-x-2">
              <button
                onClick={() => setFilters({ ...filters, page: filters.page - 1 })}
                disabled={filters.page === 1}
                className="btn btn-secondary"
                style={{ opacity: filters.page === 1 ? 0.5 : 1 }}
              >
                Previous
              </button>
              <span className="px-4 py-2">
                Page {filters.page} of {data.pages}
              </span>
              <button
                onClick={() => setFilters({ ...filters, page: filters.page + 1 })}
                disabled={filters.page >= data.pages}
                className="btn btn-secondary"
                style={{ opacity: filters.page >= data.pages ? 0.5 : 1 }}
              >
                Next
              </button>
            </div>
          )}
        </>
      ) : (
        <div className="empty-state">
          <p className="empty-state-text">No recipes found. Try adjusting your filters.</p>
        </div>
      )}
    </div>
  );
}