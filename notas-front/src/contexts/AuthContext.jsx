import React, { createContext, useState, useEffect } from "react"; // Validar el contexto de acceso...
import axios from "axios";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")) || null);

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
    }
  }, [token]);

  useEffect(() => {
    if (user) localStorage.setItem("user", JSON.stringify(user));
    else localStorage.removeItem("user");
  }, [user]);

  const api = axios.create({
    baseURL: "http://localhost:5000/api",
    headers: token ? { Authorization: `Bearer ${token}` } : {}
  });

  return (
    <AuthContext.Provider value={{ token, setToken, user, setUser, api }}>
      {children}
    </AuthContext.Provider>
  );
}