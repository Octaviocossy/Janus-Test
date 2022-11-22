import { Box, Heading, Highlight } from '@chakra-ui/react';

const Home = () => {
  return (
    <Box
      alignItems={'center'}
      color={'textAndIcons'}
      display={'flex'}
      flexDirection={'column'}
      justifyContent={'center'}
      minH={'85vh'}
    >
      <Heading>
        <Highlight
          query={'Reporte de Stock 🚀'}
          styles={{
            px: '0.5rem',
            bg: 'yellow.100',
            rounded: 'md',
            color: 'textAndIcons',
          }}
        >
          Janus Automation - Test 👉 Reporte de Stock 🚀
        </Highlight>
      </Heading>
    </Box>
  );
};

export default Home;
