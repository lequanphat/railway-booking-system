import { queryOptions, useQuery } from "@tanstack/react-query";
import { api } from "~/lib/api";

export const getEmployees = (page = 1) => {
  return api.get(`/api/admin/users`, {
    params: {
      page,
    },
  });
};

export const useEmployeesQueryOptions = ({ page }) => {
  return queryOptions({
    queryKey: ["employees", { page }],
    queryFn: () => getEmployees(page),
  });
};

export const useEmployees = ({ queryConfig, page }) => {
  return useQuery({
    ...useEmployeesQueryOptions({ page }),
    ...queryConfig,
  });
};
