import { useAuth } from '../contexts/AuthContext';
import { Navigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';

// const ProtectedRoute = ({ children, adminOnly = false }) => {
//   const { user } = useAuth();
//   const location = useLocation();

//   if (!user) {
//     toast.warn('Please login to view this page');
//     return <Navigate to="/login" state={{ from: location }} replace />;
//   }

//   if (adminOnly && !user.isAdmin) {
//     toast.error('Access denied: Admins only');
//     return <Navigate to="/" replace />;
//   }

//   return children;
// };

// export default ProtectedRoute;
const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) return null; // or return <Loader /> to show spinner while checking auth

  if (!user) {
    toast.warn('Please login to view this page');
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (adminOnly && !user.isAdmin) {
    toast.error('Access denied: Admins only');
    return <Navigate to="/" replace />;
  }

  return children;
};
export default ProtectedRoute;
