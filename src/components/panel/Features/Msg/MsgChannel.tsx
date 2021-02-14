import { useState } from 'react'
import { useDebounce } from 'use-debounce'

import { 
  Alert,
  AlertIcon,
  Box,
  Center,
  Heading,
  Select,
} from '@chakra-ui/react'

import UpdatePoint from './../updatePoint'
import Control from './../Alerts/Control'
import { guildInfoT, optionChannelT, channelInfoT } from '../../Panel.d'

type MsgChannelT = {
  props: guildInfoT,
  data: any 
}

const MsgChannel = ({props, data} : MsgChannelT) => {
  const [vals, setVals] = useState(data)
  const [vald] = useDebounce(vals, 200)

  const updateStatus = UpdatePoint(props.guild, vald, data, "/api/updateMsg")

  return (<Box
    borderLeft={lineBox}>

      <Box textAlign="center"><Heading as="h4" size="md">Canales</Heading>

      <Heading paddingTop="10px" as="h6" size="xs">Entrada/Salida</Heading>

      <Select 
        my={5} 
        defaultValue={data.channel}
        size="sm"
      onChange={(e) => {setVals({...vals, channel: e.target.value})}}>
        <OptionChannel props={props.channels}/>
      </Select>

      </Box>
        <Alert status="warning"
          size="sm"
        my={15}>
          <AlertIcon/> 
          Utilizar ; para separar los mensajes.
          <br/>
          Utiliza {"{}"} para indicar nombre del usuario.
        </Alert>
      <Center><Control status={updateStatus}/></Center>

  </Box>)
}

const lineBox = "solid #323136 1px"

const OptionChannel = ({props} : optionChannelT) => {
  return (
    <>
      {props.map((val : channelInfoT) => {
        return <option key={val.id} value={"" + val.id}>{val.name}</option>
      })
      }
    </>
  )
}

export default MsgChannel