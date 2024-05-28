import { AllNews } from "../types";
import config from '../../config';
import axios from 'axios';

const baseUrl = `${config.API_BASE_URL}/latest-news`;

export const getLatestNews = async (): Promise<AllNews[]> => {
    const response = await axios.get<AllNews[]>(baseUrl);
    return response.data;
} 