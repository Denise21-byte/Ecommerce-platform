import axiosInstance from './axiosInstance';
import { Cart } from '../types';

export const getCart = async (): Promise<Cart> => {
  const { data } = await axiosInstance.get<Cart>('/cart');
  return data;
};

export const addToCart = async (productId: string, quantity: number): Promise<Cart> => {
  const { data } = await axiosInstance.post<Cart>('/cart', { productId, quantity });
  return data;
};