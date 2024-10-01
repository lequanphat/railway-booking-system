import { useEffect } from 'react';
import { useAuthentication } from '~/features/auth/api/others';
import useAuthStore from '~/stores/auth-store';

const AuthProvider = ({ children }) => {
  const { setUser } = useAuthStore();
  const {
    data: { user, token },
  } = useAuthentication();

  useEffect(() => {
    if (user) {
      setUser(user);
      localStorage.setItem('token', token);
    }
  }, [user, token, setUser]);

  return children;
};

export default AuthProvider;
