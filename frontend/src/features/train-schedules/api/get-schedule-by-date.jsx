import { useQuery } from '@tanstack/react-query';
import { api } from '~/lib/api';

export const getScheduleByDate = ({ date }) => {
  return api.get(`/public/schedules/${date}`);
};

export const useScheduleByDate = ({ date }) => {
  return useQuery({
    queryKey: ['schedule', date],
    queryFn: () => getScheduleByDate({ date }),
    enabled: !!date,
  });
};
