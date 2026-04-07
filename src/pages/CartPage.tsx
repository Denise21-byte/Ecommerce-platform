import { useNavigate } from 'react-router-dom';
import { Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';
import { useCartStore } from '../store/cartStore';
import Layout from '../components/layout/Layout';
import Button from '../components/ui/Button';

const CartPage = () => {
  const { items, updateQuantity, removeItem, totalPrice } = useCartStore();
  const navigate = useNavigate();

  if (!items.length)
    return (
      <Layout>
        <div className="flex flex-col items-center justify-center py-24 gap-4">
          <ShoppingBag size={48} className="text-white/20" />
          <h2 className="font-display text-2xl text-white/50">Your cart is empty</h2>
          <Button onClick={() => navigate('/')}>Browse Products</Button>
        </div>
      </Layout>
    );

  return (
    <Layout>
      <h1 className="font-display text-3xl font-bold text-white mb-8">Shopping Cart</h1>
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 flex flex-col gap-4">
          {items.map(({ product, quantity }) => (
            <div key={product.id} className="glass rounded-xl p-4 flex gap-4 items-center">
              <img
                src={product.images?.[0] || 'https://picsum.photos/80'}
                alt={product.title}
                className="w-20 h-20 rounded-lg object-cover flex-shrink-0"
                onError={(e) => { (e.target as HTMLImageElement).src = 'https://picsum.photos/80'; }}
              />
              <div className="flex-1 min-w-0">
                <h3 className="text-white font-medium line-clamp-1">{product.title}</h3>
                <p className="text-white/50 text-sm">{product.brand}</p>
                <p className="text-purple-400 font-semibold">${product.price.toFixed(2)}</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => updateQuantity(product.id, quantity - 1)}
                  className="glass p-1.5 rounded-lg hover:text-purple-400 text-white/50 transition-colors"
                >
                  <Minus size={14} />
                </button>
                <span className="w-8 text-center text-white font-medium">{quantity}</span>
                <button
                  onClick={() => updateQuantity(product.id, quantity + 1)}
                  className="glass p-1.5 rounded-lg hover:text-purple-400 text-white/50 transition-colors"
                >
                  <Plus size={14} />
                </button>
              </div>
              <button
                onClick={() => removeItem(product.id)}
                className="text-red-400/50 hover:text-red-400 transition-colors ml-2"
              >
                <Trash2 size={18} />
              </button>
            </div>
          ))}
        </div>

        <div className="glass rounded-2xl p-6 h-fit">
          <h2 className="font-display text-xl font-semibold text-white mb-4">Order Summary</h2>
          <div className="flex flex-col gap-3 mb-6">
            {items.map(({ product, quantity }) => (
              <div key={product.id} className="flex justify-between text-sm text-white/60">
                <span className="line-clamp-1 flex-1 mr-2">{product.title} ×{quantity}</span>
                <span>${(product.price * quantity).toFixed(2)}</span>
              </div>
            ))}
            <div className="border-t border-white/10 pt-3 flex justify-between font-semibold text-white">
              <span>Total</span>
              <span className="text-purple-400">${totalPrice().toFixed(2)}</span>
            </div>
          </div>
          <Button onClick={() => navigate('/checkout')} className="w-full py-3">
            Proceed to Checkout
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default CartPage;