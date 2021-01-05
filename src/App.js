import { BrowserRouter, Switch, Route} from "react-router-dom";

import { ChakraProvider, ColorModeScript } from "@chakra-ui/react"

import Index from './components/index/Home'
import Panel from './components/panel/Panel'
import NotFound from './components/extra/NotFound'

import theme from './theme'

const App = () => {

  return (<>
    <ColorModeScript initialColorMode="dark" />
    <ChakraProvider theme={theme}>

      <BrowserRouter>
      <Switch>
          <Route path="/" component={Index} exact />
          <Route path="/panel" component={Panel} exact />
          <Route component={NotFound} status={404} />
        </Switch>

      </BrowserRouter>

    </ChakraProvider>
  </>)
}

export default App;
