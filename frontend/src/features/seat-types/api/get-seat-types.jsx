import { queryOptions, useQuery } from '@tanstack/react-query';
import { api } from '~/lib/api';

export const getSeatTypes = (keyword, page, size) => {
  return api.get(`/ad/seat-types`, {
    params: {
      keyword,
      page,
      size,
    },
  });
};

export const getSeatTypesQueryOptions = ({ page, size, keyword }) => {
  return queryOptions({
    queryKey: page ? ['seat-types', { page, size, keyword }] : ['seat-types'],
    queryFn: () => getSeatTypes(keyword, page, size),
  });
};

export const useSeatTypes = ({ queryConfig, page, size, keyword }) => {
  return useQuery({
    ...getSeatTypesQueryOptions({ page, size, keyword }),
    ...queryConfig,
  });
};
