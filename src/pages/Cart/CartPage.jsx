import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useCart from '../../hooks/useCart';
import formatPrice from '../../utils/formatPrice';
import { Trash2, ShoppingBag, Plus, Minus, ArrowLeft, Shield } from 'lucide-react';
import { ROUTES } from '../../config/routes';
import { FLAT_DELIVERY_CHARGE, FREE_DELIVERY_THRESHOLD, TAX_RATE } from '../../utils/constants';
import './CartPage.css';

export const CartPage = () => {
  const { cartItems, updateQuantity, removeFromCart, cartTotal, clearCart } = useCart();
  const navigate = useNavigate();

  // Calculated Order Charges
  const deliveryCharge = cartTotal >= FREE_DELIVERY_THRESHOLD || cartTotal === 0 ? 0 : FLAT_DELIVERY_CHARGE;
  const gstAmount = Math.round(cartTotal * TAX_RATE);
  const finalTotal = cartTotal + deliveryCharge + gstAmount;

  const handleCheckout = () => {
    navigate(ROUTES.CHECKOUT);
  };

  if (cartItems.length === 0) {
    return (
      <div className="cart-page container empty-cart-container">
        <ShoppingBag size={64} className="empty-cart-icon-page" />
        <h2>Your Shopping Cart is Empty</h2>
        <p>Explore TechNova next-generation electronics and find best offers.</p>
        <Link to={ROUTES.PRODUCTS} className="continue-shopping-btn">
          <ArrowLeft size={16} />
          <span>Start Shopping</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="cart-page container">
      <h2>Shopping Cart ({cartItems.length} items)</h2>

      <div className="cart-layout">
        {/* Left Side: Items list */}
        <div className="cart-items-section">
          <div className="cart-items-header">
            <span>Product Details</span>
            <span>Quantity</span>
            <span>Total Price</span>
          </div>

          <div className="cart-items-list">
            {cartItems.map((item) => (
              <div key={`${item.id}-${item.selectedColor}-${item.selectedVariant}`} className="cart-item-row">
                <div className="item-info-col">
                  <img src={item.image} alt={item.name} className="item-img" />
                  <div className="item-details-col">
                    <Link to={ROUTES.PRODUCT_DETAIL.replace(':id', item.id)} className="item-name-link">
                      {item.name}
                    </Link>
                    <span className="item-specs">
                      Color: {item.selectedColor} | Variant: {item.selectedVariant}
                    </span>
                    <button 
                      onClick={() => removeFromCart(item.id, item.selectedColor, item.selectedVariant)}
                      className="item-remove-btn"
                    >
                      <Trash2 size={14} />
                      <span>Remove</span>
                    </button>
                  </div>
                </div>

                <div className="item-qty-col">
                  <div className="qty-controller">
                    <button onClick={() => updateQuantity(item.id, item.quantity - 1, item.selectedColor, item.selectedVariant)}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, item.quantity + 1, item.selectedColor, item.selectedVariant)}>+</button>
                  </div>
                </div>

                <div className="item-total-col">
                  <span className="item-total-price">{formatPrice(item.price * item.quantity)}</span>
                  <span className="item-unit-price">({formatPrice(item.price)} each)</span>
                </div>
              </div>
            ))}
          </div>

          <div className="cart-actions-row">
            <button onClick={() => navigate(ROUTES.PRODUCTS)} className="keep-shopping-btn">
              <ArrowLeft size={16} />
              <span>Continue Shopping</span>
            </button>
            <button onClick={clearCart} className="clear-all-cart-btn">
              Clear Cart
            </button>
          </div>
        </div>

        {/* Right Side: Order Summary */}
        <div className="order-summary-sidebar">
          <h3>Order Summary</h3>
          
          <div className="summary-details">
            <div className="summary-row">
              <span>Items Total</span>
              <span>{formatPrice(cartTotal)}</span>
            </div>
            
            <div className="summary-row">
              <span>GST (18%)</span>
              <span>{formatPrice(gstAmount)}</span>
            </div>

            <div className="summary-row">
              <span>Delivery Charges</span>
              <span className={deliveryCharge === 0 ? 'free-label' : ''}>
                {deliveryCharge === 0 ? 'FREE' : formatPrice(deliveryCharge)}
              </span>
            </div>

            {deliveryCharge > 0 && (
              <p className="free-shipping-tip">
                Add <b>{formatPrice(FREE_DELIVERY_THRESHOLD - cartTotal)}</b> more to unlock FREE delivery!
              </p>
            )}

            <div className="summary-divider"></div>

            <div className="summary-row total-row">
              <span>Grand Total</span>
              <span>{formatPrice(finalTotal)}</span>
            </div>
          </div>

          <button onClick={handleCheckout} className="checkout-now-btn" id="cart-page-checkout-btn">
            Proceed to Checkout
          </button>

          <div className="security-notice">
            <Shield size={16} />
            <span>Secure checkout. Brand genuine warranty guaranteed.</span>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CartPage;
