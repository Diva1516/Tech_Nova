/**
 * TechNova E-Commerce — Axios API Instance
 * Pre-configured Axios client with base URL, JWT interceptor, and
 * standardised error handling. When a Spring Boot backend is added
 * later, only the baseURL needs to change.
 */

import axios from 'axios';
import { STORAGE_KEYS } from '../utils/constants';
import { safeGetItem } from '../utils/storage';

/**
 * Create the shared Axios instance.
 * During development we point at a placeholder base URL;
 * this will be swapped for the real API origin later.
 */
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8080/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// ── Request interceptor — attach JWT token ──────────────────────────
api.interceptors.request.use(
  (config) => {
    const authData = safeGetItem(STORAGE_KEYS.AUTH);
    if (authData?.token) {
      config.headers.Authorization = `Bearer ${authData.token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// ── Response interceptor — normalise errors ─────────────────────────
api.interceptors.response.use(
  (response) => response.data, // unwrap { data } by default
  (error) => {
    const message =
      error.response?.data?.message ||
      error.message ||
      'Something went wrong';

    console.error('[api]', message);

    // Auto-logout on 401
    if (error.response?.status === 401) {
      localStorage.removeItem(STORAGE_KEYS.AUTH);
      // Optional: redirect to login
      // window.location.href = '/login';
    }

    return Promise.reject({ message, status: error.response?.status });
  },
);

export default api;
