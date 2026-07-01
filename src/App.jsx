import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Context Providers
import ThemeProvider from './context/ThemeContext';
import ToastProvider from './context/ToastContext';
import AuthProvider from './context/AuthContext';
import CartProvider from './context/CartContext';
import WishlistProvider from './context/WishlistContext';

// Layouts
import MainLayout from './layouts/MainLayout';

// Pages
import HomePage from './pages/Home/HomePage';
import LoginPage from './pages/Auth/LoginPage';
import RegisterPage from './pages/Auth/RegisterPage';
import ProductListPage from './pages/Products/ProductListPage';
import ProductDetailPage from './pages/Products/ProductDetailPage';
import CartPage from './pages/Cart/CartPage';
import WishlistPage from './pages/Wishlist/WishlistPage';
import CheckoutPage from './pages/Checkout/CheckoutPage';
import OrderSuccess from './pages/Checkout/OrderSuccess';
import ProfilePage from './pages/Profile/ProfilePage';
import Dashboard from './pages/Admin/Dashboard';
import NotFoundPage from './pages/NotFound/NotFoundPage';

// Components
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';

// Config
import { ROUTES } from './config/routes';

export const App = () => {
  return (
    <ThemeProvider>
      <ToastProvider>
        <AuthProvider>
          <CartProvider>
            <WishlistProvider>
              <BrowserRouter>
                <Routes>
                  {/* Auth routes */}
                  <Route path={ROUTES.LOGIN} element={<LoginPage />} />
                  <Route path={ROUTES.REGISTER} element={<RegisterPage />} />

                  {/* Main site layout routes */}
                  <Route path="/" element={<MainLayout />}>
                    <Route index element={<HomePage />} />
                    <Route path={ROUTES.PRODUCTS} element={<ProductListPage />} />
                    <Route path={ROUTES.PRODUCT_DETAIL} element={<ProductDetailPage />} />
                    
                    {/* Public Wishlist and Cart pages so guests can view them directly */}
                    <Route path={ROUTES.WISHLIST} element={<WishlistPage />} />
                    <Route path={ROUTES.CART} element={<CartPage />} />
                    
                    {/* Protected Checkout & Profile */}
                    <Route 
                      path={ROUTES.PROFILE} 
                      element={
                        <ProtectedRoute>
                          <ProfilePage />
                        </ProtectedRoute>
                      } 
                    />
                    <Route 
                      path={ROUTES.CHECKOUT} 
                      element={
                        <ProtectedRoute>
                          <CheckoutPage />
                        </ProtectedRoute>
                      } 
                    />
                    <Route 
                      path={ROUTES.ORDER_SUCCESS} 
                      element={
                        <ProtectedRoute>
                          <OrderSuccess />
                        </ProtectedRoute>
                      } 
                    />

                    {/* Admin portal */}
                    <Route 
                      path={ROUTES.ADMIN_DASHBOARD} 
                      element={
                        <ProtectedRoute adminOnly={true}>
                          <Dashboard />
                        </ProtectedRoute>
                      } 
                    />

                    {/* 404 handler */}
                    <Route path={ROUTES.NOT_FOUND} element={<NotFoundPage />} />
                  </Route>
                </Routes>
              </BrowserRouter>
            </WishlistProvider>
          </CartProvider>
        </AuthProvider>
      </ToastProvider>
    </ThemeProvider>
  );
};

export default App;