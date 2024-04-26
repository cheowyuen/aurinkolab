import axios from 'axios';
import { Tutor } from "../types";
import config from '../../config';

const baseUrl = `${config.API_BASE_URL}/tutors`;

export const getAllTutors = async () => {
    const response = await axios.get<Tutor[]>(baseUrl);
    return response.data;
}

