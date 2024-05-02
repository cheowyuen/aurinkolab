export interface Tutor {
    id: number,
    first_name: string,
    email: string,
    has_certificate: boolean,
    image: string,
    completed_vehicles: number,
    is_estimate: boolean
}

export interface Event {
    id: number,
    name: string,
    place: string,
    date: string,
    image: string, 
    status: string
}

export interface EventDetails {
    id: number;
    name: string;
    date: string;
    education_center: string;
    place: string;
    vehicle: string;
    engine: string;
    tutor: string;
    status: string;
    image: string;
}

export interface Quiz {
    student_id: number;
    score: number;
    totalquestions: number;
    grade: number;
}

export interface TutorSignup {
    first_name: string;
    last_name: string;
    email: string;
    contact_no: string;
    password: string;
    education_center_id: number;
    role: string;
    display_on_website: boolean;
}