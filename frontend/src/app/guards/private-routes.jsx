import { Navigate, useLocation } from 'react-router-dom';
import { USER_ROLES } from '~/config/constants';
import useAuthStore from '~/stores/auth-store';

const PrivateRoutes = ({ children }) => {
  const location = useLocation();
  const { user, isAuthenticated } = useAuthStore();
  if (isAuthenticated) {
    if (user?.userRole === USER_ROLES.USER) {
      return children;
    }
    return <Navigate to="/admin" />;
  }
  return <Navigate to={`/auth/login?redirect=${location.pathname}`} />;
};

export default PrivateRoutes;
