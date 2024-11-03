import { queryOptions, useQuery } from '@tanstack/react-query';
import { api } from '~/lib/api';

export const getMyOrders = (page, size) => {
  return api.get(`/user/orders/me`, {
    params: {
      page,
      size,
    },
  });
};

export const getMyOrdersQueryOptions = ({ page, size }) => {
  return queryOptions({
    queryKey: ['use-my-orders', { page, size }],
    queryFn: () => getMyOrders(page, size),
  });
};

export const useMyOrders = ({ queryConfig, page, size }) => {
  return useQuery({
    ...getMyOrdersQueryOptions({ page, size }),
    ...queryConfig,
  });
};
