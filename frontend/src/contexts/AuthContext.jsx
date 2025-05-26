import { createContext, useContext, useEffect, useState } from 'react';
import axios from '../utils/Axios';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Used to check if auth is being validated
  const [error, setError] = useState(null);

  // Fetch user profile on app load
  const fetchProfile = async () => {
    try {
      const res = await axios.get('/users/profile');
      setUser(res.data);
    } catch (err) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

//update
const updateProfile = async (updatedData) => {
  try {
    setError(null);
    const res = await axios.put('/users/profile', updatedData);
    setUser(res.data.user);
    return { success: true, message: res.data.message };
  } catch (err) {
    setError(err.response?.data?.message || 'Profile update failed');
    return { success: false, message: err.response?.data?.message || 'Profile update failed' };
  }
};

  // Login
  const login = async (email, password) => {
    try {
      setError(null);
      const res = await axios.post('/users/login', { email, password });
      setUser(res.data.user);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  // Register
  const register = async (fullName, email, password) => {
    try {
      setError(null);
      const res = await axios.post('/users/register', { fullName, email, password });
      setUser(res.data.user);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  // Logout
  const logout = async () => {
    await axios.get('/users/logout');
    setUser(null);
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ user, loading, error, login, register, logout,updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook
export const useAuth = () => useContext(AuthContext);
