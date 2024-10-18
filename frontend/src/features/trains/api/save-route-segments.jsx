import { useMutation } from '@tanstack/react-query';
import { api } from '~/lib/api';

export const saveRouteSegments = ({ id, segments }) => {
  return api.post(`/ad/trains/${id}/route-segments`, segments);
};

export const useSaveRouteSegments = ({ mutationConfig }) => {
  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    onSuccess: (...args) => {
      onSuccess?.(...args);
    },
    ...restConfig,
    mutationFn: saveRouteSegments,
  });
};
