import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [msg, setMsg] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg('');
    setError('');

    if (!email.trim()) {
      setError('El email es obligatorio');
      return;
    }

    try {
      const res = await axios.post('http://localhost:5000/api/auth/forgot-password', { email });
      setMsg(res.data.message);

      // Redirigir al login después de 3 segundos
      setTimeout(() => navigate('/login'), 3000);
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
        <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded">Enviar</button>
      </form>
    </div>
  );
}

export default ForgotPassword;