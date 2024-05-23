import { useState, useEffect } from 'react';
//import { useNavigate } from 'react-router-dom';
import { AllNews } from "../src/types";
import { getLatestNews } from '../src/services/newsService';

function NewsSection() {
  const [news, setNews] = useState<AllNews[]>([]);
  //const navigate = useNavigate();

  useEffect(() => {
    getLatestNews().then(data => {
      setNews(data);
    })
  }, [])

  /*const handleEventClick = (newsId: number) => {
    navigate(`/news/${newsId}`);
  };*/

  return (
    <div>
      <div className="bg-beige pb-5">
        <p className="header-content">
          News
          <a className="underline text-sm ml-4" href="/news">View all</a>
        </p>
        <div className="rounded flex justify-center mt-10 mb-12 space-x-20">
          {news.length > 0 ? news.map((news) => (
            <div className="rounded card w-90 bg-base-100 shadow-xl">
              <a href={`/news/${news.id}`}>
                <img className="rounded" src={news.image} alt="offer" />
                <h2 className="p-2 font-medium">{news.title}</h2>
              </a>
            </div>
          )) : ""}
        </div>
      </div>
    </div>
  );
}

export default NewsSection;
