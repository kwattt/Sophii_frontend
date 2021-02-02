import { useState, memo } from 'react'
import { useDebounce } from 'use-debounce'
import CustomScroller from 'react-custom-scroller';

import { 
  useDisclosure,
  Box,
  Button, 
  Heading, 
  Stack
} from "@chakra-ui/react"

import UpdatePoint from './../updatePoint'
import SocialModal from './YoutubeDrawer'

import Control from './../Alerts/Control'

const Purge = ({props, data}) => {
  const [vals, setVals] = useState(data)
  const [vald] = useDebounce(vals, 1000)

  const [sel, setSel] = useState({})

  const {isOpen, onOpen, onClose} = useDisclosure()
  const updateStatus = UpdatePoint(props.guild, vald, data, "/api/updateSocial")

  return (<>
    <Box 
    borderLeft={lineBox}>
      <center><Heading as="h4" size="md">Youtube</Heading>

        <Heading paddingTop="10px" as="h6" size="xs">Canales activos</Heading>
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
              <YtButtons setSel={setSel} props={vals.youtube} onOpen={onOpen}/>
            </Stack>

          </CustomScroller>

      </Box>
      { vals.youtube.length >=35 && props.tipo !== "2" ?
        "Solo puedes tener 3 canales activos!"
      : 
        <center>
        <Button 
          marginTop="5px" 
          marginLeft="1vw" 
          borderRadius="sm" 
          colorScheme="green" 
          size="sm" 
          variant="outline"
          onClick={() => {
            setSel({
              name: "Nuevo canal",
              channel_name: "Nuevo canal",
              type: "-1",
              channel: 0
            });
            onOpen()
          }}
        >
          Añadir canal
        </Button>
        </center>
}

      <center><Control status={updateStatus}/></center>

    </Box>
    <SocialModal Control={{isOpen, onClose}} guildInfo={props} props={sel} Values={vals.youtube} setValues={setVals} />

  </>)
}

const lineBox = "solid #323136 1px"

const YtButtons = memo(({props, onOpen, setSel}) => {

  const setInfo = (val) => {
    setSel(val)
    onOpen()
  }
  
  return (
    <>
      {
        props.map((val,id) => {
        return <Button key={id} onClick={() => {setInfo(val)}} value={val.name} borderRadius="sm" colorScheme="orange" variant="outline" size="sm" >{val.channel_name}</Button>
      })
      }
    </>
  )
})

export default Purge