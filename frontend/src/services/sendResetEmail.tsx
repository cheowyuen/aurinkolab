import config from '../../config';
import axios, { AxiosError } from 'axios';

const baseUrl = `${config.API_BASE_URL}/send-reset-email`;

export const sendResetEmail = async (email: string) => {

    try {
        const response = await axios.post(baseUrl, {email});
        if (response.status === 201) {
            console.log('Reset password email sent');
            return response.data;
        } else {
            throw new Error('Failed to send reset password email with status: ' + response.status);
        }
    } catch (error) {
        const e = error as AxiosError;
        
        throw new Error('An unexpected error occurred: ' + (e.message || 'Unknown error'));
    }
}
