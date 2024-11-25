import { queryOptions, useQuery } from '@tanstack/react-query';
import { api } from '~/lib/api';

export const getProvinces = () => {
  return api.get(`/public/provinces/getProvince`, {
    
  });
};

export const getProvincesTypesQueryOptions = () => {
  return queryOptions({
    queryKey: ['provinces'],
    queryFn: () => getProvinces(),
  });
};

export const useProvinces = () => {
  return useQuery({
    ...getProvincesTypesQueryOptions(),
  });
};
