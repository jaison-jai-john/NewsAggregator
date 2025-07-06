import { GalleryVerticalEnd } from 'lucide-react';
import { useNavigate } from 'react-router';
import useStore from '../store/UseStore';
import { Button } from './ui/button';

const NavBar = () => {
  const navigate = useNavigate();
  const { user, setUser } = useStore.getState();
  const handleLogout = () => {
    // Add logout logic here
    setUser(null); // Clear user state
    navigate('/login'); // Redirect to login page
    console.log('User logged out');
  };

  return (
    <nav className='flex justify-between items-center p-4 bg-white shadow-md border-b'>
      {/* Logo on the left */}
      <div className='flex items-center'>
        <a href='#' className='flex items-center gap-2 self-center font-medium'>
          <div className='bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md'>
            <GalleryVerticalEnd className='size-4' />
          </div>
          InShort
        </a>
      </div>

      {/* Logout button on the right */}
      <div>
        {user && (
          <Button
            className='px-4 py-2 rounded border border-black'
            onClick={handleLogout}>
            Logout
          </Button>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
