import { useParams, useNavigate } from 'react-router-dom';
import { ShoppingCart, ArrowLeft } from 'lucide-react';
import { useProduct } from '../hooks/useProducts';
import { useCartStore } from '../store/cartStore';
import { useAuth } from '../context/AuthContext';
import Layout from '../components/layout/Layout';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import Button from '../components/ui/Button';
import { toast } from 'sonner';

const ProductDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: product, isLoading, error } = useProduct(id!);
  const addItem = useCartStore((s) => s.addItem);
  const { isAuthenticated } = useAuth();

  const handleAddToCart = () => {
    if (!isAuthenticated) { toast.error('Please login first'); return; }
    addItem(product!);
    toast.success('Added to cart!');
  };

  if (isLoading) return <Layout><LoadingSpinner /></Layout>;
  if (error || !product) return <Layout><p className="text-red-400">Product not found.</p></Layout>;

  return (
    <Layout>
      <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-white/50 hover:text-white mb-6 transition-colors">
        <ArrowLeft size={18} /> Back
      </button>
      <div className="grid md:grid-cols-2 gap-10">
        <div className="glass rounded-2xl overflow-hidden aspect-square">
          <img
            src={product.images?.[0] || 'https://picsum.photos/600'}
            alt={product.title}
            className="w-full h-full object-cover"
            onError={(e) => { (e.target as HTMLImageElement).src = 'https://picsum.photos/600'; }}
          />
        </div>
        <div className="flex flex-col justify-center gap-6">
          <div>
            <p className="text-purple-400 text-sm mb-1">{product.category?.name} · {product.brand}</p>
            <h1 className="font-display text-3xl font-bold text-white mb-3">{product.title}</h1>
            <p className="text-white/60 leading-relaxed">{product.description}</p>
          </div>
          <div className="glass rounded-xl p-4 flex items-center justify-between">
            <div>
              <p className="text-white/50 text-sm">Price</p>
              <p className="text-purple-400 text-3xl font-bold">${product.price.toFixed(2)}</p>
            </div>
            <div className="text-right">
              <p className="text-white/50 text-sm">In Stock</p>
              <p className="text-white font-semibold">{product.stock} units</p>
            </div>
          </div>
          <Button onClick={handleAddToCart} className="w-full py-3 text-base">
            <ShoppingCart size={18} /> Add to Cart
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetailPage;