import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import productService from '../../services/productService';
import useCart from '../../hooks/useCart';
import useWishlist from '../../hooks/useWishlist';
import useToast from '../../hooks/useToast';
import StarRating from '../../components/StarRating/StarRating';
import ProductCard from '../../components/ProductCard/ProductCard';
import formatPrice from '../../utils/formatPrice';
import { Heart, ShoppingCart, Shield, RefreshCw, Truck } from 'lucide-react';
import { ROUTES } from '../../config/routes';

export const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { toggleWishlist, isWishlisted } = useWishlist();
  const { showToast } = useToast();

  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedVariant, setSelectedVariant] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('specs');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    // Find active product
    productService.getById(id)
      .then((data) => {
        setProduct(data);
        setSelectedColor(data.colors?.[0] || '');
        setSelectedVariant(data.variants?.[0] || '');
        setQuantity(1);
        setLoading(false);

        // Load related products
        productService.getAll({ category: data.category }).then((all) => {
          setRelatedProducts(all.filter((p) => p.id !== data.id).slice(0, 4));
        });
      })
      .catch(() => {
        showToast('Product not found', 'error');
        navigate(ROUTES.HOME);
      });
  }, [id, navigate, showToast]);

  if (loading || !product) {
    return <div className="container loading-state">Loading product details...</div>;
  }

  const wishlisted = isWishlisted(product.id);

  const getVariantPrice = () => {
    let currentPrice = product.price;
    if (selectedVariant) {
      const v = selectedVariant.toLowerCase();
      if (v.includes('256gb')) currentPrice += 10000;
      else if (v.includes('512gb')) currentPrice += 20000;
      else if (v.includes('1tb')) currentPrice += 40000;
      else if (v.includes('oled') || v.includes('touch')) currentPrice += 25000;
      else if (v.includes('lens') || v.includes('kit')) currentPrice += 15000;
      else if (v.includes('44mm') || v.includes('44 mm') || v.includes('46mm')) currentPrice += 4000;
    }
    return currentPrice;
  };

  const currentPrice = getVariantPrice();
  const currentOriginalPrice = product.discount > 0 
    ? Math.round(currentPrice / (1 - product.discount / 100)) 
    : currentPrice;

  const handleAddToCart = () => {
    addToCart({ ...product, price: currentPrice }, quantity, selectedColor, selectedVariant);
    showToast(`Added ${quantity} item(s) to your cart`, 'success');
  };

  const handleWishlistToggle = () => {
    toggleWishlist(product.id);
    if (wishlisted) {
      showToast('Removed from wishlist', 'info');
    } else {
      showToast('Added to wishlist!', 'success');
    }
  };

  return (
    <div className="product-detail-page container">
      {/* Breadcrumbs */}
      <nav className="breadcrumb hide-mobile">
        <Link to={ROUTES.HOME}>Home</Link>
        <span className="separator">/</span>
        <Link to={`${ROUTES.PRODUCTS}?category=${product.category}`}>
          {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
        </Link>
        <span className="separator">/</span>
        <span className="current">{product.name}</span>
      </nav>

      <div className="product-detail-grid">
        {/* Left Side: Image Gallery */}
        <div className="detail-gallery">
          <div className="detail-main-image-container">
            <img src={product.image} alt={product.name} className="detail-main-image" />
            <button
              onClick={handleWishlistToggle}
              className={`detail-wishlist-btn ${wishlisted ? 'active' : ''}`}
              aria-label="Toggle wishlist"
            >
              <Heart size={20} fill={wishlisted ? 'var(--danger)' : 'none'} />
            </button>
          </div>
        </div>

        {/* Right Side: Product Info */}
        <div className="detail-info-panel">
          <span className="brand-label">{product.brand}</span>
          <h2 className="product-title">{product.name}</h2>

          <div className="rating-summary">
            <StarRating rating={product.rating} />
            <span className="reviews-text">({product.reviewCount} Verified Reviews)</span>
          </div>

          <div className="price-box">
            <div className="price-row-detail">
              <span className="price-large">{formatPrice(currentPrice)}</span>
              {product.discount > 0 && (
                <>
                  <span className="price-original-large">{formatPrice(currentOriginalPrice)}</span>
                  <span className="discount-badge-large">{product.discount}% OFF</span>
                </>
              )}
            </div>
            <p className="tax-notice">Inclusive of all GST taxes</p>
          </div>

          {/* Color Selection */}
          {product.colors && product.colors.length > 0 && (
            <div className="option-select-group">
              <h4>Color: <span>{selectedColor}</span></h4>
              <div className="color-options-list">
                {product.colors.map((c) => (
                  <button
                    key={c}
                    onClick={() => setSelectedColor(c)}
                    className={`color-pill-btn ${selectedColor === c ? 'active' : ''}`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Variant Selection */}
          {product.variants && product.variants.length > 0 && (
            <div className="option-select-group">
              <h4>Variant: <span>{selectedVariant}</span></h4>
              <div className="variant-options-list">
                {product.variants.map((v) => (
                  <button
                    key={v}
                    onClick={() => setSelectedVariant(v)}
                    className={`variant-pill-btn ${selectedVariant === v ? 'active' : ''}`}
                  >
                    {v}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity selector & Add to Cart button */}
          <div className="action-row">
            <div className="qty-picker">
              <button 
                onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                aria-label="Decrease quantity"
              >
                -
              </button>
              <span>{quantity}</span>
              <button 
                onClick={() => setQuantity((prev) => prev + 1)}
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>

            <button onClick={handleAddToCart} className="detail-cart-btn" id="detail-add-to-cart-btn">
              <span>Add to Cart</span>
            </button>
          </div>

          {/* Trust Guarantees */}
          <div className="guarantees-grid">
            <div className="guarantee-item">
              <Truck size={18} />
              <span>Free Fast Delivery</span>
            </div>
            <div className="guarantee-item">
              <Shield size={18} />
              <span>1 Year Warranty</span>
            </div>
            <div className="guarantee-item">
              <RefreshCw size={18} />
              <span>7 Days Return Policy</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs description vs specifications */}
      <div className="product-tabs-section">
        <div className="tabs-header">
          <button
            onClick={() => setActiveTab('specs')}
            className={`tab-link ${activeTab === 'specs' ? 'active' : ''}`}
          >
            Specifications
          </button>
          <button
            onClick={() => setActiveTab('desc')}
            className={`tab-link ${activeTab === 'desc' ? 'active' : ''}`}
          >
            Description
          </button>
        </div>

        <div className="tab-content">
          {activeTab === 'specs' ? (
            <table className="specs-table">
              <tbody>
                {Object.entries(product.specs).map(([key, val]) => (
                  <tr key={key}>
                    <td className="spec-label">{key}</td>
                    <td className="spec-value">{val}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="product-desc-text">{product.description}</p>
          )}
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="related-products-section">
          <h3>Related Products</h3>
          <div className="related-grid">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};
export default ProductDetailPage;
