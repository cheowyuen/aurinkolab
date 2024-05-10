import axios from 'axios';
import config from '../../config';

const baseUrl = `${config.API_BASE_URL}/resendLink`;

export const resendLink = async (token: string, email: string)  => {
    try {
        const response = await axios.post(baseUrl, { token, email });
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error('Error resending link:', error.response?.data || error.message);
            throw new Error('Error resending link');
        }
        throw error; 
    }
}