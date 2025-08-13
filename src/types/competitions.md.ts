export interface Users_Competitions {
    id: string;
    user_id: string;
    competition_id: string;
    student_id: string; //NIM
    team_name: string;
    link_twiboon: string;
    school_name: string;
    contact_person_number: string;
}

export interface JoinCompetition{
    user_id: string;
    competition_id: string;
    NISN: string; //NIM
    team_name: string;
    link_twiboon: string;
    school_name: string;
    contact_person_number: string;
}

export interface CheckUserCompetition{
    NISN: string;
}

export interface Competitions{
    id: string;
    competition_name: string;
}