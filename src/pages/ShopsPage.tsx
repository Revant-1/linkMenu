import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useShop } from '../contexts/ShopContext';
import { Store, Search } from 'lucide-react';

const ShopsPage = () => {
  const { shops } = useShop();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredShops = shops.filter(
    shop =>
      shop.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      shop.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-pink-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4 md:mb-0">
            Discover Restaurants
          </h1>
          <div className="relative w-full md:w-64">
            <input
              type="text"
              placeholder="Search restaurants..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredShops.map((shop) => (
            <Link
              key={shop._id}
              to={`/${shop.slug}`}  // Use the pre-generated slug instead of transforming on the fly              className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow overflow-hidden group"
            >
              <div className="aspect-w-16 aspect-h-9">
                <img
                  src={shop.imageUrl}
                  alt={shop.name}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-2">
                  {shop.name}
                </h2>
                <p className="text-gray-600 mb-4">{shop.description}</p>
                <div className="flex items-center text-purple-600">
                  <Store className="w-4 h-4 mr-2" />
                  <span>View Menu</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {filteredShops.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600">No restaurants found matching your search.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShopsPage;