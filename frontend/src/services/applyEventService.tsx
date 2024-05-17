import config from '../../config';
import axios, { AxiosError } from 'axios';

const baseUrl = `${config.API_BASE_URL}/apply-event`;

export const applyEvent = async (userId: number, role: string, eventId: number, token: string, max_participants: number) => {

    try {
        const config = {
            headers: { Authorization: `Bearer ${token}` },
        }

        const response = await axios.post(baseUrl, {userId, role, eventId, max_participants}, config);
     
        if (response.status === 200) {
            return response.data;
        } else {
            throw new Error('Event registration failed with status: ' + response.status);
        }
    } catch (error) {
        const e = error as AxiosError;
        
        if (e.response && e.response.status === 409) {
            throw new Error("It looks like you're already registered for this event. We look forward to your participation.");
        } else {
            throw new Error('An unexpected error occurred: ' + (e.message || 'Unknown error'));
        }
    }
}