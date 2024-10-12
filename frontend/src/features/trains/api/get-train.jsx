import { queryOptions, useQuery } from '@tanstack/react-query';
import { api } from '~/lib/api';

export const getTrain = (id) => {
  return api.get(`/ad/trains/${id}`, {});
};

export const getTrainQueryOptions = (id) => {
  return queryOptions({
    queryKey: ['getTrain'],
    queryFn: () => getTrain(id),
  });
};

export const useTrain = ({ queryConfig, id }) => {
  return useQuery({
    ...getTrainQueryOptions(id),
    ...queryConfig,
  });
};
