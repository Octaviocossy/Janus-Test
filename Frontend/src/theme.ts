import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  colors: {
    textAndIcons: '#2d3748',
    borderColor: '#eee',
    hoverColor: '#f4f4f4',
  },

  global: {
    '*': {
      boxSizing: 'border-box',
    },
  },
});

export default theme;
