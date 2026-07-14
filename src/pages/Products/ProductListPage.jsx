import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import productService from '../../services/productService';
import { products as allProductsData } from '../../data/products';
import ProductCard from '../../components/ProductCard/ProductCard';
import { SlidersHorizontal, ArrowUpDown, X } from 'lucide-react';
import './Products.css';

export const ProductListPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filters state
  const [category, setCategory] = useState(searchParams.get('category') || 'all');
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [sortBy, setSortBy] = useState('rating');
  const [showFiltersMobile, setShowFiltersMobile] = useState(false);

  // Available brands — dynamically derived from all products
  const availableBrands = useMemo(() => 
    [...new Set(allProductsData.map(p => p.brand))].sort(), 
    []
  );

  // Sync state with url params
  useEffect(() => {
    setCategory(searchParams.get('category') || 'all');
    setSearchQuery(searchParams.get('search') || '');
    const brandsParam = searchParams.get('brands');
    setSelectedBrands(brandsParam ? brandsParam.split(',') : []);
  }, [searchParams]);

  // Load products based on query/filters
  useEffect(() => {
    setLoading(true);
    productService
      .getAll({
        category,
        search: searchQuery,
        brands: selectedBrands,
        sortBy
      })
      .then((data) => {
        setProducts(data);
        setLoading(false);
      });
  }, [category, searchQuery, selectedBrands, sortBy]);

  const handleBrandChange = (brand) => {
    const nextBrands = selectedBrands.includes(brand)
      ? selectedBrands.filter((b) => b !== brand)
      : [...selectedBrands, brand];
    
    const params = {};
    if (category !== 'all') params.category = category;
    if (searchQuery) params.search = searchQuery;
    if (nextBrands.length > 0) params.brands = nextBrands.join(',');
    setSearchParams(params);
  };

  const handleClearFilters = () => {
    setSearchParams({});
    setSortBy('rating');
  };

  return (
    <div className="product-list-page container">
      {/* Page Header */}
      <div className="list-header">
        <div>
          <h2>Explore Tech Gadgets</h2>
          <p className="results-count">{products.length} Products Found</p>
        </div>
        <div className="list-sorting">
          <label htmlFor="sort-select" className="hide-mobile">Sort By:</label>
          <div className="select-wrapper">
            <ArrowUpDown size={14} className="sort-icon" />
            <select
              id="sort-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="rating">Customer Rating</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>
          <button 
            onClick={() => setShowFiltersMobile(true)} 
            className="mobile-filter-trigger hide-desktop"
          >
            <SlidersHorizontal size={16} />
            <span>Filters</span>
          </button>
        </div>
      </div>

      <div className="list-layout">
        {/* Sidebar Filters */}
        <aside className={`list-sidebar ${showFiltersMobile ? 'active' : ''}`}>
          <div className="sidebar-header hide-desktop">
            <h3>Filters</h3>
            <button onClick={() => setShowFiltersMobile(false)} className="close-filters-btn">
              <X size={20} />
            </button>
          </div>

          <div className="filter-group">
            <h3>Categories</h3>
            <div className="category-links">
              {['all', 'mobiles', 'laptops', 'cameras', 'watches', 'headphones', 'gaming', 'tvs', 'accessories'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    const params = {};
                    if (cat !== 'all') params.category = cat;
                    if (searchQuery) params.search = searchQuery;
                    if (selectedBrands.length > 0) params.brands = selectedBrands.join(',');
                    setSearchParams(params);
                    setShowFiltersMobile(false);
                  }}
                  className={`category-link-btn ${category === cat ? 'active' : ''}`}
                >
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <div className="filter-group">
            <h3>Brands</h3>
            <div className="checkbox-list">
              {availableBrands.map((brand) => (
                <label key={brand} className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={selectedBrands.includes(brand)}
                    onChange={() => handleBrandChange(brand)}
                  />
                  <span>{brand}</span>
                </label>
              ))}
            </div>
          </div>

          <button onClick={handleClearFilters} className="clear-filters-btn">
            Clear All Filters
          </button>
        </aside>

        {/* Product Grid Area */}
        <main className="grid-area">
          {loading ? (
            <div className="loading-state">Loading products...</div>
          ) : products.length === 0 ? (
            <div className="empty-results-state">
              <h3>No Products Found</h3>
              <p>Try adjusting your search criteria or filters.</p>
              <button onClick={handleClearFilters} className="reset-btn">Reset Filters</button>
            </div>
          ) : (
            <div className="products-grid">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};
export default ProductListPage;
