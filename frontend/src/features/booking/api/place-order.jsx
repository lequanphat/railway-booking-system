import { useMutation } from '@tanstack/react-query';
import { api } from '~/lib/api';

export const placeOrder = ({ data }) => {
  return api.post(`/public/orders`, data);
};

export const usePlaceOrder = ({ mutationConfig }) => {
  const { onSuccess, onError, ...restConfig } = mutationConfig || {};
  return useMutation({
    onSuccess: (...args) => {
      onSuccess?.(...args);
    },
    onError: (...args) => {
      onError?.(...args);
    },
    ...restConfig,
    mutationFn: placeOrder,
  });
};
