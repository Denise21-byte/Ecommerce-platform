import axiosInstance from './axiosInstance';
import { AuthResponse, LoginCredentials, RegisterData, User } from '../types';

export const loginUser = async (credentials: LoginCredentials): Promise<AuthResponse> => {
  const { data } = await axiosInstance.post<AuthResponse>('/auth/login', credentials);
  return data;
};

export const registerUser = async (registerData: RegisterData): Promise<User> => {
  const { data } = await axiosInstance.post<User>('/users/', {
    name: registerData.name,
    email: registerData.email,
    password: registerData.password,
    avatar: 'https://picsum.photos/200',
  });
  return data;
};

export const getProfile = async (): Promise<User> => {
  const { data } = await axiosInstance.get<User>('/auth/profile');
  return data;
};