import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getNews } from '../src/services/newsService';
import { AllNews } from "../src/types";

const NewsDetails = () => {
    const { newsId } = useParams(); 
    const [ news, setNews ] = useState<AllNews>({id: 0, title: "", image: "", news_text: "", date_added: ""});

    useEffect(() => {
        if (newsId) {
            getNews(newsId).then(data => {
                setNews(data);
            }).catch(error => {
                console.error('Failed to load news:', error);
            });
        } else {
            console.error('News ID is undefined');
        }
    }, [newsId])

    if (!news) {
        return <div>No news found</div>;
    }

    return (
        <div className="flex justify-center">
            <div className="flex flex-col items-center max-w-2xl py-35">
                <div>
                    <h1 className="text-4xl font-bold text-center">{news.title}</h1>
                    <p className="text-center">{news.date_added}</p>
                    <img src={news.image} className="mt-10" />
                    <div className="mt-10">
                        {news.news_text}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default NewsDetails;

