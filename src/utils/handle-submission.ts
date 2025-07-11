import { supabase } from "@/utils/supabaseClient";
import bcrypt from "bcryptjs";

type PendingUserInput = {
  email: string;
  password: string;
  fullName: string;
  area: string;
};

type PendingSignupResult = { success: true } | { error: string };

export async function handlePendingSignup({
  email,
  password,
  fullName,
  area,
}: PendingUserInput): Promise<PendingSignupResult> {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const { error } = await supabase.from("krs_pending_users").insert([
      {
        email,
        password: hashedPassword,
        full_name: fullName,
        area,
      },
    ]);

    if (error) {
      console.error("Error inserting pending user:", error.message);
      return { error: error.message };
    }

    return { success: true };
  } catch (err) {
    console.error("Unexpected error during signup:", err);
    return { error: "Unexpected error. Please try again." };
  }
}
