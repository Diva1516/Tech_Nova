import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { banners } from '../../data/banners';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import './HeroCarousel.css';

export const HeroCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % banners.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + banners.length) % banners.length);
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % banners.length);
  };

  return (
    <div className="hero-carousel" id="main-hero-carousel">
      {banners.map((banner, index) => (
        <div
          key={banner.id}
          className={`carousel-slide ${index === currentIndex ? 'active' : ''}`}
        >
          {index === currentIndex && (
            <>
              <div className="slide-content">
                <span className="slide-subtitle">{banner.subtitle}</span>
                <h2 className="slide-title">{banner.title}</h2>
                <p className="slide-desc">{banner.description}</p>
                <Link to={banner.ctaLink} className="slide-cta-btn">
                  {banner.ctaText}
                </Link>
              </div>
              <div className="slide-image-container">
                <img src={banner.image} alt={banner.title} className="slide-image" />
              </div>
            </>
          )}
        </div>
      ))}

      <button onClick={handlePrev} className="carousel-nav-btn prev" aria-label="Previous slide">
        <ChevronLeft size={20} />
      </button>
      <button onClick={handleNext} className="carousel-nav-btn next" aria-label="Next slide">
        <ChevronRight size={20} />
      </button>

      <div className="carousel-dots">
        {banners.map((_, index) => (
          <button
            key={index}
            className={`dot-btn ${index === currentIndex ? 'active' : ''}`}
            onClick={() => setCurrentIndex(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};
export default HeroCarousel;
