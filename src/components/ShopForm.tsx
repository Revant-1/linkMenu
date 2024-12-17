import React, { useState } from 'react';
import { ShopFormData, MenuItem, ThemeColors } from '../types';
import { PlusCircle, Trash2, Save, Palette } from 'lucide-react';
import ColorPicker from './ColorPicker';

interface ShopFormProps {
  initialData?: ShopFormData;
  onSubmit: (data: ShopFormData) => void;
}

const emptyMenuItem: MenuItem = {
  name: '',
  description: '',
  imageUrl: '',
};

const emptyCategory = {
  categoryName: '',
  items: [{ ...emptyMenuItem }],
};

const defaultTheme: ThemeColors = {
  primary: '#4A5568',
  secondary: '#F7FAFC',
  accent: '#ED8936',
  background: 'from-gray-50 to-gray-100',
  text: '#2D3748'
};

const predefinedThemes = {
  classic: {
    primary: '#8B0000',
    secondary: '#FFF3E0',
    accent: '#FFB74D',
    background: 'from-amber-50 to-red-50',
    text: '#2D3748'
  },
  modern: {
    primary: '#1A202C',
    secondary: '#F0F5FF',
    accent: '#4299E1',
    background: 'from-blue-50 to-gray-50',
    text: '#2D3748'
  },
  nature: {
    primary: '#2F855A',
    secondary: '#F0FFF4',
    accent: '#48BB78',
    background: 'from-green-50 to-teal-50',
    text: '#2D3748'
  },
  elegant: {
    primary: '#553C9A',
    secondary: '#FAF5FF',
    accent: '#9F7AEA',
    background: 'from-purple-50 to-pink-50',
    text: '#2D3748'
  },
  warm: {
    primary: '#C05621',
    secondary: '#FFFAF0',
    accent: '#ED8936',
    background: 'from-orange-50 to-yellow-50',
    text: '#2D3748'
  }
};

const ShopForm: React.FC<ShopFormProps> = ({ initialData, onSubmit }) => {
  const [formData, setFormData] = useState<ShopFormData>(
    initialData || {
      name: '',
      description: '',
      imageUrl: '',
      hours: '',
      established: '',
      phone: '',
      orderUrl: '',
      locationUrl: '',
      social: {},
      menu: [{ ...emptyCategory }],
      theme: defaultTheme
    }
  );

  const [showThemeCustomization, setShowThemeCustomization] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name.startsWith('social.')) {
      const socialField = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        social: { ...prev.social, [socialField]: value },
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleThemeChange = (themeName: string) => {
    setFormData(prev => ({
      ...prev,
      theme: predefinedThemes[themeName as keyof typeof predefinedThemes]
    }));
  };

  const handleColorChange = (colorType: keyof ThemeColors, color: string) => {
    setFormData(prev => ({
      ...prev,
      theme: {
        ...prev.theme!,
        [colorType]: color
      }
    }));
  };

  const handleCategoryChange = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      menu: prev.menu.map((cat, i) =>
        i === index ? { ...cat, categoryName: value } : cat
      ),
    }));
  };

  const handleMenuItemChange = (
    categoryIndex: number,
    itemIndex: number,
    field: keyof MenuItem,
    value: string | number
  ) => {
    setFormData(prev => ({
      ...prev,
      menu: prev.menu.map((cat, i) =>
        i === categoryIndex
          ? {
              ...cat,
              items: cat.items.map((item, j) =>
                j === itemIndex ? { ...item, [field]: value } : item
              ),
            }
          : cat
      ),
    }));
  };

  const addCategory = () => {
    setFormData(prev => ({
      ...prev,
      menu: [...prev.menu, { ...emptyCategory }],
    }));
  };

  const addMenuItem = (categoryIndex: number) => {
    setFormData(prev => ({
      ...prev,
      menu: prev.menu.map((cat, i) =>
        i === categoryIndex
          ? { ...cat, items: [...cat.items, { ...emptyMenuItem }] }
          : cat
      ),
    }));
  };

  const removeCategory = (index: number) => {
    setFormData(prev => ({
      ...prev,
      menu: prev.menu.filter((_, i) => i !== index),
    }));
  };

  const removeMenuItem = (categoryIndex: number, itemIndex: number) => {
    setFormData(prev => ({
      ...prev,
      menu: prev.menu.map((cat, i) =>
        i === categoryIndex
          ? { ...cat, items: cat.items.filter((_, j) => j !== itemIndex) }
          : cat
      ),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Basic Information */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Basic Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="name"
            placeholder="Shop Name"
            value={formData.name}
            onChange={handleInputChange}
            className="input-field"
            required
          />
          <input
            type="text"
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleInputChange}
            className="input-field"
            required
          />
          <input
            type="url"
            name="imageUrl"
            placeholder="Image URL"
            value={formData.imageUrl}
            onChange={handleInputChange}
            className="input-field"
            required
          />
          <input
            type="text"
            name="hours"
            placeholder="Business Hours"
            value={formData.hours}
            onChange={handleInputChange}
            className="input-field"
            required
          />
          <input
            type="text"
            name="established"
            placeholder="Established Date"
            value={formData.established}
            onChange={handleInputChange}
            className="input-field"
            required
          />
          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleInputChange}
            className="input-field"
          />
          <input
            type="url"
            name="orderUrl"
            placeholder="Order URL"
            value={formData.orderUrl}
            onChange={handleInputChange}
            className="input-field"
          />
          <input
            type="url"
            name="locationUrl"
            placeholder="Location URL"
            value={formData.locationUrl}
            onChange={handleInputChange}
            className="input-field"
          />
        </div>
      </div>

      {/* Social Links */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Social Links</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="url"
            name="social.instagram"
            placeholder="Instagram URL"
            value={formData.social.instagram || ''}
            onChange={handleInputChange}
            className="input-field"
          />
          <input
            type="url"
            name="social.facebook"
            placeholder="Facebook URL"
            value={formData.social.facebook || ''}
            onChange={handleInputChange}
            className="input-field"
          />
          <input
            type="url"
            name="social.twitter"
            placeholder="Twitter URL"
            value={formData.social.twitter || ''}
            onChange={handleInputChange}
            className="input-field"
          />
          <input
            type="url"
            name="social.youtube"
            placeholder="YouTube URL"
            value={formData.social.youtube || ''}
            onChange={handleInputChange}
            className="input-field"
          />
          <input
            type="url"
            name="social.tiktok"
            placeholder="TikTok URL"
            value={formData.social.tiktok || ''}
            onChange={handleInputChange}
            className="input-field"
          />
          <input
            type="url"
            name="social.linkedin"
            placeholder="LinkedIn URL"
            value={formData.social.linkedin || ''}
            onChange={handleInputChange}
            className="input-field"
          />
          <input
            type="url"
            name="social.website"
            placeholder="Website URL"
            value={formData.social.website || ''}
            onChange={handleInputChange}
            className="input-field"
          />
          <input
            type="url"
            name="social.reviews"
            placeholder="Reviews URL"
            value={formData.social.reviews || ''}
            onChange={handleInputChange}
            className="input-field"
          />
        </div>
      </div>

      {/* Theme Customization */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">Theme</h2>
          <button
            type="button"
            onClick={() => setShowThemeCustomization(!showThemeCustomization)}
            className="flex items-center text-purple-600 hover:text-purple-700"
          >
            <Palette className="w-4 h-4 mr-1" />
            {showThemeCustomization ? 'Hide Custom Colors' : 'Show Custom Colors'}
          </button>
        </div>

        {/* Predefined Themes */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {Object.entries(predefinedThemes).map(([name, theme]) => (
            <button
              key={name}
              type="button"
              onClick={() => handleThemeChange(name)}
              className="p-4 rounded-lg border-2 transition-all hover:scale-105"
              style={{
                backgroundColor: theme.secondary,
                borderColor: theme.primary,
              }}
            >
              <div className="w-full h-2 rounded mb-2" style={{ backgroundColor: theme.primary }} />
              <div className="w-full h-2 rounded mb-2" style={{ backgroundColor: theme.accent }} />
              <div className="text-sm font-medium capitalize" style={{ color: theme.primary }}>
                {name}
              </div>
            </button>
          ))}
        </div>

        {/* Custom Color Pickers */}
        {showThemeCustomization && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-gray-50 rounded-lg">
            <ColorPicker
              label="Primary Color"
              value={formData.theme?.primary || defaultTheme.primary}
              onChange={(color) => handleColorChange('primary', color)}
            />
            <ColorPicker
              label="Secondary Color"
              value={formData.theme?.secondary || defaultTheme.secondary}
              onChange={(color) => handleColorChange('secondary', color)}
            />
            <ColorPicker
              label="Accent Color"
              value={formData.theme?.accent || defaultTheme.accent}
              onChange={(color) => handleColorChange('accent', color)}
            />
          </div>
        )}
      </div>

      {/* Menu Builder */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">Menu</h2>
          <button
            type="button"
            onClick={addCategory}
            className="flex items-center text-purple-600 hover:text-purple-700"
          >
            <PlusCircle className="w-4 h-4 mr-1" />
            Add Category
          </button>
        </div>

        {formData.menu.map((category, categoryIndex) => (
          <div key={categoryIndex} className="bg-white p-4 rounded-lg shadow">
            <div className="flex justify-between items-center mb-4">
              <input
                type="text"
                placeholder="Category Name"
                value={category.categoryName}
                onChange={(e) => handleCategoryChange(categoryIndex, e.target.value)}
                className="input-field"
                required
              />
              <button
                type="button"
                onClick={() => removeCategory(categoryIndex)}
                className="text-red-500 hover:text-red-600"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            {category.items.map((item, itemIndex) => (
              <div key={itemIndex} className="grid grid-cols-12 gap-2 mb-2">
                <input
                  type="text"
                  placeholder="Item Name"
                  value={item.name}
                  onChange={(e) =>
                    handleMenuItemChange(categoryIndex, itemIndex, 'name', e.target.value)
                  }
                  className="col-span-3 input-field"
                  required
                />
                <input
                  type="text"
                  placeholder="Description"
                  value={item.description}
                  onChange={(e) =>
                    handleMenuItemChange(
                      categoryIndex,
                      itemIndex,
                      'description',
                      e.target.value
                    )
                  }
                  className="col-span-4 input-field"
                  // required
                />
                <input
                  type="number"
                  placeholder="Price (optional)"
                  value={item.price || ''}
                  onChange={(e) =>
                    handleMenuItemChange(
                      categoryIndex,
                      itemIndex,
                      'price',
                      e.target.value ? parseFloat(e.target.value) : undefined
                    )
                  }
                  className="col-span-2 input-field"
                />
                <input
                  type="url"
                  placeholder="Image URL"
                  value={item.imageUrl || ''}
                  onChange={(e) =>
                    handleMenuItemChange(
                      categoryIndex,
                      itemIndex,
                      'imageUrl',
                      e.target.value
                    )
                  }
                  className="col-span-2 input-field"
                />
                <button
                  type="button"
                  onClick={() => removeMenuItem(categoryIndex, itemIndex)}
                  className="col-span-1 text-red-500 hover:text-red-600"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}

            <button
              type="button"
              onClick={() => addMenuItem(categoryIndex)}
              className="flex items-center text-purple-600 hover:text-purple-700 mt-2"
            >
              <PlusCircle className="w-4 h-4 mr-1" />
              Add Item
            </button>
          </div>
        ))}
      </div>

      <button
        type="submit"
        className="flex items-center justify-center w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors"
      >
        <Save className="w-4 h-4 mr-2" />
        Save Shop
      </button>
    </form>
  );
};

export default ShopForm;