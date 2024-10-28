import { queryOptions, useQuery } from '@tanstack/react-query';
import { api } from '~/lib/api';

export const getScheduleDetails = (id) => {
  return api.get(`/public/schedules/${id}/details`);
};

export const getScheduleDetailQueryOptions = ({ id }) => {
  return queryOptions({
    queryKey: ['schedule-details', { id }],
    queryFn: () => getScheduleDetails(id),
  });
};

export const useGetScheduleDetails = ({ queryConfig, id }) => {
  return useQuery({
    ...getScheduleDetailQueryOptions({ id }),
    ...queryConfig,
  });
};
