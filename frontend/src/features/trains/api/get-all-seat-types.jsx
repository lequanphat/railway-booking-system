import { queryOptions, useQuery } from '@tanstack/react-query';
import { api } from '~/lib/api';

export const getAllSeatTypes = (keyword, page, size) => {
  return api.get('/ad/seat-types/all', {
    params: {
      keyword,
      page,
      size,
    },
  });
};

export const getAllSeatTypesQueryOptions = () => {
  return queryOptions({
    queryKey: ['getAllSeatTypes'],
    queryFn: () => getAllSeatTypes(),
  });
};

export const useAllSeatTypes = ({ queryConfig }) => {
  return useQuery({
    ...getAllSeatTypesQueryOptions(),
    ...queryConfig,
  });
};
