export type { Product, Category, ProductPayload } from '../api/productService';
export type { Cart, CartItem } from '../api/cartService';
export type { Order, OrderStatus, PaymentMethod, OrderPayload } from '../api/orderService';
export type { AuthResponse, LoginCredentials, RegisterData } from '../api/authService';

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'USER' | 'ADMIN';
  avatar?: string;
}