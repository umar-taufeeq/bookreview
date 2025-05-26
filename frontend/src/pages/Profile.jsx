import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const { user, updateProfile } = useAuth();
  const navigate = useNavigate();

  const [isEditing, setIsEditing] = useState(false);
  const [fullName, setFullName] = useState(user?.fullName || '');
  const [email, setEmail] = useState(user?.email || '');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  if (!user)
    return (
      <p className="text-center mt-10 text-red-500 font-semibold">
        Please login to view profile.
      </p>
    );

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const updatedData = { fullName, email };
    if (password.trim()) updatedData.password = password;

    const result = await updateProfile(updatedData);
    if (result.success) {
      setMessage('Profile updated successfully!');
      setPassword('');
      setIsEditing(false);
    } else {
      setMessage(result.message);
    }
    setLoading(false);
  };

  return (
    <div className='w-100% h-screen px-4 py-20 bg-[#F8F5E9] '>
    <div className="max-w-lg mx-auto mt-12 bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-200">
      {/* Header with Home Button */}
      <div className="flex items-center justify-between bg-gradient-to-r from-blue-600 to-indigo-600 p-4">
        <button
          onClick={() => navigate('/')}
          aria-label="Go Home"
          className="text-white hover:text-gray-200 transition"
          title="Back to Home"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-7 w-7"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 12l9-9m0 0l9 9m-9-9v18"
            />
          </svg>
        </button>
        <h2 className="text-white text-xl font-semibold">My Profile</h2>
        <div className="w-7" /> {/* spacer to center title */}
      </div>

      {/* Profile Content */}
      <div className="p-6">
        {/* Display Profile Info */}
        {!isEditing && (
          <>
            <p className="mb-2 text-gray-700">
              <span className="font-semibold">Full Name:</span> {user.fullName}
            </p>
            <p className="mb-4 text-gray-700">
              <span className="font-semibold">Email:</span> {user.email}
            </p>

            <button
              onClick={() => {
                setIsEditing(true);
                setMessage('');
                setFullName(user.fullName);
                setEmail(user.email);
                setPassword('');
              }}
              className="w-full py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
            >
              Update Profile
            </button>
          </>
        )}

        {/* Update Profile Form */}
        {isEditing && (
          <form onSubmit={handleSubmit} className="space-y-4">
            {message && (
              <p
                className={`text-center ${
                  message.includes('successfully') ? 'text-green-600' : 'text-red-600'
                } font-medium`}
              >
                {message}
              </p>
            )}

            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Full Name"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="New Password (leave blank to keep current)"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />

            <div className="flex space-x-4">
              <button
                type="submit"
                disabled={loading}
                className="flex-grow py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition disabled:opacity-50"
              >
                {loading ? 'Updating...' : 'Save Changes'}
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsEditing(false);
                  setMessage('');
                }}
                className="flex-grow py-3 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition"
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
    </div>
  );
};

export default Profile;
