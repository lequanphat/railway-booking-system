import { Navigate } from 'react-router-dom';
import { USER_ROLES } from '~/config/constants';
import useAuthStore from '~/stores/auth-store';

const AuthRoutes = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore();

  return !isAuthenticated ? (
    children
  ) : user?.userRole === USER_ROLES.ADMIN ? (
    <Navigate to="/admin" />
  ) : (
    <Navigate to="/" />
  );
};

export default AuthRoutes;
