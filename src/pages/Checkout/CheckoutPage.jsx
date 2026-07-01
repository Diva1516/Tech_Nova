import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useCart from '../../hooks/useCart';
import useToast from '../../hooks/useToast';
import formatPrice from '../../utils/formatPrice';
import { CreditCard, Truck, ShoppingBag, ShieldCheck } from 'lucide-react';
import { ROUTES } from '../../config/routes';
import { FLAT_DELIVERY_CHARGE, FREE_DELIVERY_THRESHOLD, TAX_RATE } from '../../utils/constants';
import './Checkout.css';

export const CheckoutPage = () => {
  const { cartItems, cartTotal, clearCart } = useCart();
  const { showToast } = useToast();
  const navigate = useNavigate();

  // Shipping form fields
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [zip, setZip] = useState('');
  
  // Payment fields
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCVV, setCardCVV] = useState('');

  const [errors, setErrors] = useState({});

  // Pricing calculations
  const deliveryCharge = cartTotal >= FREE_DELIVERY_THRESHOLD ? 0 : FLAT_DELIVERY_CHARGE;
  const gstAmount = Math.round(cartTotal * TAX_RATE);
  const grandTotal = cartTotal + deliveryCharge + gstAmount;

  const validate = () => {
    const tempErrors = {};
    if (!name.trim()) tempErrors.name = 'Full name is required';
    if (!address.trim()) tempErrors.address = 'Delivery address is required';
    if (!city.trim()) tempErrors.city = 'City is required';
    if (!zip.trim()) {
      tempErrors.zip = 'ZIP code is required';
    } else if (!/^\d{6}$/.test(zip)) {
      tempErrors.zip = 'ZIP code must be 6 digits';
    }

    if (!cardNumber.trim()) {
      tempErrors.cardNumber = 'Card number is required';
    } else if (!/^\d{16}$/.test(cardNumber.replace(/\s+/g, ''))) {
      tempErrors.cardNumber = 'Card number must be 16 digits';
    }

    if (!cardExpiry.trim()) {
      tempErrors.cardExpiry = 'Expiry date is required';
    } else if (!/^(0[1-9]|1[0-2])\/?([0-9]{2})$/.test(cardExpiry)) {
      tempErrors.cardExpiry = 'Expiry must be MM/YY format';
    }

    if (!cardCVV.trim()) {
      tempErrors.cardCVV = 'CVV is required';
    } else if (!/^\d{3}$/.test(cardCVV)) {
      tempErrors.cardCVV = 'CVV must be 3 digits';
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    if (!validate()) {
      showToast('Please correct form errors', 'error');
      return;
    }

    // Place simulated order
    showToast('Processing order...', 'info');
    setTimeout(() => {
      // Mock random order confirmation id
      const orderId = 'TN' + Math.floor(100000 + Math.random() * 900000);
      showToast('Order placed successfully!', 'success');
      
      // Store details for success page in sessionStorage
      sessionStorage.setItem('last-order', JSON.stringify({
        orderId,
        name,
        address,
        city,
        zip,
        grandTotal,
        cartItems: [...cartItems]
      }));

      clearCart();
      navigate(ROUTES.ORDER_SUCCESS);
    }, 1500);
  };

  if (cartItems.length === 0) {
    return (
      <div className="checkout-page container empty-checkout">
        <ShoppingBag size={64} />
        <h2>Your Cart is Empty</h2>
        <button onClick={() => navigate(ROUTES.PRODUCTS)} className="back-btn">Go Shop</button>
      </div>
    );
  }

  return (
    <div className="checkout-page container">
      <h2>Checkout Details</h2>

      <div className="checkout-layout">
        {/* Left Side: Address & Payment Forms */}
        <form onSubmit={handlePlaceOrder} className="checkout-form-section" id="checkout-form">
          {/* Section 1: Shipping Address */}
          <div className="checkout-section">
            <div className="section-title">
              <Truck size={18} />
              <h3>Shipping Address</h3>
            </div>
            
            <div className="form-grid">
              <div className="form-group span-2">
                <label htmlFor="chk-name">Full Name</label>
                <input
                  type="text"
                  id="chk-name"
                  placeholder="Divakaran"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={errors.name ? 'input-error' : ''}
                />
                {errors.name && <span className="error-text">{errors.name}</span>}
              </div>

              <div className="form-group span-2">
                <label htmlFor="chk-address">Street Address</label>
                <input
                  type="text"
                  id="chk-address"
                  placeholder="Street and house number"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className={errors.address ? 'input-error' : ''}
                />
                {errors.address && <span className="error-text">{errors.address}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="chk-city">City</label>
                <input
                  type="text"
                  id="chk-city"
                  placeholder="Chennai"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className={errors.city ? 'input-error' : ''}
                />
                {errors.city && <span className="error-text">{errors.city}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="chk-zip">ZIP / Postal Code</label>
                <input
                  type="text"
                  id="chk-zip"
                  placeholder="600040"
                  value={zip}
                  onChange={(e) => setZip(e.target.value)}
                  className={errors.zip ? 'input-error' : ''}
                />
                {errors.zip && <span className="error-text">{errors.zip}</span>}
              </div>
            </div>
          </div>

          {/* Section 2: Payment Details */}
          <div className="checkout-section">
            <div className="section-title">
              <CreditCard size={18} />
              <h3>Payment Options</h3>
            </div>

            <div className="form-grid">
              <div className="form-group span-2">
                <label htmlFor="chk-card">Card Number</label>
                <input
                  type="text"
                  id="chk-card"
                  placeholder="1234 5678 1234 5678"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                  className={errors.cardNumber ? 'input-error' : ''}
                />
                {errors.cardNumber && <span className="error-text">{errors.cardNumber}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="chk-expiry">Expiry Date</label>
                <input
                  type="text"
                  id="chk-expiry"
                  placeholder="MM/YY"
                  value={cardExpiry}
                  onChange={(e) => setCardExpiry(e.target.value)}
                  className={errors.cardExpiry ? 'input-error' : ''}
                />
                {errors.cardExpiry && <span className="error-text">{errors.cardExpiry}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="chk-cvv">CVV</label>
                <input
                  type="password"
                  id="chk-cvv"
                  placeholder="•••"
                  value={cardCVV}
                  onChange={(e) => setCardCVV(e.target.value)}
                  className={errors.cardCVV ? 'input-error' : ''}
                />
                {errors.cardCVV && <span className="error-text">{errors.cardCVV}</span>}
              </div>
            </div>
          </div>

          <button type="submit" className="place-order-btn" id="place-order-submit-btn">
            <span>Place Order ({formatPrice(grandTotal)})</span>
          </button>
        </form>

        {/* Right Side: Order Items Overview */}
        <div className="checkout-summary-section">
          <h3>Order Details</h3>
          <div className="summary-items-list">
            {cartItems.map((item) => (
              <div key={`${item.id}-${item.selectedColor}-${item.selectedVariant}`} className="summary-item-row">
                <img src={item.image} alt={item.name} />
                <div className="summary-item-info">
                  <h4>{item.name}</h4>
                  <span>Qty: {item.quantity} | {item.selectedColor}</span>
                </div>
                <span className="summary-item-price">{formatPrice(item.price * item.quantity)}</span>
              </div>
            ))}
          </div>

          <div className="summary-pricing">
            <div className="pricing-row">
              <span>Items Subtotal</span>
              <span>{formatPrice(cartTotal)}</span>
            </div>
            <div className="pricing-row">
              <span>GST (18%)</span>
              <span>{formatPrice(gstAmount)}</span>
            </div>
            <div className="pricing-row">
              <span>Delivery Charges</span>
              <span>{deliveryCharge === 0 ? 'FREE' : formatPrice(deliveryCharge)}</span>
            </div>
            <div className="divider"></div>
            <div className="pricing-row total">
              <span>Grand Total</span>
              <span>{formatPrice(grandTotal)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CheckoutPage;
