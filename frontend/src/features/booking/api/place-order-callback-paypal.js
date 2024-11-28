import { useMutation } from '@tanstack/react-query';
import { api } from '~/lib/api';

export const placeOrderCallbackPayPal = ({ paymentId, payerId }) => {
  return api.get(`/public/orders/callback/paypal`, {
    params: {
      paymentId,
      payerId,
    },
  });
};

export const useCallbackPayPal = ({ mutationConfig }) => {
  const { ...restConfig } = mutationConfig || {};
  return useMutation({
    ...restConfig,
    mutationFn: placeOrderCallbackPayPal,
  });
};
