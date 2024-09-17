import { useMutation } from "@tanstack/react-query";
import { api } from "~/lib/api";

export const createEmployee = ({ data }) => {
  return api.post(`/api/admin/users`, data);
};

export const useCreateEmployee = ({ mutationConfig }) => {
  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    onSuccess: (...args) => {
      onSuccess?.(...args);
    },
    ...restConfig,
    mutationFn: createEmployee,
  });
};
