import axiosInstance from './axiosInstance';
import { Product } from '../types';

export interface ProductPayload {
  title: string;
  description: string;
  price: number;
  stock: number;
  brand: string;
  images: string[];
  categoryId: string;
}

export const getAllProducts = async (): Promise<Product[]> => {
  const { data } = await axiosInstance.get<Product[]>('/products?limit=100');
  return data;
};

export const getProductById = async (id: string): Promise<Product> => {
  const { data } = await axiosInstance.get<Product>(`/products/${id}`);
  return data;
};

export const createProduct = async (payload: ProductPayload): Promise<Product> => {
  const { data } = await axiosInstance.post<Product>('/products', payload);
  return data;
};

export const updateProduct = async (id: string, payload: Partial<ProductPayload>): Promise<Product> => {
  const { data } = await axiosInstance.put<Product>(`/products/${id}`, payload);
  return data;
};

export const deleteProduct = async (id: string): Promise<void> => {
  await axiosInstance.delete(`/products/${id}`);
};