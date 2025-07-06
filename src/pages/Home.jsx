import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { getEverything } from '../api/news';
import BreakingNews from '../components/BreakingNews';
import News from '../components/News';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import useStore from '../store/UseStore';

const Home = () => {
  const user = useStore.getState().user;
  const { setArticles, articles } = useStore.getState();
  const [sArticles, setSArticles] = useState([]);
  const [totalResults, setTotalResults] = useState(0);
  const navigate = useNavigate();

  // Get today's date and yesterday's date
  const today = new Date().toISOString().split('T')[0];
  const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000)
    .toISOString()
    .split('T')[0];

  const [queryParams, setQueryParams] = useState({
    q: '',
    from: yesterday,
    to: today,
    sortBy: 'relevancy',
    language: 'en',
    page: 1,
    pageSize: 20,
  });

  const handleQueryChange = (e) => {
    const { name, value } = e.target;
    setQueryParams((prevParams) => ({
      ...prevParams,
      [name]: value,
    }));
    console.log(`Query parameter changed: ${name} = ${value}`);
  };

  const sortOptions = [
    { value: 'relevancy', label: 'Relevancy' },
    { value: 'popularity', label: 'Popularity' },
    { value: 'publishedAt', label: 'Published At' },
  ];

  const languageOptions = [
    { value: 'ar', label: 'Arabic' },
    { value: 'de', label: 'German' },
    { value: 'en', label: 'English' },
    { value: 'es', label: 'Spanish' },
    { value: 'fr', label: 'French' },
    { value: 'he', label: 'Hebrew' },
    { value: 'it', label: 'Italian' },
    { value: 'nl', label: 'Dutch' },
    { value: 'no', label: 'Norwegian' },
    { value: 'pt', label: 'Portuguese' },
    { value: 'ru', label: 'Russian' },
    { value: 'sv', label: 'Swedish' },
    { value: 'ud', label: 'Urdu' },
    { value: 'zh', label: 'Chinese' },
  ];

  const handleSearch = async (e) => {
    if (e) e.preventDefault();
    // Add search functionality here
    try {
      const response = await getEverything(queryParams);
      if (response && response.articles.articles) {
        setArticles(response.articles.articles);
        setSArticles(response.articles.articles);
        setTotalResults(response.articles.totalResults || 0);
        console.log('Search results:', response.articles.articles);
      } else {
        console.error('No articles found in search results');
      }
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
    console.log('Search submitted with parameters:', queryParams);
  };

  const handlePageChange = (newPage) => {
    setQueryParams((prev) => ({ ...prev, page: newPage }));
  };

  const handleNextPage = () => {
    handlePageChange(queryParams.page + 1);
  };

  const handlePrevPage = () => {
    if (queryParams.page > 1) {
      handlePageChange(queryParams.page - 1);
    }
  };

  // Trigger search when page changes
  useEffect(() => {
    if (sArticles.length > 0) {
      handleSearch();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queryParams.page]);

  useEffect(() => {
    if (!user) {
      console.log('No user data found in global state');
      navigate('/login');
    } else {
      setArticles([]); // Clear articles on home page load
      console.log('User data found:', user);
    }
  }, [user, navigate, setArticles]);

  return (
    <>
      {/* Advanced Search Form */}
      <div className='p-4 bg-gray-50 border-b'>
        <form onSubmit={handleSearch} className='max-w-4xl mx-auto space-y-4'>
          {/* Main search bar */}
          <div className='flex gap-2'>
            <Input
              type='text'
              placeholder='Search news articles...'
              value={queryParams.q}
              onChange={handleQueryChange}
              className='flex-1'
              name='q'
            />
            <Button
              type='submit'
              className='px-4 py-2 rounded border border-black'>
              Search
            </Button>
          </div>

          {/* Advanced filters */}
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
            {/* From Date */}
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-1'>
                From Date
              </label>
              <Input
                type='date'
                value={queryParams.from}
                onChange={handleQueryChange}
                className='w-full'
                name='from'
              />
            </div>

            {/* To Date */}
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-1'>
                To Date
              </label>
              <Input
                type='date'
                value={queryParams.to}
                className='w-full'
                onChange={handleQueryChange}
                name='to'
              />
            </div>

            {/* Sort By */}
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-1'>
                Sort By
              </label>
              <select
                value={queryParams.sortBy}
                onChange={handleQueryChange}
                name='sortBy'
                className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'>
                {sortOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Language */}
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-1'>
                Language
              </label>
              <select
                value={queryParams.language}
                onChange={handleQueryChange}
                name='language'
                className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'>
                {languageOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </form>
      </div>

      <div className='p-4'>
        {sArticles.length > 0 ? (
          <>
            <News />
            {/* Pagination Controls */}
            <div className='flex justify-center items-center space-x-4 mt-8 p-4'>
              <Button
                onClick={handlePrevPage}
                disabled={queryParams.page === 1}
                className='px-4 py-2 rounded border border-black disabled:opacity-50 disabled:cursor-not-allowed'>
                Previous
              </Button>

              <div className='flex items-center space-x-2'>
                <span className='text-sm text-gray-600'>Page</span>
                <span className='px-3 py-1 bg-blue-500 text-white rounded font-medium'>
                  {queryParams.page}
                </span>
                <span className='text-sm text-gray-600'>
                  of {Math.ceil(totalResults / queryParams.pageSize)}
                </span>
              </div>

              <Button
                onClick={handleNextPage}
                disabled={
                  queryParams.page >=
                  Math.ceil(totalResults / queryParams.pageSize)
                }
                className='px-4 py-2 rounded border border-black disabled:opacity-50 disabled:cursor-not-allowed'>
                Next
              </Button>
            </div>
          </>
        ) : (
          <BreakingNews />
        )}
      </div>
    </>
  );
};

export default Home;
