import { createContext, useState, useEffect, ReactNode } from 'react';
import { AllNews } from '../types';
import { getAllNews, addNews } from '../services/newsService';
import { getLatestNews } from '../services/latestNewsService';

interface NewsContextType {
    news: AllNews[];
    latestNews: AllNews[];
    createNews: (title: string, image: string, news_text: string) => Promise<void>;
}

export const NewsContext = createContext<NewsContextType | null>(null);

interface NewsProviderProps {
    children: ReactNode;
}

export const NewsProvider: React.FC<NewsProviderProps> = ({ children }) => {
  const [news, setNews] = useState<AllNews[]>([]);
  const [latestNews, setLatestNews] = useState<AllNews[]>([]);

  useEffect(() => {
    getAllNews().then(data => setNews(data));
    getLatestNews().then(data => setLatestNews(data));
  }, []);

  const createNews = async (title: string, image: string, news_text: string) => {
    try {
      const newNews = await addNews(title, image, news_text);
      setNews(prevNews => [newNews, ...prevNews]);
      setLatestNews(prevLatestNews => [newNews, ...prevLatestNews].slice(0,3));
    } catch (error) {
      console.error("An error occurred while adding news.", error);
    }
  };

  return (
    <NewsContext.Provider value={{ news, latestNews, createNews }}>
      {children}
    </NewsContext.Provider>
  );
};


