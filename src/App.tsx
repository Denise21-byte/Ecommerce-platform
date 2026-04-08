import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'sonner';
import { AuthProvider } from './context/AuthContext';
import UserRoute from './routes/UserRoute';
import AdminRoute from './routes/AdminRoute';

import StorefrontPage from './pages/StorefrontPage';
import ProductDetailPage from './pages/ProductDetailPage';
import LoginPage from './pages/LoginPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import ProfilePage from './pages/ProfilePage';
import AdminDashboardPage from './pages/admin/AdminDashboardPage';
import ProductFormPage from './pages/admin/ProductFormPage';

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: 1, staleTime: 1000 * 60 * 5 } },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <BrowserRouter>
        <Toaster richColors position="top-right" />
        <Routes>
          {/* Public */}
          <Route path="/" element={<StorefrontPage />} />
          <Route path="/products/:id" element={<ProductDetailPage />} />
          <Route path="/login" element={<LoginPage />} />

          {/* User Protected */}
          <Route path="/cart" element={<UserRoute><CartPage /></UserRoute>} />
          <Route path="/checkout" element={<UserRoute><CheckoutPage /></UserRoute>} />
          <Route path="/profile" element={<UserRoute><ProfilePage /></UserRoute>} />

          {/* Admin Protected */}
          <Route path="/admin" element={<AdminRoute><AdminDashboardPage /></AdminRoute>} />
          <Route path="/admin/products/new" element={<AdminRoute><ProductFormPage /></AdminRoute>} />
          <Route path="/admin/products/:id/edit" element={<AdminRoute><ProductFormPage /></AdminRoute>} />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;