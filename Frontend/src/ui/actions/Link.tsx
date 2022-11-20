import {
  Link as ChakraLink,
  LinkProps as ChakraLinkProps,
} from '@chakra-ui/react';
import { Link as ReactRouterLink } from 'react-router-dom';

interface Props extends ChakraLinkProps {
  text: string;
  to: string;
}

const Link: React.FC<Props> = ({ to, text, ...rest }) => {
  return (
    <ReactRouterLink to={to}>
      <ChakraLink {...rest} as={'div'}>
        {text}
      </ChakraLink>
    </ReactRouterLink>
  );
};

export default Link;
