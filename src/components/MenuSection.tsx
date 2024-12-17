import React, { useState } from 'react';
import { MenuItem, ThemeColors } from '../types';
import { ChevronDown, ChevronUp, ImageOff } from 'lucide-react';

interface MenuSectionProps {
  category: string;
  items: MenuItem[];
  theme: ThemeColors;
  searchTerm: string;
  defaultExpanded?: boolean;
}

const MenuSection: React.FC<MenuSectionProps> = ({ 
  category, 
  items, 
  theme, 
  searchTerm,
  defaultExpanded = true
}) => {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  // Filter items based on search term
  const filteredItems = items.filter(
    item =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (searchTerm && filteredItems.length === 0) {
    return null;
  }

  return (
    <div className="mb-8 bg-white rounded-lg shadow-sm">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex justify-between items-center py-4 px-6 rounded-t-lg hover:bg-opacity-10 transition-colors"
        style={{ backgroundColor: `${theme.primary}10` }}
      >
        <h3 className="text-xl font-semibold" style={{ color: theme.text }}>
          {category}
        </h3>
        {isExpanded ? (
          <ChevronUp className="w-5 h-5" style={{ color: theme.text }} />
        ) : (
          <ChevronDown className="w-5 h-5" style={{ color: theme.text }} />
        )}
      </button>

      {isExpanded && (
        <div className="p-6 space-y-6">
          {filteredItems.map((item, index) => (
            <div
              key={`${category}-${item.name}-${index}`}
              className="flex justify-between items-start p-4 rounded-lg transition-colors hover:bg-gray-50"
            >
              <div className="flex gap-4 flex-1">
                {item.imageUrl && (
                  <div className="w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.onerror = null;
                        target.parentElement!.innerHTML = `
                          <div class="w-full h-full bg-gray-100 flex items-center justify-center">
                            <ImageOff class="w-6 h-6 text-gray-400" />
                          </div>
                        `;
                      }}
                    />
                  </div>
                )}
                <div className="flex-1">
                  <h4 className="text-lg font-medium mb-2" style={{ color: theme.text }}>
                    {item.name}
                  </h4>
                  <p className="text-sm" style={{ color: `${theme.text}CC` }}>
                    {item.description}
                  </p>
                </div>
              </div>
              {item.price && (
                <div className="ml-4 text-lg font-medium" style={{ color: theme.accent }}>
                  ₹{item.price.toFixed(2)}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MenuSection;