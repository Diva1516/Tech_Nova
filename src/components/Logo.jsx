import React from 'react';

export const Logo = ({ size = 28, className }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ display: 'inline-block', verticalAlign: 'middle', transition: 'transform 0.3s ease' }}
    >
      {/* Outer Shopping Bag with curved handle inspired by Amazon/Flipkart */}
      <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" stroke="currentColor" />
      <line x1="3" y1="6" x2="21" y2="6" stroke="currentColor" />
      <path d="M16 10a4 4 0 0 1-8 0" stroke="currentColor" />
      
      {/* Tech Lightning / Arrow path inside the bag representing Technology + Delivery Speed */}
      <path 
        d="M13 8l-3 4.5h4L11 17.5" 
        stroke="var(--accent, #FF9800)" 
        strokeWidth="2" 
        strokeLinejoin="round" 
        fill="none" 
      />
    </svg>
  );
};

export default Logo;
