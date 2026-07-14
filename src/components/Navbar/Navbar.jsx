import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import useCart from '../../hooks/useCart';
import useWishlist from '../../hooks/useWishlist';
import ThemeToggle from '../ThemeToggle/ThemeToggle';
import Logo from '../Logo';
import { products } from '../../data/products';
import { Search, ShoppingCart, Heart, User, LogOut, ShieldAlert, X } from 'lucide-react';
import { ROUTES } from '../../config/routes';
import './Navbar.css';

export const Navbar = ({ onSearchChange, initialSearchValue = '', onCartClick }) => {
  const { user, logout, isAuthenticated, isAdmin } = useAuth();
  const { cartCount } = useCart();
  const { wishlistCount } = useWishlist();
  const navigate = useNavigate();
  
  const [searchVal, setSearchVal] = useState(initialSearchValue);
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const searchRef = useRef(null);
  const mobileSearchRef = useRef(null);

  // Close suggestions on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target) &&
          mobileSearchRef.current && !mobileSearchRef.current.contains(e.target)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setShowSuggestions(false);
    if (onSearchChange) {
      onSearchChange(searchVal);
    } else {
      navigate(`${ROUTES.PRODUCTS}?search=${encodeURIComponent(searchVal)}`);
    }
  };

  const handleInputChange = (e) => {
    const val = e.target.value;
    setSearchVal(val);
    if (onSearchChange) {
      onSearchChange(val);
    }

    // Generate suggestions
    if (val.trim().length >= 2) {
      const query = val.toLowerCase();
      const matches = products
        .filter(p =>
          p.name.toLowerCase().includes(query) ||
          p.brand.toLowerCase().includes(query) ||
          p.category.toLowerCase().includes(query) ||
          p.tags.some(t => t.toLowerCase().includes(query))
        )
        .slice(0, 6);
      setSuggestions(matches);
      setShowSuggestions(matches.length > 0);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (product) => {
    setSearchVal('');
    setSuggestions([]);
    setShowSuggestions(false);
    setShowMobileSearch(false);
    navigate(ROUTES.PRODUCT_DETAIL.replace(':id', product.id));
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      setShowSuggestions(false);
    }
  };

  const formatPrice = (price) => {
    return '₹' + price.toLocaleString('en-IN');
  };

  const renderSuggestions = () => {
    if (!showSuggestions || suggestions.length === 0) return null;
    return (
      <div className="search-suggestions">
        {suggestions.map((product) => (
          <button
            key={product.id}
            className="suggestion-item"
            onClick={() => handleSuggestionClick(product)}
          >
            <img src={product.image} alt={product.name} className="suggestion-img" />
            <div className="suggestion-info">
              <span className="suggestion-name">{product.name}</span>
              <span className="suggestion-meta">
                <span className="suggestion-brand">{product.brand}</span>
                <span className="suggestion-price">{formatPrice(product.price)}</span>
              </span>
            </div>
          </button>
        ))}
      </div>
    );
  };

  return (
    <>
      <nav className="navbar" id="main-navbar">
        <div className="container nav-content">
          <Link to={ROUTES.HOME} className="nav-brand" id="nav-brand-logo">
            <Logo size={28} className="brand-logo-svg" />
            <span className="brand-text">TechNova</span>
          </Link>

          {/* Desktop Search */}
          <div className="nav-search-wrapper" ref={searchRef}>
            <form onSubmit={handleSearchSubmit} className="nav-search-form" id="search-form">
              <input
                type="search"
                value={searchVal}
                onChange={handleInputChange}
                onFocus={() => { if (suggestions.length > 0) setShowSuggestions(true); }}
                onKeyDown={handleKeyDown}
                placeholder="Search products, brands..."
                className="nav-search-input"
                id="search-input"
                aria-label="Search items"
                autoComplete="off"
              />
              <button type="submit" className="nav-search-btn" aria-label="Submit search">
                <Search size={18} />
              </button>
            </form>
            {renderSuggestions()}
          </div>

          <div className="nav-actions">
            {isAuthenticated && (
              <span className="user-greeting hide-mobile">
                Hello, {user.name}
              </span>
            )}

            {/* Mobile Search Toggle */}
            <button
              className="mobile-search-toggle hide-desktop"
              onClick={() => setShowMobileSearch(!showMobileSearch)}
              title="Search"
            >
              <Search size={20} />
            </button>

            {isAdmin && (
              <Link to={ROUTES.ADMIN_DASHBOARD} className="nav-icon-link" title="Admin Dashboard">
                <ShieldAlert size={20} className="nav-icon admin-icon" />
              </Link>
            )}

            <Link to={ROUTES.WISHLIST} className="nav-icon-link" title="Wishlist">
              <div className="badge-container">
                <Heart size={20} className="nav-icon" />
                {wishlistCount > 0 && <span className="badge">{wishlistCount}</span>}
              </div>
            </Link>

            <button 
              onClick={onCartClick} 
              className="nav-icon-link cart-trigger-btn" 
              title="Shopping Cart"
            >
              <div className="badge-container">
                <ShoppingCart size={20} className="nav-icon" />
                {cartCount > 0 && <span className="badge">{cartCount}</span>}
              </div>
            </button>

            <ThemeToggle />

            {isAuthenticated ? (
              <div className="nav-user-menu">
                <Link to={ROUTES.PROFILE} className="nav-icon-link" title="User Profile">
                  <User size={20} className="nav-icon" />
                </Link>
                <button onClick={logout} className="nav-logout-btn hide-mobile" title="Logout">
                  <LogOut size={18} />
                </button>
              </div>
            ) : (
              <Link to={ROUTES.LOGIN} className="login-btn">
                Sign In
              </Link>
            )}
          </div>
        </div>
      </nav>

      {/* Mobile Search Overlay */}
      {showMobileSearch && (
        <div className="mobile-search-overlay" ref={mobileSearchRef}>
          <div className="mobile-search-bar">
            <form onSubmit={(e) => { handleSearchSubmit(e); setShowMobileSearch(false); }} className="mobile-search-form">
              <Search size={18} className="mobile-search-icon" />
              <input
                type="search"
                value={searchVal}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                placeholder="Search products, brands..."
                className="mobile-search-input"
                autoFocus
                autoComplete="off"
              />
              <button type="button" onClick={() => setShowMobileSearch(false)} className="mobile-search-close">
                <X size={20} />
              </button>
            </form>
            {renderSuggestions()}
          </div>
        </div>
      )}
    </>
  );
};
export default Navbar;
