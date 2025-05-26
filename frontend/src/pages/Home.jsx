import { useBooks } from "../contexts/BookContext";
import { useAuth } from "../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import {
  LogIn,
  LogOut,
  User,
  Plus,
  ArrowLeft,
  ArrowRight
} from "lucide-react";
import Footer from "../components/Footer";


const Home = () => {
  const {
    books,
    loading,
    error,
    search,
    setSearch,
    genre,
    setGenre,
    page,
    setPage,
  } = useBooks();

  const { user, logout } = useAuth();
  const navigate = useNavigate();

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (error) return <p className="text-center mt-10 text-red-600">{error}</p>;

  return (
  //  <div className="max-w-7xl mx-auto px-4 py-8">
  // {/* Header */}
  // <header className="flex justify-between items-center mb-8">
  //   <h1 className="text-4xl font-bold tracking-tight text-gray-800">📚 BookStore</h1>
  //   <div>
  //     {user ? (
  //       <div className="flex flex-col sm:flex-row items-center gap-3">
  //         <button
  //           onClick={() => navigate("/profile")}
  //           className="bg-blue-600 text-white px-5 py-2 rounded-full hover:bg-blue-700 transition shadow-md"
  //         >
  //           Profile
  //         </button>
  //         <button
  //           onClick={logout}
  //           className="bg-red-600 text-white px-5 py-2 rounded-full hover:bg-red-700 transition shadow-md"
  //         >
  //           Logout
  //         </button>
  //         <Link to="/books/create">
  //           <button className="bg-indigo-600 text-white px-5 py-2 rounded-full hover:bg-indigo-700 transition shadow-md">
  //             + Add Book
  //           </button>
  //         </Link>
  //       </div>
  //     ) : (
  //       <div className="flex gap-3">
  //         <button
  //           onClick={() => navigate("/login")}
  //           className="bg-green-600 text-white px-5 py-2 rounded-full hover:bg-green-700 transition shadow-md"
  //         >
  //           Login
  //         </button>
  //         <button
  //           onClick={() => navigate("/register")}
  //           className="bg-indigo-600 text-white px-5 py-2 rounded-full hover:bg-indigo-700 transition shadow-md"
  //         >
  //           Signup
  //         </button>
  //       </div>
  //     )}
  //   </div>
  // </header>
  <>
  <div className="max-w-7xl mx-auto px-4 py-8">
  {/* Header */}
  <header className="flex justify-between items-center mb-8">
    <h1 className="text-3xl font-bold tracking-tight text-gray-800">📚 BookStore</h1>
    <div>
      {user ? (
        <div className="flex  sm:flex-row items-center gap-3">
          <button
            onClick={() => navigate("/profile")}
            className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition shadow-md"
            title="Profile"
          >
            <User className="w-5 h-5" />
          </button>
          <button
            onClick={logout}
            className="bg-red-600 text-white p-2 rounded-full hover:bg-red-700 transition shadow-md"
            title="Logout"
          >
            <LogOut className="w-5 h-5" />
          </button>
          <Link to="/books/create">
            <button
              className="bg-indigo-600 text-white p-2 rounded-full hover:bg-indigo-700 transition shadow-md"
              title="Add Book"
            >
              <Plus className="w-5 h-5" />
            </button>
          </Link>
        </div>
      ) : (
        <div className="flex gap-3">
          <button
            onClick={() => navigate("/login")}
            className="bg-green-600 text-white p-2 rounded-full hover:bg-green-700 transition shadow-md"
            title="Login"
          >
            <LogIn className="w-5 h-5" />
          </button>
          <button
            onClick={() => navigate("/register")}
            className="bg-indigo-600 text-white p-2 rounded-full hover:bg-indigo-700 transition shadow-md"
            title="Signup"
          >
            <User className="w-5 h-5" />
          </button>
        </div>
      )}
    </div>
  </header>


  {/* Search & Filter */}
  <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4 mb-8">
    <input
      type="text"
      placeholder="🔍 Search books..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      className="flex-grow p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
    />
    <select
      value={genre}
      onChange={(e) => setGenre(e.target.value)}
      className="mt-4 sm:mt-0 p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition w-full sm:w-52"
    >
      <option value="">All Categories</option>
      <option value="Classic">Classic</option>
      <option value="Romance">Romance</option>
      <option value="Dystopian">Dystopian</option>
      {/* Add more */}
    </select>
  </div>

  {/* Books Grid */}
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
    {books.map((book) => (
      <div
        key={book._id}
        className="bg-white rounded-xl shadow-md hover:shadow-xl transition overflow-hidden cursor-pointer flex flex-col"
        onClick={() => navigate(`/books/${book._id}`)}
      >
        <img
          src={book.coverImage || "https://via.placeholder.com/300x400?text=No+Image"}
          alt={book.title}
          className="w-full h-64 object-cover"
        />
        <div className="p-5 flex flex-col flex-grow">
          <h3 className="text-xl font-semibold text-gray-800 mb-1">{book.title}</h3>
          <p className="text-sm text-gray-500 mb-2">by {book.author}</p>
          <p className="text-sm text-gray-700 mb-1">
            <span className="font-medium">Genre:</span> {book.genre || "N/A"}
          </p>
          <div className="mt-auto flex items-center space-x-2">
            <span className="text-yellow-500 font-bold">
              {book.averageRating ? book.averageRating.toFixed(1) : "N/A"}
            </span>
            <svg
              className="w-5 h-5 text-yellow-400"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M10 15l-5.878 3.09L5.5 11.18 1 7.455l6.061-.525L10 2l2.939 4.93 6.061.525-4.5 3.725 1.378 6.91z" />
            </svg>
          </div>
        </div>
      </div>
    ))}
  </div>

  {/* Pagination
  <div className="mt-10 flex justify-center gap-4">
    <button
      disabled={page === 1}
      onClick={() => setPage(page - 1)}
      className="px-5 py-2 bg-gray-200 text-gray-800 rounded-full hover:bg-gray-300 disabled:opacity-50 transition"
    >
      ⬅ Prev
    </button>
    <span className="px-5 py-2 font-medium text-gray-700 bg-gray-100 rounded-full">
      Page {page}
    </span>
    <button
      onClick={() => setPage(page + 1)}
      className="px-5 py-2 bg-gray-200 text-gray-800 rounded-full hover:bg-gray-300 transition"
    >
      Next ➡
    </button>
  </div>
</div> */}
 {/* Pagination */}
  <div className="mt-10 flex justify-center gap-4">
    <button
      disabled={page === 1}
      onClick={() => setPage(page - 1)}
      className="p-2 bg-gray-200 text-gray-800 rounded-full hover:bg-gray-300 disabled:opacity-50 transition"
      title="Previous Page"
    >
      <ArrowLeft className="w-5 h-5" />
    </button>
    <span className="px-5 py-2 font-medium text-gray-700 bg-gray-100 rounded-full">
      Page {page}
    </span>
    <button
      onClick={() => setPage(page + 1)}
      className="p-2 bg-gray-200 text-gray-800 rounded-full hover:bg-gray-300 transition"
      title="Next Page"
    >
      <ArrowRight className="w-5 h-5" />
    </button>
  </div>
</div>
<Footer/>
</>

  );
};

export default Home;
