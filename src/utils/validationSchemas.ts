import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email('Enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').trim(),
  email: z.string().email('Enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
});

export const productSchema = z.object({
  title: z.string().min(1, 'Title is required').trim(),
  description: z.string().min(20, 'Description must be at least 20 characters').trim(),
  brand: z.string().min(1, 'Brand is required').trim(),
  price: z.coerce.number().positive('Price must be greater than 0'),
  stock: z.coerce.number().int('Stock must be a whole number').min(0, 'Stock cannot be negative'),
  categoryId: z.string().min(1, 'Category is required'),
  images: z.array(z.string().url('Each image must be a valid URL')).min(1, 'At least one image URL is required'),
});

export const shippingSchema = z.object({
  fullName: z.string().min(1, 'Full name is required').trim(),
  shippingAddress: z.string().min(1, 'Address is required').trim(),
  city: z.string().min(1, 'City is required').trim(),
  postalCode: z.string().optional(),
  phone: z.string().regex(/^\d{10}$/, 'Phone number must be exactly 10 digits'),
  email: z.string().email('Enter a valid email address'),
});

export const paymentSchema = z.object({
  paymentMethod: z.enum(['CREDIT_CARD', 'PAYPAL', 'MOBILE_MONEY', 'CASH_ON_DELIVERY'], {
    errorMap: () => ({ message: 'Select a valid payment method' }),
  }),
});

export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;
export type ProductFormData = z.infer<typeof productSchema>;
export type ShippingFormData = z.infer<typeof shippingSchema>;
export type PaymentFormData = z.infer<typeof paymentSchema>;