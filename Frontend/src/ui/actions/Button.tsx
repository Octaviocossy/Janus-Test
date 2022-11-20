import { Button as ChakraButton, ButtonProps } from '@chakra-ui/react';

interface Props extends ButtonProps {
  text: string;
}

const Button: React.FC<Props> = ({ text, ...rest }) => {
  return (
    <ChakraButton
      _hover={{ bg: 'gray.700' }}
      bg={'gray.800'}
      color={'#fafafa'}
      shadow={'md'}
      {...rest}
    >
      {text}
    </ChakraButton>
  );
};

export default Button;
