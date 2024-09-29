import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "~/lib/api";
import { getEmployeesQueryOptions } from "./get-employees";

export const updateEmployee = ({ data }) => {
  return api.put(`/ad/users/${data?.id}`, data);
};

export const useUpdateEmployee = ({ mutationConfig }) => {
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
    mutationFn: updateEmployee,
  });
};
