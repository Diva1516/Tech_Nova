import React from 'react';
import './StarRating.css';

export const StarRating = ({ rating, maxStars = 5 }) => {
  // Calculate percentage of filled stars
  const fillPercent = (rating / maxStars) * 100;

  return (
    <div className="star-rating" title={`${rating} out of ${maxStars} stars`}>
      <div className="star-rating-outer">
        <div className="stars-empty">★★★★★</div>
        <div className="stars-filled" style={{ width: `${fillPercent}%` }}>
          ★★★★★
        </div>
      </div>
      <span className="rating-number">{rating.toFixed(1)}</span>
    </div>
  );
};

export default StarRating;
