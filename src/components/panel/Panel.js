import {useState} from 'react'
import IsAuthorized from './../extra/Authorized'
import Header from './Header'

import { 
  Spinner,
  Center,
  Box,
  Grid,
  Heading,
  GridItem,
  Divider,
  Button,
  Stack,
} from '@chakra-ui/react'

import ServerSelect from './ServerSelect'
import Social from './Features/Social'


const Panel = () => {
  const authorized = IsAuthorized() // Sólo deberiamos de checar autorización en un componente, de lo contrario llenariamos de llamadas la API.

  const [selectedTab, setSelectedTab] = useState("None")
  const [selectedGuild, setSelectedGuild] = useState(0)

  return (<>
      {
        authorized ?
        <>
          <Header/>

          <Box display={{md: "block", base: "none"}} marginTop="25px"> {/*Navegador*/}
            
            <Grid paddingX="5vw"
              templateColumns="repeat(10, 1fr)"
              gap={5}
            >
              <GridItem 
                colSpan={2} 
                border={lineBox} 
              paddingTop="20px"> 
                
                <center>
                    <Heading as="h5" size="sm">Servidor</Heading>
                </center>
            

                <Divider marginTop="7px" marginBottom="17px"/>


                <ServerSelect setSel={setSelectedGuild}/>


                {selectedGuild !== 0 &&
                    <Stack marginX="3.2vw" marginY="3.2vw" spacing="0"> 
                      <Contents props={tList} selected={selectedTab} setSel={setSelectedTab}/>
                    </Stack>
                }

              </GridItem>
                {/* Content */}

              <GridItem 
                colSpan={8} 
                border={lineBox}
              paddingTop="20px">
                {(selectedGuild !== 0 && selectedTab !== "None")  &&
                  <Box>
                    <Center>
                      <Heading as="h5" size="sm">{selectedTab}</Heading>
                    </Center>
                    <Divider marginY="7px"/>

                    <Box paddingX="15px" paddingY="5px"> {/* Content box.*/} 

                      {selectedTab === "Social" &&
                        <Social/>
                      }

                    </Box>


                  </Box>
                }
              </GridItem>

            </Grid>

          </Box>

          <Box display={{sm: "none", base: "block"}} >  {/*Movil*/} 
          </Box>

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
        return (<Button 
          key={id} 
          value={val} 
          borderRadius="base" 
          variant={
            selected === val ? 
            "solid"
            :
            "outline"
          } 
          onClick={() => {setSel(val)}}
          colorScheme="purple" 
          size="sm">
            {val}
          </Button>)
      }) 
    }
  </>)
}

const lineBox = "solid #323136 1px"
const tList = ["Social", "Moderación", "Mensajes", "Random", "Cumpleaños", "Extra"]

export default Panel