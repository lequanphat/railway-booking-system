import { useQuery } from '@tanstack/react-query';
import { api } from '~/lib/api';

export const getReservationsByScheduleId = ({ scheduleId }) => {
  return api.get(`/public/seats/${scheduleId}`);
};

export const useGetReservationsBySchedule = ({ scheduleId, queryConfig }) => {
  return useQuery({
    queryKey: ['reservations', scheduleId],
    queryFn: () => getReservationsByScheduleId({ scheduleId }),
    initialData: [],
    ...queryConfig,
  });
};
