import { createContext, useContext, useState } from 'react';
import axios from '../utils/Axios';

const ReviewContext = createContext();

export const ReviewProvider = ({ children }) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Get reviews for a book
  const fetchReviews = async (bookId) => {
    setLoading(true);
    try {
      const res = await axios.get(`/reviews/${bookId}`);
      setReviews(res.data);
      setError(null);
    } catch (err) {
      console.error(err);
      setError('Failed to fetch reviews');
    } finally {
      setLoading(false);
    }
  };

  // Create a new review
  const createReview = async ({ book, rating, comment }) => {
    try {
      setError(null);
      const res = await axios.post('/reviews/create', {
        book,
        rating,
        comment,
      });
      setReviews((prev) => [res.data, ...prev]); // Add new review to top
      return res.data;
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'Failed to create review');
      throw err;
    }
  };

  return (
    <ReviewContext.Provider
      value={{
        reviews,
        loading,
        error,
        fetchReviews,
        createReview,
        setReviews,
      }}
    >
      {children}
    </ReviewContext.Provider>
  );
};

// Custom hook
export const useReviews = () => useContext(ReviewContext);
