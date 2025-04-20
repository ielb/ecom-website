import api from "./axios";
import { Product, ProductFilters, Category } from "@/types/product";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface SearchParams {
  category?: string;
  search?: string;
  minPrice?: number;
  maxPrice?: number;
  page?: number;
  limit?: number;
}

export async function getProduct(id: string): Promise<Product> {
  const response = await api.get<Product>(`/products/${id}`);
  console.log("Response", response);
  return response.data;
}

export async function getProducts(params?: ProductFilters): Promise<Product[]> {
  const queryParams = new URLSearchParams();

  if (params?.category) queryParams.append("category", params.category);
  if (params?.search) queryParams.append("search", params.search);
  if (params?.minPrice)
    queryParams.append("minPrice", params.minPrice.toString());
  if (params?.maxPrice)
    queryParams.append("maxPrice", params.maxPrice.toString());
  if (params?.page) queryParams.append("page", params.page.toString());
  if (params?.limit) queryParams.append("limit", params.limit.toString());

  const response = await api.get(`/products?${queryParams.toString()}`);
  return response.data;
}

export async function getCategories(): Promise<Category[]> {
  const response = await api.get("/categories");
  return response.data;
}
