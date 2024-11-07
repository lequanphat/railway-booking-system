import { useQuery } from '@tanstack/react-query';
import { api } from '~/lib/api';

export const searchSchedules = ({ departureStation, arrivalStation, departureDate }) => {
  return api.get(`/public/schedules/search`, {
    params: {
      departureStation,
      arrivalStation,
      departureDate,
    },
  });
};

export const useSearchSchedules = ({ queryConfig, departureStation, arrivalStation, departureDate }) => {
  return useQuery({
    queryKey: ['schedules', { departureStation, arrivalStation, departureDate }],
    queryFn: () => searchSchedules({ departureStation, arrivalStation, departureDate }),
    ...queryConfig,
  });
};
