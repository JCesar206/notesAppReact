import React, { useContext } from "react"; // Componente de Logout...
import { AuthContext } from "../contexts/AuthContext";

function Logout() {
  const { setToken, setUser } = useContext(AuthContext);

  const handleLogout = () => {
    setToken(null);
    setUser(null);
    localStorage.clear();
  };

  return (
    <button
      onClick={handleLogout}
      className="bg-red-600 text-white px-4 py-2 rounded font-bold"
    >
      Cerrar sesión
    </button>
  );
}

export default Logout;