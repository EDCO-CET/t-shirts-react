import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import NotAuthorized from './NotAuthorized';
function ProtectedRoute({ children, requiredRole }) {
  const { user, hasRole } = useAuth();
  if (!user) {
    return <Navigate to='/login' />;
  }

  if (requiredRole && !hasRole(requiredRole)) {
    return <NotAuthorized />;
  }

  return children;
}
export default ProtectedRoute;
