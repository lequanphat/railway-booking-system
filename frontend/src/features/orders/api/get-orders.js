import { queryOptions, useQuery } from '@tanstack/react-query';
import { api } from '~/lib/api';

export const getOrders = (page, size, keyword) => {
  return api.get(`/ad/orders`, {
    params: {
      page,
      size,
      keyword,
    },
  });
};

export const getOrdersQueryOptions = ({ page, size, keyword }) => {
  return queryOptions({
    queryKey: ['use-orders', { page, size, keyword }],
    queryFn: () => getOrders(page, size, keyword),
  });
};

export const useOrders = ({ queryConfig, page, size, keyword }) => {
  return useQuery({
    ...getOrdersQueryOptions({ page, size, keyword }),
    ...queryConfig,
  });
};
