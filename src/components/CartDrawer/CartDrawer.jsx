import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import useCart from '../../hooks/useCart';
import { X, Trash2, ShoppingBag, Plus, Minus } from 'lucide-react';
import formatPrice from '../../utils/formatPrice';
import { ROUTES } from '../../config/routes';
import './CartDrawer.css';

export const CartDrawer = ({ isOpen, onClose }) => {
  const { cartItems, updateQuantity, removeFromCart, cartTotal } = useCart();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="cart-drawer-overlay" onClick={onClose}>
      <div className="cart-drawer" onClick={(e) => e.stopPropagation()}>
        <div className="cart-drawer-header">
          <h3>Shopping Cart ({cartItems.length})</h3>
          <button onClick={onClose} className="close-btn" aria-label="Close drawer">
            <X size={20} />
          </button>
        </div>

        <div className="cart-drawer-items">
          {cartItems.length === 0 ? (
            <div className="empty-cart-state">
              <ShoppingBag size={48} className="empty-cart-icon" />
              <p>Your cart is empty</p>
              <button onClick={onClose} className="shop-now-btn">Continue Shopping</button>
            </div>
          ) : (
            cartItems.map((item) => (
              <div key={`${item.id}-${item.selectedColor}-${item.selectedVariant}`} className="cart-drawer-item">
                <img src={item.image} alt={item.name} className="item-thumbnail" />
                <div className="item-details">
                  <h4 className="item-name text-truncate">{item.name}</h4>
                  <span className="item-meta">
                    {item.selectedColor} / {item.selectedVariant}
                  </span>
                  <div className="item-controls">
                    <div className="quantity-stepper">
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity - 1, item.selectedColor, item.selectedVariant)}
                        aria-label="Decrease quantity"
                      >
                        <Minus size={12} />
                      </button>
                      <span>{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity + 1, item.selectedColor, item.selectedVariant)}
                        aria-label="Increase quantity"
                      >
                        <Plus size={12} />
                      </button>
                    </div>
                    <span className="item-price">{formatPrice(item.price * item.quantity)}</span>
                  </div>
                </div>
                <button 
                  onClick={() => removeFromCart(item.id, item.selectedColor, item.selectedVariant)}
                  className="remove-item-btn"
                  title="Remove item"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))
          )}
        </div>

        {cartItems.length > 0 && (
          <div className="cart-drawer-footer">
            <div className="cart-summary-row">
              <span>Subtotal</span>
              <span className="total-amount">{formatPrice(cartTotal)}</span>
            </div>
            <p className="shipping-notice">Shipping and taxes calculated at checkout.</p>
            <Link to={ROUTES.CART} onClick={onClose} className="view-cart-btn">
              View Cart Page
            </Link>
            <Link to={ROUTES.CHECKOUT} onClick={onClose} className="checkout-btn">
              Checkout Now
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};
export default CartDrawer;
