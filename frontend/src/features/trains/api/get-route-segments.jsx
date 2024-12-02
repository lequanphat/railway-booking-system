import { useQuery } from '@tanstack/react-query';
import { api } from '~/lib/api';

export const fetchTrain = (id) => {
  return api.get(`/ad/trains/${id}/route-segments`);
};

export const trainQuery = (id) => ({
  queryKey: ['train', id],
  queryFn: () => fetchTrain(id),
  enabled: !!id,
});

export const useRouteSegments = (id) => {
  return useQuery(trainQuery(id));
};
