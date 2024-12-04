import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "~/lib/api";
import { getCustomersQueryOptions } from "./get-customers";

export const updatecustomer = ({ data }) => {
  return api.put(`/ad/users/${data?.id}`, data);
};

export const useUpdateCustomer = ({ mutationConfig }) => {
  const queryClient = useQueryClient();
  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    onSuccess: (...args) => {
      queryClient.invalidateQueries({
        queryKey: getCustomersQueryOptions.queryKey,
      });
      onSuccess?.(...args);
    },
    ...restConfig,
    mutationFn: updatecustomer,
  });
};
