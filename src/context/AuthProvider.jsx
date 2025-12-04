import { useEffect, useState } from 'react';
import { AuthContext } from './auth';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('auth_user');
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      localStorage.setItem('auth_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('auth_user');
    }
  }, [user]);

  const login = async (email, password) => {
    setLoading(true);

    try {
      const response = await fetch('http://localhost:3000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error('Invalid email or password');
      }

      const { user, token } = await response.json();

      const userData = {
        email: user.email || email,
        name: user.name || user.email || 'User',
        role: user.role || 'user',
        token,
      };

      setUser(userData);
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
  };

  const hasRole = (role) => user?.role === role;

  return (
    <AuthContext.Provider value={{ user, login, logout, loading, hasRole }}>
      {children}
    </AuthContext.Provider>
  );
};
