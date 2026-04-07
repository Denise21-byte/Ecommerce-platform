import { useState } from 'react';
import { Search } from 'lucide-react';
import { useProducts } from '../hooks/useProducts';
import { useCategories } from '../hooks/useCategories';
import ProductGrid from '../components/product/ProductGrid';
import Layout from '../components/layout/Layout';
import ErrorMessage from '../components/ui/ErrorMessage';

const StorefrontPage = () => {
  const { data: products = [], isLoading, error } = useProducts();
  const { data: categories = [] } = useCategories();
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const filtered = products.filter((p) => {
    const matchesSearch = p.title.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = !selectedCategory || p.category?.id === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <Layout>
      <div className="mb-8">
        <h1 className="font-display text-4xl font-bold text-white mb-2">
          Discover <span className="gradient-text">Premium</span> Products
        </h1>
        <p className="text-white/50">Curated collection for the discerning shopper</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 glass rounded-lg text-white placeholder-white/30 outline-none focus:ring-2 focus:ring-purple-500/60"
          />
        </div>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="glass rounded-lg px-4 py-2.5 text-white/70 outline-none focus:ring-2 focus:ring-purple-500/60 sm:w-48"
        >
          <option value="" className="bg-gray-900">All Categories</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id} className="bg-gray-900">{c.name}</option>
          ))}
        </select>
      </div>

      {error && <ErrorMessage message="Failed to load products. Please try again." />}
      <ProductGrid products={filtered} isLoading={isLoading} />
    </Layout>
  );
};

export default StorefrontPage;