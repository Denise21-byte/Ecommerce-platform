import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getAllProducts, getProductById, createProduct, updateProduct, deleteProduct, ProductPayload } from '../api/productService';

export const useProducts = () =>
  useQuery({ queryKey: ['products'], queryFn: getAllProducts, staleTime: 1000 * 60 * 5 });

export const useProduct = (id: string) =>
  useQuery({ queryKey: ['product', id], queryFn: () => getProductById(id), enabled: !!id });

export const useCreateProduct = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: createProduct,
    onSuccess: () => qc.invalidateQueries({ queryKey: ['products'] }),
  });
};

export const useUpdateProduct = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: Partial<ProductPayload> }) =>
      updateProduct(id, payload),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['products'] }),
  });
};

export const useDeleteProduct = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => qc.invalidateQueries({ queryKey: ['products'] }),
  });
};