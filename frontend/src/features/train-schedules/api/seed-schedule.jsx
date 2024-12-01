import { useMutation } from '@tanstack/react-query';
import { api } from '~/lib/api';

export const seedSchedules = ({ startDate, endDate, trainIds, daysOfWeek }) => {
  return api.post(`/ad/schedules/seed`, {
    startDate,
    endDate,
    trainIds,
    daysOfWeek,
  });
};

export const useSeedSchedules = ({ mutationConfig }) => {
  return useMutation({
    mutationFn: seedSchedules,
    ...mutationConfig,
  });
};
