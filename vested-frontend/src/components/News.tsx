import React, { useEffect } from 'react';
import NewsAPI from 'ts-newsapi';
import querystring from 'querystring';


const News: React.FC = () => {
  useEffect(() => {
    const fetchNews = async () => {
      const newsAPI = new NewsAPI('c6c5184927704d47addddae65a2d5fc8');
      try {
        const headlines = await newsAPI.getEverything({
          q: 'Apple Environmental Social Governance',
          language: 'en',
          sortBy: 'relevancy',
          pageSize: 20,
          page: 1,
        });
        console.log(headlines.articles.map((article) => article.title));
      } catch (err) {
        console.error('Error fetching news:', err);
      }
    };

    fetchNews();
  }, []);

  return (
    <div>
      <h2>News about Tesla and ESG</h2>
      <p>Check the console for the fetched news headlines.</p>
    </div>
  );
};

export default News;