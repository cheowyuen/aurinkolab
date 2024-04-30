import { Quiz } from "../types";
import config from '../../config';

const baseUrl = `${config.API_BASE_URL}/quiz`;

export const saveQuiz = async (student_id: number, score: number, totalquestions: number, grade: number): Promise<Quiz> => {
    const response = await fetch(baseUrl, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({student_id, score, totalquestions, grade})
    });

    if (!response.ok) {
        throw new Error('Failed to save quiz result');
    }

    return response.json();
}
