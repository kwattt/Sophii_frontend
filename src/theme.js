import { theme } from "@chakra-ui/react";

import 'fontsource-roboto';
import 'fontsource-ubuntu';

const customTheme = {
  ...theme,
  colors: {
    ...theme.colors,
  },

  styles: {
    global: {
      body: {
        bg: "gray.900",
        color: "white",
      },  
    },
  },

  fonts: {
    heading: '"Roboto", Ubuntu',
    body: "system-ui, sans-serif",
    mono: "Menlo, monospace",
  },

}

export default customTheme