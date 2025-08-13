import { Users } from "@/types/users.md";
import { createClient } from "@/utils/supabase/client";
import type { JoinCompetition, CheckUserCompetition } from "@/types/competitions.md";

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
  NISN,
  team_name,
  link_twiboon,
  school_name,
  contact_person_number,
}: JoinCompetition): Promise<{ success: boolean; error?: string }> {
  const supabase = createClient();

  const { error } = await supabase
    .from("users_competitions")
    .insert([
      {
        user_id,
        competition_id,
        NISN,
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

export async function CheckUserCompetition({
  NISN,
}: CheckUserCompetition): Promise<{ success: boolean; error?: string }> {
  const supabase = createClient();

  const { data: existing, error: checkError } = await supabase
    .from("users_competitions")
    .select("NISN")
    .eq("NISN", NISN)
    .maybeSingle();

  if (checkError) {
    console.error("Error checking existing competition:", checkError);
    return { success: false, error: checkError.message };
  }

  if (existing) {
    return { success: false, error: "User has already joined a competition." };
  }
  return { success: true };
}

export async function CheckWhichCompetitionTheUserJoinned({NISN}: CheckUserCompetition): Promise<{ success: string; error?: string }> {
  const supabase = createClient();

  const { data: competition, error: checkError } = await supabase
    .from("users_competitions")
    .select("competition_id")
    .eq("NISN", NISN)
    .maybeSingle();

  if (checkError) {
    console.error("Error checking existing competition:", checkError);
    return { success: "0", error: checkError.message };
  }

  if (competition) {
    return { success: competition.competition_id, error: undefined };
  }
  return { success: "0"};
}

export async function GetCompetitionNameById(competitionId: string): Promise<{ success: string; error?: string }> {
  const supabase = createClient();

  const { data: competition, error: fetchError } = await supabase
    .from("competitions")
    .select("competition_name")
    .eq("id", competitionId)
    .maybeSingle();

  if (fetchError) {
    console.error("Error fetching competition name:", fetchError);
    return { success: "0", error: fetchError.message };
  }

  if (competition) {
    return { success: competition.competition_name, error: undefined };
  }
  return { success: "0" };
}

export async function GetUsersByTeamNameAndCompetitionId(team_name: string, competition_id: string): Promise<{ users: Users[]; error?: string }> {
  const supabase = createClient();

  const { data: userCompetitions, error } = await supabase
    .from("users_competitions")
    .select("user_id")
    .eq("team_name", team_name)
    .eq("competition_id", competition_id);

  if (error) {
    console.error("Error fetching user competitions:", error);
    return { users: [], error: error.message };
  }

  const userIds = userCompetitions?.map((uc: { user_id: string }) => uc.user_id) || [];

  if (userIds.length === 0) {
    return { users: [] };
  }

  const { data: users, error: usersError } = await supabase
    .from("users")
    .select("*")
    .in("id", userIds);

  if (usersError) {
    console.error("Error fetching users:", usersError);
    return { users: [], error: usersError.message };
  }

  return { users: users as Users[] };
}
