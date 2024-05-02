import { TutorSignup } from "../types";
import config from '../../config';

const baseUrl = `${config.API_BASE_URL}/signup`;

export const saveTutorSignup = async (
    first_name: string, last_name: string, email: string, contact_no: string, password: string, education_center_id: number, role: string, display_on_website: boolean
    ): Promise<TutorSignup> => {

    const response = await fetch(baseUrl, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({first_name, last_name, email, contact_no, password, education_center_id, role, display_on_website})
    });

    if (!response.ok) {
        throw new Error('Failed to save tutor data');
    }

    return response.json();
}
