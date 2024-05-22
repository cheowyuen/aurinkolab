import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { AllNews } from "../src/types";
import { getAllNews } from '../src/services/newsService';

const News = () => {   
    const [news, setNews] = useState<AllNews[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        getAllNews().then(data => {
          setNews(data);
        })
    }, [])

    const handleEventClick = (newsId: number) => {
        navigate(`/news/${newsId}`);
    };

    return (
        <div>
            <div className='news-title' data-testid="news-page-title">
                <p>News</p>
            </div>
          
            <ul className="p-12 ml-40">
                {news.length > 0 ? news.map((news) => (
                    <li key={news.id} className="flex flex-col md:flex-row items-start gap-6 mb-8" onClick={() => handleEventClick(news.id)}>
                        <img src={news.image} alt={news.title} className="w-60 shadow-md rounded-lg bg-slate-50 h-auto" />
                        <div className="w-full md:w-1/2">
                            <h3 className="text-slate-900 font-semibold mb-1">
                                {news.title}
                                <span className="block text-sm leading-6 font-normal mb-1">{news.date_added}</span>
                            </h3>
                        </div>
                    </li> 
                )) : "No news found"}
            </ul>
        </div>
    )
}

export default News;