import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../../../hooks/useAuth';
import api from '../../../services/api';
import AdminLayout from '../../../components/layout/AdminLayout';
import LoadingButton from '../../../components/LoadingButton';
import { validateEmail } from '../../../utils/validators';

export default function UsersEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { token } = useAuth();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'user',
    password: ''
  });
  
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await api.get(`/users/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        
        setFormData({
          name: response.data.name,
          email: response.data.email,
          role: response.data.role,
          password: ''
        });
      // eslint-disable-next-line no-unused-vars
      } catch (error) {
        navigate('/users', { state: { error: 'Failed to load user data' } });
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, [id, token, navigate]);

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!validateEmail(formData.email)) newErrors.email = 'Invalid email format';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
      const payload = { 
        name: formData.name,
        email: formData.email,
        role: formData.role
      };
      
      // Only include password if it's provided
      if (formData.password) {
        payload.password = formData.password;
      }
      
      await api.put(`/users/${id}`, payload, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      navigate('/users', { state: { success: 'User updated successfully' } });
    } catch (error) {
      if (error.response?.data?.errors) {
        setErrors(error.response.data.errors);
      } else {
        setErrors({ general: 'Failed to update user. Please try again.' });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <AdminLayout title="Edit User" activeMenu="users">
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title="Edit User" activeMenu="users">
      <div className="bg-white shadow rounded-lg p-6">
        {errors.general && (
          <div className="mb-4 p-4 bg-red-100 text-red-700 rounded">
            {errors.general}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Full Name *
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className={`w-full px-4 py-2 border rounded-md ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email Address *
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              className={`w-full px-4 py-2 border rounded-md ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Role
            </label>
            <select
              name="role"
              value={formData.role}
              onChange={(e) => setFormData({...formData, role: e.target.value})}
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
            >
              <option value="user">User</option>
              <option value="manager">Manager</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              New Password (leave blank to keep current)
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
            />
          </div>

          <div className="pt-2 flex justify-end space-x-3">
            <button
              type="button"
              onClick={() => navigate('/users')}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <LoadingButton
              type="submit"
              loading={isSubmitting}
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded"
            >
              Update User
            </LoadingButton>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
}