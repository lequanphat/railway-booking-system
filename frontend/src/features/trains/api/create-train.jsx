import { useMutation } from '@tanstack/react-query';
import { api } from '~/lib/api';

export const createTrain = ({ data }) => {
  return api.post(`/ad/trains`, data);
};

export const useCreateTrain = ({ mutationConfig }) => {
  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    onSuccess: (...args) => {
      onSuccess?.(...args);
    },
    ...restConfig,
    mutationFn: createTrain,
  });
};
