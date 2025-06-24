import { supabase } from "@/utils/supabaseClient";
import bcrypt from "bcryptjs";
import { User, Session } from "@supabase/supabase-js";

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

// =================================
// This FUNCTION handles user login
// and retrieves their profile information from the `profiles` table.
// It uses Supabase Auth for authentication and returns the session and user details.
// ================================

// type LoginInput = {
//   email: string;
//   password: string;
// };

// type LoginResult =
//   | {
//       success: true;
//       session: Session;
//       user: User;
//     }
//   | { error: string };

// export async function handleLogin({
//   email,
//   password,
// }: LoginInput): Promise<LoginResult> {
//   // Step 1: Login with Supabase Auth
//   const { data: authData, error: authError } =
//     await supabase.auth.signInWithPassword({
//       email,
//       password,
//     });

//   if (authError || !authData.session || !authData.user) {
//     console.error("Login failed:", authError?.message);
//     return { error: authError?.message ?? "Unknown error" };
//   }

//   // const userId = authData.user.id;

//   // // Step 2: Fetch profile info (from `profiles` table)
//   // const { data: profileData, error: profileError } = await supabase
//   //   .from("profiles")
//   //   .select("full_name")
//   //   .eq("id", userId)
//   //   .single();

//   // if (profileError || !profileData) {
//   //   console.error("Profile fetch failed:", profileError?.message);
//   //   return { error: "Could not load profile data." };
//   // }

//   return {
//     success: true,
//     session: authData.session,
//     user: authData.user,
//   };
// }
