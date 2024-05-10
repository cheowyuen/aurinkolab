import axios from 'axios';
import config from '../../config';

const baseUrl = `${config.API_BASE_URL}/confirmemail`;

export const verifyEmail = async (token: string, role: string)  => {
    try {
        const response = await axios.post(baseUrl, { token, role });
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error('Error verifying email:', error.response?.data || error.message);
            throw new Error('Invalid or expired verification link');
        }
        throw error; 
    }
}