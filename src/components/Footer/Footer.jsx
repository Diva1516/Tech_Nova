import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../Logo';
import { Mail, Phone, MapPin } from 'lucide-react';
import { ROUTES } from '../../config/routes';
import './Footer.css';

export const Footer = () => {
  return (
    <footer className="footer" id="main-footer">
      <div className="container footer-content">
        <div className="footer-brand-section">
          <Link to={ROUTES.HOME} className="footer-logo">
            <Logo size={28} />
            <span>TechNova</span>
          </Link>
          <p className="footer-desc">
            Your destination for premium next-gen electronics. We provide top tier gadgets with secure delivery across India.
          </p>
        </div>

        <div className="footer-links-grid">
          <div className="footer-links-col">
            <h4>Quick Links</h4>
            <ul>
              <li><Link to={ROUTES.PRODUCTS}>All Products</Link></li>
              <li><Link to={ROUTES.WISHLIST}>Wishlist</Link></li>
              <li><Link to={ROUTES.CART}>Cart</Link></li>
              <li><Link to={ROUTES.PROFILE}>My Profile</Link></li>
            </ul>
          </div>

          <div className="footer-links-col">
            <h4>Categories</h4>
            <ul>
              <li><Link to={`${ROUTES.PRODUCTS}?category=mobiles`}>Mobiles</Link></li>
              <li><Link to={`${ROUTES.PRODUCTS}?category=laptops`}>Laptops</Link></li>
              <li><Link to={`${ROUTES.PRODUCTS}?category=headphones`}>Audio Gear</Link></li>
              <li><Link to={`${ROUTES.PRODUCTS}?category=gaming`}>Gaming</Link></li>
            </ul>
          </div>

          <div className="footer-links-col">
            <h4>Contact Us</h4>
            <ul className="footer-contact-list">
              <li>
                <Mail size={16} />
                <span>divakaran45162004@gmail.com</span>
              </li>
              <li>
                <Phone size={16} />
                <span>+91 93602 00676</span>
              </li>
              <li>
                <MapPin size={16} />
                <span>Bengaluru, Karnataka, India</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container footer-bottom-content">
          <span className="copyright">© 2026 TechNova. All rights reserved.</span>
          <span className="developer-tag">Developed by Divakaran</span>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
