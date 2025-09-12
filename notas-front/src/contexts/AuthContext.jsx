import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token') || null);

  const api = axios.create({
    baseURL: 'http://localhost:5000/api',
    headers: {
      Authorization: token ? `Bearer ${token}` : '',
    },
  });

  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
    }
  }, [token]);

  return (
    <AuthContext.Provider value={{ user, setUser, token, setToken, api }}>
      {children}
    </AuthContext.Provider>
  );
}