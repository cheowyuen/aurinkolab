import { TutorSignup } from "../types";
import config from '../../config';
import axios, { AxiosError } from 'axios';

const baseUrl = `${config.API_BASE_URL}/signup`;

export const saveTutorSignup = async (
    first_name: string, last_name: string, email: string, contact_no: string, password: string, education_center_id: number, role: string, display_on_website: boolean
    ): Promise<TutorSignup> => {

    try {
        const response = await axios.post(baseUrl, {first_name, last_name, email, contact_no, password, education_center_id, role, display_on_website});
        if (response.status === 201) {
            console.log('Registration successful:', response.data.message);
            return response.data;
        } else {
            throw new Error('Registration failed with status: ' + response.status);
        }
    } catch (error) {
        const e = error as AxiosError;
        if (e.response && e.response.status === 409) {
            throw new Error('Email already in use'); 
        } else {
            throw new Error('An unexpected error occurred: ' + (e.message || 'Unknown error'));
        }
    }
}
