import { useMutation } from '@tanstack/react-query';
import { api } from '~/lib/api';

export const deleteSchedule = ({ id }) => {
  return api.delete(`/ad/schedules/${id}`);
};

export const useDeleteSchedule = ({ mutationConfig }) => {
  const { ...restConfig } = mutationConfig || {};
  return useMutation({
    ...restConfig,
    mutationFn: deleteSchedule,
  });
};
