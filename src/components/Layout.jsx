import { Outlet } from 'react-router';
import Footer from '../components/Footer';
import NavBar from '../components/NavBar';

const Layout = () => {
  return (
    <div>
      <NavBar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
