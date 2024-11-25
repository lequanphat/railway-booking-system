import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '~/lib/api';
import { getStationsQueryOptions } from './get-stations'

export const createStation = ({ data }) => {
  return api.post(`/public/stations`, data);
};

export const useCreateStation = ({ mutationConfig }) => {
  const queryClient = useQueryClient();
  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    onSuccess: (...args) => {
      queryClient.invalidateQueries({
        queryKey: getStationsQueryOptions.queryKey,
      });
      onSuccess?.(...args);
    },
    ...restConfig,
    mutationFn: createStation,
  });
};
