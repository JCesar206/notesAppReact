import React, { useState } from "react"; // Componente de Login...
import { useNavigate, Link } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import API from "../axiosInstance";

function Login({ setIsAuth }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await API.post("/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);
      setIsAuth(true);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.error || "Error al iniciar sesión");
      console.error("Login error:", err.response?.data || err.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-gray-800 p-6 rounded shadow-md flex flex-col gap-3 w-80"
      >
        <h2 className="text-xl font-bold">Login</h2>
        {error && <div className="text-red-500">{error}</div>}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="p-2 rounded border dark:bg-gray-700 dark:text-white"
        />

        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="p-2 rounded border w-full dark:bg-gray-700 dark:text-white"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-2 top-2 text-gray-500"
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>

        <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded">
          Entrar
        </button>
        <div className="flex justify-between text-sm">
          <Link to="/register" className="text-blue-500 hover:underline">
            Registrarse
          </Link>
          <Link to="/change-password" className="text-blue-500 hover:underline">
            Olvidé contraseña
          </Link>
        </div>
      </form>
    </div>
  );
}

export default Login;