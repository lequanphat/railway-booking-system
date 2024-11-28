import { queryOptions, useQuery } from '@tanstack/react-query';
import { api } from '~/lib/api';

export const getUserOrdersReport = ({ startDate, endDate }) => {
  return api.get(`/ad/orders/report/user`, {
    params: { startDate, endDate },
  });
};

export const getUserOrdersReportQueryOptions = ({ startDate, endDate }) => {
  return queryOptions({
    queryKey: ['user-order-report', { startDate, endDate }],
    queryFn: () => getUserOrdersReport({ startDate, endDate }),
  });
};

export const useUserOrdersReport = ({ startDate, endDate, queryConfig }) => {
  return useQuery({
    ...getUserOrdersReportQueryOptions({ startDate, endDate }),
    ...queryConfig,
  });
};
