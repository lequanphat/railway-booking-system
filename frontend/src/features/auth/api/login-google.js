import { useMutation } from "@tanstack/react-query";
import { api } from "~/lib/api";

export const useGoogleLogin = ({ data }) => {
  return api.post(`/oauth2/google`, data);
};

export const useGoogleLoginMutation = ({ mutationConfig }) => {
  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    onSuccess: (...args) => {
      onSuccess?.(...args);
    },
    ...restConfig,
    mutationFn: useGoogleLogin,
  });
};
