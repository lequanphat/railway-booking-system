import { useQuery } from '@tanstack/react-query';
import { api } from '~/lib/api';

export const getRouteSegments = (params) => {
  return api.get(`/public/schedules/${params.id}/route-segments`, {
    params: {
      departureStation: params.departure_id,
      arrivalStation: params.arrival_id,
    },
  });
};

export const useGetRouteSegments = ({ queryConfig, params }) => {
  return useQuery({
    queryKey: ['schedules', params],
    queryFn: () => getRouteSegments(params),
    ...queryConfig,
  });
};
