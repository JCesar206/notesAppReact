import axios from "axios"; // Consumo de la api via baseURL...

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

// 👉 Interceptor para incluir token automáticamente
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default API;