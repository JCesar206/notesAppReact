import React, { useState, useContext } from "react"; // Componente de Agregar Nota...
import axios from "axios";
import { FaRegSmile } from "react-icons/fa";
import Picker from "emoji-picker-react";
import { LangContext } from "../App"; // Importa el contexto de idioma

function AddNote({ fetchNotes, noteToEdit, setNoteToEdit }) {
  const { lang } = useContext(LangContext); // Obtenemos el idioma global

  const t = {
    es: {
      title: "Título",
      content: "Contenido",
      category: "Categoría",
      favorite: "Favorita",
      completed: "Completada",
      add: "Agregar",
      update: "Actualizar",
      clear: "Limpiar",
      unauthenticated: "Usuario no autenticado",
      errorSave: "Error al guardar nota",
    },
    en: {
      title: "Title",
      content: "Content",
      category: "Category",
      favorite: "Favorite",
      completed: "Completed",
      add: "Add",
      update: "Update",
      clear: "Clear",
      unauthenticated: "User not authenticated",
      errorSave: "Error saving note",
    },
  }[lang];

  const [title, setTitle] = useState(noteToEdit?.title || "");
  const [content, setContent] = useState(noteToEdit?.content || "");
  const [category, setCategory] = useState(noteToEdit?.category || "");
  const [favorite, setFavorite] = useState(noteToEdit?.favorite || false);
  const [completed, setCompleted] = useState(noteToEdit?.completed || false);
  const [error, setError] = useState("");
  const [showEmoji, setShowEmoji] = useState(false);

  const handleClear = () => {
    setTitle("");
    setContent("");
    setCategory("");
    setFavorite(false);
    setCompleted(false);
    setError("");
    setNoteToEdit(null);
    document.getElementById("titleInput").focus();
  };

  const handleEmojiClick = (event, emojiObject) => {
    setContent((prev) => prev + emojiObject.emoji);
    setShowEmoji(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const token = localStorage.getItem("token");
    if (!token) {
      setError(t.unauthenticated);
      return;
    }

    try {
      if (noteToEdit) {
        await axios.put(
          `http://localhost:5000/api/notes/${noteToEdit.id}`,
          { title, content, category, favorite, completed },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      } else {
        await axios.post(
          "http://localhost:5000/api/notes",
          { title, content, category, favorite, completed },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      }
      handleClear();
      fetchNotes();
    } catch (err) {
      setError(err.response?.data?.error || t.errorSave);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white dark:bg-gray-800 p-4 rounded shadow flex flex-col gap-2"
    >
      {error && <div className="text-red-500">{error}</div>}
      <input
        id="titleInput"
        type="text"
        placeholder={t.title}
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="p-2 rounded border dark:bg-gray-700 dark:text-white"
      />
      <textarea
        placeholder={t.content}
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="p-2 rounded border dark:bg-gray-700 dark:text-white"
      />
      <input
        type="text"
        placeholder={t.category}
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="p-2 rounded border dark:bg-gray-700 dark:text-white"
      />
      <div className="flex items-center gap-2">
        <label className="flex items-center gap-1">
          <input
            type="checkbox"
            checked={favorite}
            onChange={() => setFavorite(!favorite)}
          />{" "}
          {t.favorite}
        </label>
        <label className="flex items-center gap-1">
          <input
            type="checkbox"
            checked={completed}
            onChange={() => setCompleted(!completed)}
          />{" "}
          {t.completed}
        </label>
        <button
          type="button"
          onClick={() => setShowEmoji(!showEmoji)}
          className="text-yellow-400"
        >
          <FaRegSmile />
        </button>
      </div>
      {showEmoji && <Picker onEmojiClick={handleEmojiClick} />}
      <div className="flex gap-2">
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded"
        >
          {noteToEdit ? t.update : t.add}
        </button>
        <button
          type="button"
          onClick={handleClear}
          className="bg-gray-500 hover:bg-gray-600 text-white p-2 rounded"
        >
          {t.clear}
        </button>
      </div>
    </form>
  );
}

export default AddNote;