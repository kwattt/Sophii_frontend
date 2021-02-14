import { useState } from 'react'
import { useDebounce } from 'use-debounce'
import Scrollbars from 'react-custom-scrollbars-2';

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
import { guildInfoT } from '../../Panel.d';

type YoutubeT = {
  props: guildInfoT,
  data: any
}

const Youtube = ({props, data} : YoutubeT) => {
  const [vals, setVals] = useState(data)
  const [vald] = useDebounce(vals, 1000)

  const [sel, setSel] = useState({})

  const {isOpen, onOpen, onClose} = useDisclosure()
  const updateStatus = UpdatePoint(props.guild, vald, data, "/api/updateSocial")

  return (<>
    <Box 
    borderLeft={lineBox}>
      <Box textAlign="center">
        <Heading as="h4" size="md">Youtube</Heading>
        <Heading paddingTop="10px" as="h6" size="xs">Canales activos</Heading>
      </Box>

      <Box
        borderLeft={"solid white 2px"}
      >

        <Scrollbars
            style={{
              marginTop: "15px",
              height: "192px",
              textAlign: "justify",
            }}
          >

            <Stack spacing="0px" marginRight="0.4vw" paddingX="1vw">
              <YtButtons setSel={setSel} props={vals.youtube} onOpen={onOpen}/>
            </Stack>

          </Scrollbars>

      </Box>
      { vals.youtube.length >=35 && props.tipo !== 2 ?
        "Solo puedes tener 3 canales activos!"
      : 
        <Box textAlign="center">
          <Button 
            marginTop="5px" 
            marginLeft="1vw" 
            borderRadius="sm" 
            colorScheme="green" 
            size="sm" 
            variant="outline"
            onClick={() => {
              setSel({
                id: -1,
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
        </Box>
}

      <Box textAlign="center"><Control status={updateStatus}/></Box>

    </Box>
    <SocialModal Control={{isOpen, onClose}} guildInfo={props} props={sel} Values={vals.youtube} setValues={setVals} />

  </>)
}

const lineBox = "solid #323136 1px"

type YtButtonsT = {
  props: any
  onOpen: () =>  void,
  setSel: any
}

const YtButtons = ({props, onOpen, setSel} : YtButtonsT) => {

  const setInfo = (val : any) => {
    setSel(val)
    onOpen()
  }
  
  return (
    <>
      {
        props.map((val: any, id : number) => {
        return <Button key={id} onClick={() => {setInfo(val)}} value={val.name} borderRadius="sm" colorScheme="orange" variant="outline" size="sm" >{val.channel_name}</Button>
      })
      }
    </>
  )
}

export default Youtube;