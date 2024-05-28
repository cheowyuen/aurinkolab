import { useNews } from './utils/useNews';

function NewsSection() {
  const { latestNews } = useNews();
  
  return (
    <div>
      <div className="bg-beige pb-5">
        <p className="header-content">
          News
          <a className="underline text-sm ml-4" href="/news">View all</a>
        </p>
        <div className="rounded flex justify-center mt-10 mb-12 space-x-20">
          {latestNews.length > 0 ? latestNews.map((news) => (
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
