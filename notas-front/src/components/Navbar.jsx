import React, { useState, useContext } from 'react';
import { FaBars, FaTimes, FaSun, FaMoon, FaInfoCircle, FaPlus, FaSearch, FaStar, FaCheck } from 'react-icons/fa';
import { LangContext, ThemeContext } from '../App';

function Navbar({ filters, setFilters, openAbout }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const { lang, toggleLang } = useContext(LangContext);
  const { darkMode, toggleTheme } = useContext(ThemeContext);

  const t = {
    es: {
      add: 'Agregar nota',
      search: 'Buscar...',
      favorite: 'Favoritas',
      completed: 'Completadas',
      about: 'Acerca de',
      lang: 'Idioma',
      theme: 'Tema',
      titleApp: 'Nota Loka'
    },
    en: {
      add: 'Add note',
      search: 'Search...',
      favorite: 'Favorites',
      completed: 'Completed',
      about: 'About',
      lang: 'Language',
      theme: 'Theme', 
      titleApp: 'Crazy Notes'
    }
  }[lang];

  // Handlers
  const handleSearch = (e) =>
    setFilters({ ...filters, keyword: e.target.value });

  const toggleFavorite = () =>
    setFilters({ ...filters, favorite: !filters.favorite });

  const toggleCompleted = () =>
    setFilters({ ...filters, completed: !filters.completed });

  const menuItems = [
    {
      name: t.search,
      icon: <FaSearch />,
      component: (
        <input
          value={filters.keyword}
          onChange={handleSearch}
          placeholder={t.search}
          className="p-1 pl-8 rounded border dark:bg-gray-700 dark:text-white"
        />
      )
    },
    {
      name: t.favorite,
      icon: <FaStar />,
      action: toggleFavorite,
      active: filters.favorite
    },
    {
      name: t.completed,
      icon: <FaCheck />,
      action: toggleCompleted,
      active: filters.completed
    },
    { name: t.lang, icon: <FaInfoCircle />, action: toggleLang },
    {
      name: t.theme,
      icon: darkMode ? <FaSun /> : <FaMoon />,
      action: toggleTheme
    },
    { name: t.about, icon: <FaInfoCircle />, action: openAbout }
  ];

  return (
    <nav className="bg-white dark:bg-gray-800 shadow p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-xl font-bold">📝 {t.titleApp}</div>

        {/* Menú Desktop */}
        <div className="hidden md:flex gap-4 items-center">
          {menuItems.map((item, i) =>
            item.component ? (
              <div key={i} className="relative flex items-center font-semibold gap-1">
                {item.icon} {item.component}
              </div>
            ) : (
              <button
                key={i}
                onClick={item.action}
                className={`flex items-center gap-1 hover:underline ${
                  item.active ? 'text-blue-500' : ''
                }`}
              >
                {item.icon} {item.name}
              </button>
            )
          )}
        </div>

        {/* Botón hamburguesa Mobile */}
        <div className="md:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </div>

      {/* Menú Mobile */}
      {menuOpen && (
        <div className="flex flex-col gap-2 mt-2 md:hidden">
          {menuItems.map((item, i) =>
            item.component ? (
              <div key={i} className="relative flex items-center gap-2">
                {item.icon} {item.component}
              </div>
            ) : (
              <button
                key={i}
                onClick={() => {
                  if (item.action) item.action();
                  setMenuOpen(false);
                }}
                className={`flex font-semibold items-center gap-2 px-2 py-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700 ${
                  item.active ? 'bg-blue-200 dark:bg-blue-600' : ''
                }`}
              >
                {item.icon} {item.name}
              </button>
            )
          )}
        </div>
      )}
    </nav>
  );
}

export default Navbar;