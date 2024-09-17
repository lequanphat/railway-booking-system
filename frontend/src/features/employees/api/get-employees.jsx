import { queryOptions, useQuery } from "@tanstack/react-query";
import { api } from "~/lib/api";

export const getEmployees = (page, size, keyword) => {
  return api.get(`/api/admin/users`, {
    params: {
      page,
      size,
      keyword,
    },
  });
};

export const useEmployeesQueryOptions = ({ page, size, keyword }) => {
  return queryOptions({
    queryKey: ["employees", { page, size, keyword }],
    queryFn: () => getEmployees(page, size, keyword),
  });
};

export const useEmployees = ({ queryConfig, page, size, keyword }) => {
  return useQuery({
    ...useEmployeesQueryOptions({ page, size, keyword }),
    ...queryConfig,
  });
};
