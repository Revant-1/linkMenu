import React from 'react';
import { Link } from 'react-router-dom';
import { useShop } from '../contexts/ShopContext';
import { Store } from 'lucide-react';

function HomePage() {
  const { shops } = useShop();

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-pink-50">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            ShopLinks Platform
          </h1>
          <p className="text-xl text-gray-600">
            Your one-stop solution for beautiful digital storefronts
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {shops.map((shop) => (
            <Link
              key={shop.id}
              to={`/${shop.id}`}
              className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow p-6 flex flex-col items-center"
            >
              <div className="w-24 h-24 rounded-full overflow-hidden mb-4">
                <img
                  src={shop.imageUrl}
                  alt={shop.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                {shop.name}
              </h2>
              <p className="text-gray-600 text-center mb-4">{shop.description}</p>
              <div className="flex items-center text-purple-600">
                <Store className="w-4 h-4 mr-2" />
                <span>View Shop</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default HomePage;