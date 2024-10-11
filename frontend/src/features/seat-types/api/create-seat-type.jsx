import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '~/lib/api';
import { getSeatTypesQueryOptions } from './get-seat-types';

export const createSeatType = ({ data }) => {
  return api.post(`/ad/seat-types`, data);
};

export const useCreateSeatType = ({ mutationConfig }) => {
  const queryClient = useQueryClient();
  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    onSuccess: (...args) => {
      queryClient.invalidateQueries({
        queryKey: getSeatTypesQueryOptions.queryKey,
      });
      onSuccess?.(...args);
    },
    ...restConfig,
    mutationFn: createSeatType,
  });
};
