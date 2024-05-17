import { Regatta } from "../types";
import config from '../../config';
import axios, { AxiosError } from 'axios';

const baseUrl = `${config.API_BASE_URL}/regatta`;

export const applyRegatta = async (
    event_id: number, vehicle_name: string, team_leader: string, email: string, contact_no: string,  team_logo: string
    ): Promise<Regatta> => {

    try {
        const response = await axios.post(baseUrl, {event_id, vehicle_name, team_leader, email, contact_no, team_logo});
        if (response.status === 201) {
            console.log('Registration successful:', response.data.message);
            return response.data;
        } else {
            throw new Error('Registration failed with status: ' + response.status);
        }
    } catch (error) {
        const e = error as AxiosError;
      
        if (e.response && e.response.status === 409) {
            throw new Error("Email already registered with this event.");
        } else {
            throw new Error('An unexpected error occurred: ' + (e.message || 'Unknown error'));
        }
    }
}
