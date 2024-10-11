import { Navigate } from 'react-router-dom';
import { USER_ROLES } from '~/config/constants';
import useAuthStore from '~/stores/auth-store';

const PrivateRoutes = ({ children }) => {
  const { user, isAuthenticated } = useAuthStore();
  return isAuthenticated && user?.userRole === USER_ROLES.ADMIN ? <Navigate to="/admin" /> : children;
};

export default PrivateRoutes;
