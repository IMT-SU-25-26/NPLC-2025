import { Users } from "@/types/users.md";
import { createClient } from "@/utils/supabase/client";
import type { JoinCompetition } from "@/types/competitions.md";

export async function GetAllUsers(): Promise<Users[]> {
  const supabase = createClient();
  const { data: user_ids, error } = await supabase
    .from("users_competitions")
    .select("user_id")
    .order("id", { ascending: true });
  if (error) {
    console.error("Error fetching users:", error);
    return [];
  }

  const { data: users, error: usersError } = await supabase
    .from("users")
    .select("*")
    .in("id", user_ids);
  if (usersError) {
    console.error("Error fetching users:", usersError);
    return [];
  }

  return users as Users[];
}

export async function JoinCompetition({
  user_id,
  competition_id,
  student_id,
  team_name,
  link_twiboon,
  school_name,
  contact_person_number,
}: JoinCompetition): Promise<{ success: boolean; error?: string }> {
  const supabase = createClient();

  const { data: existing, error: checkError } = await supabase
    .from("users_competitions")
    .select("id")
    .eq("user_id", user_id)
    .maybeSingle();

  if (checkError) {
    console.error("Error checking existing competition:", checkError);
    return { success: false, error: checkError.message };
  }

  if (existing) {
    return { success: false, error: "User has already joined a competition." };
  }

  const { error } = await supabase
    .from("users_competitions")
    .insert([
      {
        user_id,
        competition_id,
        student_id,
        team_name,
        link_twiboon,
        school_name,
        contact_person_number,
      },
    ]);
  if (error) {
    console.error("Error joining competition:", error);
    return { success: false, error: error.message };
  }
  return { success: true };
}
