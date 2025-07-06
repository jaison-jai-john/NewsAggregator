import { useEffect, useState } from 'react';
import { getTopHeadlines } from '../api/news';
import useStore from '../store/UseStore';
import { Button } from './ui/button';
import { Card, CardContent, CardFooter, CardHeader } from './ui/card';

const BreakingNews = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1); // Current page for pagination
  const savedArticles = useStore.getState().headlines;
  const setSavedArticles = useStore.getState().setHeadlines;

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setLoading(true);
        const response = await getTopHeadlines({
          pageSize: 12,
          page: 1,
          sortBy: 'relevancy',
          country: 'us',
        });
        setArticles(response.articles.articles || []);
        setSavedArticles(response.articles.articles || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (savedArticles && savedArticles.length > 0) {
      setArticles(savedArticles);
      setLoading(false);
    } else {
      fetchArticles();
    }
  }, [savedArticles, setSavedArticles]);

  const handleSearch = async () => {
    try {
      setLoading(true);
      const response = await getTopHeadlines({
        pageSize: 12,
        page: page,
        sortBy: 'relevancy',
        country: 'us',
      });
      setArticles(response.articles.articles || []);
      setSavedArticles(response.articles.articles || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 justify-items-center'>
      {loading && <p className='col-span-full text-center'>Loading...</p>}
      {error && (
        <p className='col-span-full text-center text-red-500'>Error: {error}</p>
      )}
      {articles.length > 0 ? (
        articles.map((articles, index) => {
          return (
            <Card key={index} className='flex flex-col'>
              <CardHeader>
                <img
                  src={articles.urlToImage}
                  alt={articles.title}
                  className='w-full h-full max-h-80 object-cover rounded-t-lg'
                />
                <h3 className='text-lg font-semibold'>{articles.title}</h3>
              </CardHeader>
              <CardContent className='flex-1'>
                <p className='text-sm'>{articles.description}</p>
              </CardContent>
              <CardFooter className='flex justify-between items-center'>
                <a
                  href={articles.url}
                  target='_blank'
                  rel='noopener noreferrer'>
                  <Button className='px-4 py-2 rounded border border-black'>
                    Read More
                  </Button>
                </a>
              </CardFooter>
            </Card>
          );
        })
      ) : (
        <p className='col-span-full text-center'>No articles found.</p>
      )}
    </div>
  );
};

export default BreakingNews;
