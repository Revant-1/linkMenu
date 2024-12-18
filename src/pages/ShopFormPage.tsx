import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useShop } from '../contexts/ShopContext';
import ShopForm from '../components/ShopForm';
import { ShopFormData } from '../types';

function ShopFormPage() {
  const navigate = useNavigate();
  const { shopId } = useParams();
  const { getShopById, createShop, updateShop } = useShop();
  const [error, setError] = useState('');

  const shop = shopId ? getShopById(shopId) : undefined;
  const initialData = shop || {
    name: '',
    description: '',
    imageUrl: '',
    hours: '',
    established: '',
    phone: '',
    orderUrl: '',
    locationUrl: '',
    social: {},
    theme: {
      primary: '#4A5568',
      secondary: '#F7FAFC',
      accent: '#ED8936',
      background: 'from-gray-50 to-gray-100',
      text: '#2D3748'
    },
    menu: []
  };

  const handleSubmit = async (data: ShopFormData) => {
    try {
      setError('');
      if (shopId) {
        await updateShop(shopId, data);
      } else {
        const newShop = await createShop(data);
        if (!newShop) {
          throw new Error('Failed to create shop - no response from server');
        }
      }
      navigate('/admin');
    } catch (error) {
      console.error('Error saving shop:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to save shop. Please try again.';
      setError(errorMessage);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          {shopId ? 'Edit Shop' : 'Create New Shop'}
        </h1>
        <div className="bg-white rounded-lg shadow-md p-6">
          <ShopForm initialData={initialData} onSubmit={handleSubmit} error={error} />
        </div>
      </div>
    </div>
  );
}

export default ShopFormPage;