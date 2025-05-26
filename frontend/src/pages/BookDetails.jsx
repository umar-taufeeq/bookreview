import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useBooks } from '../contexts/BookContext';
import { useReviews } from '../contexts/ReviewContext';
import { useAuth } from '../contexts/AuthContext';
import ReviewForm from '../components/ReviewForm';
import ReviewList from '../components/ReviewList';
import Loader from '../components/Loader';
import { AiOutlineArrowLeft } from 'react-icons/ai'
const BookDetails = () => {
  const { id } = useParams();
  const { books, fetchBooks, loading } = useBooks();
  const {  fetchReviews, reviews, reviewLoading } = useReviews();
  const navigate = useNavigate();
 
  const { user } = useAuth();

  const book = books.find((b) => b._id === id);

  useEffect(() => {
    if (!book) fetchBooks();
     fetchReviews(id);
  }, [id]);

  if (loading || !book) return <Loader />;

  return (
     <div className="max-w-5xl mx-auto p-4">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="mb-4 text-blue-600 flex items-center gap-2 hover:underline"
      >
        <span className="text-xl"><AiOutlineArrowLeft /></span> Back
      </button>

      <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col md:flex-row gap-6">
        <img
          src={book.coverImage}
          alt={book.title}
          className="w-full md:w-1/3 h-auto object-cover rounded"
        />
        <div className="flex-1">
          <h2 className="text-3xl font-bold mb-2">{book.title}</h2>
          <p className="text-gray-700 mb-1">
            <strong>Author:</strong> {book.author}
          </p>
          <p className="text-gray-700 mb-1">
            <strong>Genre:</strong> {book.genre}
          </p>
          <p className="text-gray-700 mb-2">
            <strong>Rating:</strong> {book.averageRating || 'N/A'}
          </p>
          <p className="text-gray-600 mt-4">{book.description}</p>
        </div>
      </div>

      {/* Reviews */}
      <div className="mt-10">
        <h3 className="text-2xl font-semibold mb-4">Reviews</h3>
        {reviewLoading ? (
          <Loader />
        ) : (
          <>
            <ReviewList reviews={reviews} />
            {user && <ReviewForm bookId={id} />}
          </>
        )}
      </div>
    </div>
  );
};

export default BookDetails;
