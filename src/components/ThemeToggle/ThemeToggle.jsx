import React from 'react';
import useTheme from '../../hooks/useTheme';
import { Sun, Moon } from 'lucide-react';
import './ThemeToggle.css';

export const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button 
      onClick={toggleTheme} 
      className="theme-toggle" 
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      id="theme-toggle-btn"
    >
      {theme === 'dark' ? (
        <Sun size={20} className="icon sun-icon" />
      ) : (
        <Moon size={20} className="icon moon-icon" />
      )}
    </button>
  );
};
export default ThemeToggle;
