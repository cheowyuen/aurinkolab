import config from '../../config';
import axios, { AxiosError } from 'axios';

const baseUrl = `${config.API_BASE_URL}/send-reset-email`;

export const sendEmail = async (email: string, role: string) => {

    try {
        console.log(email, role)
        const response = await axios.post(baseUrl, {email, role});
        
        console.log('If your email is registered, you will receive a link to reset your password.');
        return response.data;
    } catch (error) {
        const e = error as AxiosError;
        
        throw new Error('An unexpected error occurred: ' + (e.message || 'Unknown error'));
    }
}
