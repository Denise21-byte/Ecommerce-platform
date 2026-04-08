import axiosInstance from './axiosInstance';

export interface CartItem {
  id: string;
  productId: string;
  quantity: number;
}

export interface Cart {
  id: string;
  items: CartItem[];
  total: number;
}

export const getCart = async (): Promise<Cart> => {
  const { data } = await axiosInstance.get<Cart>('/cart');
  return data;
};

export const addToCart = async (productId: string, quantity: number): Promise<Cart> => {
  const { data } = await axiosInstance.post<Cart>('/cart', { productId, quantity });
  return data;
};