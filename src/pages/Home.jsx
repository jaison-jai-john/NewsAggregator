import { Button } from '../components/ui/button';

const Home = () => {
  return (
    <>
      <div className='p-4'>
        <Button variant='default'>Default Button</Button>
        <Button variant='outline' className='ml-2'>
          Outline Button
        </Button>
        <h1 className='text-4xl text-red-500 font-bold'>Tailwind Test</h1>
      </div>{' '}
    </>
  );
};

export default Home;
