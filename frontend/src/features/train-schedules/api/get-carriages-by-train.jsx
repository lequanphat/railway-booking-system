import { useQuery } from '@tanstack/react-query';
import { api } from '~/lib/api';

export const getCarriagesByTrain = ({ id }) => {
  return api.get(`/ad/trains/${id}/carriages`);
};

export const useGetCarriagesByTrain = ({ id }) => {
  return useQuery({
    queryKey: ['carriage', id],
    queryFn: () => getCarriagesByTrain({ id }),
    enabled: !!id,
  });
};
