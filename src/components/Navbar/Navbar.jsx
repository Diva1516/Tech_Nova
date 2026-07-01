import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import useCart from '../../hooks/useCart';
import useWishlist from '../../hooks/useWishlist';
import ThemeToggle from '../ThemeToggle/ThemeToggle';
import Logo from '../Logo';
import { Search, ShoppingCart, Heart, User, LogOut, ShieldAlert } from 'lucide-react';
import { ROUTES } from '../../config/routes';
import './Navbar.css';

export const Navbar = ({ onSearchChange, initialSearchValue = '', onCartClick }) => {
  const { user, logout, isAuthenticated, isAdmin } = useAuth();
  const { cartCount } = useCart();
  const { wishlistCount } = useWishlist();
  const navigate = useNavigate();
  
  const [searchVal, setSearchVal] = useState(initialSearchValue);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
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
  };

  return (
    <nav className="navbar" id="main-navbar">
      <div className="container nav-content">
        <Link to={ROUTES.HOME} className="nav-brand" id="nav-brand-logo">
          <Logo size={28} className="brand-logo-svg" />
          <span className="brand-text">TechNova</span>
        </Link>

        <form onSubmit={handleSearchSubmit} className="nav-search-form" id="search-form">
          <input
            type="search"
            value={searchVal}
            onChange={handleInputChange}
            placeholder="Search premium electronics..."
            className="nav-search-input"
            id="search-input"
            aria-label="Search items"
          />
          <button type="submit" className="nav-search-btn" aria-label="Submit search">
            <Search size={18} />
          </button>
        </form>

        <div className="nav-actions">
          {isAuthenticated && (
            <span className="user-greeting hide-mobile">
              Hello, {user.name}
            </span>
          )}

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
  );
};
export default Navbar;
