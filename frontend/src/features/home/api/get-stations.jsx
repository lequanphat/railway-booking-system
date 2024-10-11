import { useQuery } from '@tanstack/react-query';
import { api } from '~/lib/api';

export const getStations = () => {
  return api.get(`/public/provinces`);
};

export const useStations = ({ queryConfig }) => {
  return useQuery({
    queryKey: ['provinces'],
    queryFn: getStations,
    ...queryConfig,
  });
};
