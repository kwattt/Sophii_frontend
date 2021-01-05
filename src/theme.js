import { extendTheme } from '@chakra-ui/react';
import { mode } from '@chakra-ui/theme-tools';

// setup light/dark mode global defaults
const styles = {
  global: (props) => ({
    body: {
      color: mode('gray.800', 'whiteAlpha.900')(props),
      bg: mode('white', 'gray.800')(props)
    }
  })
};

const components = {
  Link: {
    baseStyle: (props) => ({
      color: mode('blue.400', 'blue.300')(props)
    })
  },
  Drawer: {
    baseStyle: (props) => ({
      dialog: {
        bg: mode('white', 'gray.800')(props) 
      }
    }),
  },
};

const config = {
  useSystemColorMode: false,
  initialColorMode: "dark",
}

const theme = extendTheme({
  config,
  components,
  styles
});

export default theme