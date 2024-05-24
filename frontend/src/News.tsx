import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useNews } from './utils/useNews';

const News = () => {   
    const { news } = useNews();
    const [updatedNews, setUpdatedNews] = useState(news)
    const [filter, setFilter] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        setUpdatedNews(news);
    }, [news])

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const handleEventClick = (newsId: number) => {
        navigate(`/news/${newsId}`);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target as { value: string };
        setFilter(value);
        const filteredNews = news.filter(n => n.title.toLowerCase().includes(value.toLowerCase()));
        setUpdatedNews(filteredNews);
    };

    return (
        <div>
            <div className='news-title' data-testid="news-page-title">
                <p>News</p>
            </div>


            <div className="p-12 ml-40 max-w-5xl">
                <div className="w-full">
                    <label className="flex items-center gap-2">
                    <input value={filter} onChange={handleInputChange} type="text" className="border w-full rounded-xl p-2" placeholder="Search" />
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-6 h-6 opacity-70"><path fill-rule="evenodd" d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" clip-rule="evenodd" /></svg>
                    </label>
                </div>
           
          
                <ul className="mt-12">
                    {updatedNews.length > 0 ? updatedNews.map((news) => (
                        <li key={news.id} className="flex flex-col md:flex-row items-start gap-6 mb-8" onClick={() => handleEventClick(news.id)}>
                            <img src={news.image} alt={news.title} className="w-60 shadow-md rounded-lg bg-slate-50 h-auto" />
                            <div className="w-full">
                                <h3 className="text-slate-900 font-semibold mb-1">
                                    {news.title}
                                    <span className="block text-sm leading-6 font-normal mb-1">{news.date_added}</span>
                                </h3>
                            </div>
                        </li> 
                    )) : ""}
                </ul>
            </div>
        </div>
    )
}

export default News;