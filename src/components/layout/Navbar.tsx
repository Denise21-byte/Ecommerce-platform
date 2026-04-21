import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, User, LayoutDashboard, LogOut, Menu, X, Zap } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useCartStore } from '../../store/cartStore';

const Navbar = () => {
  const { isAuthenticated, userRole, logout } = useAuth();
  const items = useCartStore((s) => s.items);
  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
    setMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 glass border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2 text-xl font-bold gradient-text">
            <Zap size={22} className="text-purple-400" />
            LuxeStore
          </Link>

          <div className="hidden md:flex items-center gap-6">
            <Link to="/" className="text-sm transition-colors" style={{ color: 'rgba(255,255,255,0.7)' }}>Store</Link>
            {!isAuthenticated && (
              <Link to="/login" className="text-sm transition-colors" style={{ color: 'rgba(255,255,255,0.7)' }}>Login</Link>
            )}
            {isAuthenticated && userRole === 'ADMIN' && (
              <Link to="/admin" className="flex items-center gap-1.5 text-sm text-purple-400 hover:text-purple-300 transition-colors">
                <LayoutDashboard size={16} />
                Admin Dashboard
              </Link>
            )}
            {isAuthenticated && userRole === 'USER' && (
              <>
                <Link to="/cart" className="relative flex items-center gap-1.5 text-sm transition-colors" style={{ color: 'rgba(255,255,255,0.7)' }}>
                  <ShoppingCart size={18} />
                  My Cart
                  {totalItems > 0 && (
                    <span className="absolute -top-2 -right-3 bg-purple-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                      {totalItems}
                    </span>
                  )}
                </Link>
                <Link to="/profile" className="flex items-center gap-1.5 text-sm transition-colors" style={{ color: 'rgba(255,255,255,0.7)' }}>
                  <User size={16} />
                  Profile
                </Link>
              </>
            )}
            {isAuthenticated && (
              <button onClick={handleLogout} className="flex items-center gap-1.5 text-sm text-red-400 hover:text-red-300 transition-colors">
                <LogOut size={16} />
                Logout
              </button>
            )}
          </div>

          <button className="md:hidden" style={{ color: 'rgba(255,255,255,0.7)' }} onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden glass border-t border-white/10 px-4 py-4 flex flex-col gap-4">
          <Link to="/" onClick={() => setMenuOpen(false)} className="text-sm" style={{ color: 'rgba(255,255,255,0.7)' }}>Store</Link>
          {!isAuthenticated && (
            <Link to="/login" onClick={() => setMenuOpen(false)} className="text-sm" style={{ color: 'rgba(255,255,255,0.7)' }}>Login</Link>
          )}
          {isAuthenticated && userRole === 'ADMIN' && (
            <Link to="/admin" onClick={() => setMenuOpen(false)} className="text-purple-400 text-sm flex items-center gap-1.5">
              <LayoutDashboard size={16} /> Admin Dashboard
            </Link>
          )}
          {isAuthenticated && userRole === 'USER' && (
            <>
              <Link to="/cart" onClick={() => setMenuOpen(false)} className="text-sm flex items-center gap-1.5" style={{ color: 'rgba(255,255,255,0.7)' }}>
                <ShoppingCart size={16} /> My Cart {totalItems > 0 && `(${totalItems})`}
              </Link>
              <Link to="/profile" onClick={() => setMenuOpen(false)} className="text-sm flex items-center gap-1.5" style={{ color: 'rgba(255,255,255,0.7)' }}>
                <User size={16} /> Profile
              </Link>
            </>
          )}
          {isAuthenticated && (
            <button onClick={handleLogout} className="text-red-400 text-sm flex items-center gap-1.5 text-left">
              <LogOut size={16} /> Logout
            </button>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;