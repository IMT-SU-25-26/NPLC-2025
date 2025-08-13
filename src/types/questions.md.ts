export interface Questions {
    id: string;
    question: JSON;
}

export interface Users_Quesitons{
    id: string;
    question_id: string;
    user_id: string;
    point: number;
    efficiency: string;
    run_speed: string;
}