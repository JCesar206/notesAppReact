import React, { useState, useContext } from 'react';
import axios from 'axios';
import { FaTrash, FaEdit, FaStar, FaCheck, FaRegStickyNote } from 'react-icons/fa';
import { LangContext } from '../App';

function NotesList({ notes, fetchNotes, filters }) {
  const [editId, setEditId] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [editContent, setEditContent] = useState('');
  const [editCategory, setEditCategory] = useState('');
  const { lang } = useContext(LangContext);

  const t = {
    es: {
      save: 'Guardar',
      cancel: 'Cancelar',
      category: 'Categoría',
      empty: 'No hay notas que coincidan con tu búsqueda.'
    },
    en: {
      save: 'Save',
      cancel: 'Cancel',
      category: 'Category',
      empty: 'No notes match your search.'
    }
  }[lang];

  const startEdit = (note) => {
    setEditId(note.id);
    setEditTitle(note.title);
    setEditContent(note.content);
    setEditCategory(note.category);
  };

  const saveEdit = async (id) => {
    try {
      await axios.put(`http://localhost:5000/api/notes/${id}`, {
        title: editTitle,
        content: editContent,
        category: editCategory
      });
      setEditId(null);
      fetchNotes();
    } catch (error) {
      console.error('Error al editar nota:', error);
    }
  };

  const deleteNote = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/notes/${id}`);
      fetchNotes();
    } catch (error) {
      console.error('Error al eliminar nota:', error);
    }
  };

  const toggleFavorite = async (note) => {
    try {
      await axios.put(`http://localhost:5000/api/notes/${note.id}`, {
        ...note,
        favorite: !note.favorite
      });
      fetchNotes();
    } catch (error) {
      console.error('Error al cambiar favorita:', error);
    }
  };

  const toggleCompleted = async (note) => {
    try {
      await axios.put(`http://localhost:5000/api/notes/${note.id}`, {
        ...note,
        completed: !note.completed
      });
      fetchNotes();
    } catch (error) {
      console.error('Error al cambiar completada:', error);
    }
  };

  // 🔎 Filtros activos desde Navbar
  const filteredNotes = notes.filter((note) => {
    const keywordMatch =
      filters.keyword === '' ||
      note.title.toLowerCase().includes(filters.keyword.toLowerCase()) ||
      note.content.toLowerCase().includes(filters.keyword.toLowerCase()) ||
      (note.category && note.category.toLowerCase().includes(filters.keyword.toLowerCase()));

    const favoriteMatch = !filters.favorite || note.favorite;
    const completedMatch = !filters.completed || note.completed;

    return keywordMatch && favoriteMatch && completedMatch;
  });

  return (
    <div className="grid gap-4">
      {filteredNotes.length === 0 ? (
        <div className="flex flex-col items-center justify-center text-gray-500 dark:text-gray-400 py-8">
          <FaRegStickyNote size={40} className="mb-2" />
          <p>{t.empty}</p>
        </div>
      ) : (
        filteredNotes.map((note) => (
          <div key={note.id} className="bg-white dark:bg-gray-800 p-4 rounded shadow">
            {editId === note.id ? (
              <>
                <input
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  className="w-full mb-2 p-2 border rounded"
                />
                <input
                  value={editCategory}
                  onChange={(e) => setEditCategory(e.target.value)}
                  placeholder={t.category}
                  className="w-full mb-2 p-2 border rounded"
                />
                <textarea
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                  className="w-full mb-2 p-2 border rounded"
                />
                <div className="flex gap-2">
                  <button
                    onClick={() => saveEdit(note.id)}
                    className="bg-green-500 text-white px-2 py-1 rounded"
                  >
                    {t.save}
                  </button>
                  <button
                    onClick={() => setEditId(null)}
                    className="bg-gray-500 text-white px-2 py-1 rounded"
                  >
                    {t.cancel}
                  </button>
                </div>
              </>
            ) : (
              <>
                <h3 className="font-bold text-lg">{note.title}</h3>
                {note.category && (
                  <p className="italic text-sm text-gray-500 dark:text-gray-400">
                    {note.category}
                  </p>
                )}
                <p>{note.content}</p>
                <div className="flex gap-2 mt-2">
                  <button
                    onClick={() => startEdit(note)}
                    title={lang === 'es' ? 'Editar' : 'Edit'}
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => deleteNote(note.id)}
                    title={lang === 'es' ? 'Eliminar' : 'Delete'}
                  >
                    <FaTrash />
                  </button>
                  <button
                    onClick={() => toggleFavorite(note)}
                    title={lang === 'es' ? 'Favorita' : 'Favorite'}
                    className={`${note.favorite ? 'text-yellow-400' : 'text-gray-400'}`}
                  >
                    <FaStar />
                  </button>
                  <button
                    onClick={() => toggleCompleted(note)}
                    title={lang === 'es' ? 'Completada' : 'Completed'}
                    className={`${note.completed ? 'text-green-500' : 'text-gray-400'}`}
                  >
                    <FaCheck />
                  </button>
                </div>
              </>
            )}
          </div>
        ))
      )}
    </div>
  );
}

export default NotesList;