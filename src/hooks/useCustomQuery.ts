import useAxios from "@config/axios.config";
import { useQuery } from "@tanstack/react-query";

interface ICustomQuery {
    queryKey: string[];
    url: string;
  }
  
  const useCustomQuery = ({ queryKey, url }: ICustomQuery) => {
    const axiosInstance = useAxios();
    return useQuery({
      queryKey,
      queryFn: async () => {
        const { data } = await axiosInstance.get(url)
        return data;
      },
    });
  };
  
  export default useCustomQuery;