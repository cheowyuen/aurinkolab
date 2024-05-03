import axios from 'axios';
import { Event, EventDetails as EventDetailsType } from "../types";
import config from '../../config';

const baseUrl = `${config.API_BASE_URL}/events`;

export const getAllEvents = async () => {
    const response = await axios.get<Event[]>(baseUrl);
    return response.data;
}

export const getEvent = async (id: string): Promise<EventDetailsType>  => {
    try {
        const url = `${baseUrl}/${id}`;
        const response = await axios.get<EventDetailsType>(url);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error('Error fetching event:', error.response?.data || error.message);
            throw new Error('Error fetching event');
        }
        throw error; 
    }
}
