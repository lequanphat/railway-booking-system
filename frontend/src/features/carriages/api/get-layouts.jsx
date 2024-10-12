import { queryOptions, useQuery } from '@tanstack/react-query';
import { api } from '~/lib/api';

export const getCarriageLayouts = (page, size, keyword) => {
  return api.get(`/ad/carriage-layouts`, {
    params: {
      page,
      size,
      keyword,
    },
  });
};

export const getCarriageLayoutQueryOptions = ({ page, size, keyword }) => {
  return queryOptions({
    queryKey: page ? ['useCarriageLayouts', { page, size, keyword }] : ['useCarriageLayouts'],
    queryFn: () => getCarriageLayouts(page, size, keyword),
  });
};

export const useCarriageLayouts = ({ queryConfig, page, size, keyword }) => {
  return useQuery({
    ...getCarriageLayoutQueryOptions({ page, size, keyword }),
    ...queryConfig,
  });
};
