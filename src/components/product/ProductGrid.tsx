import { Product } from '../../types';
import ProductCard from './ProductCard';
import LoadingSpinner from '../ui/LoadingSpinner';

interface Props {
  products: Product[];
  isLoading?: boolean;
}

const ProductGrid = ({ products, isLoading }: Props) => {
  if (isLoading) return <LoadingSpinner />;
  if (!products.length) return <p className="text-white/50 text-center py-12">No products found.</p>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map((p) => <ProductCard key={p.id} product={p} />)}
    </div>
  );
};

export default ProductGrid;