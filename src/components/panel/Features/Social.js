import {useState} from 'react'

import CustomScroller from 'react-custom-scroller';
import FetchSocial from './fetchSocial'
import SocialModal from './SocialModal'

import { 
  Box,
  Button,
  Stack,
  Heading,
  useDisclosure
} from "@chakra-ui/react"

const lineBox = "solid #323136 1px"

const Social = ({props}) => {
  const data = FetchSocial(props.guild) // Sólo deberiamos de checar autorización en un componente, de lo contrario llenariamos de llamadas la API.
  const {isOpen, onOpen, onClose} = useDisclosure()
  const [selProp, setSelProp] = useState({})

  // Reminder, MAX 5 boxes. 
  return (
    <>
      <Box 
      borderLeft={lineBox}>

        <center><Heading as="h4" size="md">Twitch</Heading>

          <Heading paddingTop="10px" as="h6" size="xs">Streams activos</Heading>
        </center>

        <Box
          borderLeft={"solid white 2px"}
        >

          <CustomScroller
              style={{
                marginTop: "15px",
                height: "192px",
                textAlign: "justify",
              }}
            >   

              <Stack spacing="0px" marginRight="0.4vw" paddingX="1vw">
                <StreamButtons setSel={setSelProp} props={data} onOpen={onOpen}/>
              </Stack>

            </CustomScroller>

        </Box>

        <center><Button marginTop="5px" marginLeft="1vw" borderRadius="sm" colorScheme="green" size="sm" variant="outline">Añadir stream</Button></center>

        <SocialModal Control={{isOpen, onClose}} guildInfo={props} props={selProp} />

      </Box>
    </>
  )
}

const StreamButtons = ({props, onOpen, setSel}) => {
  
  const setInfo = (val) => {
    setSel(val)
    onOpen()
  }
  
  return (
    <>
      {
        props.map((val,id) => {
        return <Button key={id} onClick={() => {setInfo(val)}} value={val.name} borderRadius="sm" colorScheme="orange" variant="outline" size="sm" >{val.name}</Button>
      })
      }
    </>
  )

}

export default Social