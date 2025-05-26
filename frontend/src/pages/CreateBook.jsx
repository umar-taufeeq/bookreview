import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../utils/Axios';
import { useAuth } from '../contexts/AuthContext';
import { toast } from 'react-toastify';
import { AiOutlineArrowLeft } from 'react-icons/ai';
;

const CreateBook = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: '',
    author: '',
    description: '',
    genre: '',
    coverImage: '',
    averageRating: '',
  });

  const [preview, setPreview] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  if (!user) return <p className="text-center mt-10 text-red-500">Please login to continue.</p>;
  if (!user.isAdmin) return <p className="text-center mt-10 text-red-500">Access denied. Admins only.</p>;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (name === 'coverImage') setPreview(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      const res = await axios.post('/books/create', {
        ...form,
        averageRating: parseFloat(form.averageRating),
      });
      setSuccess('Book created successfully!');
      setForm({
        title: '',
        author: '',
        description: '',
        genre: '',
        coverImage: '',
        averageRating: '',
      });
      setPreview('');
      toast.success('Book created successfully!');
      setTimeout(() => navigate('/'), 1500);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create book.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 mt-15 bg-white rounded-xl shadow-lg ">
      {/* Back Button */}
            <button
              onClick={() => navigate(-1)}
              className="mb-4 text-blue-600 flex items-center gap-2 hover:underline"
            >
              <span className="text-xl"><AiOutlineArrowLeft /></span> Back
            </button>
      <h2 className="text-2xl font-semibold mb-4 text-center text-indigo-600">Add New Book</h2>

      {error && <p className="text-red-500 text-center mb-2">{error}</p>}
      {success && <p className="text-green-500 text-center mb-2">{success}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={handleChange}
          required
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <input
          name="author"
          placeholder="Author"
          value={form.author}
          onChange={handleChange}
          required
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          required
          rows={3}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
        />
        <input
          name="genre"
          placeholder="Genre"
          value={form.genre}
          onChange={handleChange}
          required
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <input
          name="coverImage"
          placeholder="Cover Image URL"
          value={form.coverImage}
          onChange={handleChange}
          required
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        {preview && (
          <div className="text-center">
            <img
              src={preview}
              alt="Cover Preview"
              className="w-32 h-44 mx-auto object-cover rounded-lg shadow-md"
            />
          </div>
        )}
        <input
          name="averageRating"
          placeholder="Average Rating (1-5)"
          value={form.averageRating}
          onChange={handleChange}
          type="number"
          min="1"
          max="5"
          step="0.1"
          required
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition disabled:opacity-60"
        >
          {loading ? 'Creating...' : 'Create Book'}
        </button>
      </form>
    </div>
  );
};

export default CreateBook;
