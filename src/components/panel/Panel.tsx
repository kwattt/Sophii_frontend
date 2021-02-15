import {useState} from 'react'
import IsAuthorized from './../extra/Authorized'
import Header from './Header'
import Logo from './../index/Logo'
import Footer from './../index/Footer'

import {ContentsT, guildInfoT} from './Panel.d'

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

  const [currentInfo, setCurrentInfo] = useState<guildInfoT>({
    guild: "0",
    roles: [],
    channels: [],
    voices: [],
    stalk: 0,
    bday: 0, 
    welcome: 0,
    bdaymsg: "",
    bdayutc: "",
    tipo: 0,
    stats: {
      members: 0,
      voice: 0,
      text: 0,
      icon: "",
      name: ""
    }
  })
  
  const [tabIndex, setTabIndex] = useState<number>(0)

  const handleTabsChange = (index : number) => {
    setTabIndex(index)
  }

  return (<>
      <Box
        display="flex"
        flexDir="column"
        minH="calc(100vh - 93px)"
      >    
      
      { authorized ?
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
                <ServerSelect setSel={setCurrentInfo} setTabIndex={setTabIndex}/>

                {currentInfo.guild !== "0" && 
                
                  <Tabs index={tabIndex} onChange={handleTabsChange} orientation="vertical" marginTop="1vw">
                      <TabList>
                        <Contents props={tList} />
                      </TabList>
                    </Tabs> 
                }
              </Box>

              {(currentInfo.guild !== "0") &&
                <FuncSelect selTab={tList[tabIndex]} props={currentInfo}></FuncSelect> 
              }

            </SimpleGrid>
          </Box>

          {currentInfo.guild === "0" &&
            <Center>
              <Heading as="h3" size="lg">Seleccionar servidor.</Heading>
              <Logo/>
            </Center>
          }
        </Box>

        </div>
      </> 
      : <Center paddingTop={"60px"}> <Spinner size="xl" /> </Center>
    }
    </Box>
    <Footer/>

    </>
  )
}

const Contents = ({props} : ContentsT) => {
  return (<>
    {
      props.map((val : string, id: number) => {
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

const tList: Array<string> = ["Inicio", "Basico", "Social", "Mensajes", "Extra", "Extra II", "Niveles"]

export default Panel;