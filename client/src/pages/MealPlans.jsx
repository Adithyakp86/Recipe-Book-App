import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import api from '../utils/api';
import { Calendar, Plus, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';

export default function MealPlans() {
  const queryClient = useQueryClient();
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    startDate: '',
    endDate: ''
  });

  const { data: mealPlans, isLoading } = useQuery(
    'meal-plans',
    async () => {
      const res = await api.get('/meal-plans');
      return res.data.data;
    }
  );

  const createMutation = useMutation(
    (data) => api.post('/meal-plans', data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('meal-plans');
        toast.success('Meal plan created!');
        setShowForm(false);
        setFormData({ name: '', startDate: '', endDate: '' });
      }
    }
  );

  const deleteMutation = useMutation(
    (id) => api.delete(`/meal-plans/${id}`),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('meal-plans');
        toast.success('Meal plan deleted');
      }
    }
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    createMutation.mutate(formData);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-3">
          <Calendar className="w-8 h-8 text-primary-600" />
          <h1 className="text-4xl font-bold text-gray-800">Meal Plans</h1>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="btn btn-primary flex items-center space-x-2"
        >
          <Plus className="w-5 h-5" />
          <span>New Meal Plan</span>
        </button>
      </div>

      {showForm && (
        <div className="card p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Create Meal Plan</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Plan Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="input"
                required
              />
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Start Date
                </label>
                <input
                  type="date"
                  value={formData.startDate}
                  onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                  className="input"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  End Date
                </label>
                <input
                  type="date"
                  value={formData.endDate}
                  onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                  className="input"
                  required
                />
              </div>
            </div>
            <div className="flex space-x-4">
              <button type="submit" className="btn btn-primary">
                Create Plan
              </button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="btn btn-secondary"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {isLoading ? (
        <div className="text-center py-12">
          <div className="spinner" style={{ margin: '0 auto' }}></div>
        </div>
      ) : mealPlans && mealPlans.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {mealPlans.map((plan) => (
            <div key={plan._id} className="card p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-gray-800">{plan.name}</h3>
                <button
                  onClick={() => {
                    if (window.confirm('Delete this meal plan?')) {
                      deleteMutation.mutate(plan._id);
                    }
                  }}
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
              <p className="text-gray-600 mb-2">
                {new Date(plan.startDate).toLocaleDateString()} - {new Date(plan.endDate).toLocaleDateString()}
              </p>
              {plan.meals && plan.meals.length > 0 ? (
                <div className="mt-4">
                  <p className="text-sm text-gray-600">{plan.meals.length} meals planned</p>
                </div>
              ) : (
                <p className="text-gray-500 text-sm mt-4">No meals added yet</p>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <Calendar className="empty-state-icon" />
          <p className="empty-state-text">No meal plans yet</p>
          <p className="text-gray-500">Create your first meal plan to get started!</p>
        </div>
      )}
    </div>
  );
}