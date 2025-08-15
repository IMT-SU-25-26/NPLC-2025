import { Users } from "@/types/users.md";
import { createClient } from "@/utils/supabase/client";
import { createClientComponentClient} from "@supabase/auth-helpers-nextjs";
export async function GetAllUsersClient(): Promise<Users[]> {
  const supabase = createClientComponentClient();
  const { data: users, error } = await supabase
    .from("users")
    .select("*")
    .order("id", { ascending: true });
  if (error) {
    console.error("Error fetching users:", error);
    return [];
  }
  return users as Users[];
}

export async function SignUpUser(email: string, password: string, username: string, NISN: string) {
    const supabase = createClientComponentClient();

    try {
        const { data: existingUser, error: fetchError } = await supabase
            .from("users")
            .select("id")
            .or(`email.eq.${email},NISN.eq.${NISN}`)
            .maybeSingle();

        if (fetchError && fetchError.code !== "PGRST116") {
            console.error("Error checking existing user:", fetchError);
            return {
          success: false,
          user: null,
          error: "Error checking existing user"
            };
        }

        if (existingUser) {
            return {
          success: false,
          user: null,
          error: "User with this email or NISN already exists"
            };
        }

        const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
              emailRedirectTo: 'https://nplc.vercel.app/auth/callback',
              data: {
                  username: username
              }
            }
        });

        if (error) {
            console.error("Error signing up:", error);
            return {
                success: false,
                user: null,
                error: error.message
            };
        }

        if (data.user) {
            const uid = data.user.id;
            await supabase.from("users").insert([
                {
                    uid,
                    email,
                    password,
                    username,
                    NISN
                }
            ]);
        }

        return {
            success: true,
            user: data.user,
            error: null
        };
    } catch (error) {
        console.error("Unexpected error:", error);
        return {
            success: false,
            user: null,
            error: "An unexpected error occurred"
        };
    }
}

export async function SignInUser(email: string, password: string) {
  const supabase = createClient();
  
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) {
      console.error("Error signing in:", error);
      return {
        success: false,
        user: null,
        error: error.message
      };
    }

    return {
      success: true,
      user: data.user,
      error: null
    };
  } catch (error) {
    console.error("Unexpected error:", error);
    return {
      success: false,
      user: null,
      error: "An unexpected error occurred"
    };
  }
}

export async function SignOutUser() {
  const supabase = createClient();
  
  try {
    const { error } = await supabase.auth.signOut();
    
    if (error) {
      console.error("Error signing out:", error);
      return { success: false, error: error.message };
    }

    return { success: true, error: null };
  } catch (error) {
    console.error("Unexpected error:", error);
    return { success: false, error: "An unexpected error occurred" };
  }
}

export async function GetCurrentUser() {
  const supabase = createClient();
  
  try {
    const { data: { session }, error } = await supabase.auth.getSession();
    
    if (error) {
      console.error("Error getting user session:", error);
      return null;
    }

    return session?.user ?? null;
  } catch (error) {
    console.error("Unexpected error in getCurrentUser:", error);
    return null;
  }
}

export async function GetUserById(userId: string): Promise<Users | null> {
  const supabase = createClient();

  try {
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("uid", userId)
      .single();

    if (error) {
      console.error("Error fetching user by ID:", error);
      return null;
    }

    return data as Users;
  } catch (error) {
    console.error("Unexpected error in GetUserById:", error);
    return null;
  }
}


export async function GetUserByNISN(NISN: string): Promise<Users | null> {
  const supabase = createClient();

  try {
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("NISN", NISN)
      .single();

    if (error) {
      console.error("Error fetching user by NISN:", error);
      return null;
    }

    return data as Users;
  } catch (error) {
    console.error("Unexpected error in GetUserByNISN:", error);
    return null;
  }
}
