import { useState } from 'react'
import { useDebounce } from 'use-debounce'
import { 
  Box,
  Heading,
  InputGroup,
  InputLeftAddon,
  Input,
  Center
} from '@chakra-ui/react'

import UpdatePoint from '../updatePoint'
import Control from '../Alerts/Control'

import {guildInfoT} from './../../Panel.d'

type ServerPT = {
  props: guildInfoT,
  data: any
}

const ServerP = ({props, data} : ServerPT) => {
  const [vals, setVals] = useState(data)
  const [vald] = useDebounce(vals, 1000)
  const updateStatus = UpdatePoint(props.guild, vald, data, "/api/updateGuild")

  return (<>
    <Box 
      borderLeft={lineBox}
    > 

      <Box textAlign="center">
        <Heading as="h4" size="md">Servidor</Heading>
        <Heading paddingTop="10px" as="h6" size="xs">Configuración</Heading>
      </Box>

      <InputGroup size ="sm" my={6}>
        <InputLeftAddon children="Prefijo"/>
        <Input 
          isInvalid={updateStatus === "invalid"} 
          defaultValue={data.prefix} 
          maxLength={6}
          onChange={(e) => {setVals({...vals, prefix: e.target.value})} }
        />
      </InputGroup>

      <Center><Control status={updateStatus}/></Center>
    </Box>

  </>)

}

const lineBox = "solid #323136 1px"

export default ServerP