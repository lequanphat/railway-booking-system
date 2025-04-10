import { useEffect } from 'react';
import LoadingScreen from '~/components/ui/LoadingScreen';
import { useAuthentication } from '~/features/auth/api/others';
import useAuthStore from '~/stores/auth-store';

const AuthProvider = ({ children }) => {
  const { setUser } = useAuthStore();
  const { data: user, error, isFetching } = useAuthentication();

  useEffect(() => {
    if (user?.id) {
      setUser(user);
    }
  }, [user, setUser, error]);

  if (isFetching) return <LoadingScreen />;

  return children;
};

export default AuthProvider;
