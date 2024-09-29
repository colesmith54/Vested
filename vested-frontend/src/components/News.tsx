import React, { useEffect, useState } from "react";
import NewsAPI from "ts-newsapi";
import { Grid } from "@mui/material";
import NewsCard from "./NewsCard";

interface Article {
  source: {
    id: string | null;
    name: string;
  };
  author: string | null;
  title: string;
  description: string | null;
  url: string;
  urlToImage: string | null;
  publishedAt: string;
  content: string | null;
}

interface HeadlinesResponse {
  status: string;
  totalResults: number;
  articles: Article[];
}

interface NewsProps {
  ticker: string;
}

const News: React.FC<NewsProps> = ({ ticker }) => {
  const [news, setNews] = useState<Article[]>([]); // Explicitly define the type for news articles
  const [loading, setLoading] = useState(true); // Initialize state for loading
  const [error, setError] = useState<Error | null>(null); // Initialize state for error

  useEffect(() => {
    const fetchNews = async () => {
      const newsAPI = new NewsAPI("c6c5184927704d47addddae65a2d5fc8");
      try {
        const headlines: HeadlinesResponse = await newsAPI.getEverything({
          q: ticker,
          language: "en",
          sortBy: "relevancy",
          pageSize: 20,
          page: 1,
        });
        console.log(headlines);
        setNews(headlines.articles); // Update state with fetched news articles
        setLoading(false); // Update loading state
      } catch (err) {
        setError(err as Error); // Update error state
        setLoading(false); // Update loading state
      }
    };

    fetchNews();
  }, [ticker]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching news: {error.message}</div>;
  }

  return (
    <div>
      <Grid container spacing={3}>
        {news.map((article, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <NewsCard
              title={article.title}
              source={article.source.name}
              image={article.urlToImage || "default-image-url.jpg"}
              url={article.url}
            />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default News;
