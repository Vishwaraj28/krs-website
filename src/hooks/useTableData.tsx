import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/utils/supabaseClient";

const useTableData = (tableName: string, columns: string[] = []) => {
  return useQuery({
    queryKey: [tableName, columns], // Add columns to the queryKey for caching uniqueness
    queryFn: async () => {
      // If columns array is empty or not provided, use '*'
      const selectColumns = columns.length > 0 ? columns.join(", ") : "*";

      const { data, error } = await supabase
        .from(tableName)
        .select(selectColumns);

      if (error) throw new Error(error.message);

      return data;
    },
  });
};

export default useTableData;
