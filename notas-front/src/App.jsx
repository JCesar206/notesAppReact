import React, { useState, createContext } from 'react';
import Navbar from './components/Navbar';
import AddNote from './components/AddNote';
import NotesList from './components/NotesList';
import AboutModal from './components/AboutModal';
import Footer from './components/Footer';
import axios from 'axios';
import './App.css';

export const LangContext = createContext();
export const ThemeContext = createContext();

function App() {
  const [lang, setLang] = useState('es');
  const [darkMode, setDarkMode] = useState(false);
  const [notes, setNotes] = useState([]);
  const [filters, setFilters] = useState({
    keyword: '',
    favorite: false,
    completed: false
  });
  const [aboutOpen, setAboutOpen] = useState(false);

  const toggleLang = () => setLang(lang === 'es' ? 'en' : 'es');
  const toggleTheme = () => setDarkMode(!darkMode);

  const fetchNotes = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/notes');
      setNotes(res.data);
    } catch (error) {
      console.error('Error fetching notes:', error);
    }
  };

  React.useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <LangContext.Provider value={{ lang, toggleLang }}>
      <ThemeContext.Provider value={{ darkMode, toggleTheme }}>
        <div className={`${darkMode ? 'dark bg-gray-900 text-white' : 'bg-gray-100 text-black'} min-h-screen`}>
          <Navbar
            filters={filters}
            setFilters={setFilters}
            openAbout={() => setAboutOpen(true)}
          />

          <div className="container mx-auto p-4 flex flex-col gap-4">
            {/* Siempre mostramos AddNote */}
            <AddNote fetchNotes={fetchNotes} />

            {/* Lista filtrada */}
            <NotesList notes={notes} fetchNotes={fetchNotes} filters={filters} />
          </div>

          {aboutOpen && <AboutModal close={() => setAboutOpen(false)} />}
        </div>
        <Footer />
      </ThemeContext.Provider>
    </LangContext.Provider>
  );
}

export default App;