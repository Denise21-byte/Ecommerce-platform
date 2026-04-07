export interface User {
  id: string;
  name: string;
  email: string;
  role: 'USER' | 'ADMIN';
  avatar?: string;
}

export interface Category {
  id: string;
  name: string;
  image?: string;
}

export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  stock: number;
  brand: string;
  images: string[];
  category: Category;
  categoryId: string;
  createdAt?: string;
}

export interface CartItem {
  id: string;
  product: Product;
  productId: string;
  quantity: number;
}

export interface Cart {
  id: string;
  items: CartItem[];
  total: number;
}

export interface Order {
  id: string;
  status: OrderStatus;
  totalAmount: number;
  paymentMethod: PaymentMethod;
  shippingAddress: string;
  city: string;
  postalCode?: string;
  phone: string;
  user?: User;
  items?: CartItem[];
  createdAt: string;
}

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

export interface AuthResponse {
  access_token: string;
  user: User;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
}