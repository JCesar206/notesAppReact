import React, { useState } from "react"; // Componente de Olvido contraseña...
import { useNavigate, Link } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import API from "../axiosInstance";

function ChangePassword() {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    try {
      await API.post("/auth/change-password", { email, newPassword });
      setMessage("Contraseña actualizada correctamente");
      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      setMessage(err.response?.data?.error || "Error al cambiar contraseña");
      console.error("Change password error:", err.response?.data || err.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-gray-800 p-6 rounded shadow-md flex flex-col gap-3 w-80"
      >
        <h2 className="text-xl font-bold">Cambiar contraseña</h2>
        {message && <div className="text-red-500">{message}</div>}
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
            placeholder="Nueva contraseña"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
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

        <button
          type="submit"
          className="bg-purple-500 hover:bg-purple-600 text-white p-2 rounded"
        >
          Actualizar
        </button>
        <div className="text-sm">
          <Link to="/login" className="text-blue-500 hover:underline">
            Volver al login
          </Link>
        </div>
      </form>
    </div>
  );
}

export default ChangePassword;