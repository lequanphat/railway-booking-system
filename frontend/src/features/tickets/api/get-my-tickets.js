import { queryOptions, useQuery } from '@tanstack/react-query';
import { api } from '~/lib/api';

export const getMyTickets = (keyword, page, size) => {
  return api.get(`/user/tickets/me`, {
    params: { keyword, page, size },
  });
};

export const getMyTicketsQueryOptions = ({ keyword, page, size }) => {
  return queryOptions({
    queryKey: ['use-my-tickets', { keyword, page, size }],
    queryFn: () => getMyTickets(keyword, page, size),
  });
};

export const useMyTickets = ({ queryConfig, keyword, page, size }) => {
  return useQuery({
    ...getMyTicketsQueryOptions({ page, size, keyword }),
    ...queryConfig,
    initialData: {
      items: [],
      meta: {},
    },
  });
};
