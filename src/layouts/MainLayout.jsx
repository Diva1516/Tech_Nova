import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';
import CartDrawer from '../components/CartDrawer/CartDrawer';
import Toast from '../components/Toast/Toast';
import ScrollToTop from '../components/ScrollToTop/ScrollToTop';

export const MainLayout = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);

  const handleCartOpen = () => setIsCartOpen(true);
  const handleCartClose = () => setIsCartOpen(false);

  return (
    <>
      <Navbar onCartClick={handleCartOpen} />
      <main style={{ flex: 1, padding: 'var(--space-md) 0 var(--space-3xl)' }}>
        <Outlet />
      </main>
      <Footer />
      <CartDrawer isOpen={isCartOpen} onClose={handleCartClose} />
      <Toast />
      <ScrollToTop />
    </>
  );
};
export default MainLayout;
