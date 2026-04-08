import axiosInstance from './axiosInstance';

export type OrderStatus =
  | 'PENDING'
  | 'PROCESSING'
  | 'SHIPPED'
  | 'DELIVERED'
  | 'CANCELLED';

export type PaymentMethod =
  | 'CREDIT_CARD'
  | 'PAYPAL'
  | 'MOBILE_MONEY'
  | 'CASH_ON_DELIVERY';

export interface Order {
  id: string;
  status: OrderStatus;
  totalAmount: number;
  paymentMethod: PaymentMethod;
  shippingAddress: string;
  city: string;
  postalCode?: string;
  phone: string;
  user?: { id: string; name: string; email: string };
  createdAt: string;
}

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