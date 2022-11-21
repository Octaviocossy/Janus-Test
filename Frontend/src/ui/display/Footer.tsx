import { Box, Text } from '@chakra-ui/react';

const Footer = () => {
  return (
    <Box m={'auto'} maxW={'6xl'} p={'1rem'}>
      <Text
        color={'textAndIcons'}
        flex={1}
        fontSize={'xl'}
        fontWeight={'bold'}
        textAlign={'center'}
      >
        Octavio Cossy Torquati - Janus Test
      </Text>
    </Box>
  );
};

export default Footer;
