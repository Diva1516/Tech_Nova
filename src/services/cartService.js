/**
 * TechNova E-Commerce — Cart Service
 * localStorage-backed cart operations wrapped in Promises.
 */

import { STORAGE_KEYS } from '../utils/constants';
import { safeGetItem, safeSetItem } from '../utils/storage';

/**
 * Retrieve the full cart array from localStorage.
 * @returns {Promise<Array>}
 */
export const getCart = async () => {
  return safeGetItem(STORAGE_KEYS.CART) || [];
};

/**
 * Persist the cart array to localStorage.
 * @param {Array} cart
 */
const saveCart = (cart) => safeSetItem(STORAGE_KEYS.CART, cart);

/**
 * Add an item to the cart (or increment its quantity if it already exists).
 *
 * @param {Object} product  — Full product object
 * @param {number} [qty=1]  — Quantity to add
 * @param {string} [color]  — Selected colour variant
 * @param {string} [variant] — Selected size / storage variant
 * @returns {Promise<Array>} Updated cart
 */
export const addItem = async (product, qty = 1, color, variant) => {
  const cart = await getCart();

  const existingIndex = cart.findIndex(
    (item) =>
      item.id === product.id &&
      item.selectedColor === color &&
      item.selectedVariant === variant,
  );

  if (existingIndex > -1) {
    cart[existingIndex].quantity += qty;
  } else {
    cart.push({
      ...product,
      quantity: qty,
      selectedColor: color || null,
      selectedVariant: variant || null,
    });
  }

  saveCart(cart);
  return cart;
};

/**
 * Update the quantity of an existing cart item.
 *
 * @param {number|string} productId
 * @param {number} qty — New absolute quantity (removed if ≤ 0)
 * @returns {Promise<Array>} Updated cart
 */
export const updateItem = async (productId, qty) => {
  let cart = await getCart();

  if (qty <= 0) {
    cart = cart.filter((item) => item.id !== Number(productId));
  } else {
    const item = cart.find((i) => i.id === Number(productId));
    if (item) item.quantity = qty;
  }

  saveCart(cart);
  return cart;
};

/**
 * Remove an item entirely from the cart.
 *
 * @param {number|string} productId
 * @returns {Promise<Array>} Updated cart
 */
export const removeItem = async (productId) => {
  const cart = (await getCart()).filter((item) => item.id !== Number(productId));
  saveCart(cart);
  return cart;
};

/**
 * Clear the entire cart.
 * @returns {Promise<Array>} Empty array
 */
export const clearCart = async () => {
  saveCart([]);
  return [];
};
