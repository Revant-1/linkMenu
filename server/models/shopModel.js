import mongoose from 'mongoose';

const menuItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  price: {
    type: Number,
    required: false,
  },
  imageUrl: {
    type: String,
    required: false,
  }
});

const themeSchema = new mongoose.Schema({
  primary: {
    type: String,
    required: true,
    default: '#4A5568'
  },
  secondary: {
    type: String,
    required: true,
    default: '#F7FAFC'
  },
  accent: {
    type: String,
    required: true,
    default: '#ED8936'
  },
  background: {
    type: String,
    required: true,
    default: 'from-gray-50 to-gray-100'
  },
  text: {
    type: String,
    required: true,
    default: '#2D3748'
  }
});

const socialSchema = new mongoose.Schema({
  instagram: String,
  facebook: String,
  twitter: String,
  youtube: String,
  tiktok: String,
  linkedin: String,
  website: String,
  reviews: String
});

const shopSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: false,
  },
  hours: {
    type: String,
    required: true,
  },
  established: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  orderUrl: {
    type: String,
    required: true,
  },
  locationUrl: {
    type: String,
    required: true,
  },
  social: {
    type: socialSchema,
    default: {},
  },
  theme: {
    type: themeSchema,
    required: true,
  },
  menu: {
    type: Map,
    of: [menuItemSchema],
    default: new Map(),
  },
  slug: {
    type: String,
    required: true,
    unique: true,
  },
}, {
  timestamps: true,
});

// Create slug from name before saving
shopSchema.pre('save', function(next) {
  if (!this.isModified('name')) {
    next();
    return;
  }
  // More robust slug generation
  this.slug = this.name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')   // Replace non-alphanumeric with dash
    .replace(/^-+|-+$/g, '');       // Remove leading/trailing dashes
  next();
});
// Add method to convert menu Map to array format for frontend
shopSchema.methods.toJSON = function() {
  const obj = this.toObject();
  
  // Convert menu Map to array format
  if (obj.menu instanceof Map) {
    const menuArray = [];
    obj.menu.forEach((items, categoryName) => {
      menuArray.push({
        categoryName,
        items
      });
    });
    obj.menu = menuArray;
  }
  
  return obj;
};

const Shop = mongoose.model('Shop', shopSchema);

export default Shop;