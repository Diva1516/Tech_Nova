import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import formatPrice from '../../utils/formatPrice';
import { CheckCircle2, ShoppingBag, ArrowRight } from 'lucide-react';
import { ROUTES } from '../../config/routes';
import './Checkout.css';

export const OrderSuccess = () => {
  const [orderDetails, setOrderDetails] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Read session storage details
    const stored = sessionStorage.getItem('last-order');
    if (stored) {
      setOrderDetails(JSON.parse(stored));
      // Clear it so it doesn't linger
      sessionStorage.removeItem('last-order');
    } else {
      // Bypassed directly
      navigate(ROUTES.HOME);
    }
  }, [navigate]);

  if (!orderDetails) return null;

  return (
    <div className="checkout-page container success-page-wrapper">
      <div className="success-card">
        <CheckCircle2 size={64} className="success-icon animate-bounce" />
        <h2>Purchase Successful!</h2>
        <p className="success-sub">Thank you for your order. Your purchase has been confirmed.</p>
        
        <div className="order-details-box">
          <div className="detail-row">
            <span>Order ID</span>
            <strong>{orderDetails.orderId}</strong>
          </div>
          <div className="detail-row">
            <span>Deliver to</span>
            <strong>{orderDetails.name}</strong>
          </div>
          <div className="detail-row">
            <span>Address</span>
            <span>{orderDetails.address}, {orderDetails.city} - {orderDetails.zip}</span>
          </div>
          <div className="detail-row">
            <span>Total Paid</span>
            <strong className="amount-highlight">{formatPrice(orderDetails.grandTotal)}</strong>
          </div>
        </div>

        <div className="success-items-list">
          <h4>Items Purchased</h4>
          {orderDetails.cartItems.map((item) => (
            <div key={`${item.id}-${item.selectedColor}-${item.selectedVariant}`} className="success-item-row">
              <span className="success-item-name">{item.name}</span>
              <span className="success-item-qty">Qty: {item.quantity}</span>
              <span className="success-item-price">{formatPrice(item.price * item.quantity)}</span>
            </div>
          ))}
        </div>

        <div className="success-footer-actions">
          <Link to={ROUTES.PRODUCTS} className="continue-btn">
            <span>Explore More Products</span>
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
};
export default OrderSuccess;
