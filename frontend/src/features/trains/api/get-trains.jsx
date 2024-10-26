import { queryOptions, useQuery } from '@tanstack/react-query';
import { api } from '~/lib/api';

export const getTrains = (page, size, keyword) => {
  return api.get(`/ad/trains/search`, {
    params: {
      page,
      size,
      keyword,
    },
  });
};

export const getTrainsQueryOptions = ({ page, size, keyword }) => {
  return queryOptions({
    queryKey: ['useCarriageLayouts', { page, size, keyword }],
    queryFn: () => getTrains(page, size, keyword),
  });
};

export const useTrains = ({ queryConfig, page, size, keyword }) => {
  return useQuery({
    ...getTrainsQueryOptions({ page, size, keyword }),
    ...queryConfig,
  });
};
