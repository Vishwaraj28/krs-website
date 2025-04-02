import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/utils/supabaseClient";

export const useFetchData = (tableName: string) => {
  return useQuery({
    queryKey: [tableName], // Specify the query key
    queryFn: async () => {
      const { data, error } = await supabase.from(tableName).select("*");
      if (error) throw new Error(error.message);
      return data;
    },
  });
};
