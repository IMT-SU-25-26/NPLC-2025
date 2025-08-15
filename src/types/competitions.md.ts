export interface JoinCompetition{
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

export interface checkPageLock{
    competition_id: string;
}