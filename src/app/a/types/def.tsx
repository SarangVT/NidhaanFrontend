export type CartProduct = {
  id: number;
  title: string;
  seller_id: string;
  rating: string; // could be number if parsed
  mrp: number; // could be number if parsed
  image: string;
  current_price: number; // could be number if parsed
  offers: string; // e.g., "{10% Off}" – possibly parse to string[]
  highlights: string[]; // e.g., "{Relieves pain,Reduces fever}" – possibly parse to string[]
  product_details: string;
  manufacturer_details: string;
  marketer_details: string;
  country_of_origin: string;
  expires_on_or_after: string; // ISO date string
  created_at: string; // timestamp
  tags: string; // e.g., "{Trending Now,Best Deals Now}" – possibly parse to string[]
  quantity: number;
};

export type Address = {
  id: number;
  name?: string;
  phone?: string;
  address?: string;
  locality?: string;
  city?: string;
  state?: string;
  pincode?: string;
  landmark?: string;
  isDefault: boolean;
};
