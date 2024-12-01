import { useQuery } from '@tanstack/react-query';
import { api } from '~/lib/api';

export const countScheduleBetween = ({ start, end }) => {
  return api.get(`/public/schedules/count`, {
    params: { start, end },
  });
};

export const useCountScheduleBetween = ({ start, end }) => {
  return useQuery({
    queryKey: ['count-schedule', { start, end }],
    queryFn: () => countScheduleBetween({ start, end }),
    enabled: !!start && !!end,
  });
};
