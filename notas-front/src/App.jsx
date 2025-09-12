import React, { useState, createContext, useEffect } from 'react';
import Navbar from './components/Navbar';
import AddNote from './components/AddNote';
import NotesList from './components/NotesList';
import AboutModal from './components/AboutModal';
import Footer from './components/Footer';
import axios from 'axios';
import './App.css';

export const LangContext = createContext();
export const ThemeContext = createContext();

function App({ setIsAuth }) {
  const [lang, setLang] = useState('es');
  const [darkMode, setDarkMode] = useState(false);
  const [notes, setNotes] = useState([]);
  const [filters, setFilters] = useState({ keyword: '', favorite: false, completed: false });
  const [aboutOpen, setAboutOpen] = useState(false);

  const toggleLang = () => setLang(lang === 'es' ? 'en' : 'es');
  const toggleTheme = () => setDarkMode(!darkMode);

  const fetchNotes = async () => {
    const token = localStorage.getItem('token');
    if (!token) return;
    try {
      const res = await axios.get('http://localhost:5000/api/notes', { headers: { Authorization: `Bearer ${token}` } });
      setNotes(res.data);
    } catch (err) {
      console.error('Error fetching notes:', err.response?.data || err.message);
    }
  };

  useEffect(() => { fetchNotes(); }, []);

  return (
    <LangContext.Provider value={{ lang, toggleLang }}>
      <ThemeContext.Provider value={{ darkMode, toggleTheme }}>
        <div className={`${darkMode ? 'dark bg-gray-900 text-white' : 'bg-gray-100 text-black'} min-h-screen flex flex-col`}>
          <Navbar filters={filters} setFilters={setFilters} openAbout={() => setAboutOpen(true)} setIsAuth={setIsAuth} />
          <main className="container mx-auto p-4 flex flex-col gap-4 flex-1">
            <AddNote fetchNotes={fetchNotes} />
            <NotesList notes={notes} fetchNotes={fetchNotes} filters={filters} />
          </main>
          {aboutOpen && <AboutModal close={() => setAboutOpen(false)} />}
          <Footer />
        </div>
      </ThemeContext.Provider>
    </LangContext.Provider>
  );
}

export default App;