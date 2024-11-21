import { queryOptions, useQuery } from '@tanstack/react-query';
import { api } from '~/lib/api';

export const getProvinces = () => {
  return api.get(`/public/provinces`, {
    
  });
};

export const getProvincesTypesQueryOptions = (queryConfig) => {
  return queryOptions({
    queryKey: ['provinces', queryConfig],
    queryFn: () => getProvinces(),
  });
};

export const useProvinces = ({ queryConfig}) => {
  return useQuery({
    ...getProvincesTypesQueryOptions(),
    ...queryConfig,
  });
};
