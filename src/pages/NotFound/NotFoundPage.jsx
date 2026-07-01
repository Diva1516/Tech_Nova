import React from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../config/routes';
import { HelpCircle } from 'lucide-react';
import './NotFoundPage.css';

export const NotFoundPage = () => {
  return (
    <div className="not-found-page container">
      <HelpCircle size={64} className="not-found-icon" />
      <h2>404 Page Not Found</h2>
      <p>The page you are looking for doesn't exist or has been moved.</p>
      <Link to={ROUTES.HOME} className="back-home-btn">
        Return to Home Page
      </Link>
    </div>
  );
};
export default NotFoundPage;
