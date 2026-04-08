import { Link } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import { useCartStore } from '../../store/cartStore';
import type { CartProduct } from '../../store/cartStore';
import { useAuth } from '../../context/AuthContext';
import { toast } from 'sonner';

const ProductCard = ({ product }: { product: CartProduct }) => {
  const addItem = useCartStore((s) => s.addItem);
  const { isAuthenticated, userRole } = useAuth();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!isAuthenticated) {
      toast.error('Please login to add items to cart');
      return;
    }
    addItem(product);
    toast.success(`${product.title} added to cart`);
  };

  return (
    <Link to={`/products/${product.id}`} className="group glass rounded-2xl overflow-hidden hover:border-purple-500/40 transition-all duration-300 block">
      <div className="aspect-square overflow-hidden bg-white/5 relative">
        <img
          src={product.images?.[0] || 'https://picsum.photos/400'}
          alt={product.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          onError={(e) => { (e.target as HTMLImageElement).src = 'https://picsum.photos/400'; }}
        />
        <div className="absolute top-3 right-3 glass rounded-lg px-2 py-0.5 text-xs text-white/70">
          {product.category?.name}
        </div>
      </div>
      <div className="p-4">
        <p className="text-white/50 text-xs mb-1">{product.brand}</p>
        <h3 className="font-display font-semibold text-white mb-2 line-clamp-1">{product.title}</h3>
        <div className="flex items-center justify-between">
          <span className="text-purple-400 font-semibold text-lg">${product.price.toFixed(2)}</span>
          {userRole !== 'ADMIN' && (
            <button
              onClick={handleAddToCart}
              className="glass hover:bg-purple-500/20 text-purple-400 p-2 rounded-lg transition-colors"
              title="Add to cart"
              aria-label="Add to cart"
            >
              <ShoppingCart size={16} />
            </button>
          )}
        </div>
        <p className="text-white/40 text-xs mt-2">Stock: {product.stock}</p>
      </div>
    </Link>
  );
};

export default ProductCard;