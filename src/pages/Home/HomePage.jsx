import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import HeroCarousel from '../../components/HeroCarousel/HeroCarousel';
import CategoryBar from '../../components/CategoryBar/CategoryBar';
import ProductCard from '../../components/ProductCard/ProductCard';
import productService from '../../services/productService';
import { Flame, ArrowRight, Award, Zap, ShieldCheck } from 'lucide-react';
import { ROUTES } from '../../config/routes';
import './HomePage.css';

export const HomePage = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [products, setProducts] = useState([]);
  const [deals, setDeals] = useState([]);
  const [timeLeft, setTimeLeft] = useState(12 * 60 * 60); // 12 hours countdown in seconds
  const navigate = useNavigate();

  useEffect(() => {
    // Load products
    productService.getAll({ category: activeCategory }).then((data) => {
      // Show up to 8 products on homepage grid
      setProducts(data.slice(0, 8));
    });
  }, [activeCategory]);

  useEffect(() => {
    // Load active deals
    productService.getDeals().then((data) => {
      setDeals(data);
    });
  }, []);

  // Countdown effect
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 12 * 60 * 60));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds) => {
    const h = Math.floor(seconds / 3600).toString().padStart(2, '0');
    const m = Math.floor((seconds % 3600) / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${h}:${m}:${s}`;
  };

  const handleCategoryChange = (categorySlug) => {
    setActiveCategory(categorySlug);
    // If not "all", navigate to search page with filter
    if (categorySlug !== 'all') {
      navigate(`${ROUTES.PRODUCTS}?category=${categorySlug}`);
    }
  };

  return (
    <div className="homepage container">
      {/* Hero section */}
      <HeroCarousel />

      {/* Category Selection Bar */}
      <CategoryBar activeCategory={activeCategory} onCategoryChange={handleCategoryChange} />

      {/* Flash Deals section */}
      {deals.length > 0 && (
        <section className="deals-section">
          <div className="section-header">
            <div className="header-title-group">
              <Flame className="deal-icon" size={24} />
              <h2>Flash Deals</h2>
              <span className="countdown-timer">{formatTime(timeLeft)}</span>
            </div>
            <Link to={ROUTES.PRODUCTS} className="view-all-link">
              <span>View All</span>
              <ArrowRight size={16} />
            </Link>
          </div>
          <div className="deals-grid">
            {deals.map((deal) => (
              <div key={deal.id} className="deal-card-wrapper">
                <ProductCard product={deal} />
                <div className="deal-progress-container">
                  <div className="progress-bar">
                    <div className="progress-fill" style={{ width: `${deal.soldPercent}%` }}></div>
                  </div>
                  <span className="sold-label">{deal.soldPercent}% Sold out</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Trust Badges */}
      <section className="trust-badges-section">
        <div className="trust-badge">
          <Zap size={32} />
          <div>
            <h3>Express Delivery</h3>
            <p>Fast dispatch across India</p>
          </div>
        </div>
        <div className="trust-badge">
          <ShieldCheck size={32} />
          <div>
            <h3>Secure Payments</h3>
            <p>SSL certified encryption</p>
          </div>
        </div>
        <div className="trust-badge">
          <Award size={32} />
          <div>
            <h3>Genuine Products</h3>
            <p>100% brand warranty</p>
          </div>
        </div>
      </section>

      {/* Best Sellers Grid */}
      <section className="best-sellers-section">
        <div className="section-header">
          <h2>Featured Products</h2>
          <button onClick={() => navigate(ROUTES.PRODUCTS)} className="view-all-link">
            <span>Explore All</span>
            <ArrowRight size={16} />
          </button>
        </div>
        <div className="products-grid-layout">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
};

// Simple helper Link import wrapper
import { Link } from 'react-router-dom';

export default HomePage;
