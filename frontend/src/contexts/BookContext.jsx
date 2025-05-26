import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from '../utils/Axios';

const BooksContext = createContext();

export const BooksProvider = ({ children }) => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Search & filters
  const [search, setSearch] = useState('');
  const [genre, setGenre] = useState('');
  const [page, setPage] = useState(1);
  const limit = 6;

  const fetchBooks = async () => {
    setLoading(true);
    try {
      const query = new URLSearchParams({
        page,
        limit,
        search,
        genre,
      }).toString();

      const res = await axios.get(`/books/all/?${query}`);
      setBooks(res.data.books);
      setError(null);
    } catch (err) {
      console.error(err);
      setError('Failed to load books');
    } finally {
      setLoading(false);
    }
  };

  // Debounce search input (500ms)
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      fetchBooks();
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [search, genre, page]);

  return (
    <BooksContext.Provider
      value={{
        books,
        loading,
        error,
        search,
        setSearch,
        genre,
        setGenre,
        page,
        setPage,
        fetchBooks,
      }}
    >
      {children}
    </BooksContext.Provider>
  );
};

export const useBooks = () => useContext(BooksContext);
