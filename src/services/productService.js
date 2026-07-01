import products from '../data/products';
import categories from '../data/categories';
import deals from '../data/deals';

export const productService = {
  getAll: (filters = {}) => {
    return new Promise((resolve) => {
      let filtered = [...products];

      // Category filter
      if (filters.category && filters.category !== 'all') {
        filtered = filtered.filter(
          (p) => p.category.toLowerCase() === filters.category.toLowerCase()
        );
      }

      // Brand filter
      if (filters.brands && filters.brands.length > 0) {
        filtered = filtered.filter((p) => filters.brands.includes(p.brand));
      }

      // Search query
      if (filters.search) {
        const query = filters.search.toLowerCase();
        filtered = filtered.filter(
          (p) =>
            p.name.toLowerCase().includes(query) ||
            p.brand.toLowerCase().includes(query) ||
            p.category.toLowerCase().includes(query)
        );
      }

      // Sort
      if (filters.sortBy) {
        if (filters.sortBy === 'price-low') {
          filtered.sort((a, b) => a.price - b.price);
        } else if (filters.sortBy === 'price-high') {
          filtered.sort((a, b) => b.price - a.price);
        } else if (filters.sortBy === 'rating') {
          filtered.sort((a, b) => b.rating - a.rating);
        }
      }

      resolve(filtered);
    });
  },

  getById: (id) => {
    return new Promise((resolve, reject) => {
      const product = products.find((p) => p.id === parseInt(id));
      if (product) {
        resolve(product);
      } else {
        reject(new Error('Product not found'));
      }
    });
  },

  getCategories: () => {
    return new Promise((resolve) => {
      resolve(categories);
    });
  },

  getDeals: () => {
    return new Promise((resolve) => {
      // Map deals to their products
      const activeDeals = deals.map((d) => {
        const product = products.find((p) => p.id === d.productId);
        return {
          ...product,
          dealPrice: d.dealPrice,
          endsAt: d.endsAt,
          soldPercent: Math.round((d.sold / d.totalStock) * 100)
        };
      });
      resolve(activeDeals);
    });
  }
};
export default productService;
