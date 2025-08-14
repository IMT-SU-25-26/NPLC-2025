export interface Users {
  id: string;
  NISN: string;
  username: string;
  email: string;
  isAdmin: boolean;
  team_name: string | null;
  link_twiboon: string | null;
  school_name: string | null;
  contact_person_number: string | null;
  competition_id: string | null;
}