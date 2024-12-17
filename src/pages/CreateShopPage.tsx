import React, { useState } from 'react';

interface ShopFormData {
  name: string;
  description: string;
  imageUrl: string;
  hours: string;
  established: string;
  phone: string;
  orderUrl: string;
  locationUrl: string;
  theme: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    text: string;
  };
  menu: any;
}

const CreateShopPage: React.FC = () => {
  const [formData, setFormData] = useState<ShopFormData>({
    name: '',
    description: '',
    imageUrl: '',
    hours: '',
    established: '',
    phone: '',
    orderUrl: '',
    locationUrl: '',
    theme: {
      primary: '',
      secondary: '',
      accent: '',
      background: '',
      text: '',
    },
    menu: {},
  });

  const handleSubmit = async (formData: ShopFormData) => {
    try {
      const token = localStorage.getItem('token'); // Make sure you have the token
      console.log('Submitting shop data:', formData); // Log the form data

      const response = await fetch('/api/shops', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, // Make sure you're sending the token
        },
        body: JSON.stringify(formData),
      });

      console.log('Response status:', response.status); // Log the response status

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error response:', errorData); // Log error response
        throw new Error(errorData.message || 'Failed to create shop');
      }

      const data = await response.json();
      console.log('Created shop:', data); // Log the created shop data
      
      // Handle success (e.g., redirect or show success message)
    } catch (error) {
      console.error('Error creating shop:', error);
      // Handle error (e.g., show error message to user)
    }
  };

  return (
    <div>
      {/* Render your form here */}
    </div>
  );
};

export default CreateShopPage;
