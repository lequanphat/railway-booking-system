import { queryOptions, useQuery } from '@tanstack/react-query';
import { api } from '~/lib/api';

export const getTicketsReport = ({ startDate, endDate }) => {
  return api.get(`/ad/orders/report`, {
    params: { startDate, endDate },
  });
};

export const getTicketsReportQueryOptions = ({ startDate, endDate }) => {
  return queryOptions({
    queryKey: ['ticket-report', { startDate, endDate }],
    queryFn: () => getTicketsReport({ startDate, endDate }),
  });
};

export const useTicketsReport = ({ startDate, endDate, queryConfig }) => {
  return useQuery({
    ...getTicketsReportQueryOptions({ startDate, endDate }),
    ...queryConfig,
  });
};
