import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import useToast from '../../hooks/useToast';
import { isValidEmail, isValidPassword } from '../../utils/validators';
import { Mail, Lock, LogIn, ChevronRight, Headphones, Smartphone, Watch, Laptop, Cpu, Tv, Camera, Gamepad2, Speaker, Mouse, Keyboard } from 'lucide-react';
import Logo from '../../components/Logo';
import { ROUTES } from '../../config/routes';
import './Auth.css';

export const LoginPage = () => {
  const { login, loginAsGuest, isLoading } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  const validate = () => {
    const tempErrors = {};
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

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      const user = await login(email, password);
      showToast(`Welcome back, ${user.name}!`, 'success');
      if (user.role === 'admin') {
        navigate(ROUTES.ADMIN_DASHBOARD);
      } else {
        navigate(ROUTES.HOME);
      }
    } catch (err) {
      showToast(err.message || 'Login failed', 'error');
    }
  };

  const handleGoogleLogin = () => {
    showToast('Simulating Google Sign-In...', 'info');
    setTimeout(() => {
      loginAsGuest();
      showToast('Logged in via Google!', 'success');
      navigate(ROUTES.HOME);
    }, 1000);
  };

  const handleGuestLogin = () => {
    loginAsGuest();
    showToast('Logged in as Guest', 'info');
    navigate(ROUTES.HOME);
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
              <h2>Welcome to TechNova</h2>
              <p>Sign in to discover premium tech and track orders</p>
            </div>

            <form onSubmit={handleLogin} className="auth-form" id="login-form">
              <div className="form-group">
                <label htmlFor="login-email">Email Address</label>
                <div className="input-wrapper">
                  <Mail className="input-icon" size={18} />
                  <input
                    type="email"
                    id="login-email"
                    placeholder="email@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={errors.email ? 'input-error' : ''}
                  />
                </div>
                {errors.email && <span className="error-text">{errors.email}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="login-password">Password</label>
                <div className="input-wrapper">
                  <Lock className="input-icon" size={18} />
                  <input
                    type="password"
                    id="login-password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={errors.password ? 'input-error' : ''}
                  />
                </div>
                {errors.password && <span className="error-text">{errors.password}</span>}
              </div>

              <button type="submit" disabled={isLoading} className="auth-submit-btn" id="login-submit-btn">
                {isLoading ? 'Signing In...' : 'Sign In'}
              </button>
            </form>

            <div className="auth-divider">
              <span>OR</span>
            </div>

            <div className="auth-extra-actions">
              <button onClick={handleGoogleLogin} className="google-btn">
                <svg viewBox="0 0 24 24" width="18" height="18" className="google-svg">
                  <path
                    fill="#4285F4"
                    d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v3.9h6.6c-.28 1.48-1.12 2.73-2.38 3.58v3h3.8c2.2-2.03 3.47-5.02 3.47-8.41z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.8-3c-1.05.7-2.4 1.13-4.13 1.13-3.18 0-5.88-2.15-6.84-5.07H1.3v3C3.28 21.09 7.36 24 12 24z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.16 14.15c-.25-.76-.39-1.57-.39-2.4s.14-1.64.39-2.4v-3H1.3C.47 7.97 0 9.93 0 12s.47 4.03 1.3 5.65l3.86-3.5z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 4.75c1.77 0 3.35.6 4.6 1.8l3.4-3.4C17.95 1.19 15.24 0 12 0 7.36 0 3.28 2.91 1.3 6.9l3.86 3C6.12 6.9 8.82 4.75 12 4.75z"
                  />
                </svg>
                <span>Continue with Google</span>
              </button>

              <button onClick={handleGuestLogin} className="guest-btn-bottom">
                Continue as Guest
              </button>
            </div>

            <div className="auth-footer">
              <span>New to TechNova? </span>
              <Link to={ROUTES.REGISTER} className="auth-link">
                Create Account
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default LoginPage;
