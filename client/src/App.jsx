import { Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { useAuth } from './context/AuthContext';
import Navbar from './components/layout/Navbar';
import Home from './pages/Home';
import Recipes from './pages/Recipes';
import RecipeDetail from './pages/RecipeDetail';
import AddRecipe from './pages/AddRecipe';
import EditRecipe from './pages/EditRecipe';
import Profile from './pages/Profile';
import MealPlans from './pages/MealPlans';
import Login from './pages/Login';
import Register from './pages/Register';
import Favorites from './pages/Favorites';

function PrivateRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="spinner"></div>
      </div>
    );
  }

  return user ? children : <Navigate to="/login" />;
}

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/recipes" element={<Recipes />} />
          <Route path="/recipes/:id" element={<RecipeDetail />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/add-recipe"
            element={
              <PrivateRoute>
                <AddRecipe />
              </PrivateRoute>
            }
          />
          <Route
            path="/recipes/:id/edit"
            element={
              <PrivateRoute>
                <EditRecipe />
              </PrivateRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            }
          />
          <Route
            path="/favorites"
            element={
              <PrivateRoute>
                <Favorites />
              </PrivateRoute>
            }
          />
          <Route
            path="/meal-plans"
            element={
              <PrivateRoute>
                <MealPlans />
              </PrivateRoute>
            }
          />
        </Routes>
      </main>
      <Toaster position="top-right" />
    </div>
  );
}

export default App;