import { extendTheme } from '@chakra-ui/react';
import { mode } from '@chakra-ui/theme-tools';

import type { GlobalStyleProps, Styles } from '@chakra-ui/theme-tools';

const styles : Styles = {
  global: (props) => ({
    body: {
      color: mode('gray.800', 'whiteAlpha.900')(props),
      bg: mode('white', 'gray.800')(props)
    }
  })
};

const componentsd = {
  Link: {
    baseStyle: (props : GlobalStyleProps) => ({
      color: mode('blue.400', 'blue.300')(props)
    })
  },
  Drawer: {
    baseStyle: (props : GlobalStyleProps) => ({
      dialog: {
        bg: mode('white', 'gray.800')(props) 
      }
    }),
  },
};

const configd = {
  useSystemColorMode: false,
  initialColorMode: "dark",
}

const theme = extendTheme({
  configd,
  componentsd,
  styles
});

export default theme; 