export interface MenuItem {
  name: string;
  description: string;
  price?: number;
  imageUrl?: string;
}

export interface ThemeColors {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  text: string;
}

export interface Social {
  instagram?: string;
  facebook?: string;
  twitter?: string;
  youtube?: string;
  tiktok?: string;
  linkedin?: string;
  website?: string;
  reviews?: string;
}

export interface ShopFormData {
  slug: string;
  _id?: string;
  name: string;
  description: string;
  imageUrl: string;
  hours: string;
  established: string;
  phone: string;
  orderUrl: string;
  locationUrl: string;
  social: Social;
  theme: ThemeColors;
  menu: Array<{
    categoryName: string;
    items: MenuItem[];
  }>;
}


