import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export const ProtectedRoute = () => {
  const { user, loading } = useAuth();

  if (loading) return <div>Loading auth state...</div>;
  return user ? <Outlet /> : <Navigate to="/" replace />;
};