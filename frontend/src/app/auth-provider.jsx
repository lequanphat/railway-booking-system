import { useEffect } from 'react';
import LoadingScreen from '~/components/ui/LoadingScreen';
import { useAuthentication } from '~/features/auth/api/others';
import useAuthStore from '~/stores/auth-store';

const AuthProvider = ({ children }) => {
  const { setUser } = useAuthStore();
  const {
    data: { user, token },
    error,
    isFetching,
  } = useAuthentication();

  useEffect(() => {
    if (user) {
      setUser(user);
      localStorage.setItem('token', token);
    }

    if (error) {
      localStorage.removeItem('token');
    }
  }, [user, token, setUser, error]);

  if (isFetching) return <LoadingScreen />;

  return children;
};

export default AuthProvider;
