import { MenuItem } from '../types';

export const menuData: Record<string, MenuItem[]> = {
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
  "Pasta": [
    {
      name: "Truffle Risotto",
      description: "Carnaroli rice with black truffle and parmesan",
      price: 24,
    },
    {
      name: "Pappardelle al Ragù",
      description: "Wide ribbon pasta with slow-cooked beef ragù",
      price: 22,
    },
  ],
};