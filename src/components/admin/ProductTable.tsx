import { useState } from 'react';
import { Edit, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import type { Product } from '../../types';
import { useDeleteProduct } from '../../hooks/useProducts';
import Modal from '../ui/Modal';
import Button from '../ui/Button';
import { toast } from 'sonner';

const ProductTable = ({ products }: { products: Product[] }) => {
  const navigate = useNavigate();
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const deleteMutation = useDeleteProduct();

  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      await deleteMutation.mutateAsync(deleteId);
      toast.success('Product deleted successfully');
      setDeleteId(null);
    } catch {
      toast.error('Failed to delete product');
    }
  };

  return (
    <>
      <div className="overflow-x-auto rounded-xl glass">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/10 text-white/50">
              <th className="text-left px-4 py-3">Product</th>
              <th className="text-left px-4 py-3">Price</th>
              <th className="text-left px-4 py-3">Stock</th>
              <th className="text-left px-4 py-3">Category</th>
              <th className="text-left px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={p.images?.[0] || 'https://picsum.photos/40'}
                      alt={p.title}
                      className="w-10 h-10 rounded-lg object-cover"
                      onError={(e) => { (e.target as HTMLImageElement).src = 'https://picsum.photos/40'; }}
                    />
                    <div>
                      <p className="text-white font-medium line-clamp-1">{p.title}</p>
                      <p className="text-white/40 text-xs">{p.brand}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 text-purple-400">${p.price.toFixed(2)}</td>
                <td className="px-4 py-3 text-white/70">{p.stock}</td>
                <td className="px-4 py-3 text-white/70">{p.category?.name}</td>
                <td className="px-4 py-3">
                  <div className="flex gap-2">
                    <button
                      onClick={() => navigate(`/admin/products/${p.id}/edit`)}
                      className="p-1.5 rounded-lg glass hover:text-purple-400 text-white/50 transition-colors"
                      title="Edit product"
                      aria-label="Edit product"
                    >
                      <Edit size={15} />
                    </button>
                    <button
                      onClick={() => setDeleteId(p.id)}
                      className="p-1.5 rounded-lg glass hover:text-red-400 text-white/50 transition-colors"
                      title="Delete product"
                      aria-label="Delete product"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal isOpen={!!deleteId} onClose={() => setDeleteId(null)} title="Confirm Delete">
        <p className="text-white/70 mb-6">Are you sure you want to delete this product? This action cannot be undone.</p>
        <div className="flex gap-3 justify-end">
          <Button variant="secondary" onClick={() => setDeleteId(null)}>Cancel</Button>
          <Button variant="danger" isLoading={deleteMutation.isPending} onClick={handleDelete}>Delete</Button>
        </div>
      </Modal>
    </>
  );
};

export default ProductTable;