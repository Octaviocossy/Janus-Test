import {
  IconButton as ChakraIconButton,
  IconButtonProps,
} from '@chakra-ui/react';

const IconButton: React.FC<IconButtonProps> = ({ ...rest }) => {
  return (
    <ChakraIconButton
      _hover={{ bg: 'gray.700' }}
      bg={'gray.800'}
      color={'#fafafa'}
      shadow={'md'}
      {...rest}
    />
  );
};

export default IconButton;
