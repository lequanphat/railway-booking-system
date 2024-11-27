import { useMutation } from '@tanstack/react-query';
import { api } from '~/lib/api';

export const useFacebookLogin = ({ accessToken }) => {
  return api.post(`/oauth2/facebook`, { accessToken });
};

export const useFacebookLoginMutation = ({ mutationConfig }) => {
  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    onSuccess: (...args) => {
      onSuccess?.(...args);
    },
    ...restConfig,
    mutationFn: useFacebookLogin,
  });
};
