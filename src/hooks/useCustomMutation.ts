import { useMutation } from "@tanstack/react-query";
import useAxios from "@config/axios.config"; // This is a function
import { toast } from "react-toastify";

interface UseCustomMutationProps<TData = any> {
  url: string;
  method?: "POST" | "PUT" | "DELETE";
  onSuccess?: (data: TData) => void;
  onError?: (error: any) => void;
  successMessage?: string;
  errorMessage?: string;
}

const useCustomMutation = <TData = any>({
  url,
  method = "POST",
  onSuccess,
  onError,
  successMessage,
  errorMessage,
}: UseCustomMutationProps<TData>) => {
  const axiosInstance = useAxios(); // ✅ Fix is here

  return useMutation({
    mutationFn: async (data: any) => {
      const response = await axiosInstance.request({
        method,
        url,
        data,
      });
      return response.data;
    },
    onSuccess: (data) => {


      if (successMessage) toast.success(successMessage);
      onSuccess?.(data);
    },
    onError: (error) => {
      if (errorMessage) {
        toast.error(errorMessage);
      } else {
        const axiosError = error as any;
        const message =
          axiosError?.response?.data?.message || "Something went wrong.";
        toast.error(message);
      }
      onError?.(error);
    },
  });
};

export default useCustomMutation;
