import React from 'react';
import { categories } from '../../data/categories';
import * as LucideIcons from 'lucide-react';
import './CategoryBar.css';

export const CategoryBar = ({ activeCategory, onCategoryChange }) => {
  return (
    <div className="category-bar-wrapper">
      <div className="category-bar">
        <button
          onClick={() => onCategoryChange('all')}
          className={`category-pill ${activeCategory === 'all' ? 'active' : ''}`}
          id="category-pill-all"
        >
          <LucideIcons.LayoutGrid size={16} />
          <span>All Gadgets</span>
        </button>

        {categories.map((cat) => {
          // Dynamic icon lookup
          const IconComponent = LucideIcons[cat.icon] || LucideIcons.Zap;
          return (
            <button
              key={cat.id}
              onClick={() => onCategoryChange(cat.slug)}
              className={`category-pill ${activeCategory === cat.slug ? 'active' : ''}`}
              id={`category-pill-${cat.id}`}
            >
              <IconComponent size={16} />
              <span>{cat.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
export default CategoryBar;
