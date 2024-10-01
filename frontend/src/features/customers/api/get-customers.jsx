import { queryOptions, useQuery } from '@tanstack/react-query';
import { USER_ROLES } from '~/config/constants';
import { api } from '~/lib/api';

export const getCustomers = (page, size, keyword) => {
  return api.get(`/ad/users`, {
    params: {
      role: USER_ROLES.USER,
      page,
      size,
      keyword,
    },
  });
};

export const getCustomersQueryOptions = ({ page, size, keyword }) => {
  return queryOptions({
    queryKey: page ? ['customers', { page, size, keyword }] : ['customers'],
    queryFn: () => getCustomers(page, size, keyword),
  });
};

export const useCustomers = ({ queryConfig, page, size, keyword }) => {
  return useQuery({
    ...getCustomersQueryOptions({ page, size, keyword }),
    ...queryConfig,
  });
};
