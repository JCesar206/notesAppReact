import React, { useState, createContext, useEffect } from "react"; // App principal...
import Navbar from "./components/Navbar";
import AddNote from "./components/AddNote";
import NotesList from "./components/NotesList";
import AboutModal from "./components/AboutModal";
import Footer from "./components/Footer";
import API from "./axiosInstance";
import "./App.css";

export const LangContext = createContext();
export const ThemeContext = createContext();

function App({ setIsAuth }) {
  const [lang, setLang] = useState("es");
  const [darkMode, setDarkMode] = useState(false);
  const [notes, setNotes] = useState([]);
  const [filters, setFilters] = useState({
    keyword: "",
    favorite: false,
    completed: false,
  });
  const [aboutOpen, setAboutOpen] = useState(false);

  const toggleLang = () => setLang(lang === "es" ? "en" : "es");
  const toggleTheme = () => setDarkMode(!darkMode);

  const fetchNotes = async () => {
    try {
      const res = await API.get("/notes");
      setNotes(res.data);
    } catch (error) {
      console.error("Error fetching notes:", error.response?.data || error.message);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <LangContext.Provider value={{ lang, toggleLang }}>
      <ThemeContext.Provider value={{ darkMode, toggleTheme }}>
        <div
          className={`${
            darkMode ? "dark bg-gray-900 text-white" : "bg-gray-100 text-black"
          } min-h-screen flex flex-col`}
        >
          <Navbar
            filters={filters}
            setFilters={setFilters}
            openAbout={() => setAboutOpen(true)}
            setIsAuth={setIsAuth}
          />

          <div className="container mx-auto p-4 flex flex-col gap-4 flex-grow">
            <AddNote fetchNotes={fetchNotes} />
            <NotesList notes={notes} fetchNotes={fetchNotes} filters={filters} />
          </div>

          {aboutOpen && <AboutModal close={() => setAboutOpen(false)} />}
          <Footer />
        </div>
      </ThemeContext.Provider>
    </LangContext.Provider>
  );
}

export default App;