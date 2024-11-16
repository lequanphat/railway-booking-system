import { useQuery } from '@tanstack/react-query';
import { api } from '~/lib/api';

export const searchSchedules = ({ departureStation, arrivalStation, departureDate, returnDate, tripType }) => {
  return api.get(`/public/schedules/search`, {
    params: {
      departureStation,
      arrivalStation,
      departureDate,
      returnDate,
      tripType,
    },
  });
};

export const useSearchSchedules = ({
  queryConfig,
  departureStation,
  arrivalStation,
  departureDate,
  returnDate,
  tripType,
}) => {
  return useQuery({
    queryKey: ['schedules', { departureStation, arrivalStation, departureDate, returnDate, tripType }],
    initialData: [],
    queryFn: () => searchSchedules({ departureStation, arrivalStation, departureDate, returnDate, tripType }),
    ...queryConfig,
  });
};
