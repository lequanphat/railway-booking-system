import { useQuery } from '@tanstack/react-query';
import { api } from '~/lib/api';

export const getStations = () => {
  return api.get(`/public/stations`);
};

export const useStations = () => {
  return useQuery({
    queryKey: ['stations'],
    queryFn: getStations,
  });
};
