import { useAuth } from '../context/AuthContext';
import { useMyOrders } from '../hooks/useOrders';
import Layout from '../components/layout/Layout';
import LoadingSpinner from '../components/ui/LoadingSpinner';

const statusColors: Record<string, string> = {
  PENDING: 'text-yellow-400 bg-yellow-400/10',
  PROCESSING: 'text-blue-400 bg-blue-400/10',
  SHIPPED: 'text-purple-400 bg-purple-400/10',
  DELIVERED: 'text-green-400 bg-green-400/10',
  CANCELLED: 'text-red-400 bg-red-400/10',
};

const ProfilePage = () => {
  const { user } = useAuth();
  const { data: orders = [], isLoading } = useMyOrders();

  return (
    <Layout>
      <div className="glass rounded-2xl p-6 mb-8 flex items-center gap-4">
        <div className="w-14 h-14 rounded-full bg-purple-500/20 border border-purple-500/40 flex items-center justify-center text-2xl font-display font-bold text-purple-400">
          {user?.name?.[0]?.toUpperCase()}
        </div>
        <div>
          <h1 className="font-display text-2xl font-bold text-white">{user?.name}</h1>
          <p className="text-white/50">{user?.email}</p>
        </div>
      </div>

      <h2 className="font-display text-xl font-semibold text-white mb-4">My Orders</h2>
      {isLoading ? (
        <LoadingSpinner />
      ) : orders.length === 0 ? (
        <p className="text-white/40 text-center py-10">No orders yet.</p>
      ) : (
        <div className="flex flex-col gap-4">
          {orders.map((o) => (
            <div key={o.id} className="glass rounded-xl p-4 flex items-center justify-between">
              <div>
                <p className="text-white font-medium font-mono text-sm">#{o.id.slice(0, 8)}</p>
                <p className="text-white/40 text-xs">{new Date(o.createdAt).toLocaleDateString()}</p>
              </div>
              <span className={`text-xs px-3 py-1 rounded-full font-medium ${statusColors[o.status] || 'text-white/50'}`}>
                {o.status}
              </span>
              <p className="text-purple-400 font-semibold">${o.totalAmount?.toFixed(2)}</p>
            </div>
          ))}
        </div>
      )}
    </Layout>
  );
};

export default ProfilePage;