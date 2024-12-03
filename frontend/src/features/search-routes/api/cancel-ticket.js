import { useMutation } from '@tanstack/react-query';
import { api } from '~/lib/api';

export const cancelTicket = ({ scheduleId, carriageId, seatId }) => {
  return api.delete(`/public/seats/cancel`, {
    data: { scheduleId, carriageId, seatId },
  });
};

export const useCancelTicket = ({ mutationConfig }) => {
  const { onSuccess, onError, ...restConfig } = mutationConfig || {};
  return useMutation({
    onSuccess: (...args) => {
      onSuccess?.(...args);
    },
    onError: (...args) => {
      onError?.(...args);
    },
    ...restConfig,
    mutationFn: cancelTicket,
  });
};
