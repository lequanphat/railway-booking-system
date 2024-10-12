import { queryOptions, useQuery } from '@tanstack/react-query';
import { api } from '~/lib/api';

export const getCarriageLayout = (id) => {
  return api.get(`/ad/carriage-layouts/${id}`, {});
};

export const getCarriageQueryOptions = (id) => {
  return queryOptions({
    queryKey: ['getCarriageLayout'],
    queryFn: () => getCarriageLayout(id),
  });
};

export const useCarriageLayout = ({ queryConfig, id }) => {
  return useQuery({
    ...getCarriageQueryOptions(id),
    ...queryConfig,
  });
};
