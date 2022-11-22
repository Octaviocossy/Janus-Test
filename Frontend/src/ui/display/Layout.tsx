import { Box, useToast, UseToastOptions } from '@chakra-ui/react';
import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

import { useProvider } from '../../hooks';

import Footer from './Footer';
import Nav from './Nav';

const Layout = () => {
  const toast = useToast();
  const { state, actions } = useProvider();

  useEffect(() => {
    if (state.toast) {
      toast({
        title: state.toast.title,
        status: state.toast.status as UseToastOptions['status'],
        isClosable: true,
        duration: 5000,
      });
      actions.resetMessage();
    }
  }, [state.toast]);

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
