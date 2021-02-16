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
        minH="calc(100vh - 116px)"
        overflow="hidden"
      >    
      
      { authorized ?
      <>

        <Header/>

        <div id="Panel">

          <Box 
            id="view" 
            marginTop={{base:"10px", sm:"25px"}} 
          > 
            <Box 
              minWidth={{base: "auto", sm: "120px"}}
              marginX={{base: "auto", sm: "3vw"}}
            >

            <Box display={{base: "auto", sm: "none"}}>
              <Center> <ServerSelect setSel={setCurrentInfo} setTabIndex={setTabIndex}/> </Center>
              {currentInfo.guild !== "0" && 
                <Box overflow="scroll" borderBottom="solid 1px white">
                  <Tabs index={tabIndex} onChange={handleTabsChange} >
                    <TabList>
                      <Contents props={tList} />
                    </TabList>
                  </Tabs> 
                </Box>
              }
            </Box>

              <SimpleGrid columns={{base: 0, sm: 6}} rows={{base: 5, sm: 0}} spacing={5} px={{base: "10px", sm:"auto"}}>

                <Box height={{base: "auto", sm: "80px"}}>
                  <Center display={{base: "none", sm: "block"}}> <ServerSelect setSel={setCurrentInfo} setTabIndex={setTabIndex}/> </Center>

                  <Box display={{base: "none", sm: "block"}}>
                    {currentInfo.guild !== "0" && 
                      <Tabs index={tabIndex} onChange={handleTabsChange} orientation="vertical" marginTop="1vw">
                          <TabList>
                            <Contents props={tList} />
                          </TabList>
                        </Tabs> 
                    }
                  </Box>

                </Box>

                {(currentInfo.guild !== "0") &&
                  <FuncSelect selTab={tList[tabIndex]} props={currentInfo}></FuncSelect> 
                }

              </SimpleGrid>
            </Box>

            {currentInfo.guild === "0" &&
              <Box textAlign="center">
                <Heading as="h3" size="lg">Seleccionar servidor.</Heading>
                <Center><Logo/></Center>
              </Box>
            }
          </Box>

        </div>
      </> 
      : <Center paddingTop={"60px"}> <Spinner size="xl" /> </Center>
    }
    </Box>
    <Box my={5}>
      <Footer/>
    </Box>

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