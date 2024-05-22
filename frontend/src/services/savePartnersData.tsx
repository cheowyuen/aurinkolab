import { partnersregistration } from "../types";
import config from '../../config';
import axios, { AxiosError } from 'axios';

const baseUrl = `${config.API_BASE_URL}/partnersregistration`;

export const savePartnersData = async (
    companyName: string,  emailAddress: string
    ): Promise<partnersregistration> => {

    try {
        const response = await axios.post(baseUrl, {companyName, emailAddress});
        if (response.status === 201) {
            console.log('Presentation requested:', response.data.message);
            return response.data;
        } else {
            throw new Error('Request failed with status: ' + response.status);
        }
    } catch (error) {
        const e = error as AxiosError;
        if (e.response && e.response.status === 409) {
            throw new Error('Email already request presentation '); 
        } else {
            throw new Error('An unexpected error occurred: ' + (e.message || 'Unknown error'));
        }
    }
}
