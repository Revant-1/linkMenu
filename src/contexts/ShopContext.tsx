import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { ShopFormData } from '../types';

interface ShopContextType {
  shops: ShopFormData[];
  loading: boolean;
  error: string | null;
  getShopById: (id: string) => ShopFormData | undefined;
  createShop: (data: ShopFormData) => Promise<ShopFormData>;
  updateShop: (id: string, data: ShopFormData) => Promise<void>;
  deleteShop: (id: string) => Promise<void>;
  getShopBySlug: (name: string) => ShopFormData | undefined;
  fetchShops: (slug: string) => Promise<ShopFormData | null>;
}

const defaultContextValue: ShopContextType = {
  shops: [],
  loading: false,
  error: null,
  getShopById: () => undefined,
  createShop: async () => { throw new Error('Not implemented'); },
  updateShop: async () => {},
  deleteShop: async () => {},
  getShopBySlug: () => undefined,
  fetchShops: async () => null,
};

const ShopContext = createContext<ShopContextType>(defaultContextValue);

export function ShopProvider({ children }: { children: ReactNode }) {
  const [shops, setShops] = useState<ShopFormData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

    
  const fetchShops = async (slug?: string): Promise<ShopFormData[] | ShopFormData | null> => {
    try {
      // Avoid re-fetching shops if they are already loaded
      if (!slug && shops.length > 0) {
        console.log('Shops already fetched, returning existing data.');
        return shops; // Return the existing shops data
      }
  
      const endpoint = slug ? `/api/shops/${slug}` : `/api/shops`;
      const response = await fetch(endpoint);
  
      if (!response.ok) throw new Error('Failed to fetch shop data');
  
      const data = await response.json();
  
      if (slug) {
        return data as ShopFormData; // Single shop
      } else {
        setShops(data as ShopFormData[]); // Update the global shops state
        return data as ShopFormData[];
      }
    } catch (error) {
      console.error('Error fetching shops:', error);
      return null;
    }
  };
  
  
  
  

  useEffect(() => {
    fetchShops();
  }, []);

  const getShopById = (id: string): ShopFormData | undefined => {
    return shops.find(shop => shop._id === id);
  };

  const createShop = async (shopData: ShopFormData) => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const response = await fetch('/api/shops', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(shopData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create shop');
      }

      const createdShop = await response.json();
      setShops((prevShops) => [...prevShops, createdShop]);
      return createdShop;
    } catch (err) {
      console.error('Error creating shop:', err);
      setError(err instanceof Error ? err.message : 'Failed to create shop');
      throw err; // Re-throw the error so the component can handle it
    } finally {
      setLoading(false);
    }
  };

  const updateShop = async (id: string, shopData: ShopFormData) => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const response = await fetch(`/api/shops/id/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(shopData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update shop');
      }

      setShops((prevShops) =>
        prevShops.map((shop) => (shop._id === id ? { ...shop, ...shopData } : shop))
      );
    } catch (err) {
      console.error('Error updating shop:', err);
      setError(err instanceof Error ? err.message : 'Failed to update shop');
    } finally {
      setLoading(false);
    }
  };

  const deleteShop = async (id: string) => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const response = await fetch(`/api/shops/id/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to delete shop');
      }

      setShops((prevShops) => prevShops.filter((shop) => shop._id !== id));
    } catch (err) {
      console.error('Error deleting shop:', err);
      setError(err instanceof Error ? err.message : 'Failed to delete shop');
    } finally {
      setLoading(false);
    }
  };

  const getShopBySlug = (name: string): ShopFormData | undefined => {
    console.log('Shops after API call:', shops);

    const normalizedSlug = name
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  
    console.log('Looking for shop with slug:', normalizedSlug);
  
    const matchedShop = shops.find(shop => {
      console.log('Checking shop slug:', shop.slug);
      return shop.slug === normalizedSlug;
    });
  
    console.log('Matched Shop:', matchedShop);
    return matchedShop;
  };
  

  const value = {
    shops,
    loading,
    error,
    getShopById,
    createShop,
    updateShop,
    deleteShop,
    getShopBySlug,
    fetchShops,
  };

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
}

export function useShop() {
  const context = useContext(ShopContext);
  if (context === undefined) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
}