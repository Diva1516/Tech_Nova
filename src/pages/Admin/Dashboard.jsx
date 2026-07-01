import React, { useState } from 'react';
import productsData from '../../data/products';
import { Package, ShoppingBag, Users, DollarSign, Plus, Trash } from 'lucide-react';
import './Admin.css';

export const Dashboard = () => {
  const [products, setProducts] = useState(productsData);
  
  // States for simple mock CRUD
  const [newProductName, setNewProductName] = useState('');
  const [newProductPrice, setNewProductPrice] = useState('');
  const [newProductCategory, setNewProductCategory] = useState('mobiles');

  const handleAddProduct = (e) => {
    e.preventDefault();
    if (!newProductName.trim() || !newProductPrice) return;

    const newProduct = {
      id: products.length + 1,
      name: newProductName,
      brand: 'Generic',
      category: newProductCategory,
      price: parseFloat(newProductPrice),
      originalPrice: parseFloat(newProductPrice),
      discount: 0,
      rating: 4.5,
      reviewCount: 1,
      image: 'https://via.placeholder.com/150',
      specs: {},
      colors: ['Black'],
      variants: ['Standard']
    };

    setProducts([newProduct, ...products]);
    setNewProductName('');
    setNewProductPrice('');
  };

  const handleDeleteProduct = (id) => {
    setProducts(products.filter((p) => p.id !== id));
  };

  return (
    <div className="admin-dashboard container">
      <h2>Admin Control Panel</h2>

      {/* Stats Cards Row */}
      <div className="admin-stats-row">
        <div className="admin-stat-card">
          <div className="stat-icon-wrapper revenue">
            <DollarSign size={20} />
          </div>
          <div className="stat-data">
            <span>Total Revenue</span>
            <strong>₹12,45,000</strong>
          </div>
        </div>

        <div className="admin-stat-card">
          <div className="stat-icon-wrapper orders">
            <ShoppingBag size={20} />
          </div>
          <div className="stat-data">
            <span>Orders Placed</span>
            <strong>1,234</strong>
          </div>
        </div>

        <div className="admin-stat-card">
          <div className="stat-icon-wrapper products">
            <Package size={20} />
          </div>
          <div className="stat-data">
            <span>Active Products</span>
            <strong>{products.length}</strong>
          </div>
        </div>

        <div className="admin-stat-card">
          <div className="stat-icon-wrapper users">
            <Users size={20} />
          </div>
          <div className="stat-data">
            <span>Registered Users</span>
            <strong>8,500</strong>
          </div>
        </div>
      </div>

      <div className="admin-dashboard-grid">
        {/* Left Side: Mock Product CRUD */}
        <div className="admin-card-section">
          <h3>Add New Product</h3>
          <form onSubmit={handleAddProduct} className="crud-form">
            <div className="form-group">
              <label htmlFor="new-prod-name">Product Name</label>
              <input
                type="text"
                id="new-prod-name"
                placeholder="Product title"
                value={newProductName}
                onChange={(e) => setNewProductName(e.target.value)}
                required
              />
            </div>
            <div className="form-group-row">
              <div className="form-group">
                <label htmlFor="new-prod-price">Price (₹)</label>
                <input
                  type="number"
                  id="new-prod-price"
                  placeholder="Price"
                  value={newProductPrice}
                  onChange={(e) => setNewProductPrice(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="new-prod-cat">Category</label>
                <select
                  id="new-prod-cat"
                  value={newProductCategory}
                  onChange={(e) => setNewProductCategory(e.target.value)}
                >
                  <option value="mobiles">Mobiles</option>
                  <option value="laptops">Laptops</option>
                  <option value="headphones">Headphones</option>
                  <option value="gaming">Gaming</option>
                  <option value="watches">Smartwatches</option>
                  <option value="cameras">Cameras</option>
                </select>
              </div>
            </div>
            <button type="submit" className="admin-add-btn">
              <Plus size={16} />
              <span>Add Product</span>
            </button>
          </form>
        </div>

        {/* Right Side: Products Table List */}
        <div className="admin-card-section list-products-section">
          <h3>Product Catalog</h3>
          <div className="catalog-table-wrapper">
            <table className="catalog-table">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {products.slice(0, 10).map((product) => (
                  <tr key={product.id}>
                    <td>
                      <div className="table-product-cell">
                        <img src={product.image} alt={product.name} />
                        <span className="text-truncate">{product.name}</span>
                      </div>
                    </td>
                    <td>{product.category}</td>
                    <td>₹{product.price.toLocaleString('en-IN')}</td>
                    <td>
                      <button onClick={() => handleDeleteProduct(product.id)} className="delete-row-btn" title="Delete product">
                        <Trash size={14} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Dashboard;
