import React from 'react';
import { Link } from 'react-router-dom';
import useCart from '../../hooks/useCart';
import useWishlist from '../../hooks/useWishlist';
import useToast from '../../hooks/useToast';
import StarRating from '../StarRating/StarRating';
import { Heart, ShoppingCart } from 'lucide-react';
import formatPrice from '../../utils/formatPrice';
import { ROUTES } from '../../config/routes';
import './ProductCard.css';

export const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const { toggleWishlist, isWishlisted } = useWishlist();
  const { showToast } = useToast();

  const wishlisted = isWishlisted(product.id);

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
    showToast(`Added ${product.name} to cart!`, 'success');
  };

  const handleWishlistToggle = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product.id);
    if (wishlisted) {
      showToast('Removed from wishlist', 'info');
    } else {
      showToast('Added to wishlist!', 'success');
    }
  };

  return (
    <div className="product-card">
      <Link to={ROUTES.PRODUCT_DETAIL.replace(':id', product.id)} className="product-card-link">
        <div className="image-container">
          <img src={product.image} alt={product.name} className="product-image" loading="lazy" />
          <button
            onClick={handleWishlistToggle}
            className={`wishlist-btn ${wishlisted ? 'active' : ''}`}
            aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
          >
            <Heart size={16} fill={wishlisted ? 'var(--danger)' : 'none'} />
          </button>
          {product.discount > 0 && (
            <span className="discount-badge">{product.discount}% OFF</span>
          )}
        </div>

        <div className="card-content">
          <span className="product-brand">{product.brand}</span>
          <h3 className="product-name text-truncate-2">{product.name}</h3>

          <div className="rating-row">
            <StarRating rating={product.rating} />
            <span className="review-count">({product.reviewCount})</span>
          </div>

          <div className="price-row">
            <span className="price">{formatPrice(product.price)}</span>
            {product.discount > 0 && (
              <>
                <span className="price-original">{formatPrice(product.originalPrice)}</span>
              </>
            )}
          </div>
        </div>
      </Link>

      <div className="card-actions">
        <button onClick={handleAddToCart} className="add-to-cart-btn" id={`add-to-cart-${product.id}`}>
          <span>Add to Cart</span>
        </button>
      </div>
    </div>
  );
};

export default React.memo(ProductCard);
