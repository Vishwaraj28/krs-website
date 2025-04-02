import { createClient } from "@supabase/supabase-js";

const getEnvVar = (key: string) => {
  return import.meta.env.MODE === "production"
    ? import.meta.env[key]
    : import.meta.env[`VITE_${key}`];
};

const supabaseUrl = getEnvVar("SUPABASE_URL");
const supabaseKey = getEnvVar("SUPABASE_SERVICE_ROLE_KEY");

console.log("Mode", import.meta.env.MODE);
export const supabase = createClient(supabaseUrl, supabaseKey);
