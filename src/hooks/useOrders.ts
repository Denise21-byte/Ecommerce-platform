import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getMyOrders,
  getAllOrders,
  createOrder,
  updateOrderStatus,
} from '../api/orderService';
import type { OrderStatus, OrderPayload } from '../api/orderService';

export const useMyOrders = () =>
  useQuery({ queryKey: ['my-orders'], queryFn: getMyOrders });

export const useAllOrders = () =>
  useQuery({ queryKey: ['all-orders'], queryFn: getAllOrders });

export const useCreateOrder = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (payload: OrderPayload) => createOrder(payload),
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