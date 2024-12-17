import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useShop } from '../contexts/ShopContext';
import { useAuth } from '../contexts/AuthContext';
import { PlusCircle, Edit, Trash2, LogOut } from 'lucide-react';

function AdminDashboard() {
  const { shops, deleteShop } = useShop();
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleDelete = async (shopId: string) => {
    if (window.confirm('Are you sure you want to delete this shop?')) {
      try {
        await deleteShop(shopId);
      } catch (err) {
        console.error('Failed to delete shop:', err);
        alert('Failed to delete shop. Please try again.');
      }
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <div className="flex gap-4">
            <Link
              to="/admin/new"
              className="flex items-center bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
            >
              <PlusCircle className="w-4 h-4 mr-2" />
              Add New Shop
            </Link>
            <button
              onClick={handleLogout}
              className="flex items-center bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {shops.map((shop) => (
            <div
              key={shop._id}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <img
                src={shop.imageUrl}
                alt={shop.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h2 className="text-xl font-semibold text-gray-800 mb-2">
                  {shop.name}
                </h2>
                <p className="text-gray-600 mb-4">{shop.description}</p>
                <div className="flex justify-between items-center">
                  <Link
                    to={`/${shop.name.replace(/\s+/g, '-').toLowerCase()}`}
                    className="text-purple-600 hover:text-purple-700"
                  >
                    View Shop
                  </Link>
                  <div className="flex space-x-2">
                    <Link
                      to={`/admin/edit/${shop._id}`}
                      className="flex items-center text-blue-600 hover:text-blue-700"
                    >
                      <Edit className="w-4 h-4 mr-1" />
                      Edit
                    </Link>
                    <button
                      onClick={() => shop._id && handleDelete(shop._id)}
                      className="flex items-center text-red-500 hover:text-red-600"
                    >
                      <Trash2 className="w-4 h-4 mr-1" />
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;