import axiosInstance from './axiosInstance';

export interface Category {
  id: string;
  name: string;
  image?: string;
}

export const getAllCategories = async (): Promise<Category[]> => {
  const { data } = await axiosInstance.get<Category[]>('/categories');
  return data;
};

export const createCategory = async (payload: { name: string; image: string }): Promise<Category> => {
  const { data } = await axiosInstance.post<Category>('/categories', payload);
  return data;
};

export const updateCategory = async (id: string, payload: { name: string; image: string }): Promise<Category> => {
  const { data } = await axiosInstance.patch<Category>(`/categories/${id}`, payload);
  return data;
};

export const deleteCategory = async (id: string): Promise<void> => {
  await axiosInstance.delete(`/categories/${id}`);
};