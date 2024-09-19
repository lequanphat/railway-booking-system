import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "~/lib/api";
import { getEmployeesQueryOptions } from "./get-employees";

export const deleteEmployee = ({ data }) => {
  return api.delete(`/api/admin/users/${data?.id}`);
};

export const useDeleteEmployee = ({ mutationConfig }) => {
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
    mutationFn: deleteEmployee,
  });
};
