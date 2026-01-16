import { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';
import toast from 'react-hot-toast';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      fetchUser();
    } else {
      setLoading(false);
    }
  }, []);

  const fetchUser = async () => {
    try {
      const response = await api.get('/auth/me');
      setUser(response.data.user);
    } catch (error) {
      localStorage.removeItem('token');
      delete api.defaults.headers.common['Authorization'];
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      const response = await api.post('/auth/login', { email, password });
      const { token, user } = response.data;
      
      localStorage.setItem('token', token);
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      setUser(user);
      
      toast.success('Logged in successfully!');
      navigate('/');
      return { success: true };
    } catch (error) {
      let errorMessage = 'Login failed';
      
      if (error.response) {
        errorMessage = error.response.data?.message || 'Invalid email or password';
      } else if (error.request) {
        errorMessage = 'Cannot connect to server. Please make sure the backend server is running on port 5000.';
      } else {
        errorMessage = error.message || 'Login failed';
      }
      
      toast.error(errorMessage);
      console.error('Login error:', error);
      return { success: false, error: error.response?.data || { message: errorMessage } };
    }
  };

  const register = async (name, email, password) => {
    try {
      const response = await api.post('/auth/register', { name, email, password });
      const { token, user } = response.data;
      
      localStorage.setItem('token', token);
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      setUser(user);
      
      toast.success('Account created successfully!');
      navigate('/');
      return { success: true };
    } catch (error) {
      let errorMessage = 'Registration failed';
      
      if (error.response) {
        // Server responded with error
        errorMessage = error.response.data?.message || error.response.data?.errors?.[0]?.msg || 'Registration failed';
      } else if (error.request) {
        // Request made but no response
        errorMessage = 'Cannot connect to server. Please make sure the backend server is running on port 5000.';
      } else {
        // Error setting up request
        errorMessage = error.message || 'Registration failed';
      }
      
      toast.error(errorMessage);
      console.error('Registration error:', error);
      return { success: false, error: error.response?.data || { message: errorMessage } };
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    delete api.defaults.headers.common['Authorization'];
    setUser(null);
    toast.success('Logged out successfully');
    navigate('/');
  };

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    fetchUser
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};