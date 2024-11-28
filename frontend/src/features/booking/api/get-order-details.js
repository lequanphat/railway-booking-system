import { queryOptions, useQuery } from '@tanstack/react-query';
import { api } from '~/lib/api';

export const getOrderDetails = (id) => {
  return api.get(`/public/orders/${id}`);
};

export const getOrderDetailsQueryOptions = ({ id }) => {
  return queryOptions({
    queryKey: ['order-details', { id }],
    queryFn: () => getOrderDetails(id),
  });
};

export const useGetOrderDetails = ({ id, queryConfig }) => {
  return useQuery({
    ...getOrderDetailsQueryOptions({ id }),
    ...queryConfig,
  });
};
