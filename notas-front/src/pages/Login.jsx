import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

function Login({ setIsAuth }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', { email, password });
      localStorage.setItem('token', res.data.token);
      setIsAuth(true);
      navigate('/app');
    } catch (err) {
      setError(err.response?.data?.error || 'Error al iniciar sesión');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-4 bg-white dark:bg-gray-800 rounded shadow">
      <h2 className="text-xl font-bold mb-4">Login</h2>
      {error && <div className="text-red-500 mb-2">{error}</div>}
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <input type="email" placeholder="Correo" value={email} onChange={e => setEmail(e.target.value)} className="p-2 rounded border dark:bg-gray-700 dark:text-white"/>
        <input type="password" placeholder="Contraseña" value={password} onChange={e => setPassword(e.target.value)} className="p-2 rounded border dark:bg-gray-700 dark:text-white"/>
        <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded">Entrar</button>
      </form>
      <div className="flex justify-between mt-2">
        <Link to="/register" className="text-blue-500 hover:underline">Registrarse</Link>
        <Link to="/forgot-password" className="text-blue-500 hover:underline">Olvidé contraseña</Link>
      </div>
    </div>
  );
}

export default Login;