import React, { createContext, useState, useEffect, useMemo } from 'react';
import storage from '../utils/storage';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    return storage.get('technova-cart', []);
  });

  useEffect(() => {
    storage.set('technova-cart', cartItems);
  }, [cartItems]);

  const addToCart = (product, quantity = 1, selectedColor = '', selectedVariant = '') => {
    setCartItems((prevItems) => {
      const existingItemIndex = prevItems.findIndex(
        (item) =>
          item.id === product.id &&
          item.selectedColor === selectedColor &&
          item.selectedVariant === selectedVariant
      );

      if (existingItemIndex > -1) {
        const newItems = [...prevItems];
        newItems[existingItemIndex].quantity += quantity;
        return newItems;
      }

      return [
        ...prevItems,
        {
          ...product,
          quantity,
          selectedColor: selectedColor || product.colors?.[0] || '',
          selectedVariant: selectedVariant || product.variants?.[0] || ''
        }
      ];
    });
  };

  const removeFromCart = (id, selectedColor = '', selectedVariant = '') => {
    setCartItems((prevItems) =>
      prevItems.filter(
        (item) =>
          !(
            item.id === id &&
            item.selectedColor === selectedColor &&
            item.selectedVariant === selectedVariant
          )
      )
    );
  };

  const updateQuantity = (id, quantity, selectedColor = '', selectedVariant = '') => {
    if (quantity <= 0) {
      removeFromCart(id, selectedColor, selectedVariant);
      return;
    }
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id &&
        item.selectedColor === selectedColor &&
        item.selectedVariant === selectedVariant
          ? { ...item, quantity }
          : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const cartCount = useMemo(() => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  }, [cartItems]);

  const cartTotal = useMemo(() => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  }, [cartItems]);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartCount,
        cartTotal
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
export default CartProvider;
