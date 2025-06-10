/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../../hooks/useAuth';
import api from '../../../services/api';
import AdminLayout from '../../../components/layout/AdminLayout';
import Pagination from '../../../components/Pagination';
import ConfirmModal from '../../../components/ConfirmModal';
import Alert from '../../../components/Alert';

export default function UsersIndex() {
  const navigate = useNavigate();
  const location = useLocation();
  const { token, user: currentUser } = useAuth();
  
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  
  // Pagination state
  const [pagination, setPagination] = useState({
    currentPage: 1,
    perPage: 10,
    total: 0
  });

  useEffect(() => {
    if (location.state?.success) {
      setSuccess(location.state.success);
      window.history.replaceState({}, document.title);
    }
    
    if (location.state?.error) {
      setError(location.state.error);
      window.history.replaceState({}, document.title);
    }
  }, [location]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await api.get('/users', {
          params: {
            page: pagination.currentPage,
            per_page: pagination.perPage
          },
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        
        setUsers(response.data.data);
        setPagination({
          ...pagination,
          total: response.data.meta.total
        });
      } catch (err) {
        setError('Failed to fetch users');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [pagination, pagination.currentPage, token]);

  const handleDeleteClick = (user) => {
    setUserToDelete(user);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      await api.delete(`/users/${userToDelete.id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      setUsers(users.filter(u => u.id !== userToDelete.id));
      setSuccess('User deleted successfully');
    } catch (err) {
      setError('Failed to delete user');
    } finally {
      setShowDeleteModal(false);
    }
  };

  const handlePageChange = (page) => {
    setPagination({
      ...pagination,
      currentPage: page
    });
  };

  if (loading) {
    return (
      <AdminLayout title="Users" activeMenu="users">
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title="Users" activeMenu="users">
      <div className="space-y-4">
        {error && (
          <Alert type="error" message={error} onClose={() => setError('')} />
        )}
        
        {success && (
          <Alert type="success" message={success} onClose={() => setSuccess('')} />
        )}

        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">User Management</h2>
          <button
            onClick={() => navigate('/users/create')}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Add New User
          </button>
        </div>

        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {users.length > 0 ? (
                  users.map((user) => (
                    <tr key={user.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="text-sm font-medium text-gray-900">
                            {user.name}
                            {currentUser.id === user.id && (
                              <span className="ml-2 px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                You
                              </span>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {user.email}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          user.role === 'admin' ? 'bg-purple-100 text-purple-800' :
                          user.role === 'manager' ? 'bg-blue-100 text-blue-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {user.role}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button
                          onClick={() => navigate(`/users/edit/${user.id}`)}
                          className="text-blue-600 hover:text-blue-900 mr-3"
                        >
                          Edit
                        </button>
                        {currentUser.id !== user.id && (
                          <button
                            onClick={() => handleDeleteClick(user)}
                            className="text-red-600 hover:text-red-900"
                          >
                            Delete
                          </button>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="px-6 py-4 text-center text-sm text-gray-500">
                      No users found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {pagination.total > pagination.perPage && (
            <div className="px-6 py-4 border-t border-gray-200">
              <Pagination
                currentPage={pagination.currentPage}
                totalItems={pagination.total}
                perPage={pagination.perPage}
                onPageChange={handlePageChange}
              />
            </div>
          )}
        </div>
      </div>

      <ConfirmModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDeleteConfirm}
        title="Delete User"
        message={`Are you sure you want to delete ${userToDelete?.name}? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
      />
    </AdminLayout>
  );
}