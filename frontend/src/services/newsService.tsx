import { AllNews } from "../types";
import config from '../../config';
import axios, { AxiosError } from 'axios';

const baseUrl = `${config.API_BASE_URL}/news`;

export const addNews = async (
    title: string, image: string, news_text: string
    ): Promise<AllNews> => {

    try {
        const url = `${baseUrl}/add`;
        const response = await axios.post(url, {title, image, news_text});
        if (response.status === 201) {
            console.log('News added successfully:', response.data.message);
            return response.data;
        } else {
            throw new Error('Adding news failed with status: ' + response.status);
        }
    } catch (error) {
        const e = error as AxiosError;
      
        throw new Error('An unexpected error occurred: ' + (e.message || 'Unknown error'));
    }
}

export const getAllNews = async (): Promise<AllNews[]> => {
    const response = await axios.get<AllNews[]>(baseUrl);
    return response.data;
}  

export const getNews = async (id: string): Promise<AllNews>  => {
    try {
        const url = `${baseUrl}/${id}`;
        const response = await axios.get<AllNews>(url);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error('Error fetching news:', error.response?.data || error.message);
            throw new Error('Error fetching news');
        }
        throw error; 
    }
}

