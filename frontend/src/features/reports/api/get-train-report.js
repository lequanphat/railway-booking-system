import { queryOptions, useQuery } from '@tanstack/react-query';
import { api } from '~/lib/api';

export const getTrainsReport = ({ startDate, endDate }) => {
  return api.get(`/ad/trains/report`, {
    params: { startDate, endDate },
  });
};

export const getTrainsReportQueryOptions = ({ startDate, endDate }) => {
  return queryOptions({
    queryKey: ['train-report', { startDate, endDate }],
    queryFn: () => getTrainsReport({ startDate, endDate }),
  });
};

export const useTrainsReport = ({ startDate, endDate, queryConfig }) => {
  return useQuery({
    ...getTrainsReportQueryOptions({ startDate, endDate }),
    ...queryConfig,
  });
};
