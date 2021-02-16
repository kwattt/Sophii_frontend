import { BrowserRouter, Switch, Route} from "react-router-dom";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react"

import Index from './components/index/Home'
import Panel from './components/panel/Panel'
import NotFound from './components/extra/NotFound'

import Terms from './components/legal/Terms'
import Privacy from './components/legal/Privacy'
import theme from './theme'

import CookieConsent from "react-cookie-consent";

const App = () => {
  return (<>  
    <ColorModeScript initialColorMode="dark" />
    <ChakraProvider theme={theme}>
        <BrowserRouter>
        <Switch>
          <Route path="/" component={Index} exact />
          <Route path="/panel" component={Panel} exact />
          <Route path="/terms" component={Terms} exact />
          <Route path="/privacy" component={Privacy} exact />
          <Route status={404} component={NotFound}/>
        </Switch>
        </BrowserRouter>
    </ChakraProvider>
    <CookieConsent
      buttonText="Aceptar"
    >
      Este sitio utiliza cookies para ofrecer una mejor experiencia. 
    </CookieConsent>
  </>)
}

export default App;
