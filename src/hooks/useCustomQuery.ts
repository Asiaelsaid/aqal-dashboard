import useAxios from "@config/axios.config";
import { useQuery } from "@tanstack/react-query";

interface ICustomQuery {
    queryKey: string[];
    url: string;
    enabled?: boolean; // <-- Add this line

  }
  
const useCustomQuery = ({ queryKey, url, enabled = true }: ICustomQuery) => {
  const axiosInstance = useAxios();
  return useQuery({
    queryKey,
    queryFn: async () => {
      const { data } = await axiosInstance.get(url)
      return data;
    },
    enabled, // Use the enabled parameter
  });
};  export default useCustomQuery;