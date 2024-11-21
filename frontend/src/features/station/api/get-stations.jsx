import { queryOptions, useQuery } from '@tanstack/react-query';
import { api } from '~/lib/api';

export const getStations = (keyword, page, size) => {
  return api.get(`/public/stations`, {
    params: {
      keyword,
      page,
      size,
    },
  });
};

export const getStationsTypesQueryOptions = ({ page, size, keyword }) => {
  return queryOptions({
    queryKey: page ? ['stations', { page, size, keyword }] : ['stations'],
    queryFn: () => getStations(keyword, page, size),
  });
};

export const useStations = ({ queryConfig, page, size, keyword }) => {
  return useQuery({
    ...getStationsTypesQueryOptions({ page, size, keyword }),
    ...queryConfig,
  });
};
