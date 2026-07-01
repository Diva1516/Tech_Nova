/**
 * TechNova E-Commerce — Order Service
 * localStorage-backed order management wrapped in Promises.
 */

import { STORAGE_KEYS } from '../utils/constants';
import { safeGetItem, safeSetItem } from '../utils/storage';

/** Internal helper — read orders array */
const readOrders = () => safeGetItem(STORAGE_KEYS.ORDERS) || [];

/** Internal helper — write orders array */
const writeOrders = (orders) => safeSetItem(STORAGE_KEYS.ORDERS, orders);

/**
 * Place a new order.
 *
 * @param {Object} orderData
 * @param {Array}  orderData.items — Cart items
 * @param {Object} orderData.shippingAddress
 * @param {string} orderData.paymentMethod
 * @param {number} orderData.total
 * @returns {Promise<Object>} The newly created order
 */
export const placeOrder = async (orderData) => {
  await new Promise((r) => setTimeout(r, 600));

  if (!orderData?.items?.length) {
    throw new Error('Cannot place an empty order.');
  }

  const order = {
    id: `ORD-${Date.now()}`,
    ...orderData,
    status: 'confirmed',
    createdAt: new Date().toISOString(),
    estimatedDelivery: new Date(
      Date.now() + 5 * 24 * 60 * 60 * 1000, // +5 days
    ).toISOString(),
  };

  const orders = readOrders();
  orders.unshift(order); // newest first
  writeOrders(orders);

  // Clear the cart after successful order
  safeSetItem(STORAGE_KEYS.CART, []);

  return order;
};

/**
 * Get all orders for the current user.
 *
 * @returns {Promise<Array>}
 */
export const getOrders = async () => {
  await new Promise((r) => setTimeout(r, 300));
  return readOrders();
};

/**
 * Get a single order by its ID.
 *
 * @param {string} orderId
 * @returns {Promise<Object|null>}
 */
export const getOrderById = async (orderId) => {
  await new Promise((r) => setTimeout(r, 200));
  const orders = readOrders();
  return orders.find((o) => o.id === orderId) ?? null;
};

/**
 * Cancel an order (set status to 'cancelled').
 *
 * @param {string} orderId
 * @returns {Promise<Object>} Updated order
 */
export const cancelOrder = async (orderId) => {
  const orders = readOrders();
  const order = orders.find((o) => o.id === orderId);
  if (!order) throw new Error('Order not found.');
  if (order.status === 'delivered') throw new Error('Delivered orders cannot be cancelled.');

  order.status = 'cancelled';
  order.cancelledAt = new Date().toISOString();
  writeOrders(orders);
  return order;
};
