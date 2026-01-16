import { Link } from 'react-router-dom';
import { Clock, Users, ChefHat } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

export default function RecipeCard({ recipe }) {
  return (
    <Link to={`/recipes/${recipe._id}`} className="recipe-card card">
      <div className="recipe-card-image">
        {recipe.image ? (
          <img
            src={recipe.image}
            alt={recipe.title}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            onError={(e) => {
              e.target.src = 'https://via.placeholder.com/400x300?text=No+Image';
            }}
          />
        ) : (
          <div style={{ 
            width: '100%', 
            height: '100%', 
            background: 'linear-gradient(135deg, var(--primary-400) 0%, var(--primary-600) 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <ChefHat className="w-16 h-16" style={{ color: 'white', opacity: 0.5 }} />
          </div>
        )}
        <div className="recipe-card-badge">
          {recipe.category}
        </div>
      </div>
      <div className="recipe-card-content">
        <h3 className="recipe-card-title">{recipe.title}</h3>
        {recipe.description && (
          <p className="recipe-card-description">{recipe.description}</p>
        )}
        <div className="recipe-card-meta">
          <div className="recipe-card-meta-item">
            <Clock className="w-4 h-4" />
            <span>{recipe.prepTime + recipe.cookTime} min</span>
          </div>
          <div className="recipe-card-meta-item">
            <Users className="w-4 h-4" />
            <span>{recipe.servings} servings</span>
          </div>
        </div>
        {recipe.author && (
          <div className="recipe-card-author">
            {recipe.author.avatar && (
              <img
                src={recipe.author.avatar}
                alt={recipe.author.name}
                className="recipe-card-author-avatar"
              />
            )}
            <span className="recipe-card-author-name">{recipe.author.name}</span>
          </div>
        )}
      </div>
    </Link>
  );
}