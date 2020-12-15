import { ChakraProvider } from "@chakra-ui/react"
import Index from './components/index/Main'
import theme from './theme'

const App = () => {

  return (
    <ChakraProvider theme={theme}>
        <Index />
    </ChakraProvider>
  );
}

export default App;
