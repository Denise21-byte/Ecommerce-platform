import axiosInstance from './axiosInstance';

export interface AuthResponse {
  access_token: string;
  user: {
    id: string;
    name: string;
    email: string;
    role: 'USER' | 'ADMIN';
    avatar?: string;
  };
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

export const loginUser = async (credentials: LoginCredentials): Promise<AuthResponse> => {
  const { data } = await axiosInstance.post<AuthResponse>('/auth/login', credentials);
  return data;
};

export const registerUser = async (registerData: RegisterData) => {
  const { data } = await axiosInstance.post('/users/', {
    name: registerData.name,
    email: registerData.email,
    password: registerData.password,
    avatar: 'https://picsum.photos/200',
  });
  return data;
};

export const getProfile = async () => {
  const { data } = await axiosInstance.get('/auth/profile');
  return data;
};