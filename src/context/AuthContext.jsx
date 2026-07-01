import React, { createContext, useState, useEffect } from 'react';
import storage from '../utils/storage';
import users from '../data/users';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    return storage.get('technova-auth-user', null);
  });
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return !!storage.get('technova-auth-user', null);
  });
  const [isLoading, setIsLoading] = useState(false);

  const login = (email, password) => {
    setIsLoading(true);
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const foundUser = users.find(
          (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
        );
        if (foundUser) {
          const sessionUser = {
            id: foundUser.id,
            name: foundUser.name,
            email: foundUser.email,
            role: foundUser.role,
            phone: foundUser.phone
          };
          setUser(sessionUser);
          setIsAuthenticated(true);
          storage.set('technova-auth-user', sessionUser);
          setIsLoading(false);
          resolve(sessionUser);
        } else {
          setIsLoading(false);
          reject(new Error('Invalid email or password'));
        }
      }, 800);
    });
  };

  const register = (name, email, password) => {
    setIsLoading(true);
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const emailExists = users.some((u) => u.email.toLowerCase() === email.toLowerCase());
        if (emailExists) {
          setIsLoading(false);
          reject(new Error('Email already registered'));
        } else {
          const newUser = {
            id: 'u' + (users.length + 1),
            name,
            email,
            password,
            role: 'user',
            phone: '',
            addresses: []
          };
          users.push(newUser); // In-memory update for simulated session
          const sessionUser = {
            id: newUser.id,
            name: newUser.name,
            email: newUser.email,
            role: newUser.role,
            phone: newUser.phone
          };
          setUser(sessionUser);
          setIsAuthenticated(true);
          storage.set('technova-auth-user', sessionUser);
          setIsLoading(false);
          resolve(sessionUser);
        }
      }, 800);
    });
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    storage.remove('technova-auth-user');
  };

  const loginAsGuest = () => {
    const guestUser = {
      id: 'guest',
      name: 'Guest User',
      email: 'guest@technova.com',
      role: 'guest'
    };
    setUser(guestUser);
    setIsAuthenticated(true);
    storage.set('technova-auth-user', guestUser);
  };

  const updateProfile = (profileData) => {
    if (!user) return;
    const updatedUser = { ...user, ...profileData };
    setUser(updatedUser);
    storage.set('technova-auth-user', updatedUser);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isLoading,
        login,
        register,
        logout,
        loginAsGuest,
        updateProfile,
        isAdmin: user?.role === 'admin',
        isGuest: user?.role === 'guest'
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export default AuthProvider;
