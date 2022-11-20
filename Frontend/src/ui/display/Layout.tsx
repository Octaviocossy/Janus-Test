import { Box } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';

import Footer from './Footer';
import Nav from './Nav';

const Layout = () => {
  return (
    <>
      <Box minH={'100vh'}>
        <Nav />
        <Box m={'auto'} maxW={'6xl'} px={'1rem'}>
          <Outlet />
        </Box>
      </Box>
      <Footer />
    </>
  );
};

export default Layout;
