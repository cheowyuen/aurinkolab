import axios from 'axios';
import config from '../../config';

const baseUrl = `${config.API_BASE_URL}/reset-password`;

export const resetPassword = async (token: string, role: string, password: string)  => {
    try {
        const response = await axios.post(baseUrl, { token, role, password });
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error('Error resetting password:', error.response?.data || error.message);
            throw new Error('Invalid or expired reset password link');
        }
        throw error; 
    }
}