import { queryOptions, useQuery } from '@tanstack/react-query';
import { api } from '~/lib/api';

export const getRoutes = () => {
  return api.get(`/ad/routes`);
};

export const getRoutesOptions = () => {
  return queryOptions({
    queryKey: ['get-routes'],
    queryFn: () => getRoutes(),
  });
};

export const useGetRoutes = () => {
  return useQuery({
    ...getRoutesOptions(),
  });
};
