import { useMutation } from '@tanstack/react-query';
import { api } from '~/lib/api';

export const useLogin = ({ data }) => {
  return api.post(`/auth/login`, data);
};

export const useLoginMutation = ({ mutationConfig }) => {
  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    onSuccess: (...args) => {
      onSuccess?.(...args);
    },
    ...restConfig,
    mutationFn: useLogin,
  });
};

export const useGoogleLogin = ({ data }) => {
  return api.post(`/oauth2/google`, data);
};

export const useGoogleLoginMutation = ({ mutationConfig }) => {
  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    onSuccess: (...args) => {
      onSuccess?.(...args);
    },
    ...restConfig,
    mutationFn: useGoogleLogin,
  });
};
