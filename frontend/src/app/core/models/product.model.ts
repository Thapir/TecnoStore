export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  image: string;
  images?: string[];
  category: string;
  rating: number;
  reviewCount: number;
  stock: number;
  sku: string;
  tags?: string[];
  featured?: boolean;
}

export interface Category {
  id: number;
  name: string;
  icon: string;
  slug: string;
  productCount: number;
}
