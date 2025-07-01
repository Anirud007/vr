import { useState, useEffect } from 'react';
import { User, AuthState } from '../types';

export const useAuth = () => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
  });

  useEffect(() => {
    // Check for existing session
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setAuthState({
        user: JSON.parse(storedUser),
        isAuthenticated: true,
      });
    }
  }, []);

  const login = (email: string, password: string): Promise<boolean> => {
    return new Promise((resolve) => {
      // Mock authentication - in production, this would call your API
      setTimeout(() => {
        const mockUser: User = {
          id: '1',
          name: email.split('@')[0],
          email,
          role: 'Business Analyst',
        };
        
        setAuthState({
          user: mockUser,
          isAuthenticated: true,
        });
        
        localStorage.setItem('user', JSON.stringify(mockUser));
        resolve(true);
      }, 1000);
    });
  };

  const signup = (name: string, email: string, password: string): Promise<boolean> => {
    return new Promise((resolve) => {
      // Mock signup - in production, this would call your API
      setTimeout(() => {
        const mockUser: User = {
          id: Date.now().toString(),
          name,
          email,
          role: 'Business Analyst',
        };
        
        setAuthState({
          user: mockUser,
          isAuthenticated: true,
        });
        
        localStorage.setItem('user', JSON.stringify(mockUser));
        resolve(true);
      }, 1000);
    });
  };

  const logout = () => {
    setAuthState({
      user: null,
      isAuthenticated: false,
    });
    localStorage.removeItem('user');
  };

  return {
    ...authState,
    login,
    signup,
    logout,
  };
};