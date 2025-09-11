import React, { useState, useRef, useEffect, useContext } from 'react';
import axios from 'axios';
import { LangContext } from '../App';

function AddNote({ fetchNotes }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const [emoji, setEmoji] = useState('📝');
  const titleRef = useRef(null);
  const { lang } = useContext(LangContext);

  const t = {
    es: {
      add: 'Agregar',
      clear: 'Limpiar',
      title: 'Título',
      content: 'Contenido',
      category: 'Categoría'
    },
    en: {
      add: 'Add',
      clear: 'Clear',
      title: 'Title',
      content: 'Content',
      category: 'Category'
    }
  }[lang];

  useEffect(() => {
    if (titleRef.current) {
      titleRef.current.focus();
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    try {
      await axios.post('http://localhost:5000/api/notes', {
        title: `${emoji} ${title}`,
        content,
        category,
        favorite: false,
        completed: false
      });
      setTitle('');
      setContent('');
      setCategory('');
      setEmoji('📝');
      fetchNotes();
      if (titleRef.current) titleRef.current.focus();
    } catch (error) {
      console.error('Error al agregar nota:', error);
    }
  };

  const handleClear = () => {
    setTitle('');
    setContent('');
    setCategory('');
    setEmoji('📝');
    if (titleRef.current) titleRef.current.focus();
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 p-4 rounded shadow flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <select
          value={emoji}
          onChange={(e) => setEmoji(e.target.value)}
          className="p-2 border rounded"
        >
          <option>📝</option>
          <option>⭐</option>
          <option>🔥</option>
          <option>✅</option>
          <option>📌</option>
          <option>💡</option>
        </select>
        <input
          ref={titleRef}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder={t.title}
          className="flex-1 p-2 border rounded dark:bg-gray-700 dark:text-white"
        />
      </div>
      <input
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        placeholder={t.category}
        className="p-2 border rounded dark:bg-gray-700 dark:text-white"
      />
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder={t.content}
        className="p-2 border rounded dark:bg-gray-700 dark:text-white"
      />
      <div className="flex gap-2">
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          {t.add}
        </button>
        <button
          type="button"
          onClick={handleClear}
          className="bg-gray-500 text-white px-4 py-2 rounded"
        >
          {t.clear}
        </button>
      </div>
    </form>
  );
}

export default AddNote;