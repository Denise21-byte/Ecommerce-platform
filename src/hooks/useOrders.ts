import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getMyOrders, getAllOrders, createOrder, updateOrderStatus, OrderPayload } from '../api/orderService';
import { OrderStatus } from '../types';

export const useMyOrders = () =>
  useQuery({ queryKey: ['my-orders'], queryFn: getMyOrders });

export const useAllOrders = () =>
  useQuery({ queryKey: ['all-orders'], queryFn: getAllOrders });

export const useCreateOrder = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: createOrder,
    onSuccess: () => qc.invalidateQueries({ queryKey: ['my-orders'] }),
  });
};

export const useUpdateOrderStatus = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: OrderStatus }) =>
      updateOrderStatus(id, status),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['all-orders'] }),
  });
};