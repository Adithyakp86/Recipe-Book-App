import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { ChefHat, Plus, Heart, Calendar, User, LogOut, LogIn } from 'lucide-react';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
  };

  return (
    <nav className="navbar">
      <div className="navbar-content">
        <Link to="/" className="navbar-logo">
          <ChefHat className="w-8 h-8" />
          <span>Recipe Book</span>
        </Link>

        <div className="navbar-links">
          <Link to="/recipes" className="navbar-link">
            Recipes
          </Link>
          {user && (
            <>
              <Link to="/add-recipe" className="navbar-link flex items-center space-x-1">
                <Plus className="w-4 h-4" />
                <span>Add Recipe</span>
              </Link>
              <Link to="/favorites" className="navbar-link flex items-center space-x-1">
                <Heart className="w-4 h-4" />
                <span>Favorites</span>
              </Link>
              <Link to="/meal-plans" className="navbar-link flex items-center space-x-1">
                <Calendar className="w-4 h-4" />
                <span>Meal Plans</span>
              </Link>
            </>
          )}
        </div>

        <div className="navbar-actions">
          {user ? (
            <>
              <Link to="/profile" className="navbar-link flex items-center space-x-2">
                <User className="w-5 h-5" />
                <span className="hidden md:inline">{user.name}</span>
              </Link>
              <button
                onClick={handleLogout}
                className="navbar-link flex items-center space-x-2"
                style={{ background: 'none', border: 'none', cursor: 'pointer' }}
              >
                <LogOut className="w-5 h-5" />
                <span className="hidden md:inline">Logout</span>
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="btn btn-primary flex items-center space-x-2"
            >
              <LogIn className="w-5 h-5" />
              <span>Login</span>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}