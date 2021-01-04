import {useEffect, useState} from 'react'
import IsAuthorized from './../extra/Authorized'
import Header from './Header'
import Logo from './../index/Logo'


import { 
  Spinner,
  Center,
  Box,
  SimpleGrid,
  Tabs,
  TabList,
  Tab,
  Heading,
} from '@chakra-ui/react'

import ServerSelect from './ServerSelect'
import FuncSelect from './FuncSelect'

const Panel = () => {
  const authorized = IsAuthorized()

  const [currentInfo, setCurrentInfo] = useState({
    guild: 0,
    roles: [],
    channels: [],
    stalk: 0,
    bday: 0, 
    welcome: 0,
    bdaymsg: "",
    bdayutc: "",
    tipo: 0
  })
  
  const [tabIndex, setTabIndex] = useState(0)

  const handleTabsChange = (index) => {
    setTabIndex(index)
  }

  return (<>
    {
      authorized ?
      <>
        <Header/>

        <div id="Panel">

        <Box display={{sm: "none", base: "block"}} > 
        {"Una versión para resoluciones menores estará disponible pronto. Una disculpa :("}
        </Box>
        
        <Box marginTop="25px"> 

          <Box minWidth="120px" marginX="3vw">
            <SimpleGrid columns={6} spacing={5}>
              <Box height="80px">
                <ServerSelect sel={currentInfo} setSel={setCurrentInfo} setTabIndex={setTabIndex}/>

                {currentInfo.guild !== 0 && 
                
                  <Tabs index={tabIndex} onChange={handleTabsChange} orientation="vertical" marginTop="1vw">
                      <TabList>
                        <Contents props={tList} />
                      </TabList>
                    </Tabs> 
                }
              </Box>

              {(currentInfo.guild !== 0) &&
                <FuncSelect selTab={tList[tabIndex]} props={currentInfo}></FuncSelect> 
              }

            </SimpleGrid>
          </Box>

          {currentInfo.guild === 0 &&
            <center>
              <Heading as="h3" size="lg">Seleccionar servidor.</Heading>
              <Logo/>
            </center>
          }
        </Box>

        </div>
      </> 
      : <Center paddingTop={"60px"}> <Spinner size="xl" /> </Center>
    }

    </>
  )
}

const Contents = ({props, setSel}) => {
  return (<>
    {
      props.map((val, id) => {
        return (<Tab 
          key={id} 
          value={val} 
          size="sm">
            {val}
          </Tab>)
      }) 
    }
  </>)
}

const tList = ["Inicio", "Social", "Mensajes", "Extra", "Limpieza"]

export default Panel