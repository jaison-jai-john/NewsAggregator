import useStore from '../store/UseStore';
import { Button } from './ui/button';
import { Card, CardContent, CardFooter, CardHeader } from './ui/card';

const News = () => {
  const articles = useStore.getState().articles;

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 justify-items-center'>
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

export default News;
