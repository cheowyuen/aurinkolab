import { News } from "../types";
import config from '../../config';
import axios, { AxiosError } from 'axios';

const baseUrl = `${config.API_BASE_URL}/news/add`;

export const addNews = async (
    title: string, image: string, text: string
    ): Promise<News> => {

    try {
        const response = await axios.post(baseUrl, {title, image, text});
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