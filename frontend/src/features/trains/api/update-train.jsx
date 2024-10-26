import { useMutation } from '@tanstack/react-query';
import { api } from '~/lib/api';

export const updateTrain = ({ data }) => {
  return api.put(`/ad/trains/${data?.id}`, data);
};

export const useUpdateTrain = ({ mutationConfig }) => {
  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    onSuccess: (...args) => {
      onSuccess?.(...args);
    },
    ...restConfig,
    mutationFn: updateTrain,
  });
};
