import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '~/lib/api';

export const createSchedules = ({ data }) => {
  return api.post(`/ad/schedules`, data);
};

export const useCreateSchedules = ({ mutationConfig }) => {
  const queryClient = useQueryClient();
  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    onSuccess: (_, variables, ...args) => {
      queryClient.invalidateQueries({
        queryKey: ['schedule', variables.data.date],
      });
      onSuccess?.(...args);
    },
    ...restConfig,
    mutationFn: createSchedules,
  });
};
