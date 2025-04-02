import { createClient } from "@supabase/supabase-js";

//change variabl
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL!;
const supabaseKey = import.meta.env.VITE_SUPABASE_SERVICE_ROLE_KEY!;

console.log("supabaseUrl", import.meta.env);
export const supabase = createClient(supabaseUrl, supabaseKey);
