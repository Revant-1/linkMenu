import { Shop } from '../types';

export const mockShops: Shop[] = [
  {
    id: 'bella-cucina',
    name: 'La Bella Cucina',
    description: 'Authentic Italian cuisine in the heart of the city',
    imageUrl: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?q=80&w=256&h=256&fit=crop',
    hours: 'Open Daily',
    established: 'Since 1995',
    phone: '+1234567890',
    orderUrl: 'https://order.example.com',
    locationUrl: 'https://maps.example.com',
    social: {
      instagram: 'https://instagram.com/bellacucina',
      facebook: 'https://facebook.com/bellacucina',
      reviews: 'https://reviews.example.com/bellacucina'
    },
    theme: {
      primary: '#8B0000',
      secondary: '#FFF3E0',
      accent: '#FFB74D',
      background: 'from-amber-50 to-red-50',
      text: '#2D3748'
    },
    menu: {
      "Signature Dishes": [
        {
          name: "Osso Buco",
          description: "Braised veal shanks with gremolata and saffron risotto",
          price: 32,
        },
        {
          name: "Lobster Linguine",
          description: "Fresh pasta with lobster, cherry tomatoes, and basil",
          price: 28,
        },
      ],
      "Antipasti": [
        {
          name: "Burrata",
          description: "Creamy burrata with heirloom tomatoes and basil pesto",
          price: 16,
        },
        {
          name: "Calamari Fritti",
          description: "Crispy fried calamari with lemon aioli",
          price: 14,
        },
      ],
    }
  },
  {
    id: 'sushi-master',
    name: 'Sushi Master',
    description: 'Premium Japanese dining experience',
    imageUrl: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?q=80&w=256&h=256&fit=crop',
    hours: '11:00 AM - 10:00 PM',
    established: 'Since 2010',
    phone: '+1234567891',
    orderUrl: 'https://order.sushimaster.com',
    locationUrl: 'https://maps.example.com/sushi-master',
    social: {
      instagram: 'https://instagram.com/sushimaster',
      facebook: 'https://facebook.com/sushimaster',
      reviews: 'https://reviews.example.com/sushimaster'
    },
    theme: {
      primary: '#1A202C',
      secondary: '#F0F5FF',
      accent: '#4299E1',
      background: 'from-blue-50 to-gray-50',
      text: '#2D3748'
    },
    menu: {
      "Special Rolls": [
        {
          name: "Dragon Roll",
          description: "Eel, cucumber, avocado, topped with tobiko",
          price: 18,
        },
        {
          name: "Rainbow Roll",
          description: "California roll topped with assorted sashimi",
          price: 16,
        },
      ],
      "Nigiri": [
        {
          name: "Salmon Nigiri",
          description: "Fresh Norwegian salmon",
          price: 6,
        },
        {
          name: "Tuna Nigiri",
          description: "Premium bluefin tuna",
          price: 8,
        },
      ],
    }
  },
  {
    id: 'green-bowl',
    name: 'Green Bowl',
    description: 'Healthy & Fresh Salad Bar',
    imageUrl: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=256&h=256&fit=crop',
    hours: '7:00 AM - 9:00 PM',
    established: 'Since 2020',
    phone: '+1234567892',
    orderUrl: 'https://order.greenbowl.com',
    locationUrl: 'https://maps.example.com/green-bowl',
    social: {
      instagram: 'https://instagram.com/greenbowl',
      facebook: 'https://facebook.com/greenbowl',
      reviews: 'https://reviews.example.com/greenbowl'
    },
    theme: {
      primary: '#2F855A',
      secondary: '#F0FFF4',
      accent: '#48BB78',
      background: 'from-green-50 to-teal-50',
      text: '#2D3748'
    },
    menu: {
      "Signature Bowls": [
        {
          name: "Mediterranean Bowl",
          description: "Quinoa, falafel, hummus, mixed greens, feta",
          price: 14,
        },
        {
          name: "Protein Power",
          description: "Grilled chicken, sweet potato, kale, almonds",
          price: 16,
        },
      ],
      "Build Your Own": [
        {
          name: "Custom Bowl",
          description: "Choose your base, protein, and 4 toppings",
          price: 12,
        },
        {
          name: "Premium Bowl",
          description: "Custom bowl + 2 premium toppings",
          price: 15,
        },
      ],
    }
  }
];