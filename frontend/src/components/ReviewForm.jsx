import { useState } from 'react';
import { useReviews } from '../contexts/ReviewContext';
import { toast } from 'react-toastify';
import { FaStar } from 'react-icons/fa';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';

const ReviewForm = ({ bookId }) => {
  const [rating, setRating] = useState(5);
  const [hover, setHover] = useState(null);
  const [comment, setComment] = useState('');
  const { createReview } = useReviews();
  const navigate = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!comment.trim()) return toast.warn('Comment cannot be empty');

    const success = await createReview({ book: bookId, rating, comment });
    if (success) {
      setComment('');
      setRating(5);
      setHover(null);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-6 py-4 mt-6">
       
      <h4 className="text-lg font-semibold mb-3">Write a Review</h4>

      <div className="mb-4">
        <label className="block mb-1 font-medium">Rating</label>
        <div className="flex space-x-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setRating(star)}
              onMouseEnter={() => setHover(star)}
              onMouseLeave={() => setHover(null)}
            >
              <FaStar
                size={28}
                className={`cursor-pointer transition-colors duration-200 ${
                  (hover || rating) >= star ? 'text-yellow-400' : 'text-gray-300'
                }`}
              />
            </button>
          ))}
        </div>
      </div>

      <div className="mb-4">
        <label className="block mb-1 font-medium">Comment</label>
        <textarea
          className="w-full border px-3 py-2 rounded"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          rows={4}
        />
      </div>

      <button
        type="submit"
        className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded transition"
      >
        Submit Review
      </button>
    </form>
  );
};

export default ReviewForm;
