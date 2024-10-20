import { useMutation } from '@tanstack/react-query';
import { api } from '~/lib/api';

export const updateCarriageLayout = ({ data }) => {
  return api.put(`/ad/carriage-layouts/${data?.id}`, data);
};

export const useUpdateCarriageLayout = ({ mutationConfig }) => {
  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    onSuccess: (...args) => {
      onSuccess?.(...args);
    },
    ...restConfig,
    mutationFn: updateCarriageLayout,
  });
};
