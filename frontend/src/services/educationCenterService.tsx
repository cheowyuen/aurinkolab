import axios from 'axios';
import { EducationCenter } from "../types";
import config from '../../config';

const baseUrl = `${config.API_BASE_URL}/educationCenters`;

export const getAllEducationCenters = async () => {
    const response = await axios.get<EducationCenter[]>(baseUrl);
    return response.data;
}
