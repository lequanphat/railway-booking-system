import { queryOptions, useQuery } from '@tanstack/react-query';
import { api } from '~/lib/api';

export const getOrders = ({ startDate, endDate, paymentMethod, status, keyword, page, size }) => {
  return api.get(`/ad/orders`, {
    params: { startDate, endDate, paymentMethod, status, keyword, page, size },
  });
};

export const getOrdersQueryOptions = ({ startDate, endDate, paymentMethod, status, keyword, page, size }) => {
  return queryOptions({
    queryKey: ['use-orders', { startDate, endDate, paymentMethod, status, keyword, page, size }],
    queryFn: () => getOrders({ startDate, endDate, paymentMethod, status, keyword, page, size }),
  });
};

export const useOrders = ({ queryConfig, startDate, endDate, paymentMethod, status, keyword, page, size }) => {
  return useQuery({
    ...getOrdersQueryOptions({ startDate, endDate, paymentMethod, status, keyword, page, size }),
    ...queryConfig,
  });
};
