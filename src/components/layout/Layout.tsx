import { ReactNode } from 'react';
import Navbar from './Navbar';

const Layout = ({ children }: { children: ReactNode }) => (
  <div className="min-h-screen bg-dark-900">
    <Navbar />
    <main className="pt-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {children}
    </main>
  </div>
);

export default Layout;