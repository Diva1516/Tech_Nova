import React, { useState, useEffect } from 'react';
import useWishlist from '../../hooks/useWishlist';
import productService from '../../services/productService';
import ProductCard from '../../components/ProductCard/ProductCard';
import { Heart, ArrowLeft } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { ROUTES } from '../../config/routes';
import './WishlistPage.css';

export const WishlistPage = () => {
  const { wishlistItems } = useWishlist();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    productService.getAll().then((data) => {
      setProducts(data.filter((p) => wishlistItems.includes(p.id)));
      setLoading(false);
    });
  }, [wishlistItems]);

  if (wishlistItems.length === 0) {
    return (
      <div className="wishlist-page container empty-wishlist">
        <Heart size={64} className="empty-wishlist-icon" />
        <h2>Your Wishlist is Empty</h2>
        <p>Save products that you like to buy them later.</p>
        <Link to={ROUTES.PRODUCTS} className="shop-btn">
          <ArrowLeft size={16} />
          <span>Continue Browsing</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="wishlist-page container">
      <h2>My Wishlist ({products.length})</h2>

      {loading ? (
        <div className="loading-state">Loading wishlist...</div>
      ) : (
        <div className="wishlist-grid">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};
export default WishlistPage;
