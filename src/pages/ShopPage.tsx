import { useEffect, useState } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import {
  Menu,
  Instagram,
  Facebook,
  Star,
  DollarSign,
  Phone,
  MapPin,
  Clock,
  ChefHat,
  Search,
  Twitter,
  Youtube,
  Globe,
  Linkedin,
} from 'lucide-react';

import { useShop } from '../contexts/ShopContext';
import MenuSection from '../components/MenuSection';
import LinkButton from '../components/LinkButton';
import TikTokIcon from '../components/icons/TikTokIcon';
import Loader from '../components/Loading.tsx';

function ShopPage() {
  const { shopName } = useParams();
  const { shops, getShopBySlug, fetchShops } = useShop();
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadShops() {
      try {
        await fetchShops(); // Fetch all shops (ensure this function is defined in the context)
      } catch (error) {
        console.error('Error fetching shops:', error);
      } finally {
        setLoading(false); // Stop loading when fetch completes
      }
    }

    loadShops();
  }, [fetchShops]);

  // Fetch the current shop
  const shop = shopName ? getShopBySlug(shopName) : undefined;

  // Debugging logs
  useEffect(() => {
    console.log('Shops:', shops);
    console.log('Shop Name:', shopName);
    console.log('Fetched Shop:', shop);
  }, [shops, shopName, shop]);

  // If still loading, show a loader
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        {/* <p className="text-lg font-semibold text-gray-500">Loading shop details...</p> */}
          <Loader />
      </div>
    );
  }

  // If shop is not found, redirect to a 404 page
  if (!shop) {
    console.error(`Shop not found for slug: ${shopName}`);
    return <Navigate to="/404" replace />;
  }

  const theme = shop.theme || {}; // Ensure theme exists

  // Social Media Links
  const socialIcons = [
    { key: 'instagram', icon: Instagram, url: shop.social?.instagram },
    { key: 'facebook', icon: Facebook, url: shop.social?.facebook },
    { key: 'twitter', icon: Twitter, url: shop.social?.twitter },
    { key: 'youtube', icon: Youtube, url: shop.social?.youtube },
    { key: 'tiktok', icon: TikTokIcon, url: shop.social?.tiktok },
    { key: 'linkedin', icon: Linkedin, url: shop.social?.linkedin },
    { key: 'website', icon: Globe, url: shop.social?.website },
    { key: 'reviews', icon: Star, url: shop.social?.reviews },
  ].filter((social) => social.url); // Filter only valid links

  // Ensure menu data is in array format
  const menuCategories = Array.isArray(shop.menu)
    ? shop.menu
    : Object.entries(shop.menu || {}).map(([categoryName, items]) => ({
        categoryName,
        items: Array.isArray(items) ? items : [],
      }));

  return (
    <div className={`min-h-screen bg-gradient-to-b ${theme.background || 'from-gray-100 to-white'}`}>
      <div className="max-w-3xl mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="text-center mb-8">
          {/* Shop Logo */}
          <div
            className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden shadow-lg ring-4"
            style={{ borderColor: theme.primary || '#333' }}
          >
            <img
              src={shop.imageUrl || '/placeholder.jpg'}
              alt={shop.name || 'Shop'}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Shop Name and Description */}
          <h1 className="text-4xl font-bold mb-2" style={{ color: theme.primary || '#333' }}>
            {shop.name}
          </h1>
          <p className="text-lg mb-4" style={{ color: theme.text || '#555' }}>
            {shop.description || 'No description available.'}
          </p>

          {/* Quick Info */}
          <div className="flex justify-center space-x-6 mb-6">
            {shop.hours && (
              <span className="flex items-center" style={{ color: theme.text || '#555' }}>
                <Clock className="w-5 h-5 mr-2" style={{ color: theme.accent || '#888' }} /> {shop.hours}
              </span>
            )}
            {shop.established && (
              <span className="flex items-center" style={{ color: theme.text || '#555' }}>
                <ChefHat className="w-5 h-5 mr-2" style={{ color: theme.accent || '#888' }} /> {shop.established}
              </span>
            )}
          </div>
        </div>

        {/* Social Links */}
        {socialIcons.length > 0 && (
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {socialIcons.map(({ key, icon: Icon, url }) => (
              <a
                key={key}
                href={url}
                className="p-2 transition-transform hover:scale-110"
                style={{ color: key === 'reviews' ? theme.accent : theme.primary || '#333' }}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Icon className="w-7 h-7" />
              </a>
            ))}
          </div>
        )}

        {/* Primary Actions */}
        <div className="space-y-4 mb-8">
          <LinkButton
            icon={<Menu />}
            text="View Full Menu"
            href="#menu"
            primary
            color={theme.primary || '#333'}
          />
          {shop.orderUrl && (
            <LinkButton icon={<DollarSign />} text="Order Online" href={shop.orderUrl} color={theme.accent || '#555'} />
          )}
          {shop.locationUrl && (
            <LinkButton
              icon={<MapPin />}
              text="Get Directions"
              href={shop.locationUrl}
              color={theme.accent || '#555'}
            />
          )}
          {shop.phone && (
            <LinkButton
              icon={<Phone />}
              text="Call Us"
              href={`tel:${shop.phone}`}
              color={theme.accent || '#555'}
            />
          )}
        </div>

        {/* Menu Section */}
        <div id="menu" className="mt-12">
          <h2 className="text-3xl font-bold mb-8 text-center" style={{ color: theme.primary || '#333' }}>
            Our Menu
          </h2>

          {/* Search Bar */}
          <div className="relative mb-8">
            <input
              type="text"
              placeholder="Search menu..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-3 pl-10 rounded-lg border focus:outline-none focus:ring-2"
              style={{
                borderColor: `${theme.primary || '#333'}40`,
                backgroundColor: 'white',
                color: theme.text || '#555',
              }}
            />
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4"
              style={{ color: theme.primary || '#333' }}
            />
          </div>

          {/* Menu Categories */}
          <div className="space-y-6">
            {menuCategories.map((category, index) => (
              <MenuSection
                key={`${category.categoryName}-${index}`}
                category={category.categoryName}
                items={category.items}
                theme={theme}
                searchTerm={searchTerm}
                defaultExpanded={true}
              />
            ))}
          </div>
        </div>

        {/* Footer */}
        <footer className="text-center mt-12 pb-8">
          <p style={{ color: theme.text || '#555' }}>
            {new Date().getFullYear()} {shop.name}. All rights reserved.
          </p>
        </footer>
      </div>
    </div>
  );
}

export default ShopPage;
