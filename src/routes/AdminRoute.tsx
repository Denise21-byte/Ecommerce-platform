import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import LoadingSpinner from '../components/ui/LoadingSpinner';

const AdminRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, userRole, isLoading } = useAuth();
  if (isLoading) return <LoadingSpinner />;
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (userRole !== 'ADMIN') return <Navigate to="/" replace />;
  return <>{children}</>;
};

export default AdminRoute;