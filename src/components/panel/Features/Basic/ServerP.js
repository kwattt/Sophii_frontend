import { useState } from 'react'
import { useDebounce } from 'use-debounce'
import { 
  Box,
  Heading,
  InputGroup,
  InputLeftAddon,
  Input
} from '@chakra-ui/react'

import UpdatePoint from './../updatePoint'
import Control from './../Alerts/Control'

const ServerP = ({props, data}) => {
  const [vals, setVals] = useState(data)
  const [vald] = useDebounce(vals, 1000)
  const updateStatus = UpdatePoint(props.guild, vald, data, "/api/updateGuild")

  return (<>
    <Box 
      borderLeft={lineBox}
    > 

      <center><Heading as="h4" size="md">Servidor</Heading>

      <Heading paddingTop="10px" as="h6" size="xs">Configuración</Heading>

      </center>

      <InputGroup size ="sm" my={6}>
        <InputLeftAddon children="Prefijo"/>
        <Input 
          isInvalid={updateStatus === "invalid"} 
          defaultValue={data.prefix} 
          maxLength={6}
          onChange={(e) => {setVals({...vals, prefix: e.target.value})} }
        />
      </InputGroup>

      <center><Control status={updateStatus}/></center>
    </Box>

  </>)

}

const lineBox = "solid #323136 1px"

export default ServerP