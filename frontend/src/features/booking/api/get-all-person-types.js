import { queryOptions, useQuery } from '@tanstack/react-query';
import { api } from '~/lib/api';

export const getAllPersonTypes = () => {
  return api.get(`/public/person-types`);
};

export const getAllPersonTypesOptions = () => {
  return queryOptions({
    queryKey: ['getAllPersonTypes'],
    queryFn: () => getAllPersonTypes(),
  });
};

export const useGetAllPersonTypes = ({ queryConfig }) => {
  return useQuery({
    ...getAllPersonTypesOptions(),
    ...queryConfig,
  });
};
