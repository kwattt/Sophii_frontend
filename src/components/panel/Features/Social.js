import {useState, useEffect} from 'react'

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
  const data = FetchSocial(props.guild) 
  const [streams, setStreams] = useState([])
  const {isOpen, onOpen, onClose} = useDisclosure()
  const [selProp, setSelProp] = useState({})

  useEffect(() => {
    setStreams(data)
  }, [props, data])

  return (
    <>
      <Box 
      borderLeft={lineBox}>

        <center><Heading as="h4" size="md">Twitch</Heading>

          <Heading paddingTop="10px" as="h6" size="xs">Streamers activos</Heading>
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
                <StreamButtons setSel={setSelProp} props={streams} onOpen={onOpen}/>
              </Stack>

            </CustomScroller>

        </Box>

        <center><Button 
          marginTop="5px" 
          marginLeft="1vw" 
          borderRadius="sm" 
          colorScheme="green" 
          size="sm" 
          variant="outline"
          onClick={() => {
            setSelProp({
              name: "Nuevo stream",
              type: "-1",
              channel: 0
            });
            onOpen()
          }}
          >Añadir stream</Button></center>

        <SocialModal Control={{isOpen, onClose}} guildInfo={props} props={selProp} Values={streams} setValues={setStreams} />

      </Box>

      <Box>
        
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