import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [showPwd, setShowPwd] = useState(false);
  const [msg, setMsg] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg('');
    setError('');
    if (!email.trim() || !newPassword.trim()) {
      setError('Completa todos los campos');
      return;
    }
    try {
      const base = process.env.REACT_APP_API_URL || 'http://localhost:5000';
      const res = await axios.post(`${base}/api/auth/reset-password`, { email, newPassword });
      setMsg(res.data.message || 'Contraseña actualizada');
      setTimeout(() => navigate('/login'), 2500);
    } catch (err) {
      setError(err.response?.data?.error || 'Error al procesar la solicitud');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-4 bg-white dark:bg-gray-800 rounded shadow">
      <h2 className="text-xl font-bold mb-4">Olvidé mi contraseña</h2>
      {msg && <div className="text-green-500 mb-2">{msg}</div>}
      {error && <div className="text-red-500 mb-2">{error}</div>}
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="p-2 rounded border dark:bg-gray-700 dark:text-white"
        />

        <div className="relative">
          <input
            type={showPwd ? 'text' : 'password'}
            placeholder="Nueva contraseña"
            value={newPassword}
            onChange={e => setNewPassword(e.target.value)}
            className="p-2 rounded border w-full dark:bg-gray-700 dark:text-white"
          />
          {newPassword.length > 0 && (
            <button
              type="button"
              onClick={() => setShowPwd(!showPwd)}
              className="absolute right-2 top-2 text-gray-600 dark:text-gray-300"
              aria-label={showPwd ? 'Ocultar contraseña' : 'Mostrar contraseña'}
            >
              {showPwd ? <FaEyeSlash /> : <FaEye />}
            </button>
          )}
        </div>

        <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded">Actualizar</button>
      </form>
    </div>
  );
}

export default ForgotPassword;