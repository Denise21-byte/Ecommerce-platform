import axiosInstance from './axiosInstance';
import { Order, OrderStatus } from '../types';

export interface OrderPayload {
  shippingAddress: string;
  city: string;
  postalCode?: string;
  phone: string;
  paymentMethod: string;
}

export const createOrder = async (payload: OrderPayload): Promise<Order> => {
  const { data } = await axiosInstance.post<Order>('/orders', payload);
  return data;
};

export const getMyOrders = async (): Promise<Order[]> => {
  const { data } = await axiosInstance.get<Order[]>('/orders/me');
  return data;
};

export const getAllOrders = async (): Promise<Order[]> => {
  const { data } = await axiosInstance.get<Order[]>('/orders');
  return data;
};

export const updateOrderStatus = async (id: string, status: OrderStatus): Promise<Order> => {
  const { data } = await axiosInstance.put<Order>(`/orders/${id}/status`, { status });
  return data;
};