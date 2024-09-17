import { useMutation } from "@tanstack/react-query";
import { api } from "~/lib/api";

export const updateEmployee = ({ data }) => {
  return api.put(`/api/admin/users/${data?.id}`, data);
};

export const useUpdateEmployee = ({ mutationConfig }) => {
  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    onSuccess: (...args) => {
      onSuccess?.(...args);
    },
    ...restConfig,
    mutationFn: updateEmployee,
  });
};
