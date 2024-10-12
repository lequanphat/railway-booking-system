import { useMutation } from '@tanstack/react-query';
import { api } from '~/lib/api';

export const createCarriageLayout = ({ data }) => {
  return api.post(`/ad/carriage-layouts`, data);
};

export const useCreateCarriageLayout = ({ mutationConfig }) => {
  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    onSuccess: (...args) => {
      onSuccess?.(...args);
    },
    ...restConfig,
    mutationFn: createCarriageLayout,
  });
};
