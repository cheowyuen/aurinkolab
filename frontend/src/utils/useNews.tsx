import { useContext } from 'react';
import { NewsContext } from './NewsContext'; 

export const useNews = () => {
    const context = useContext(NewsContext);
    if (!context) {
        throw new Error('newsAuth must be used within an NewsContext');
    }
    return context;
}