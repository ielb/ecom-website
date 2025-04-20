export type ProductImage = {
  id: string;
  url: string;
  isMain: boolean;
  alt?: string;
  displayOrder: number;
  thumbnailUrl?: string;
  createdAt: string;
  updatedAt: string;
};

export type ProductVariant = {
  id: string;
  sku: string;
  price: number;
  stockQuantity: number;
  lowStockThreshold: number;
  criticalStockThreshold: number;
  attributes: Record<string, string>;
};

export type Product = {
  id: string;
  name: string;
  description: string;
  basePrice: number;
  price: number;
  stock: number;
  images: {
    url: string;
    isMain: boolean;
  }[];
  category?: {
    id: string;
    name: string;
    slug: string;
  };
  variants: ProductVariant[];
  tags: string[];
  isActive: boolean;
  averageRating: number;
  reviewCount: number;
  specifications: Record<string, string>;
  createdAt: string;
  updatedAt: string;
};

export type ProductResponse = {
  data: Product;
  message?: string;
};

export type ProductsResponse = {
  data: Product[];
  total: number;
  page: number;
  limit: number;
  message?: string;
};

export type ProductFilters = {
  category?: string;
  search?: string;
  minPrice?: number;
  maxPrice?: number;
  page?: number;
  limit?: number;
};

export type Category = {
  id: string;
  name: string;
  slug: string;
  parentId?: string;
};

export type CategoriesResponse = {
  data: Category[];
  message?: string;
};
