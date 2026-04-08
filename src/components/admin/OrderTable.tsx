import type { Order, OrderStatus } from '../../types';
import { useUpdateOrderStatus } from '../../hooks/useOrders';
import { toast } from 'sonner';

const STATUS_OPTIONS: OrderStatus[] = ['PENDING', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELLED'];

const statusColors: Record<OrderStatus, string> = {
  PENDING: 'text-yellow-400',
  PROCESSING: 'text-blue-400',
  SHIPPED: 'text-purple-400',
  DELIVERED: 'text-green-400',
  CANCELLED: 'text-red-400',
};

const OrderTable = ({ orders }: { orders: Order[] }) => {
  const updateStatus = useUpdateOrderStatus();

  const handleStatusChange = async (id: string, status: OrderStatus) => {
    try {
      await updateStatus.mutateAsync({ id, status });
      toast.success('Order status updated');
    } catch {
      toast.error('Failed to update status');
    }
  };

  return (
    <div className="overflow-x-auto rounded-xl glass">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-white/10 text-white/50">
            <th className="text-left px-4 py-3">Order ID</th>
            <th className="text-left px-4 py-3">Customer</th>
            <th className="text-left px-4 py-3">Amount</th>
            <th className="text-left px-4 py-3">Payment</th>
            <th className="text-left px-4 py-3">Status</th>
            <th className="text-left px-4 py-3">Date</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((o) => (
            <tr key={o.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
              <td className="px-4 py-3 text-white/50 font-mono text-xs">#{o.id.slice(0, 8)}</td>
              <td className="px-4 py-3 text-white/70">{o.user?.name ?? '—'}</td>
              <td className="px-4 py-3 text-purple-400">${o.totalAmount?.toFixed(2) ?? '0.00'}</td>
              <td className="px-4 py-3 text-white/60 text-xs">{o.paymentMethod}</td>
              <td className="px-4 py-3">
                <select
                  value={o.status}
                  onChange={(e) => handleStatusChange(o.id, e.target.value as OrderStatus)}
                  className={`glass rounded-lg px-2 py-1 text-xs border-0 outline-none cursor-pointer ${statusColors[o.status]}`}
                  title="Order status"
                  aria-label="Order status"
                >
                  {STATUS_OPTIONS.map((s) => (
                    <option key={s} value={s} className="bg-gray-900 text-white">{s}</option>
                  ))}
                </select>
              </td>
              <td className="px-4 py-3 text-white/40 text-xs">
                {new Date(o.createdAt).toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderTable;