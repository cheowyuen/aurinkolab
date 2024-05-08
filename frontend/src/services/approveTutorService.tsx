import axios, { AxiosError } from 'axios';
import { TutorsPendingApproval } from "../types";
import config from '../../config';

const baseUrl = `${config.API_BASE_URL}/approvetutor`;

export const getAllTutors = async () => {
    const response = await axios.get<TutorsPendingApproval[]>(baseUrl);
    return response.data;
}

export const approveTutor = async (id: number[], action: string) => {

    try {
        const response = await axios.post(baseUrl, {id, action});
        if (response.status === 201) {
            console.log('Tutor approval/rejection successful:', response.data.message);
            return response.data;
        } else {
            throw new Error('Tutor approval/rejection failed with status: ' + response.status);
        }
    } catch (error) {
        const e = error as AxiosError;
        throw new Error('An unexpected error occurred: ' + (e.message || 'Unknown error'));
    }
}