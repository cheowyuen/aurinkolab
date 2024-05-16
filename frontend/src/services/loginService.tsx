import config from '../../config';
import axios, { AxiosError } from 'axios';

const baseUrl = `${config.API_BASE_URL}/login`;

export const login = async (email: string, password: string, role: string) => {

    try {
        const response = await axios.post(baseUrl, {email, password, role});
     
        if (response.status === 200) {
            return response.data;
        } else {
            throw new Error('Login failed with status: ' + response.status);
        }
    } catch (error) {
        const e = error as AxiosError;
        if (e.response && e.response.status === 401) {
            throw new Error('Invalid email or password'); 
        } else {
            throw new Error('An unexpected error occurred: ' + (e.message || 'Unknown error'));
        }
    }
}
