import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getAllCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from '../api/categoryService';

export const useCategories = () =>
  useQuery({ queryKey: ['categories'], queryFn: getAllCategories, staleTime: 1000 * 60 * 10 });

export const useCreateCategory = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: createCategory,
    onSuccess: () => qc.invalidateQueries({ queryKey: ['categories'] }),
  });
};

export const useUpdateCategory = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: { name: string; image: string } }) =>
      updateCategory(id, payload),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['categories'] }),
  });
};

export const useDeleteCategory = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: deleteCategory,
    onSuccess: () => qc.invalidateQueries({ queryKey: ['categories'] }),
  });
};