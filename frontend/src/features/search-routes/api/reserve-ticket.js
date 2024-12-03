import { useMutation } from '@tanstack/react-query';
import { api } from '~/lib/api';

export const reserveTicket = ({ scheduleId, carriageId, seatId }) => {
  return api.post(`/public/seats/reserve`, { scheduleId, carriageId, seatId });
};

export const useReserveTicket = ({ mutationConfig }) => {
  const { onSuccess, onError, ...restConfig } = mutationConfig || {};
  return useMutation({
    onSuccess: (...args) => {
      onSuccess?.(...args);
    },
    onError: (...args) => {
      onError?.(...args);
    },
    ...restConfig,
    mutationFn: reserveTicket,
  });
};
