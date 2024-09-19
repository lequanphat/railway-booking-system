import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "~/lib/api";
import { getEmployeesQueryOptions } from "./get-employees";

export const createEmployee = ({ data }) => {
  return api.post(`/api/admin/users`, data);
};

export const useCreateEmployee = ({ mutationConfig }) => {
  const queryClient = useQueryClient();
  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    onSuccess: (...args) => {
      queryClient.invalidateQueries({
        queryKey: getEmployeesQueryOptions.queryKey,
      });
      onSuccess?.(...args);
    },
    ...restConfig,
    mutationFn: createEmployee,
  });
};
