import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import useToast from '../../hooks/useToast';
import { isValidEmail, isValidPassword } from '../../utils/validators';
import { Mail, Lock, User, Headphones, Smartphone, Watch, Laptop, Cpu, Tv, Camera, Gamepad2, Speaker, Mouse, Keyboard } from 'lucide-react';
import Logo from '../../components/Logo';
import { ROUTES } from '../../config/routes';
import './Auth.css';

export const RegisterPage = () => {
  const { register, isLoading } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  const validate = () => {
    const tempErrors = {};
    if (!name.trim()) tempErrors.name = 'Full name is required';
    if (!email) {
      tempErrors.email = 'Email is required';
    } else if (!isValidEmail(email)) {
      tempErrors.email = 'Invalid email address';
    }

    if (!password) {
      tempErrors.password = 'Password is required';
    } else if (!isValidPassword(password)) {
      tempErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      const user = await register(name, email, password);
      showToast(`Welcome to TechNova, ${user.name}!`, 'success');
      navigate(ROUTES.HOME);
    } catch (err) {
      showToast(err.message || 'Registration failed', 'error');
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container-wrapper">
        <div className="auth-graphic-panel">
          <div className="glow-backdrop"></div>
          <div className="tech-radar"></div>
          <div className="tech-scanner-line"></div>
          <div className="floating-icons">
            <div className="float-icon icon-1">
              <svg viewBox="0 0 24 24" width="75" height="75" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12v7c0 1.1.9 2 2 2h3c1.1 0 2-.9 2-2v-4c0-1.1-.9-2-2-2H4v-1c0-4.41 3.59-8 8-8s8 3.59 8 8v1h-3c-1.1 0-2 .9-2 2v4c0 1.1.9 2 2 2h3c1.1 0 2-.9 2-2v-7c0-5.52-4.48-10-10-10z"/>
              </svg>
            </div>
            <div className="float-icon icon-2">
              <svg viewBox="0 0 24 24" width="70" height="70" fill="currentColor">
                <path d="M17 1H7c-1.1 0-2 .9-2 2v18c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V3c0-1.1-.9-2-2-2zm-5 21c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/>
              </svg>
            </div>
            <div className="float-icon icon-3">
              <svg viewBox="0 0 24 24" width="55" height="55" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12v7c0 1.1.9 2 2 2h3c1.1 0 2-.9 2-2v-4c0-1.1-.9-2-2-2H4v-1c0-4.41 3.59-8 8-8s8 3.59 8 8v1h-3c-1.1 0-2 .9-2 2v4c0 1.1.9 2 2 2h3c1.1 0 2-.9 2-2v-7c0-5.52-4.48-10-10-10z"/>
              </svg>
            </div>
            <div className="float-icon icon-4">
              <svg viewBox="0 0 24 24" width="60" height="60" fill="currentColor">
                <path d="M16 5V2c0-1.1-.9-2-2-2h-4c-1.1 0-2 .9-2 2v3H5c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h3v3c0 1.1.9 2 2 2h4c1.1 0 2-.9 2-2v-3h3c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2h-3zm-4 12c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z"/>
              </svg>
            </div>
            <div className="float-icon icon-5">
              <svg viewBox="0 0 24 24" width="110" height="110" fill="currentColor">
                <path d="M22 18V3a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v15H0v2h24v-2h-2zm-10 0H6v-2h6v2zm1 0h-2v-2h2v2zm5 0h-4v-2h4v2zm2-4H4V3h16v11z"/>
              </svg>
            </div>
          </div>
          <div className="stars-container">
            <div className="star s1"></div>
            <div className="star s2"></div>
            <div className="star s3"></div>
            <div className="star s4"></div>
            <div className="star s5"></div>
          </div>
        </div>

        <div className="auth-form-panel">
          <div className="auth-card">
            <div className="auth-header">
              <Logo size={42} className="auth-logo-svg" />
              <h2>Create Account</h2>
              <p>Join TechNova to shop premium next-gen electronics</p>
            </div>

            <form onSubmit={handleRegister} className="auth-form" id="register-form">
              <div className="form-group">
                <label htmlFor="reg-name">Full Name</label>
                <div className="input-wrapper">
                  <User className="input-icon" size={18} />
                  <input
                    type="text"
                    id="reg-name"
                    placeholder="Divakaran"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className={errors.name ? 'input-error' : ''}
                  />
                </div>
                {errors.name && <span className="error-text">{errors.name}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="reg-email">Email Address</label>
                <div className="input-wrapper">
                  <Mail className="input-icon" size={18} />
                  <input
                    type="email"
                    id="reg-email"
                    placeholder="email@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={errors.email ? 'input-error' : ''}
                  />
                </div>
                {errors.email && <span className="error-text">{errors.email}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="reg-password">Password</label>
                <div className="input-wrapper">
                  <Lock className="input-icon" size={18} />
                  <input
                    type="password"
                    id="reg-password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={errors.password ? 'input-error' : ''}
                  />
                </div>
                {errors.password && <span className="error-text">{errors.password}</span>}
              </div>

              <button type="submit" disabled={isLoading} className="auth-submit-btn" id="reg-submit-btn">
                {isLoading ? 'Creating Account...' : 'Register'}
              </button>
            </form>

            <div className="auth-footer">
              <span>Already have an account? </span>
              <Link to={ROUTES.LOGIN} className="auth-link">
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default RegisterPage;
