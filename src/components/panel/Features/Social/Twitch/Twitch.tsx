import { Dispatch, useState } from 'react'
import { useDebounce } from 'use-debounce'
import Scrollbars from 'react-custom-scrollbars-2';

import { 
  useDisclosure,
  Box,
  Button, 
  Heading, 
  Stack,
  Center
} from "@chakra-ui/react"

import UpdatePoint from './../../updatePoint'
import SocialModal from './TwitchDrawer'

import Control from './../../Alerts/Control'
import { guildInfoT } from '../../../Panel.d';
import { TwitchT } from './Twitch.d';

type StreamT = {
  props: guildInfoT,
  data: Array<TwitchT>
}

const Twitch = ({props, data} : StreamT) => {
  const [vals, setVals] = useState(data)
  const [vald] = useDebounce(vals, 1000)

  const [sel, setSel] = useState<TwitchT | undefined>(undefined)

  const {isOpen, onOpen, onClose} = useDisclosure()
  const updateStatus = UpdatePoint(props.guild, vald, data, "/api/updateSocial", "twitch")

  return (<>
    <Box 
    borderLeft={lineBox}>
      <Box textAlign="center">
        <Heading as="h4" size="md">Twitch</Heading>
        <Heading paddingTop="10px" as="h6" size="xs">Streamers activos</Heading>
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
              <StreamButtons setSel={setSel} props={vals} onOpen={onOpen}/>
            </Stack>

          </Scrollbars>

      </Box>
      { vals.length >= 4 && props.tipo !== 2 ?
        "Solo puedes tener 4 canales activos!"
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
                name: "Nuevo stream",
                type: -1,
                channel: "0"
              });
              onOpen()
            }}
          >
            Añadir stream
          </Button>
        </Box>
}

      <Center><Control status={updateStatus}/></Center>

    </Box>

    {typeof sel !== "undefined" &&
      <SocialModal Control={{isOpen, onClose}} guildInfo={props} props={sel} Values={vals} setValues={setVals} />
    }

  </>)
}

const lineBox = "solid #323136 1px"

type StreamButtonsT = {
  props: Array<TwitchT>,
  setSel: Dispatch<TwitchT>, 
  onOpen: () => void
}

const StreamButtons = ({props, onOpen, setSel} : StreamButtonsT) => {
  
  const setInfo = (val : TwitchT) => {
    setSel(val)
    onOpen()
  }
  
  return (
    <>
      {
        props.map((val : TwitchT, id : number) => {
        return <Button key={id} onClick={() => {setInfo(val)}} value={val.name} borderRadius="sm" colorScheme="orange" variant="outline" size="sm" >{val.name}</Button>
      })
      }
    </>
  )
}

export default Twitch;