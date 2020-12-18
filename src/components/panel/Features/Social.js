import CustomScroller from 'react-custom-scroller';

import { 
  Box,
  Button,
  Container,
  Heading,
  SimpleGrid,
  Stack,
} from "@chakra-ui/react"

const Social = props => {

  return (
    <>
      

      <SimpleGrid
        minChildWidth="120px" 
        spacing="40px"
      >

      <Box 
        border={lineBox}
        maxH="sm"
      marginTop="10px">
        
        <center><Heading as="h4" size="md">Twitch</Heading>

        <Box 

        marginTop= "10px">
        
          <center>
            <Button borderRadius="sm" colorScheme="green" size="sm" variant="outline">Añadir stream</Button>
            <Heading paddingTop="10px" as="h6" size="xs">Streams activos</Heading>

          <CustomScroller
            style={{
              marginTop: "10px",
              height: "192px",
              textAlign: "justify",
            }}
          >   
            <Stack spacing="0px" marginRight="10px">
              <StreamButtons props={exampleList}/>
            </Stack>
          </CustomScroller>
          </center>
        </Box>
        </center>

      </Box>

      <Box 
        border={lineBox}
        maxH="sm"
      marginTop="10px">

        <center>Test content!</center>

      </Box>
      <Box 
        border={lineBox}
        maxH="sm"
      marginTop="10px">

        <center>Test content!</center>

      </Box>

      </SimpleGrid>

    </>
  )
}

const lineBox = ""
const exampleList = ["Test", "STFU", "Sophii", "Jorge", "Agua", "Perico", "Diego", "Santiago"]

const StreamButtons = ({props}) => {

  return (
    <>
      {props.map((val) => {
        return <Button value={val} borderRadius="sm" colorScheme="orange" variant="outline" size="sm" >{val}</Button>
      })
      }
    </>
  )
}

export default Social