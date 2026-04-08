import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Package, ShoppingBag, Tag } from 'lucide-react';
import { useProducts } from '../../hooks/useProducts';
import { useAllOrders } from '../../hooks/useOrders';
import { useCategories } from '../../hooks/useCategories';
import ProductTable from '../../components/admin/ProductTable';
import OrderTable from '../../components/admin/OrderTable';
import Layout from '../../components/layout/Layout';
import Button from '../../components/ui/Button';
import LoadingSpinner from '../../components/ui/LoadingSpinner';

type Tab = 'products' | 'orders' | 'categories';

const AdminDashboardPage = () => {
  const [tab, setTab] = useState<Tab>('products');
  const navigate = useNavigate();
  const { data: products = [], isLoading: loadingProducts } = useProducts();
  const { data: orders = [], isLoading: loadingOrders } = useAllOrders();
  const { data: categories = [] } = useCategories();

  const tabs: { key: Tab; label: string; icon: React.ReactNode }[] = [
    { key: 'products', label: 'Products', icon: <Package size={16} /> },
    { key: 'orders', label: 'Orders', icon: <ShoppingBag size={16} /> },
    { key: 'categories', label: 'Categories', icon: <Tag size={16} /> },
  ];

  return (
    <Layout>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-3xl font-bold text-white">Admin Dashboard</h1>
          <p className="text-white/50 text-sm mt-1">{products.length} products · {orders.length} orders</p>
        </div>
        {tab === 'products' && (
          <Button onClick={() => navigate('/admin/products/new')}>
            <Plus size={18} /> Add Product
          </Button>
        )}
        {tab === 'categories' && (
          <Button onClick={() => navigate('/admin/categories/new')}>
            <Plus size={18} /> Add Category
          </Button>
        )}
      </div>

      <div className="flex gap-2 mb-6">
        {tabs.map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              tab === t.key ? 'bg-purple-600 text-white' : 'glass text-white/50 hover:text-white'
            }`}
          >
            {t.icon} {t.label}
          </button>
        ))}
      </div>

      {tab === 'products' && (loadingProducts ? <LoadingSpinner /> : <ProductTable products={products} />)}
      {tab === 'orders' && (loadingOrders ? <LoadingSpinner /> : <OrderTable orders={orders} />)}
      {tab === 'categories' && (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
          {categories.map((c) => (
            <div key={c.id} className="glass rounded-xl p-4 flex items-center gap-3">
              {c.image && <img src={c.image} alt={c.name} className="w-10 h-10 rounded-lg object-cover" />}
              <span className="text-white font-medium">{c.name}</span>
            </div>
          ))}
        </div>
      )}
    </Layout>
  );
};

export default AdminDashboardPage;