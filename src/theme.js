import { theme, extendTheme } from "@chakra-ui/react";

import 'fontsource-roboto';
import 'fontsource-ubuntu';


import {  } from "@chakra-ui/react"

const extended = extendTheme({
  components: {
    Drawer: {
      baseStyle: {
        dialog: {
          bg: "gray.800"
        }
      },
    },
  },
})

const customTheme = {
  ...theme,
  ...extended,
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