import {useState} from 'react'
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
  const authorized = IsAuthorized() // Sólo deberiamos de checar autorización en un componente, de lo contrario llenariamos de llamadas la API.

  const [selectedTab, setSelectedTab] = useState("Social")
  const [currentInfo, setCurrentInfo] = useState({
    guild: 0,
    roles: [],
    channels: []
  })
  
  return (<>
      {
        authorized ?
        <>
          <Header/>

          <div id="Panel">
          <Box display={{md: "block", base: "none"}} marginTop="25px"> {/*Navegador*/}

            <Box minWidth="120px" marginX="3vw">
              <SimpleGrid columns={6} spacing={5}>
                <Box height="80px">
                  <ServerSelect sel={currentInfo} setSel={setCurrentInfo}/>

                  {currentInfo.guild !== 0 && 
                  
                    <Tabs orientation="vertical" marginTop="1vw">
                        <TabList>
                          <Contents props={tList} selected={selectedTab} setSel={setSelectedTab}/>
                        </TabList>
                      </Tabs> 
                  }
                </Box>

                {(currentInfo.guild !== 0 && selectedTab !== "None") &&
                  <FuncSelect selTab={selectedTab} props={currentInfo} ></FuncSelect> 
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

          <Box display={{sm: "none", base: "block"}} >  {/*Movil*/} 
          </Box>
          
          </div>
        </> 
        : <Center paddingTop={"60px"}> <Spinner size="xl" /> </Center>
      }
    </>
  )
}

const Contents = ({props, selected, setSel}) => {
  return (<>
    {
      props.map((val, id) => {
        return (<Tab 
          key={id} 
          value={val} 
          onClick={() => {setSel(val)}}
          size="sm">
            {val}
          </Tab>)
      }) 
    }
  </>)
}

const lineBox = "solid #323136 1px"
const tList = ["Social", "Moderación", "Mensajes", "Random", "Cumpleaños", "Extra"]

export default Panel