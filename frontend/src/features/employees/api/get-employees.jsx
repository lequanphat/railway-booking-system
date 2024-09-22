import { queryOptions, useQuery } from "@tanstack/react-query";
import { api } from "~/lib/api";

export const getEmployees = (page, size, keyword) => {
  return api.get(`/api/users`, {
    params: {
      page,
      size,
      keyword,
    },
  });
};

export const getEmployeesQueryOptions = ({ page, size, keyword }) => {
  return queryOptions({
    queryKey: page ? ["employees", { page, size, keyword }] : ["employees"],
    queryFn: () => getEmployees(page, size, keyword),
  });
};

export const useEmployees = ({ queryConfig, page, size, keyword }) => {
  return useQuery({
    ...getEmployeesQueryOptions({ page, size, keyword }),
    ...queryConfig,
  });
};
