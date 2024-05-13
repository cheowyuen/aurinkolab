import config from '../../config';
import axios, { AxiosError } from 'axios';

const baseUrl = `${config.API_BASE_URL}/send-reset-email`;

export const sendResetEmail = async (email: string) => {

    try {
        const response = await axios.post(baseUrl, {email});
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
